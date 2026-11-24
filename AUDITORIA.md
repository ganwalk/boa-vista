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
- **Logo:** não recebi o vetor. O site monta a assinatura em HTML (`src/components/Lockup.tsx`). Quando o SVG oficial existir, ele substitui esse componente.
- **"Cream default"** (no-red-flags): o papel calcário + serifa poderia cair nesse padrão. O que separa é que a paleta vem da marca (482 C, verde e 871 C), não há manchete em itálico nem acento terracota, e o verde é a única superfície escura.

## 2. Direção do site

1. **Cor:** papel calcário (482 C clareado) domina; o verde da marca é a única superfície escura; o dourado aparece só em filetes, losangos e na luz das arcadas.
2. **Tipo:** Didone para nomes e títulos; Montserrat Medium/Regular para texto e interface, como o manual define.
3. **Estrutura:** muito respiro, filetes finos no lugar de caixas, imagens sem moldura e sem canto arredondado.

Elementos da marca usados de forma pontual: a assinatura com filete e losangos (hero e rodapé) e o arco, que se repete na fachada e nas pranchas.

## 3. O que é interativo e por quê

| Elemento | Responde a | Observação |
|---|---|---|
| Fachada que se desenha ao abrir | Carregamento | Único momento coreografado do site (regra "one orchestrated moment") |
| Arcada acende ao passar o mouse e leva à loja | Hover / foco / clique | Cada arcada é um link real, com foco visível pelo teclado |
| "Acender as luzes" | Clique | Depois das 18h em Goiânia a fachada já abre acesa |
| Vitrines que andam para o lado | Rolagem | No celular e com `prefers-reduced-motion` vira rolagem horizontal comum |
| Imagem que segue o cursor no índice | Mouse | Desligada em telas de toque |
| Capa que "voa" da vitrine para a página da loja | Navegação | View Transitions; desligada com `prefers-reduced-motion` |
| Vídeos | Entrar na tela | Mudos, em loop, pausam fora da tela; ficam no pôster com `prefers-reduced-motion` |

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

- **As seis lojas no ar são fictícias** (Forno Cerrado, Casa Pequi, Ateliê Lume, Adega Serra Dourada, Botica Ipê, Flor de Baru), assim como seus textos e horários. Servem para mostrar o site com conteúdo. Pelo critério "Be honest" do no-red-flags, não podem ir para produção: troque pelos locatários reais em `src/content/lojas.ts`.
- As fotos são do Unsplash, com licença livre para uso comercial. As fontes estão em `public/lojas/FONTES.md`. Ficaram de fora fotos com marca visível (Gucci, Lush, Diptyque e uma padaria com o nome na vitrine).
- Loja sem `capa` cadastrada continua aparecendo com a prancha da marca no lugar da foto.
- Endereço, data de abertura e contatos (`src/content/site.ts`). Campos vazios não aparecem.
- Elevação oficial da fachada da Nuanza. O desenho atual é um estudo com arcadas (`src/components/Facade.tsx`) e precisa ser conferido com o projeto.
- Código Pantone do verde, arquivo vetorial do logo e licença da Cabrito Didone.
