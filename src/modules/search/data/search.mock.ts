import { Job, JobPlatformId, getPlatformMeta } from "~/src/shared/domain/job";
import { hashId } from "~/src/shared/utils/hash";

/** A search result carries its UF so the location filter can match it. */
export type SearchJob = Job & { state: string };

type SearchJobSeed = {
  title: string;
  company: string;
  platformId: JobPlatformId;
  location: string;
  state: string;
  salaryLabel: string;
  salaryMin: number;
  workModel: string;
  contractType: string;
  seniority: string;
  postedAtLabel: string;
  description: string;
  requirements: string[];
  benefits: string[];
};

function seedToJob(seed: SearchJobSeed): SearchJob {
  const platform = getPlatformMeta(seed.platformId);

  return {
    id: hashId("search-mock", seed.platformId, seed.title, seed.company),
    title: seed.title,
    company: seed.company,
    companyImage: null,
    location: seed.location,
    salaryLabel: seed.salaryLabel,
    salaryMin: seed.salaryMin,
    workModel: seed.workModel,
    contractType: seed.contractType,
    seniority: seed.seniority,
    platform: platform.name,
    platformId: seed.platformId,
    platformMono: platform.mono,
    platformColor: platform.color,
    postedAtLabel: seed.postedAtLabel,
    description: seed.description,
    requirements: seed.requirements,
    benefits: seed.benefits,
    accent: platform.accent,
    state: seed.state,
  };
}

const SEEDS: SearchJobSeed[] = [
  {
    title: "Desenvolvedor Backend Sênior",
    company: "Vertexa Tech",
    platformId: "linkedin",
    location: "São Paulo, SP",
    state: "SP",
    salaryLabel: "R$ 14k – 18k",
    salaryMin: 14000,
    workModel: "Remoto",
    contractType: "PJ",
    seniority: "Sênior",
    postedAtLabel: "há 2 h",
    description:
      "Você vai atuar no núcleo de pagamentos, evoluindo serviços que processam milhões de transações por mês. O time é pequeno, com autonomia real sobre arquitetura e decisões técnicas.",
    requirements: [
      "5+ anos com Node.js ou Go em produção",
      "Experiência com filas e mensageria (Kafka, SQS)",
      "Modelagem de dados em PostgreSQL",
      "Observabilidade e testes automatizados",
    ],
    benefits: [
      "Vale refeição de R$ 1.200",
      "Plano de saúde e odontológico",
      "Auxílio home office",
      "Budget anual de estudos",
    ],
  },
  {
    title: "Product Manager",
    company: "Lumo Bank",
    platformId: "gupy",
    location: "Rio de Janeiro, RJ",
    state: "RJ",
    salaryLabel: "R$ 16k – 21k",
    salaryMin: 16000,
    workModel: "Híbrido",
    contractType: "CLT",
    seniority: "Pleno/Sênior",
    postedAtLabel: "há 5 h",
    description:
      "Liderança do produto de crédito para pequenas empresas, do descobrimento à métrica. Você trabalha lado a lado com design, dados e risco.",
    requirements: [
      "Experiência em produtos financeiros",
      "Fluência em métricas e experimentação",
      "Discovery contínuo com clientes",
      "Inglês avançado",
    ],
    benefits: [
      "Bônus anual por performance",
      "Plano de saúde nacional",
      "Licença parental estendida",
      "Gympass",
    ],
  },
  {
    title: "Designer de Produto",
    company: "Casa Verde",
    platformId: "infojobs",
    location: "Remoto, Brasil",
    state: "SP",
    salaryLabel: "R$ 11k – 14k",
    salaryMin: 11000,
    workModel: "Remoto",
    contractType: "CLT",
    seniority: "Pleno",
    postedAtLabel: "há 1 d",
    description:
      "Design de ponta a ponta em um app de energia solar residencial. Muita pesquisa com usuários fora do eixo Rio–São Paulo.",
    requirements: [
      "Portfólio com casos de produto mobile",
      "Prototipação em Figma",
      "Conforto com pesquisa qualitativa",
      "Noções de acessibilidade",
    ],
    benefits: [
      "Trabalho 100% remoto",
      "Auxílio equipamento",
      "Plano de saúde",
      "Sexta-feira curta",
    ],
  },
  {
    title: "Analista de Dados",
    company: "Órbita Digital",
    platformId: "catho",
    location: "Belo Horizonte, MG",
    state: "MG",
    salaryLabel: "R$ 8k – 11k",
    salaryMin: 8000,
    workModel: "Presencial",
    contractType: "CLT",
    seniority: "Pleno",
    postedAtLabel: "há 1 d",
    description:
      "Construção de dashboards e modelos de atribuição para o time de marketing de performance.",
    requirements: [
      "SQL avançado",
      "Python para análise",
      "Experiência com dbt ou similar",
      "Comunicação com áreas de negócio",
    ],
    benefits: [
      "Vale transporte e refeição",
      "Plano de saúde",
      "Day off no aniversário",
      "Curso de idiomas",
    ],
  },
  {
    title: "Auxiliar de Logística",
    company: "Mercado Norte",
    platformId: "trabalhabrasil",
    location: "Recife, PE",
    state: "PE",
    salaryLabel: "R$ 2,4k – 3k",
    salaryMin: 2400,
    workModel: "Presencial",
    contractType: "CLT",
    seniority: "Júnior",
    postedAtLabel: "há 2 d",
    description:
      "Apoio na conferência, separação e expedição de mercadorias em centro de distribuição.",
    requirements: [
      "Ensino médio completo",
      "Experiência prévia em estoque",
      "Disponibilidade para turnos",
      "Organização e atenção a detalhes",
    ],
    benefits: ["Cesta básica mensal", "Vale transporte", "Convênio médico", "Adicional por turno"],
  },
  {
    title: "Engenheira de Software Frontend",
    company: "Trilha Saúde",
    platformId: "linkedin",
    location: "Curitiba, PR",
    state: "PR",
    salaryLabel: "R$ 12k – 15k",
    salaryMin: 12000,
    workModel: "Híbrido",
    contractType: "PJ",
    seniority: "Sênior",
    postedAtLabel: "há 3 d",
    description:
      "Interfaces clínicas usadas diariamente por médicos e enfermeiros. Prioridade absoluta para clareza e velocidade.",
    requirements: [
      "React e TypeScript em escala",
      "Design systems e componentes acessíveis",
      "Testes end-to-end",
      "Cuidado com performance",
    ],
    benefits: [
      "Plano de saúde premium",
      "Auxílio creche",
      "Home office 3x por semana",
      "Stock options",
    ],
  },
];

/**
 * The job-search endpoint needs followed platforms that the app can't set yet,
 * so results are mocked here. Swap this list for `useQuerySearchVacantion`
 * (mapped through `toJob`) once platform-following ships — `useJobSearch` is the
 * only caller.
 */
export const MOCK_SEARCH_JOBS: SearchJob[] = SEEDS.map(seedToJob);
