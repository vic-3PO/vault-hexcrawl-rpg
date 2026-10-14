---
tipo: hexágono
região: "[[<% tp.system.prompt("Região (nome da nota)") %>]]"
terreno: <% tp.system.suggester(["Floresta", "Planície", "Pântano", "Neve", "Montanha", "Água", "Ruínas"], ["floresta", "planície", "pântano", "neve", "montanha", "água", "ruínas"]) %>
travessia: <% tp.system.prompt("Tempo de travessia (ex.: meio dia)", "1 dia") %>
---

# Hexágono <% tp.file.title %>

<!-- Crie conforme os jogadores exploram, não todos de antemão. -->

## Descrição

<% tp.file.cursor(1) %>

## Locais

- 

## Encontros possíveis

| Chance | Encontro | Observação |
| ------ | -------- | ---------- |
|        |          |            |

## Segredos

- 

## Perigo fixo

<!-- O perigo deste hexágono é o mesmo desde a sessão 1, independente do nível do grupo. -->
