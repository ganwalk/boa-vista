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
    email: "",
    whatsapp: "", // só números com DDI, ex.: 5562999990000
    instagram: "", // só o usuário, sem @
  },
  url: "https://patioboavista.com.br",
} as const;

// Ficha técnica, transcrita da placa de obra.
export const ficha: { papel: string; nomes: string[] }[] = [
  { papel: "Proprietário", nomes: ["Eutália Participações Ltda"] },
  { papel: "Responsável técnico", nomes: ["Alex Pereira Monteiro"] },
  {
    papel: "Projeto arquitetônico",
    nomes: [
      "Nuanza Arq & Interiores",
      "Mylena Silva Mendes de Almeida",
      "Nathalia Rocha Santos",
    ],
  },
  { papel: "Paisagismo", nomes: ["Fernanda Simão"] },
  {
    papel: "Projetos estrutural, hidrossanitário e elétrico",
    nomes: ["Écio Antônio Ribeiro"],
  },
  { papel: "Conceito e criação", nomes: ["Andréa Rocha Lima"] },
];
