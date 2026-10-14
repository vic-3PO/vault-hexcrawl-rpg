# Tutorial do Obsidian para RPG

Cobre apenas o que é útil para criar e administrar uma campanha neste Vault.

---

## Títulos

```markdown
# Título principal   → nome do arquivo (uma vez só)
## Seção             → Descrição, NPCs, Segredos, Missões
### Subseção         → uma área dentro de um local
#### Detalhe         → detalhes dentro de subseções
```

---

## Negrito e itálico

```markdown
**importante** → negrito
*observação*   → itálico
```

- `**negrito**` — nomes de NPCs, locais, palavras-chave que o mestre precisa ver rápido
- `*itálico*` — atmosfera, falas de NPCs, informações ambíguas

---

## Listas

```markdown
- item sem ordem
  - subitem (dois espaços)

1. primeiro passo
2. segundo passo
```

Use listas simples para inventário, habitantes, rumores. Use numeradas para sequências de eventos.

---

## Links entre arquivos

```markdown
[[Nome do Arquivo]]
```

Cria um link clicável para outro arquivo do Vault.

```markdown
[[Aldric, Comerciante|Aldric]]   → exibe "Aldric" mas linka o arquivo completo
```

Links são essenciais: uma missão está ligada a um local, que está ligado a um NPC, que pertence a uma facção. Um clique te leva de uma missão ao NPC envolvido no meio de uma sessão.

---

## Tabelas

```markdown
| Coluna 1 | Coluna 2 |
|---|---|
| dado A   | dado B   |
```

Use para: linha do tempo (Dia | Evento), missões (Missão | Prazo | Consequência), NPCs de um local (Nome | Função | Atitude).

---

## Callouts

São blocos visuais com ícone e cor. Os mais usados neste Vault:

```markdown
> [!tipo] Título opcional
> Conteúdo do callout.
```

| Callout | Cor | Quando usar |
|---|---|---|
| `[!danger]` | Vermelho | Relógios, prazos, consequências graves |
| `[!warning]` | Amarelo | Segredos do mestre, informações a não revelar |
| `[!info]` | Azul | O que os jogadores podem saber |
| `[!tip]` | Verde | Sugestões de condução, ganchos alternativos |
| `[!question]` | Roxo | Coisas ainda indefinidas |
| `[!success]` | Verde escuro | Missões concluídas, objetivos alcançados |
| `[!note]` | Cinza | Anotações de desenvolvimento |

**Exemplos práticos:**

```markdown
> [!danger] Relógio ativo
> **Dia 14:** Se o ritual não for interrompido, os aldeões são sacrificados.

> [!warning] Mestre
> Aldric está mentindo. Ele é informante do culto. Não revele antes do Dia 10.

> [!info] O que os jogadores podem saber
> A estrada está abandonada há um mês. Um mercador desapareceu aqui semana passada.

> [!tip] Sugestão
> Se os jogadores ficarem presos, um mercador errante pode trazer informações.

> [!question] Decidir
> Qual é a motivação real de Maren? Por que ela ajuda sem pedir nada em troca?

> [!success] Concluído — Dia 7
> Os jogadores libertaram os prisioneiros. A facção dos Corvos virou aliada.
```

---

## Modelos rápidos de escrita

### Descrição de local (lida em voz alta)
```markdown
A estrada desaparece entre árvores retorcidas.
O silêncio é interrompido apenas pelo som de água sob as pedras.
Não há pegadas recentes.
```
Escreva no presente. Seja direto. Deixe espaço para os jogadores reagirem.

### NPC — Forma curta
```markdown
**Maren** — ferreiro da vila de Pedra Seca. Desconfiada, mas honesta. Quer recuperar o filho desaparecido.
```

### NPC — Forma detalhada
```markdown
## Maren, Ferreiro de Pedra Seca

**Localização:** [[Pedra Seca - Vila]]
**Objetivo:** encontrar o filho, desaparecido em [[Ruínas do Forte Cinza]]
**Atitude inicial:** desconfiada

### Aparência
Mulher de uns 50 anos, mãos grossas, expressão fechada.

### O que ela sabe
- O forte estava abandonado até... algo mudar.
- Ouviu sons estranhos vindo do forte nas últimas semanas.

> [!warning] Mestre
> O filho está vivo e foi recrutado voluntariamente. Revelar isso antes do Dia 15 corta um arco importante.

### Recompensa que pode oferecer
- [[Espada Antiga do Forte]]
- Passagens secretas nas ruínas (ela as conhece)
```

### Missão
```markdown
## Missão: O Filho Desaparecido

**Tipo:** Secundária
**Dada por:** [[Maren, Ferreiro]]
**Local:** [[Ruínas do Forte Cinza]]
**Prazo:** Dia 14

> [!danger] Consequência se ignorada
> No Dia 14, o filho completa a iniciação. Maren fecha a forja. Jogadores perdem equipamentos e a informação sobre as passagens.

### Objetivo
Encontrar e trazer Torin, filho de Maren, desaparecido nas ruínas há duas semanas.

### Recompensas
- [[Espada Antiga do Forte]]
- Passagens secretas (informação como recompensa)
- [[Maren]] como aliada

### Complicações
- Torin foi voluntariamente — forçar a saída pode alienar o aliado potencial.
- O culto usa as ruínas como base secundária.
```

---

## Plugins instalados

### Templater
Cria arquivos a partir de templates. Configure templates na pasta `00 - BASE-ESTRUTURA/Templates/` (já traz um template por tipo de nota) com a estrutura padrão de cada tipo (NPC, missão, hexágono). O Templater aplica automaticamente ao criar um novo arquivo.

### Dataview
Faz consultas automáticas no Vault usando frontmatter (metadados no início dos arquivos).

```markdown
---
tipo: missao
status: ativa
prazo: 14
regiao: Norte
---
```

Com isso, uma consulta lista automaticamente todas as missões ativas:

~~~markdown
```dataview
TABLE prazo, regiao FROM "02 - MISSÕES"
WHERE status = "ativa"
SORT prazo ASC
```
~~~

> [!tip] Frontmatter é opcional
> Use o Vault inteiramente sem frontmatter. Adicione só se quiser consultas automáticas com Dataview.
