<%*
const objetivo = await tp.system.prompt("Objetivo em uma frase", "");
-%>
---
tipo: facção
objetivo: <% objetivo %>
estado: ativa
---

# <% tp.file.title %>

**Objetivo:** <% objetivo %>

<% tp.file.cursor(1) %>

---

## Recursos

- 

## O que fazem sem os jogadores

<!-- Ações com cronograma: o que a facção faz a cada etapa do relógio. -->

| Dia | Ação |
| --- | ---- |
|     |      |

## Membros importantes

- 

## Relações com outras facções

- 
