/* Autosave + botão Voltar, compartilhado pelas ferramentas.
 *
 * Uso: <script src="autosave.js" data-tool="mapa-wiki"></script> antes do script da ferramenta.
 * Cada ferramenta já guarda seus dados no localStorage com chaves "<tool>" ou "<tool>:...".
 * Este script observa essas gravações e, quando o usuário liga uma pasta, espelha tudo em
 * <pasta>/autosave/<tool>.json (File System Access API: Chrome e Edge). Sem a API, só o
 * localStorage e o botão "Backup" (download do mesmo JSON) ficam disponíveis. */
(() => {
  'use strict';
  const script = document.currentScript;
  const TOOL = script.dataset.tool, PREFIX = script.dataset.prefix || TOOL;
  const IDBS = (script.dataset.idb || '').split(',').filter(Boolean);   // bancos IndexedDB desta ferramenta, para a limpeza
  const FILE = TOOL + '.json', DIR = 'autosave', DB = 'ferramentas-autosave';
  const CAN_FS = typeof window.showDirectoryPicker === 'function';
  const mine = k => k === PREFIX || k.startsWith(PREFIX + ':');

  /* ---------- IndexedDB: guarda o handle da pasta entre sessões ---------- */
  const idb = () => new Promise((ok, no) => {
    const r = indexedDB.open(DB, 1); r.onupgradeneeded = () => r.result.createObjectStore('h');
    r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error);
  });
  const idbGet = async k => { const db = await idb(); return new Promise((ok, no) => { const q = db.transaction('h').objectStore('h').get(k); q.onsuccess = () => ok(q.result); q.onerror = () => no(q.error); }); };
  const idbSet = async (k, v) => { const db = await idb(); return new Promise((ok, no) => { const q = db.transaction('h', 'readwrite').objectStore('h').put(v, k); q.onsuccess = () => ok(); q.onerror = () => no(q.error); }); };

  /* ---------- snapshot ---------- */
  const rawSet = Storage.prototype.setItem;
  function snapshot() {
    const itens = {};
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (mine(k)) itens[k] = localStorage.getItem(k); }
    return { versao: 1, ferramenta: TOOL, salvoEm: new Date().toISOString(), itens };
  }
  const temDados = () => Object.keys(snapshot().itens).length > 0;
  function aplica(snap) { for (const [k, v] of Object.entries(snap.itens || {})) if (mine(k)) rawSet.call(localStorage, k, v); }

  /* ---------- pasta ---------- */
  let dir = null, estado = CAN_FS ? 'sem-pasta' : 'sem-api', timer = 0, temArquivo = false;
  async function resolveDir(h) { return h.name === DIR ? h : h.getDirectoryHandle(DIR, { create: true }); }
  async function permitido(h, pedir) {
    const o = { mode: 'readwrite' };
    if ((await h.queryPermission(o)) === 'granted') return true;
    return pedir && (await h.requestPermission(o)) === 'granted';
  }
  async function lerArquivo() {
    try { const f = await (await dir.getFileHandle(FILE)).getFile(); return JSON.parse(await f.text()); } catch (e) { return null; }
  }
  async function grava() {
    if (!dir || estado === 'sem-api') return;
    try {
      const w = await (await dir.getFileHandle(FILE, { create: true })).createWritable();
      await w.write(JSON.stringify(snapshot(), null, 2)); await w.close();
      estado = 'ativo'; temArquivo = true; msg('salvo às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) { estado = 'reativar'; msg('sem acesso à pasta'); }
    desenha();
  }
  let limpando = false;                                  // evita regravar durante a limpeza
  const agenda = () => { if (limpando) return; clearTimeout(timer); timer = setTimeout(grava, 800); };
  Storage.prototype.setItem = function (k, v) { rawSet.call(this, k, v); if (this === localStorage && mine(String(k))) agenda(); };

  /* API para arquivos auxiliares (ex.: a imagem do mapa) na mesma pasta do autosave */
  let resolvePronto; const pronto = new Promise(r => { resolvePronto = r; });
  const conectou = () => window.dispatchEvent(new CustomEvent('autosave-conectado'));
  window.Autosave = {
    pronto,
    ativo: () => !!dir && estado === 'ativo',
    async gravaArquivo(nome, blob) {                     // true se gravou (ou já estava igual)
      if (!dir) return false;
      try {
        try { if ((await (await dir.getFileHandle(nome)).getFile()).size === blob.size) return true; } catch (e) { /* ainda não existe */ }
        const w = await (await dir.getFileHandle(nome, { create: true })).createWritable(); await w.write(blob); await w.close(); return true;
      } catch (e) { return false; }
    },
    async leArquivo(nome) { try { return await (await dir.getFileHandle(nome)).getFile(); } catch (e) { return null; } },
    async lista(prefixo) {
      const out = []; if (!dir) return out;
      try { for await (const [n, h] of dir.entries()) if (h.kind === 'file' && n.startsWith(prefixo)) out.push(n); } catch (e) {}
      return out;
    },
  };

  async function escolhe() {
    try {
      const h = await window.showDirectoryPicker({ mode: 'readwrite', id: 'ferramentas-autosave' });
      dir = await resolveDir(h); await idbSet('dir', h); estado = 'ativo'; conectou();
      const snap = await lerArquivo(); temArquivo = !!snap;
      if (snap && !temDados()) { aplica(snap); location.reload(); return; }
      if (snap && temDados() && confirm(`Já existe um autosave desta ferramenta (${new Date(snap.salvoEm).toLocaleString('pt-BR')}).\n\nOK = carregar o autosave (substitui o que está no navegador)\nCancelar = manter o atual e sobrescrever o arquivo`)) { aplica(snap); location.reload(); return; }
      await grava();
    } catch (e) { if (e.name !== 'AbortError') msg('erro: ' + e.message); }
    desenha();
  }
  async function reativa() {
    try { const h = await idbGet('dir'); if (h && await permitido(h, true)) { dir = await resolveDir(h); estado = 'ativo'; conectou(); await grava(); return; } } catch (e) {}
    return escolhe();
  }
  async function restaura() {
    const snap = await lerArquivo(); if (!snap) { msg('nenhum autosave na pasta'); return; }
    if (!confirm(`Restaurar o autosave de ${new Date(snap.salvoEm).toLocaleString('pt-BR')}?\nIsso substitui os dados atuais desta ferramenta.`)) return;
    aplica(snap); location.reload();
  }
  /* apaga tudo o que esta ferramenta guardou: navegador, bancos IndexedDB declarados e arquivos da pasta de autosave */
  async function limpa() {
    const itens = ['os dados guardados no navegador'];
    if (IDBS.length) itens.push('as imagens guardadas no navegador');
    if (dir) itens.push('os arquivos desta ferramenta na pasta de autosave');
    if (!confirm(`Apagar TUDO o que esta ferramenta salvou?

• ${itens.join(String.fromCharCode(10) + '• ')}

Isso não pode ser desfeito. Use Backup antes se quiser guardar uma cópia.`)) return;
    limpando = true; clearTimeout(timer);
    try {
      for (const k of Object.keys(snapshot().itens)) localStorage.removeItem(k);
      sessionStorage.removeItem('autosave-restaurado-' + TOOL);
      for (const nome of IDBS) await new Promise(ok => {
        const r = indexedDB.open(nome);
        r.onsuccess = () => {
          const db = r.result, ls = [...db.objectStoreNames];
          if (!ls.length) { db.close(); return ok(); }
          const tx = db.transaction(ls, 'readwrite'); ls.forEach(s => tx.objectStore(s).clear());
          tx.oncomplete = tx.onabort = () => { db.close(); ok(); };
        };
        r.onerror = () => ok();
      });
      if (dir) for (const nome of await window.Autosave.lista(TOOL + '.')) await dir.removeEntry(nome).catch(() => {});
    } catch (e) { alert('Não consegui apagar tudo: ' + e.message); limpando = false; return; }
    location.reload();
  }
  function backup() {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(snapshot(), null, 2)], { type: 'application/json' }));
    a.download = `backup-${TOOL}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  /* ---------- interface ---------- */
  const style = document.createElement('style');
  /* o visual dos botões vem do tema.css; aqui só o necessário caso o tema não carregue */
  style.textContent = `.as-wrap{display:inline-flex;flex-wrap:wrap;gap:.5rem;align-items:center;font-size:.85rem}
    .as-wrap .as-msg{font-family:var(--f-mao,inherit)}.as-wrap .ok{color:#b5dd94}.as-wrap .warn{color:#f2c879}
    .as-wrap button{font-size:.8rem;min-height:30px;padding:.15em .65em}`;
  document.head.appendChild(style);
  const ic = n => Object.assign(document.createElement('span'), { className: 'ico i-' + n });
  const back = Object.assign(document.createElement('a'), { className: 'as-back', href: 'index.html', title: 'Voltar para a lista de ferramentas' });
  back.append(ic('voltar'), 'Voltar');
  const wrap = Object.assign(document.createElement('span'), { className: 'as-wrap' });
  const header = document.querySelector('header');
  if (header) { header.prepend(back); header.appendChild(wrap); }
  let texto = '';
  const msg = t => { texto = t; };
  function btn(rotulo, fn, titulo, icone) {
    const b = Object.assign(document.createElement('button'), { title: titulo || '' });
    if (icone) b.append(ic(icone)); b.append(rotulo); b.onclick = fn; return b;
  }
  function desenha() {
    wrap.textContent = '';
    const tag = (cls, t, icone) => { const s = Object.assign(document.createElement('span'), { className: 'as-msg ' + cls }); s.append(ic(icone || 'tinteiro'), ' ' + t); wrap.appendChild(s); return s; };
    if (estado === 'sem-api') {
      tag('warn', 'só no navegador').title = 'Este navegador não permite gravar em pasta. Use Chrome ou Edge para o autosave em arquivo.';
    } else if (estado === 'sem-pasta') {
      wrap.appendChild(btn('Ligar autosave…', escolhe, 'Escolha a pasta Ferramentas (ou Ferramentas/autosave). Os dados são espelhados em autosave/' + FILE, 'tinteiro'));
    } else if (estado === 'reativar') {
      wrap.appendChild(btn('Reativar autosave', reativa, 'O navegador pede permissão de novo a cada visita', 'tinteiro'));
    } else {
      tag('ok', texto || 'ligado');
      if (temArquivo) wrap.appendChild(btn('Restaurar', restaura, 'Carregar o último autosave da pasta'));
      wrap.appendChild(btn('Trocar pasta', escolhe));
    }
    wrap.appendChild(btn('Backup', backup, 'Baixar um JSON com os dados desta ferramenta', 'baixar'));
    const lixo = btn('Limpar tudo', limpa, 'Apagar tudo o que esta ferramenta salvou (navegador e pasta de autosave)', 'lixeira'); lixo.classList.add('danger'); wrap.appendChild(lixo);
  }
  desenha();

  /* ---------- inicialização: reconecta a pasta lembrada ---------- */
  if (!CAN_FS) resolvePronto();
  else (async () => {
    try {
      const h = await idbGet('dir');
      if (h && await permitido(h, false)) {
        dir = await resolveDir(h); estado = 'ativo';
        const snap = await lerArquivo(); temArquivo = !!snap;
        const flag = 'autosave-restaurado-' + TOOL;
        if (snap && !temDados() && !sessionStorage.getItem(flag)) { sessionStorage.setItem(flag, '1'); aplica(snap); location.reload(); return; }
        if (!snap && temDados()) await grava();
      } else if (h) estado = 'reativar';
    } catch (e) {}
    desenha(); resolvePronto();
  })();
})();
