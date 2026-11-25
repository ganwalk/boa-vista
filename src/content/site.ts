// Dados institucionais. Tudo aqui vem da placa de obra ou do manual da marca.
// Campos vazios ("") não aparecem no site: preencha quando a informação for confirmada.

export const site = {
  nome: "Pátio Boa Vista",
  cidade: "Goiânia",
  // Frase curta usada no topo e no <meta description>.
  resumo:
    "Galeria de lojas, serviços e gastronomia em Goiânia, ao lado dos condomínios Jardins.",
  status: "Em obra",
  // Ex.: "Abertura prevista para o segundo semestre de 2027". Vazio = não aparece.
  abertura: "",
  // Ex.: "Av. ..., Goiânia, GO". Vazio = não aparece.
  endereco: "",
  contato: {
    // Para locação dos espaços enquanto a galeria está em obra.
    // FICTÍCIOS, para ilustrar. Troque pelos contatos reais antes de publicar.
    email: "contato@patioboavista.com.br",
    whatsapp: "5562981540270", // só números com DDI
    instagram: "patioboavista", // só o usuário, sem @
  },
  url: "https://patioboavista.com.br",
} as const;

// Ficha técnica, transcrita da placa de obra, na mesma ordem e com os mesmos registros.
export const regimeObra = "Obra por administração";

export type Credito = { nome: string; registro?: string };

export const ficha: { papel: string; nomes: Credito[] }[] = [
  { papel: "Proprietário", nomes: [{ nome: "Eutália Participações Ltda", registro: "CNPJ 04.614.584/0001-46" }] },
  { papel: "Responsável técnico", nomes: [{ nome: "Alex Pereira Monteiro", registro: "CAU 000A905054" }] },
  { papel: "Projeto estrutural", nomes: [{ nome: "Écio Antônio Ribeiro", registro: "CREA 6783/D" }] },
  { papel: "Projeto hidrossanitário", nomes: [{ nome: "Écio Antônio Ribeiro", registro: "CREA 6783/D" }] },
  { papel: "Projeto elétrico", nomes: [{ nome: "Écio Antônio Ribeiro", registro: "CREA 6783/D" }] },
  {
    papel: "Projeto arquitetônico",
    nomes: [
      { nome: "Nuanza Arq & Interiores" },
      { nome: "Mylena Silva Mendes de Almeida", registro: "A290635-0" },
      { nome: "Nathalia Rocha Santos", registro: "A324812-7" },
    ],
  },
  { papel: "Paisagismo", nomes: [{ nome: "Fernanda Simão" }] },
  { papel: "Conceito e criação", nomes: [{ nome: "Andréa Rocha Lima" }] },
];
