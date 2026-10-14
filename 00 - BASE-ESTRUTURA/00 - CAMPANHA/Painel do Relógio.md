---
tipo: painel
---

# Painel do Relógio

Consultas do Dataview que leem o frontmatter das notas. Hoje elas apontam para a campanha de exemplo em `01 - Exemplo`. Para usar na sua campanha, troque `"01 - Exemplo"` pela pasta onde ela está (ou por `""` para varrer o vault inteiro).

> [!info] Campos usados
> `tipo`, `estado`, `dia`, `dia_prazo`, `dia_atual`, `prazo`, `local`, `papel`, `facção`. O dia atual da campanha fica em `dia_atual`, no frontmatter do relógio. Atualize esse campo a cada sessão.
>
> Valores de `estado`: relógio → `ativo`; evento → `pendente` ou `ocorrido`; missão → `pendente`, `ativa`, `concluída` ou `falhou`.

---

## Relógios

```dataview
TABLE WITHOUT ID
  file.link AS "Relógio",
  estado AS "Estado",
  dia_atual AS "Dia atual",
  dia_prazo AS "Prazo (dia)",
  dia_prazo - dia_atual AS "Dias restantes"
FROM "01 - Exemplo"
WHERE tipo = "relógio"
SORT dia_prazo ASC
```

---

## Eventos por dia

```dataview
TABLE WITHOUT ID
  dia AS "Dia",
  file.link AS "Evento",
  estado AS "Estado",
  local AS "Local"
FROM "01 - Exemplo"
WHERE tipo = "evento"
SORT dia ASC
```

---

## Atrasados e ainda pendentes

Compara o `dia_atual` do relógio com o dia de cada evento e o `dia_prazo` de cada missão. Eventos com `estado: pendente` cujo dia já passou estão **atrasados**: ou o mundo já os resolveu sem os jogadores (mude para `ocorrido`), ou você esqueceu de aplicar a consequência.

```dataviewjs
const raiz = '"01 - Exemplo"';
const relogio = dv.pages(raiz).where(p => p.tipo == "relógio")[0];
if (!relogio) {
  dv.paragraph("Nenhum relógio encontrado.");
} else {
  const hoje = relogio.dia_atual;
  dv.paragraph(`**Dia atual:** ${hoje} (relógio: ${relogio.file.name})`);

  const eventos = dv.pages(raiz).where(p => p.tipo == "evento" && p.estado == "pendente");
  const atrasados = eventos.where(p => p.dia < hoje).sort(p => p.dia, "asc");
  const futuros = eventos.where(p => p.dia >= hoje).sort(p => p.dia, "asc");

  dv.header(4, "Eventos atrasados");
  if (atrasados.length) {
    dv.table(["Dia", "Evento", "Dias de atraso"], atrasados.map(p => [p.dia, p.file.link, hoje - p.dia]));
  } else {
    dv.paragraph("Nenhum.");
  }

  dv.header(4, "Eventos ainda por vir");
  if (futuros.length) {
    dv.table(["Dia", "Evento", "Faltam (dias)"], futuros.map(p => [p.dia, p.file.link, p.dia - hoje]));
  } else {
    dv.paragraph("Nenhum.");
  }

  const abertas = dv.pages(raiz).where(p => p.tipo && p.tipo.startsWith("missão") && p.dia_prazo != null && p.estado != "concluída" && p.estado != "falhou");
  dv.header(4, "Missões com prazo ainda em aberto");
  if (abertas.length) {
    dv.table(
      ["Missão", "Prazo", "Faltam (dias)", "Situação"],
      abertas.sort(p => p.dia_prazo, "asc").map(p => [
        p.file.link,
        p.prazo,
        p.dia_prazo - hoje,
        p.dia_prazo < hoje ? "vencida" : "no prazo"
      ])
    );
  } else {
    dv.paragraph("Nenhuma.");
  }
}
```

---

## Missões por estado

```dataview
TABLE WITHOUT ID
  key AS "Estado",
  rows.file.link AS "Missão",
  rows.tipo AS "Tipo",
  rows.prazo AS "Prazo",
  rows.local AS "Local"
FROM "01 - Exemplo"
WHERE contains(tipo, "missão")
SORT dia_prazo ASC
GROUP BY estado
```

---

## NPCs por facção

```dataview
TABLE WITHOUT ID
  key AS "Facção",
  rows.file.link AS "NPC",
  rows.papel AS "Papel",
  rows.local AS "Local"
FROM "01 - Exemplo"
WHERE tipo = "npc"
SORT file.name ASC
GROUP BY facção
```
