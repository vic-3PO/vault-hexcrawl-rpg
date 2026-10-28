# Ferramentas do Vault

Cinco ferramentas em HTML, CSS e JavaScript para apoiar a preparação e a mesa. Cada uma é um arquivo único, sem instalação, sem servidor e sem internet. **Abra `index.html` no navegador** (duplo clique) e escolha uma.

| Ferramenta | Para que serve |
|---|---|
| [`mapa-wiki.html`](mapa-wiki.html) | Marcadores móveis sobre a imagem do mapa, com camadas, grade hexagonal e links para as notas |
| [`painel-relogios.html`](painel-relogios.html) | Relógios de prazo, eventos e missões por dia, com o avanço do dia gravado na nota |
| [`teia-relacoes.html`](teia-relacoes.html) | Quadro de cortiça com NPCs, facções, locais e missões, e as relações entre eles |
| [`linha-tempo.html`](linha-tempo.html) | Calendário da campanha: o que já passou, o que atrasou e o que o mundo fez fora de cena |
| [`painel-sessao.html`](painel-sessao.html) | Iniciativa, PV e condições, cenas planejadas, dados, registro e resumo da sessão |

Os dados ficam **no seu navegador** e podem ser exportados em JSON ou `.md`. Nada é enviado para fora do computador.

> **Navegador:** use **Chrome ou Edge** para o melhor resultado. Neles as ferramentas leem a pasta do vault, gravam de volta nas notas e mantêm o autosave em arquivo. Em Firefox e Safari tudo continua funcionando, mas você baixa o arquivo atualizado em vez de gravar direto, e o autosave fica só no navegador.

---

## Como as ferramentas leem o vault

As ferramentas que usam as notas (**Relógios**, **Teia** e **Linha do Tempo**) têm o botão **Abrir pasta do vault…**. Escolha a **pasta raiz** (por exemplo `base-campanha`). Elas leem os arquivos `.md` e usam só o **frontmatter**, os mesmos campos do Painel do Relógio:

| Campo | Usado em | Valores |
|---|---|---|
| `tipo` | todas | `relógio`, `evento`, `missão-principal`, `missão-secundária`, `npc`, `facção`, `local`… |
| `dia_atual` | relógios | número do dia em que a campanha está |
| `dia_prazo` | relógios, missões | dia em que o prazo estoura |
| `dia` | eventos | dia em que o evento acontece |
| `estado` | relógios, eventos, missões | relógio: `ativo`; evento: `pendente` ou `ocorrido`; missão: `pendente`, `ativa`, `concluída` ou `falhou` |
| `local`, `facção`, `região`, `recompensa`… | teia | `[[wikilinks]]` viram ligações entre notas |

São ignoradas as pastas que começam com ponto, `node_modules`, `graphify-out` e `Ferramentas`.

---

## Mapa Wiki

Abra a imagem do mapa (botão **Abrir mapa…** ou arraste o arquivo para a tela).

- **Criar marcador:** duplo clique no mapa, ou ative **＋ Marcador** e clique uma vez.
- **Mover:** arraste o selo. **Zoom:** roda do mouse. **Deslocar o mapa:** arraste o fundo.
- **Cada marcador tem** título, categoria (local, cidade, facção, missão, perigo, NPC, outro), ícone, nota do vault e descrição em markdown simples. `[[Links]]` na descrição abrem a nota no Obsidian.
- **Abrir no Obsidian:** informe o nome do vault em ⚙ (o mesmo que aparece no Obsidian). Sem ele, os links aparecem em negrito, sem clique.
- **Camadas e busca:** ligue e desligue categorias; a busca esmaece os marcadores que não combinam.
- **Grade hexagonal:** botão **Grade**. Ajuste tamanho e deslocamento em ⚙ até casar com o hexágono do seu mapa.
- **Vários mapas:** o seletor **Mapas salvos…** guarda cada imagem aberta com os seus marcadores. A imagem fica no navegador (IndexedDB) e, com o autosave ligado, também na pasta de autosave.

**Exportar JSON** gera um arquivo assim (posições em fração da imagem, de 0 a 1, para valer em qualquer resolução):

