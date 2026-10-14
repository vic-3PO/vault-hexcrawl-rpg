<%*
const tipo = await tp.system.suggester(["Principal", "Secundária"], ["missão-principal", "missão-secundária"]);
const prazo = await tp.system.prompt("Prazo em texto (ex.: Dia 7, ou 'nenhum')", "nenhum");
const diaPrazo = await tp.system.prompt("Dia do prazo (só o número; deixe vazio se não houver)", "");
const local = await tp.system.prompt("Local (nome da nota)", "");
-%>
---
tipo: <% tipo %>
prazo: <% prazo %>
dia_prazo: <% diaPrazo %>
estado: pendente
recompensa: 
local: "[[<% local %>]]"
---

# <% tp.file.title %>

**Objetivo:** <% tp.file.cursor(1) %>

**Quem dá a missão:** 

> [!warning] Prazo
> <!-- O que acontece quando o prazo vence. Mude `estado` para ativa, concluída ou falhou conforme a campanha avança. -->

---

## Situação

<!-- O que está acontecendo no local, independente dos jogadores. -->

## O que os jogadores precisam descobrir

1. 

## Fontes de informação

| Informação | Fonte | Como obter |
| ---------- | ----- | ---------- |
|            |       |            |

---

## Recompensa

- 

## Consequência se ignorada

<!-- Obrigatório: o mundo muda se ninguém fizer a missão. -->
