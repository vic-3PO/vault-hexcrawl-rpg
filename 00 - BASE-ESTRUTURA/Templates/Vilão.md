---
tipo: vilão
facção: <% tp.system.prompt("Facção (ou 'nenhuma')", "nenhuma") %>
local: "[[<% tp.system.prompt("Local atual (nome da nota)") %>]]"
estado: ativo
---

# <% tp.file.title %>

**Plano:** <% tp.file.cursor(1) %>

**Prazo do plano:** <!-- Link para o [[Relógio]] correspondente. -->

---

## Motivação

<!-- Por que ele faz isso. Vilão sem motivo é só obstáculo. -->

## Cronograma

| Dia | O que ele faz |
| --- | ------------- |
|     |               |

## Fraquezas

- 

## Cena final

<!-- O que muda dependendo das escolhas anteriores dos jogadores. -->
