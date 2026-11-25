# Auditoria: no-red-flags e no-ai-slop

Referências: [ProdutosAUVP/no-red-flags](https://github.com/ProdutosAUVP/no-red-flags) (interface) e [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) (texto).
As imagens geradas por IA do manual foram ignoradas, como pedido. Do manual entraram só o nome, as cores, as fontes e o texto institucional. Da placa de obra entrou a ficha técnica.

## 1. Material de entrada (manual da Dueto e placa)

### Texto institucional (no-ai-slop, modo detectar)

| Trecho do manual | Padrão | Correção |
|---|---|---|
| "nasce com a proposta de ser mais do que um espaço de compras e serviços: um novo ponto de encontro" | Contraste binário + revelação com dois-pontos | Dizer o que é: "galeria de lojas, serviços e gastronomia" |
| "arquitetura clássica e imponente, que traduz elegância e sofisticação" | Exagero de importância; adjetivos que cabem em qualquer prédio | "O projeto da Nuanza segue a linha clássica" |
| "proporcionar experiências agradáveis, valorizar o tempo compartilhado" | Abstração; falha no teste de portabilidade | Ações concretas: "resolva o dia, almoce e encontre os vizinhos" |
| "conveniência, bem-estar e boas experiências se encontram em uma atmosfera acolhedora e exclusiva" | Lista abstrata, coisas inanimadas fazendo verbos humanos | Cortado |
| Texto da Cabrito: "Ela não apenas escreve, ela abraça o olhar" | Contraste binário, frase de efeito | Não usado no site |

### Marca

- **Paleta:** a amostra verde está rotulada "Pantone BLACK C", igual à preta. Precisa do código Pantone correto. No site usei o verde da placa (`#1C3B34`).
- **Dourado 871 C** é metálico e não tem hex fiel na tela. Usei `#C29B62` (o da placa) sobre o verde, e `#85653A` para filetes sobre o papel, porque o dourado claro some sobre o fundo claro.
- **Tipografia:** a Cabrito Didone é paga. O site usa a Bodoni Moda (OFL, também Didone) até a licença chegar. A troca fica em `src/app/layout.tsx`. Vale confirmar se o logotipo foi mesmo desenhado com a Cabrito: os acentos e as serifas do logo nas pranchas não parecem iguais à amostra da página 11.
- **Logo:** vetorizado a partir da placa de obra, onde está escrito em Cabrito Didone NorMed. O texto foi convertido em contornos (`src/components/Logo.tsx`), então o logo usa a fonte real da marca sem precisar servi-la como fonte. Isso também confirma que o logo é Cabrito Didone.
- **Contraste da Bodoni Moda:** em tamanhos grandes, o eixo de tamanho óptico da fonte variável afinava demais as hastes. O tamanho óptico ficou travado em 11, com peso 500, para chegar perto do contraste da Cabrito. A Cabrito embutida nos PDFs não foi usada como fonte web porque é um subconjunto de uma fonte paga.
- **"Cream default"** (no-red-flags): o papel calcário + serifa poderia cair nesse padrão. O que separa é que a paleta vem da marca (482 C, verde e 871 C), não há manchete em itálico nem acento terracota, e o verde é a única superfície escura.

## 2. Direção do site

1. **Cor:** papel calcário (482 C clareado) domina; o verde da marca é a única superfície escura; o dourado aparece só em filetes, losangos e na luz das arcadas.
2. **Tipo:** Didone para nomes e títulos; Montserrat Medium/Regular para texto e interface, como o manual define.
3. **Estrutura:** muito respiro, filetes finos no lugar de caixas, imagens sem moldura e sem canto arredondado.

Elementos da marca usados de forma pontual: a assinatura com filete e losangos (hero e rodapé) e o arco, que se repete na fachada e nas pranchas.

## 3. O que é interativo e por quê

| Elemento | Responde a | Observação |
|---|---|---|
| Fachada que se desenha ao abrir | Carregamento | Único momento coreografado do site |
| Lojas em revezamento na fachada | Tempo (desktop e celular) | Uma loja a cada 3,4 s: a foto acende na arcada e o nome aparece ao lado. Pausa com o mouse numa arcada, com a aba escondida ou com a hero fora da tela; parado com `prefers-reduced-motion` |
| Foto da loja dentro da arcada | Hover / foco (desktop) | A arcada vira uma janela para a loja; clique leva à página dela |
| Porta central | Hover / clique | As folhas se abrem e mostram o interior iluminado; o clique desliza a página até a lista de lojas |
| Vitrines que andam para o lado | Rolagem (desktop) | No celular é arrastar com o dedo; com `prefers-reduced-motion`, rolagem horizontal comum |
| Foto de fundo no índice de lojas | Hover (desktop) / rolagem (celular) | O texto muda para creme sobre um véu escuro. No celular é a única interação ligada à rolagem |
| Capa que "voa" da vitrine para a página da loja | Navegação | View Transitions; desligada com `prefers-reduced-motion` |
| Vídeos | Entrar na tela | Mudos, em loop, pausam fora da tela; ficam no pôster com `prefers-reduced-motion` |

Removido: o botão "Acender/apagar as luzes" e o modo noturno da fachada.
Textos corridos usam `text-wrap: pretty` e títulos e nomes usam `balance`, para evitar palavra sozinha na última linha.

Nenhum elemento entra com fade-and-slide ao rolar, nada usa bounce/spring, não há `transition: all`.

## 4. Checklist no-red-flags (eval.md)

**Direção e princípios**
- Direção em três linhas, tirada da marca: passa.
- Um elemento dominante por tela: hero = fachada; vitrines = imagens; índice = nomes; O Pátio = frase. Passa.
- Cards só onde há unidade clicável (vitrines): passa. Não há card em volta de texto.
- Números, logos, selos: nenhum inventado. A ficha técnica é transcrita da placa. Passa.
- Teste de portabilidade: a fachada com uma arcada por loja e a ficha técnica só servem para este projeto. Passa.
- Contraste (calculado): texto `#17241F` sobre papel 13,5:1; texto secundário 6,4:1; creme sobre verde 9,7:1; dourado sobre verde 4,7:1; filete `#85653A` sobre papel 4,5:1. Foco visível, alvos de 44 px, `prefers-reduced-motion` respeitado. Passa.

**Cor:** sem roxo, sem gradiente em texto, sem blobs, sem glow em interface, preto tingido para o verde. O único gradiente é a luz dentro das arcadas, que é desenho, não UI. Passa.

**Tipografia:** sem Inter/Playfair/Fraunces etc. Nenhum eyebrow em caixa alta; categorias em caixa normal. Sem itálico, sem palavra destacada, sem `·`, sem `01 / 02`, sem `→` colado em botão. Escala com salto de mais de 5x entre corpo e título. Passa.

**Layout:** sem faixa colorida lateral, raio zero em imagens e 2 px no único botão, seções com larguras e ritmos diferentes (fachada centralizada, trilho horizontal, lista em largura total, bloco verde em grade de 12, ficha em duas colunas). Passa.

**Componentes:** sem ícones, sem pílula no H1, sem tags coloridas, sem ponto pulsando, sem prova social, sem glassmorphism, sem carrossel automático, sem modal. A 404 diz o que pode ter acontecido e leva às lojas. Passa.

**Texto da interface:** botões dizem o que fazem ("Acender as luzes", "Todas as lojas", "Próxima loja"). Sem "Saiba mais", "Eleve", "Descubra". Passa.

**Instant tells presentes:** nenhum.

## 5. Pendências (não inventei estes dados)

- **As seis lojas no ar são fictícias** (Forno Cerrado, Casa Pequi, Ateliê Lume, Adega Serra Dourada, Botica Ipê, Flor de Baru), assim como seus textos, horários, telefones e perfis de Instagram. O e-mail, o WhatsApp e o Instagram do Pátio, em `src/content/site.ts`, também são fictícios. Servem para mostrar o site com conteúdo. Pelo critério "Be honest" do no-red-flags, não podem ir para produção: troque pelos locatários reais em `src/content/lojas.ts`.
- As fotos são do Unsplash, com licença livre para uso comercial. As fontes estão em `public/lojas/FONTES.md`. Ficaram de fora fotos com marca visível (Gucci, Lush, Diptyque e uma padaria com o nome na vitrine).
- Loja sem `capa` cadastrada continua aparecendo com a prancha da marca no lugar da foto.
- Endereço, data de abertura e contatos (`src/content/site.ts`). Campos vazios não aparecem.
- Elevação oficial da fachada da Nuanza. O desenho atual é um estudo com arcadas (`src/components/Facade.tsx`) e precisa ser conferido com o projeto.
- Código Pantone do verde, arquivo vetorial do logo e licença da Cabrito Didone.

## 6. Projeto arquitetônico: plantas em desenho animado

- As perspectivas da apresentação da ARL foram descartadas (aparência de imagem gerada, com pessoas, carros e vegetação genéricos). A hero voltou ao desenho de linha interativo.
- A seção "O projeto" usa as plantas técnicas da apresentação (Subsolo 2, Subsolo 1, Térreo, 1º pavimento) como elemento gráfico. Elas foram vetorizadas pelo eixo das linhas, a partir das imagens do PDF, e se desenham em traço ao entrar na tela e a cada troca de pavimento.
- Fidelidade ao projeto: o alinhamento entre pavimentos usa só escala uniforme e deslocamento (rotação medida abaixo de 0,06°), então não há deformação. A simplificação do traço fica a no máximo 0,5 px do original. Conferência por sobreposição com o original: 95 a 98% das linhas originais cobertas, e 97 a 100% dos traços sobre linhas originais. A diferença restante é a borda da rua, que nas pranchas originais varia 2 a 3 px de um pavimento para outro. Textos e cotas da prancha não foram reproduzidos.
- Lote, vagas e rua são iguais nos quatro pavimentos e aparecem em traço claro; o prédio de cada pavimento, em traço escuro.
- Scripts de vetorização e conferência ficaram fora do repositório; o resultado está em `src/content/plantas.ts`.
- Divergência a confirmar: a placa de obra escreve "Andréa Rocha Lima"; a apresentação, "Andréia Rocha Lima".

### Planta interativa

- Cada espaço responde ao hover (desktop), ao toque (celular) e ao Tab (teclado), com nome e descrição ao lado do seletor.
- **Auditoria de posicionamento** (contornos projetados de volta sobre a imagem original do PDF): todos os espaços têm de 97 a 100% do contorno sobre paredes da prancha.
- Correções feitas na auditoria:
  - **Escadas:** nos quatro pavimentos, o contorno agora é só a caixa da escada, recortada pelas paredes azuis da prancha. Antes engolia ambientes vizinhos.
  - **Depósitos:** no Subsolo 1 e no 1º pavimento há um "DEPÓSITO" sob a escada e outro ao lado dos elevadores, escritos na prancha. Antes estavam somados à escada e aos elevadores; agora são espaços próprios.
  - **Subsolo 2:** "D.M.L." e "Depósito" adicionados como na prancha. A escada inclui o lance tracejado, que é a projeção do lance que desce.
  - **Elevadores:** espaço próprio nos quatro pavimentos. No Térreo, "Hall" e "Escada" agora são separados.
  - **Banheiros do Subsolo 1:** cobrem as cabines; antes cobriam só a antecâmara. Os banheiros na diagonal do 1º pavimento foram adicionados.
  - **Escada externa:** deixou de ser interativa. Na prancha do Subsolo 2 ela fica fora da linha azul do prédio, e a escada dentro dela é tracejada (projeção de outro nível). Estacionamento e jardim continuam interativos, como terreno desenhado igual em todas as pranchas.
  - **Linhas tracejadas em X** (corredor do Térreo, vazio do 1º pavimento): o destaque era picotado por elas. Esses ambientes agora são preenchidos considerando só as paredes contínuas.
  - **1º pavimento:** a sala fechada no meio do pavimento, com banheiro próprio, virou um ambiente separado ("Sala"); o restante é o "Salão".
- **Os nomes, fora os escritos na prancha (D.M.L., Depósito), são uma leitura dos símbolos do desenho.** A lista está em `src/content/espacos.ts` e deve ser confirmada pela ARL.

#### Auditoria dos demais pavimentos (Subsolo 2, Subsolo 1, 1º pavimento)

- Subsolo 2: o hall em volta da escada e dos elevadores ganhou rótulo ("Hall"), e o "Portão da garagem" entrou como escrito na prancha.
- Subsolo 1: a antecâmara dos banheiros passou a fazer parte de "Banheiros".
- 1º pavimento: a "Sala" inclui o banheiro dela; os dois blocos de banheiros não têm mais cabines sem pintura.
- Todos: sobreposições entre espaços vizinhos foram resolvidas a favor do menor (portas e cabines não ficam cobertas pelo corredor).
- Os banheiros privativos de cada sala comercial (Térreo e Subsolo 1) fazem parte da área da sala e acendem junto com ela. O hall do Térreo tem um furo no lugar da escada, para não acenderem juntos.
- Ficam sem rótulo as faixas de parede entre as vagas e a contenção, no Subsolo 2.