```json
{ "versao": 1, "mapa": "Confins.png", "vault": "base-campanha",
  "hex": { "tam": 80, "x": 0, "y": 0, "ver": true },
  "marcadores": [ { "id": "m4k2x9a", "x": 0.31, "y": 0.5, "titulo": "Vale do Guapeba",
                    "cat": "cidade", "icone": "⌂", "nota": "Vale do Guapeba", "desc": "Vila de pescadores." } ] }
```

**Exportar .md** gera uma nota com os marcadores agrupados por categoria, pronta para colar no vault.

---

## Painel de Relógios

Mostra cada relógio (`tipo: relógio`) como uma carta com anel de segmentos, um por dia até o prazo. A faixa no topo da carta diz o estado: **em calma**, **tensão** ou **crítico**. Quando o prazo estoura, o centro mostra uma caveira.

- **− / ＋ dia:** muda `dia_atual`. Na pasta do vault, a nota é regravada, inclusive as linhas `**Dia atual:**` e `**Dias restantes:**` do corpo. Fora do Chrome e do Edge aparece **Baixar nota**, e você substitui o arquivo.
- **Linha do tempo:** eventos e prazos de missão por dia. O dia de hoje fica em destaque. Evento `pendente` cujo dia já passou aparece **atrasado**. Clique num evento para alternar entre `pendente` e `ocorrido`.
- **Missões com prazo:** tabela com dias restantes e a marca de vencida.
- **Relógio manual:** para quem não usa o vault. Fica salvo no navegador.
- **Campanha:** o campo no cabeçalho limita a leitura a uma pasta, por exemplo `01 - Exemplo`.

---

## Teia de Relações

Cada nota com `tipo` vira uma tachinha no quadro, com o nome numa ficha de papel. Os campos de frontmatter com `[[wikilinks]]` (`local`, `facção`, `região`, `recompensa`…) viram **fios de lápis**; o botão **Links do texto** acrescenta os `[[links]]` encontrados no corpo das notas.

- **Relações próprias:** **＋ Relação** liga dois nós com um tipo e um rótulo opcional. Cada tipo tem cor e traçado diferentes: aliado (contínuo), inimigo (tracejado), serve a (traço e ponto), deve favor a (pontilhado), família (grosso), rival e outro.
- **Mover:** arraste um nó; ele fica **fixo** onde você soltou (duplo clique solta). **Reorganizar** recalcula o desenho.
- **Filtros** por tipo, busca por nome e painel com os campos da nota e as ligações.
- **＋ Nó** cria um nó que não existe como nota.
- **Importar / Exportar** guardam só o que você criou à mão (nós, relações e posições), em JSON. As ligações vindas das notas são sempre relidas do vault.

---

## Linha do Tempo

Uma tabela com um dia por coluna e uma faixa por tipo: **Relógios**, **Eventos**, **Missões**, **Mundo / facções** e **Sessões**.

- O **hoje** vem do `dia_atual` do primeiro relógio; dá para mudar no campo do cabeçalho.
- **Atrasados** aparecem no topo, e as missões e eventos vencidos ganham listras vermelhas.
- **＋ Acontecimento** registra o que o mundo fez fora de cena (ação de facção, rumor) ou uma sessão. Dá para marcar como feito ou excluir.
- **Exportar .md** gera `Linha do tempo.md` com tudo em ordem de dia, com caixas de seleção. **Exportar JSON** guarda só os acontecimentos manuais.

---

## Painel de Sessão

Pensado para a mesa, com o turno atual sempre à vista.

- **Iniciativa:** adicione combatentes (nome, iniciativa, PV, lado). **Ordenar / iniciar** ordena e começa a rodada 1. **Próximo turno** avança e pula quem está a 0 PV. O lado aparece pela forma: círculo (jogador), losango (inimigo), triângulo (aliado). PV com **− / ＋** e condições por clique.
- **Cenas planejadas:** marque como feita, marque a cena em andamento e reordene.
- **Dados:** d4, d6, d8, d10, d12, d20, d100, 2d6 e 3d6. Cada rolagem cai no **registro**, junto com o que você anotar, com a hora da sessão.
- **Cronômetro** da sessão e **notas livres**.
- **Exportar resumo .md** gera uma nota `tipo: sessão` com cenas, combate, registro e notas. Salve em `06 - SESSÕES/`.
- **Nova sessão** apaga tudo e recomeça.

