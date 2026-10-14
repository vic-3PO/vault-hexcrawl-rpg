# Guia de Utilização

Este Vault organiza campanhas de RPG no estilo **Hexcrawl**: um mundo com lugares, pessoas, problemas e consequências que existem independentemente dos jogadores.

**Plugins necessários:** Templater (templates) e Dataview (consultas automáticas). Instale os dois em *Configurações → Plugins da comunidade*; veja [Configurar o Templater](#configurar-o-templater) abaixo.

**Onde fica cada coisa:** o esqueleto reutilizável está em `00 - BASE-ESTRUTURA/` (as pastas numeradas abaixo ficam dentro dela, junto com `Templates/`). A campanha de exemplo está em `01 - Exemplo/`. Copie `00 - BASE-ESTRUTURA` para começar a sua.

---

## Como começar uma campanha

Siga esta ordem. Tutorial detalhado em [[05 - Fluxo de Criação de uma Campanha]].

1. **Conceito** — uma frase do que está em jogo → [[00 - BASE-ESTRUTURA/00 - CAMPANHA/Visão Geral|Visão Geral]]
2. **Ameaça principal** — o que acontece se os jogadores não agirem → `04 - AMEAÇAS/Vilões`
3. **Relógio global** — o prazo da ameaça + linha do tempo → `[[Relógio da Campanha]]`
4. **Mapa** — a região e seus hexágonos → `[[Mapa]]`
5. **Regiões** → `01 - MUNDO/Regiões`
6. **Hexágonos** → `01 - MUNDO/Hexágonos` *(crie conforme exploram, não todos de antemão)*
7. **Locais** → `01 - MUNDO/Locais`
8. **NPCs** → `03 - NPCs`
9. **Facções** → `01 - MUNDO/Facções`
10. **Eventos** → `02 - MISSÕES/Eventos`
11. **Missões** → `02 - MISSÕES/Principal` e `02 - MISSÕES/Secundárias`
12. **Recompensas** → `05 - RECOMPENSAS`
13. **Consequências** → escreva o que acontece quando cada missão é ignorada

> [!warning] Mestre
> Configure o relógio global antes de qualquer outra coisa. Ele define o ritmo de toda a campanha.

---

## O que vai em cada pasta

### `00 - CAMPANHA`
Informações que se aplicam à campanha inteira.

| Arquivo | Conteúdo |
|---|---|
| `Visão Geral` | Conceito, tom e premissa |
| `Relógio da Campanha` | Relógio global e linha do tempo |
| `Regras da Campanha` | Regras específicas desta campanha |
| `Calendário` | Calendário do mundo |

---

### `01 - MUNDO`
Tudo que existe no mundo, independente das missões.

- **Regiões** — caráter geral, clima, facções presentes, hexágonos que compõem, situação atual
- **Hexágonos** — terreno, tempo de travessia, locais, encontros possíveis, segredos
- **Locais** — descrição, habitantes, o que existe independente dos jogadores, segredos, como chegar
- **Assentamentos** — vilas e cidades com estrutura social (população, serviços, governo)
- **Facções** — objetivo, recursos, o que fazem sem os jogadores

---

### `02 - MISSÕES`
Objetivos que os jogadores podem (ou não) perseguir.

- **Principal** — missão central, ligada ao relógio global
- **Secundárias** — missões opcionais com prazo e consequência própria
- **Eventos** — fatos com data marcada que acontecem com ou sem os jogadores
- **Concluídas** — missões encerradas *(mova para cá, não delete)*

> Toda missão precisa de: objetivo claro + prazo + consequência se ignorada.

---

### `03 - NPCs`
Pessoas que habitam o mundo e agem por conta própria.

- **Importantes** — antagonistas, aliados-chave, líderes de facção
- **Locais** — habitantes fixos de um lugar (taverneiro, ferreiro, guarda)
- **Errantes** — personagens que se movem (mercadores, mensageiros, fugitivos)

Todo NPC precisa de: nome, objetivo próprio, localização atual, o que faz quando os jogadores não estão.

---

### `04 - AMEAÇAS`
Tudo que pressiona o mundo ou os jogadores.

- **Vilões** — antagonistas com plano e cronograma
- **Monstros** — criaturas com território e comportamento definidos
- **Relógios** — um relógio por ameaça ativa *(ligue à missão ou ameaça correspondente)*
- **Eventos Mundiais** — desastres, invasões, epidemias

---

### `05 - RECOMPENSAS`
O que os jogadores podem ganhar além de XP.

- **Itens** — únicos, com história
- **Equipamentos** — armas e ferramentas relevantes
- **Aliados** — NPCs que passam a ajudar *(sempre ligue ao arquivo do NPC em `03 - NPCs`)*
- **Conhecimentos** — mapas, segredos, localização de lugares ocultos

> [!tip] Recompensas não precisam ser objetos
> Aliado poderoso, segredo revelado ou acesso a área antes proibida valem tanto quanto item mágico.

---

### `06 - SESSÕES`
Um arquivo por sessão: data real, dia da campanha, o que aconteceu, decisões dos jogadores, avanço dos relógios.

---

### `99 - ARQUIVO`
Material de referência e arquivos auxiliares.

---

### `Templates`
Um template do Templater para cada tipo de nota: Relógio, Evento, Missão, NPC, Local, Hexágono, Facção, Vilão e Monstro. Cada um já traz o frontmatter (`tipo`, `prazo`, `estado`…) que o [[Painel do Relógio]] lê.

---

## Configurar o Templater

1. Abra *Configurações → Plugins da comunidade*, instale e ative o **Templater** e o **Dataview**.
2. Em *Configurações → Templater*, no campo **Template folder location**, informe `00 - BASE-ESTRUTURA/Templates`. Se você mover a pasta `Templates`, ajuste esse caminho.
3. Para criar uma nota: crie um arquivo vazio na pasta certa, abra a paleta de comandos (`Ctrl/Cmd + P`) e use **Templater: Open Insert Template modal** (ou **Insert Template**), então escolha o template. Ele pergunta os campos (prazo, local, facção…) e preenche o frontmatter.
4. Opcional: em *Templater*, ative **Trigger Templater on new file creation** e defina **Folder Templates** para associar cada pasta a um template (por exemplo `03 - NPCs` → `NPC`).
5. No Dataview, ative **Enable JavaScript Queries** (*Configurações → Dataview*) para que as consultas "atrasados e ainda pendentes" do painel funcionem.

> [!tip] Convenção dos campos
> `prazo` é texto livre para leitura ("Dia 7, pôr do sol"). `dia_prazo` e `dia` são números, usados para ordenar e comparar com `dia_atual`, o dia em que a campanha está.

---

## Painel do Relógio

[[Painel do Relógio]] reúne consultas do Dataview: eventos por dia, atrasados e pendentes, missões por estado e NPCs por facção. Ele aponta para `01 - Exemplo`. Para a sua campanha, troque o caminho nas consultas.
