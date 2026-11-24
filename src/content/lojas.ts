// Cadastro das lojas. A ordem aqui é a ordem das arcadas na fachada da home (a arcada do meio é a entrada).
//
// Enquanto os contratos não estão fechados, cada entrada é um "Espaço" sem mídia.
// O site desenha uma prancha da marca no lugar da foto, em vez de usar imagem genérica.
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

const espaco = (n: number): Loja => {
  const num = String(n).padStart(2, "0");
  return {
    slug: `espaco-${num}`,
    nome: `Espaço ${num}`,
    categoria: "Disponível para locação",
    disponivel: true,
  };
};

export const lojas: Loja[] = [1, 2, 3, 4, 5, 6].map(espaco);

export const getLoja = (slug: string) => lojas.find((l) => l.slug === slug);

export const vizinhas = (slug: string) => {
  const i = lojas.findIndex((l) => l.slug === slug);
  return {
    anterior: lojas[(i - 1 + lojas.length) % lojas.length],
    proxima: lojas[(i + 1) % lojas.length],
  };
};
