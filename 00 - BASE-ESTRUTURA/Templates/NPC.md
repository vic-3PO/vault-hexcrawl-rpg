---
tipo: npc
papel: <% tp.system.prompt("Papel (ex.: aliado, comerciante errante)") %>
facção: <% tp.system.prompt("Facção (ou 'nenhuma')", "nenhuma") %>
local: "[[<% tp.system.prompt("Local atual (nome da nota)") %>]]"
---

# <% tp.file.title %>

**Papel:** <% tp.file.cursor(1) %>

**Aparência:** 

**Objetivo próprio:** <!-- O que ele quer, independente dos jogadores. -->

---

## O que ele sabe

- 

## O que ele não sabe

- 

---

## O que faz quando os jogadores não estão

<!-- Rotina e movimentos no tempo: onde está em cada dia relevante. -->

## Como reage

| Situação | Reação |
| -------- | ------ |
|          |        |

## Frase de abertura

> _""_
