<%*
const diaPrazo = await tp.system.prompt("Dia do prazo final (só o número)", "7");
-%>
---
tipo: relógio
prazo: Dia <% diaPrazo %>
dia_prazo: <% diaPrazo %>
dia_atual: 1
estado: ativo
---

# Relógio — <% tp.file.title %>

**Dia atual:** 1
**Prazo:** Dia <% diaPrazo %>
**Dias restantes:** <% Number(diaPrazo) - 1 %>

> [!danger] O que acontece no prazo final
> <!-- Descreva a consequência definitiva se ninguém intervir. Seja concreto: quem sofre, o que se perde. -->
> <% tp.file.cursor(1) %>

---

## Linha do tempo

<!-- Eventos automáticos. Eles acontecem com ou sem os jogadores, sem aviso dramático. Link cada evento para a nota em 02 - MISSÕES/Eventos. -->

| Dia | Evento automático |
| --- | ----------------- |
| 1   | Início            |
|     |                   |

---

## Consequências acumuladas

<!-- Para cada evento ignorado, como o final fica mais difícil. -->

- **Evento ignorado (Dia X):** efeito concreto na cena final.

---

## Ligações

- Ameaça / vilão: 
- Missão principal: 
