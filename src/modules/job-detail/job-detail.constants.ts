export type JobDetailTab = "about" | "requirements" | "benefits";

export const JOB_DETAIL_TABS: readonly { key: JobDetailTab; label: string }[] = [
  { key: "about", label: "Descrição" },
  { key: "requirements", label: "Requisitos" },
  { key: "benefits", label: "Benefícios" },
];

export const jobDetailCopy = {
  aboutTitle: "Sobre a oportunidade",
  requirementsTitle: "Requisitos",
  benefitsTitle: "Benefícios",
  apply: "Acessar vaga",
  notFoundTitle: "Vaga não encontrada",
  notFoundBody: "Não conseguimos carregar os detalhes desta vaga. Volte e tente novamente.",
  emptyRequirements: "A empresa não detalhou os requisitos desta vaga.",
  emptyBenefits: "A empresa não listou benefícios para esta vaga.",
  emptyDescription: "A empresa não escreveu uma descrição para esta vaga.",
};

export const JOB_DETAIL_FACT_LABELS = {
  workModel: "Modelo",
  contractType: "Contrato",
  platform: "Plataforma",
  postedAt: "Publicada",
};
