<%*
const dia = await tp.system.prompt("Dia em que acontece (número)", "1");
const local = await tp.system.prompt("Local (nome da nota)", "");
-%>
---
tipo: evento
dia: <% dia %>
estado: pendente
local: "[[<% local %>]]"
---

# Dia <% dia %> — <% tp.file.title %>

**Quando:** Dia <% dia %>. Acontece independente do que os jogadores estejam fazendo.

<!-- O que acontece, em poucas linhas. -->
<% tp.file.cursor(1) %>

---

## Como os jogadores chegam nele

- Se estiverem no local neste dia: 
- Se não estiverem, mas souberem: 
- Se não estiverem e não souberem: o evento acontece sem eles.

## Consequência se ignorado

<!-- O que muda no mundo se ninguém comparecer. Mude `estado` para "ocorrido" quando o dia passar. -->

> [!note] Para o mestre
> 
