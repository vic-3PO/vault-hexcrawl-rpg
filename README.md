# Vault de RPG Hexcrawl

Um **template aberto para campanhas de RPG hexcrawl**: um vault de Obsidian livre e reutilizável para mestres que querem um mundo vivo, com passagem de tempo, prazos e consequências.

<!-- TODO: print do exemplo -->

## A ideia

**O mestre cria situações, não histórias.** Você prepara lugares, pessoas e problemas que existem por conta própria. O que acontece depois depende do que os jogadores escolhem fazer — e do que escolhem *não* fazer.

A engrenagem é o **relógio**:

- uma **ameaça** com **prazo** ("no Dia 7, ao pôr do sol, o ritual se completa");
- uma **linha do tempo** de eventos automáticos ("Dia 3: o navio parte", "Dia 4: os prisioneiros são executados");
- **cada evento ignorado piora o final**. O mundo avança sem pedir licença.

Como há mais conteúdo do que tempo, os jogadores nunca conseguem fazer tudo. A tensão vem de escolher o que priorizar.

Princípios completos em [`DOCUMENTAÇÃO/03 - Princípios da Campanha.md`](DOCUMENTAÇÃO/03%20-%20Princ%C3%ADpios%20da%20Campanha.md).

## Como começar

1. **Baixe** o repositório (*Code → Download ZIP*) ou clone-o.
2. **Abra a pasta como vault** no [Obsidian](https://obsidian.md) (*Abrir pasta como cofre*).
3. **Instale os plugins** da comunidade **Templater** e **Dataview** (*Configurações → Plugins da comunidade*) e ative-os. No Dataview, ative também *Enable JavaScript Queries*.
4. **Configure a pasta de templates**: em *Configurações → Templater → Template folder location*, informe `00 - BASE-ESTRUTURA/Templates`.
5. **Abra `01 - Exemplo/`**, comece por `00 - CAMPANHA/Visão Geral` e depois pelo relógio em `04 - AMEAÇAS/Relógios`. É a campanha curta "A Pedra da Bruma", pronta para ler e ver o vault funcionando.

Depois, o [Guia de Utilização](DOCUMENTAÇÃO/01%20-%20Guia%20de%20Utiliza%C3%A7%C3%A3o.md) explica cada pasta e o [Painel do Relógio](00%20-%20BASE-ESTRUTURA/00%20-%20CAMPANHA/Painel%20do%20Rel%C3%B3gio.md) mostra o estado da campanha com consultas do Dataview.

## Estrutura de pastas

```
00 - BASE-ESTRUTURA/        esqueleto reutilizável: copie e comece a sua campanha
  00 - CAMPANHA/              visão geral, relógio, regras, calendário e painel
  01 - MUNDO/                 mapa, regiões, hexágonos, locais, assentamentos, facções
  02 - MISSÕES/               principal, secundárias, eventos, concluídas
  03 - NPCs/                  importantes, locais, errantes
  04 - AMEAÇAS/               vilões, monstros, relógios, eventos mundiais
  05 - RECOMPENSAS/           itens, equipamentos, aliados, conhecimentos
  06 - SESSÕES/               uma nota por sessão jogada
  99 - ARQUIVO/               material de referência e arquivado
  Templates/                  templates do Templater (um por tipo de nota)
01 - Exemplo/               campanha completa "A Pedra da Bruma"
DOCUMENTAÇÃO/               guia, tutorial do Obsidian, princípios, filosofia, fluxo de criação
Ferramentas/                mapa interativo, relógios, teia de relações, linha do tempo e painel de sessão (HTML)
scripts/                    verificação de links (Python)
```

## Ordem recomendada de criação

1. **Conceito** — uma frase do que está em jogo (`Visão Geral`).
2. **Ameaça principal** — o que acontece se os jogadores não agirem.
3. **Relógio global** — o prazo e a linha do tempo (`Relógio da Campanha`).
4. **Mapa e regiões.**
5. **Hexágonos** — crie conforme os jogadores exploram, não todos de antemão.
6. **Locais, NPCs e facções.** Todo NPC tem objetivo próprio e age sem os jogadores.
7. **Eventos e missões** — toda missão tem objetivo, prazo e consequência se ignorada.
8. **Recompensas.** Aliados e segredos valem tanto quanto itens.

O passo a passo está em [Fluxo de Criação de uma Campanha](DOCUMENTAÇÃO/05%20-%20Fluxo%20de%20Cria%C3%A7%C3%A3o%20de%20uma%20Campanha.md).

## Ferramentas

Em [`Ferramentas/`](Ferramentas/README.md) há cinco ferramentas em HTML que abrem direto no navegador, sem instalar nada: um **mapa com marcadores móveis**, um **painel de relógios** que lê e atualiza as notas, uma **teia de relações**, uma **linha do tempo** da campanha e um **painel de sessão** com iniciativa, dados e resumo. Abra `Ferramentas/index.html`. O guia completo está em [`Ferramentas/README.md`](Ferramentas/README.md).

## Verificação de links

`scripts/check_links.py` confere todos os wikilinks do vault e termina com erro se houver links quebrados ou ambíguos. Uma GitHub Action o executa a cada push e pull request. Para rodar localmente:

```
python scripts/check_links.py
```

## Inspirações e créditos

- **The Blood of Dawnwalker** — tempo como mecânica de design: missões com prazo, conteúdo que expira, necessidade de priorizar.
- **Baldur's Gate 1 e 2** — mundo com conteúdo próprio, viagem com custo real, NPCs com agenda e facções com poder.
- **[NecroCorvo](https://www.youtube.com/@NecroCorvo)** — canal brasileiro de RPG cujos vídeos sobre prazos, mundo vivo e consequências influenciaram muito a estrutura. Os resumos em `DOCUMENTAÇÃO/` são interpretações nossas, com link para cada vídeo; o conteúdo original é de seus autores.
- [Obsidian](https://obsidian.md), além dos plugins [Templater](https://github.com/SilentVoid13/Templater) e [Dataview](https://github.com/blacksmithgu/obsidian-dataview) (estes dois são software open source), pertencentes a seus respectivos autores.

## Licença

O repositório usa duas licenças, detalhadas no arquivo [LICENSE](LICENSE):

- **Conteúdo** (notas, documentação, templates, imagens e a campanha de exemplo): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.pt_BR). Você pode usar, adaptar e redistribuir, inclusive em mesas e materiais próprios, desde que dê crédito e compartilhe as adaptações sob a mesma licença.
- **Código** em `scripts/` e `Ferramentas/` (o script e as ferramentas em HTML, CSS e JavaScript): licença [MIT](https://opensource.org/license/mit), open source. As texturas opcionais de `Ferramentas/img/` não vêm no repositório e têm as licenças dos seus autores.

## Contribuindo

Sugestões e correções são bem-vindas por issue ou pull request. A verificação de links precisa passar.