---

## Autosave, backup e limpeza

Toda ferramenta guarda o que você faz no navegador (`localStorage`). O cabeçalho oferece três botões:

- **Ligar autosave…** espelha esses dados em arquivos na pasta `Ferramentas/autosave/` (escolha a pasta `Ferramentas` ou `Ferramentas/autosave`). O Chrome e o Edge pedem a permissão de novo a cada visita (**Reativar autosave**). Com o autosave ligado, **Restaurar** recupera o último arquivo, e uma página com dados apagados se restaura sozinha.
- **Backup** baixa um JSON com os dados daquela ferramenta.
- **Limpar tudo** apaga tudo o que a ferramenta salvou: navegador, imagens do mapa e os arquivos dela na pasta de autosave. Pede confirmação e não dá para desfazer.
- **← Voltar** leva de volta à capa.

A pasta `autosave/` está no `.gitignore`: os arquivos gerados nela nunca vão para o repositório.

| Ferramenta | Chaves no navegador |
|---|---|
| Mapa Wiki | `mapa-wiki:<nome do mapa>`, `mapa-wiki:_ultimo`, `mapa-wiki:_vault` e as imagens no IndexedDB `mapa-wiki-imagens` |
| Painel de Relógios | `painel-relogios:manuais` |
| Teia de Relações | `teia:manual` |
| Linha do Tempo | `linha-tempo:manual` |
| Painel de Sessão | `painel-sessao` |

---

## Aparência

O visual é a **mesa do mestre**: feltro verde, trilho de madeira e folhas de papel, com tema escuro automático pelo sistema. Tudo vem de [`tema.css`](tema.css), carregado por todas as páginas: cores, fontes (só as do sistema), componentes e os ícones (SVG embutidos no CSS).

As texturas (feltro, madeira, papel, cortiça, selo de cera e fita) são **imagens opcionais** em `img/web/`: `feltro.webp`, `madeira.webp`, `papel-grao.webp`, `cortica.webp`, `selo.webp` e `fita.webp`. **Essa pasta não vem no repositório.** Sem elas as ferramentas funcionam do mesmo jeito: o feltro vira um verde liso, o papel perde o grão e os marcadores viram discos coloridos. Para ter as texturas, coloque arquivos com esses nomes na pasta; só use imagens cuja licença permita. Opções livres: ambientCG, Poly Haven e OpenGameArt (filtro CC0).

---

## Arquivos

```
Ferramentas/
  index.html             capa com as cinco ferramentas
  mapa-wiki.html
  painel-relogios.html
  teia-relacoes.html
  linha-tempo.html
  painel-sessao.html
  tema.css               visual compartilhado
  autosave.js            botão Voltar, autosave, backup e limpeza
  autosave/              onde o autosave grava (conteúdo ignorado pelo git)
  img/web/               texturas opcionais (não versionadas)
```

## Licença

O código desta pasta (HTML, CSS e JavaScript) usa a licença **MIT**, como o restante do código do repositório. Veja o arquivo [`LICENSE`](../LICENSE). As texturas opcionais de `img/` não fazem parte do repositório e têm as licenças dos seus autores.

## Problemas comuns

- **O botão para abrir a pasta não grava nas notas:** o navegador não é Chrome nem Edge. Use **Baixar nota** e substitua o arquivo no vault.
- **"Reativar autosave" toda vez:** é uma exigência do navegador, que pede permissão de novo a cada visita.
- **Os dados sumiram:** o navegador limpou os dados do site. Ligue o autosave para ter uma cópia em arquivo, ou use **Backup**.
- **As ferramentas não encontram os relógios:** confira se as notas têm `tipo: relógio` no frontmatter e se o campo **Campanha** do cabeçalho não está filtrando a pasta errada.
- **Link do Obsidian não abre:** informe o nome do vault (⚙ no Mapa Wiki, ou o campo **Vault** na Teia).
