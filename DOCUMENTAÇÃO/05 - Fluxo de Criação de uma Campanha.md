# Fluxo de Criação de uma Campanha

Siga como uma receita. Cada etapa indica o que criar, onde e o que é obrigatório.

---

```
CONCEITO → AMEAÇA → RELÓGIO → MAPA → REGIÕES → HEXÁGONOS
→ LOCAIS → NPCs → FACÇÕES → EVENTOS → MISSÕES → RECOMPENSAS
```

---

## Etapa 1 — Conceito
**Onde:** `00 - CAMPANHA/Visão Geral`

- Uma frase que define o que está em jogo
- Tom da campanha (sombrio, épico, político, sobrevivência...)
- O que os jogadores são nesse mundo
- Nível de tecnologia e magia

**Obrigatório antes de seguir:** O que acontece se os jogadores não fizerem nada? Qual é o prazo até a catástrofe?

---

## Etapa 2 — Ameaça principal
**Onde:** `04 - AMEAÇAS/Vilões`

- Quem ou o que é a ameaça e o que ela planeja
- O cronograma: em que datas o plano avança
- Os recursos da ameaça e seus pontos fracos

**Obrigatório:** prazo final (Dia X) e marcos intermediários.

---

## Etapa 3 — Relógio global
**Onde:** `00 - CAMPANHA/Relógio da Campanha`

- Dia atual (normalmente Dia 1)
- Prazo da ameaça principal
- Linha do tempo com eventos que acontecem independente dos jogadores

**Exemplo:**

| Dia | Evento |
|---|---|
| 1 | Início da campanha |
| 5 | Primeira vítima — boatos se espalham |
| 10 | Segunda fase do ritual ativa |
| 18 | Reforços chegam para a ameaça |
| 30 | Ritual completo |

> [!warning] Mestre
> O relógio global é a primeira coisa a ser concluída. Tudo se organiza em relação a ele.

---

## Etapa 4 — Mapa
**Onde:** `01 - MUNDO/Mapa`

- Descrição geral da região (ou imagem anexada)
- Quantas regiões existem e os caminhos entre elas
- Escala: quanto tempo leva viajar entre regiões

---

## Etapa 5 — Regiões
**Onde:** `01 - MUNDO/Regiões` — um arquivo por região

- Caráter geral, clima e terreno
- Facções presentes
- Hexágonos que compõem a região (com links)
- Situação atual e como a ameaça principal afeta a região

---

## Etapa 6 — Hexágonos
**Onde:** `01 - MUNDO/Hexágonos` — um arquivo por hexágono

> [!tip] Não crie todos de uma vez
> Crie só os que os jogadores provavelmente visitarão nas primeiras sessões. Crie os demais conforme exploram.

- Tipo de terreno e tempo de travessia
- Locais presentes (com links)
- Encontros possíveis (lista simples ou tabela 1d6)
- Segredos (o que existe ali que não é óbvio)

---

## Etapa 7 — Locais
**Onde:** `01 - MUNDO/Locais` ou `01 - MUNDO/Assentamentos`

- Descrição física (o que os jogadores veem ao chegar)
- Habitantes (com links para NPCs)
- O que existe ali independente dos jogadores
- Segredos e recursos disponíveis
- Como chegar (hexágono + tempo de viagem)

---

## Etapa 8 — NPCs
**Onde:** `03 - NPCs` — na subpasta adequada

Todo NPC precisa de:
- Nome e descrição rápida (uma linha)
- Objetivo próprio
- Localização atual
- O que faz quando os jogadores não estão presentes
- Atitude inicial e o que sabe (ou não revela)

**Obrigatório:** o que esse NPC faz no Dia 10, 20, 30 com ou sem contato com os jogadores?

---

## Etapa 9 — Facções
**Onde:** `01 - MUNDO/Facções` — um arquivo por facção

- Objetivo central e recursos
- Aliados e inimigos
- O que fazem no Dia 1, 10, 20, 30 sem os jogadores
- Como se relacionam com a ameaça principal
- O que os jogadores podem oferecer (e vice-versa)

---

## Etapa 10 — Eventos
**Onde:** `02 - MISSÕES/Eventos`

Um evento é algo que acontece em uma data específica independente dos jogadores. Não é missão — é fato do mundo.

- Data (Dia X), o que acontece, quem está envolvido, onde
- Consequências para o mundo
- Como os jogadores podem interferir (se puderem)

---

## Etapa 11 — Missões
**Onde:** `02 - MISSÕES/Principal` e `02 - MISSÕES/Secundárias`

Estrutura de toda missão:

```markdown
## Missão: [Nome]

**Tipo:** Principal / Secundária
**Dada por:** [[NPC]]
**Local:** [[Local]]
**Começa:** Dia X
**Prazo:** Dia Y

> [!danger] Consequência se ignorada
> O que acontece no Dia Y.

### Objetivo
Uma frase clara do que precisa ser feito.

### Recompensas possíveis
- [[Item ou Aliado]]

### Complicações
- O que pode tornar a missão mais difícil ou interessante.
```

**Obrigatório:** consequência se ignorada + mais de uma solução possível.

---

## Etapa 12 — Recompensas
**Onde:** `05 - RECOMPENSAS`

Crie as recompensas antes de começar a campanha — assim elas podem ser linkadas às missões.

| Tipo | Pasta |
|---|---|
| Objetos únicos | `Itens` |
| Armas e armaduras | `Equipamentos` |
| NPCs que passam a ajudar | `Aliados` |
| Informações e mapas | `Conhecimentos` |

---

## Checklist antes de começar

> [!question] Verificação
> Se a resposta for "não", volte e complete antes de jogar.

- [ ] Ameaça principal definida com prazo?
- [ ] Relógio global com pelo menos 5 eventos marcados?
- [ ] Pelo menos 3 regiões com caráter definido?
- [ ] Pelo menos 6 hexágonos com conteúdo?
- [ ] Pelo menos 3 locais com descrição e habitantes?
- [ ] Pelo menos 5 NPCs com objetivo próprio?
- [ ] Pelo menos 2 facções com agenda própria?
- [ ] Missão principal com prazo e consequência?
- [ ] Pelo menos 3 missões secundárias com prazo e consequência?
- [ ] Recompensas das missões criadas?
- [ ] Primeira sessão com pelo menos 3 situações possíveis preparadas?

> [!success] Pronto para começar
> Se todos os itens estão marcados, a campanha tem estrutura suficiente. O restante pode ser criado conforme a exploração avança.
