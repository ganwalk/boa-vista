// Cadastro das lojas. A ordem aqui é a ordem das arcadas na fachada da home (a arcada do meio é a entrada).
//
// Uma loja sem `capa` aparece com a prancha da marca (arco + número) no lugar da foto.
//
// Para cadastrar uma loja de verdade:
// 1. Coloque as fotos/vídeos em /public/lojas/<slug>/
// 2. Troque nome, categoria, descrição e preencha `capa` e `galeria`.
//
// Exemplo completo:
// {
//   slug: "casa-exemplo",
//   nome: "Casa Exemplo",
//   categoria: "Café e padaria",
//   local: "Térreo, ao lado da entrada",
//   descricao: "Pão de fermentação natural assado às 6h, café de Cavalcante...",
//   horario: "Seg a sáb, 7h às 20h",
//   instagram: "casaexemplo",
//   capa: { tipo: "video", src: "/lojas/casa-exemplo/capa.mp4", poster: "/lojas/casa-exemplo/capa.jpg", alt: "Balcão de pães pela manhã" },
//   galeria: [
//     { tipo: "imagem", src: "/lojas/casa-exemplo/01.jpg", alt: "Vitrine de doces", largura: 1600, altura: 2000 },
//   ],
// },

export type Midia =
  | {
      tipo: "imagem";
      src: string;
      alt: string;
      largura: number;
      altura: number;
    }
  | {
      tipo: "video";
      src: string;
      poster: string;
      alt: string;
    };

export type Loja = {
  slug: string;
  nome: string;
  categoria: string;
  local?: string;
  descricao?: string;
  horario?: string;
  instagram?: string;
  telefone?: string;
  capa?: Midia;
  galeria?: Midia[];
  // true enquanto o espaço não tem locatário.
  disponivel?: boolean;
};

// ATENÇÃO: as seis lojas abaixo são fictícias (nomes, textos, horários, telefones e perfis),
// criadas para ilustrar o site.
// As fotos são do Unsplash (licença livre; fontes em public/lojas/FONTES.md).
// Troque pelos locatários reais antes de publicar.

const img = (src: string, alt: string, largura: number, altura: number): Midia => ({
  tipo: "imagem",
  src,
  alt,
  largura,
  altura,
});

export const lojas: Loja[] = [
  {
    slug: "forno-cerrado",
    nome: "Forno Cerrado",
    categoria: "Padaria e café",
    local: "Térreo, junto à entrada",
    descricao:
      "Pão de fermentação natural feito com farinha moída em Goiás. A primeira fornada sai às 6h30 e o pão de queijo, às 7h. O café é coado na hora, com grãos do sul de Minas.",
    horario: "Todos os dias, 6h30 às 20h",
    instagram: "fornocerrado",
    telefone: "(62) 3241-1180",
    capa: img("/lojas/forno-cerrado/capa.jpg", "Pães de fermentação natural em prateleiras de metal", 1333, 2000),
    galeria: [
      img("/lojas/forno-cerrado/01.jpg", "Croissants e pães de chocolate na vitrine", 2000, 1333),
      img("/lojas/forno-cerrado/02.jpg", "Baguetes e pães rústicos em prateleiras escuras", 2000, 1331),
      img("/lojas/forno-cerrado/03.jpg", "Balcão iluminado com pães, padeiro ao fundo", 2000, 1333),
    ],
  },
  {
    slug: "casa-pequi",
    nome: "Casa Pequi",
    categoria: "Restaurante",
    local: "Térreo, com mesas no pátio",
    descricao:
      "Cozinha goiana de fogão a lenha servida em pratos para dividir: empadão, arroz com pequi, galinhada, pamonha frita. Almoço de terça a domingo e jantar de quinta a sábado.",
    horario: "Ter a dom, 12h às 15h. Qui a sáb, 19h às 23h",
    instagram: "casapequi.gyn",
    telefone: "(62) 3241-2205",
    capa: img("/lojas/casa-pequi/capa.jpg", "Salão com paredes terracota e poltronas de couro", 2000, 1333),
    galeria: [
      img("/lojas/casa-pequi/01.jpg", "Mesa posta junto à janela, à noite", 1500, 2000),
      img("/lojas/casa-pequi/02.jpg", "Mesas sob uma luminária de palha", 1333, 2000),
      img("/lojas/casa-pequi/03.jpg", "Mesas com toalha branca diante de uma estante de madeira", 1529, 2000),
    ],
  },
  {
    slug: "atelie-lume",
    nome: "Ateliê Lume",
    categoria: "Joalheria",
    local: "Térreo",
    descricao:
      "Peças em ouro 18k e pedras brasileiras, feitas na oficina no fundo da loja. Alianças e ajustes sob encomenda, com prazo de três semanas.",
    horario: "Seg a sáb, 10h às 19h",
    instagram: "atelielume",
    telefone: "(62) 99812-4471",
    capa: img("/lojas/atelie-lume/capa.jpg", "Colares em um busto sobre fundo laranja, com sombra de folhas", 1334, 2000),
    galeria: [
      img("/lojas/atelie-lume/01.jpg", "Colar de brilhantes em um busto preto", 1333, 2000),
      img("/lojas/atelie-lume/02.jpg", "Colares em bustos brancos na vitrine", 2000, 1333),
      img("/lojas/atelie-lume/03.jpg", "Anéis em suportes de madeira", 2000, 1124),
    ],
  },
  {
    slug: "adega-serra-dourada",
    nome: "Adega Serra Dourada",
    categoria: "Vinhos e empório",
    local: "Primeiro andar",
    descricao:
      "Duzentos rótulos na parede e dez abertos em taça a cada semana. Queijos da Canastra e embutidos curados para acompanhar, na mesa comprida sob o arco.",
    horario: "Ter a sáb, 16h às 23h",
    instagram: "adegaserradourada",
    telefone: "(62) 3241-3390",
    capa: img("/lojas/adega-serra-dourada/capa.jpg", "Mesa comprida à luz de velas sob um arco", 1600, 2000),
    galeria: [
      img("/lojas/adega-serra-dourada/01.jpg", "Taças de vinho tinto e tábua de queijos", 2000, 1333),
      img("/lojas/adega-serra-dourada/02.jpg", "Taça de vinho branco sobre mesa de pedra", 1334, 2000),
      img("/lojas/adega-serra-dourada/03.jpg", "Balcão com garrafas iluminadas", 2000, 1326),
    ],
  },
  {
    slug: "botica-ipe",
    nome: "Botica Ipê",
    categoria: "Perfumaria",
    local: "Térreo",
    descricao:
      "Perfumes de autor e óleos essenciais vendidos a granel. Os frascos voltam para recarga, e a primeira prova é feita no papel, no balcão.",
    horario: "Seg a sáb, 10h às 20h",
    instagram: "boticaipe",
    telefone: "(62) 99604-2218",
    capa: img("/lojas/botica-ipe/capa.jpg", "Frascos de perfume sobre uma mesa espelhada", 2000, 1125),
    galeria: [
      img("/lojas/botica-ipe/01.jpg", "Estantes escuras com frascos iluminados", 1333, 2000),
      img("/lojas/botica-ipe/02.jpg", "Frascos de vidro lapidado em primeiro plano", 1334, 2000),
      img("/lojas/botica-ipe/03.jpg", "Estantes de frascos âmbar com luz por trás", 2000, 1500),
    ],
  },
  {
    slug: "flor-de-baru",
    nome: "Flor de Baru",
    categoria: "Floricultura",
    local: "Térreo, voltada para a rua",
    descricao:
      "Flores de corte que chegam de Holambra às terças e sextas. Os arranjos são montados na hora e entregues nos condomínios Jardins no mesmo dia.",
    horario: "Seg a sáb, 8h às 19h. Dom, 8h às 12h",
    instagram: "flordebaru",
    telefone: "(62) 99177-5063",
    capa: img("/lojas/flor-de-baru/capa.jpg", "Buquê de peônias brancas", 1338, 2000),
    galeria: [
      img("/lojas/flor-de-baru/01.jpg", "Floricultura iluminada ao entardecer", 2000, 1333),
      img("/lojas/flor-de-baru/02.jpg", "Rosas cor-de-rosa em um balde de metal", 2000, 1333),
      img("/lojas/flor-de-baru/03.jpg", "Buquês de margaridas em papel kraft", 1500, 2000),
    ],
  },
];

export const getLoja = (slug: string) => lojas.find((l) => l.slug === slug);

export const vizinhas = (slug: string) => {
  const i = lojas.findIndex((l) => l.slug === slug);
  return {
    anterior: lojas[(i - 1 + lojas.length) % lojas.length],
    proxima: lojas[(i + 1) % lojas.length],
  };
};
