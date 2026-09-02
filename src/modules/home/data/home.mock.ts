import { Job, JobPlatformId, getPlatformMeta } from "~/src/shared/domain/job";
import { hashId } from "~/src/shared/utils/hash";

type MockJobSeed = {
  title: string;
  company: string;
  platformId: JobPlatformId;
  location: string;
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

function seedToJob(seed: MockJobSeed): Job {
  const platform = getPlatformMeta(seed.platformId);

  return {
    id: hashId("mock", seed.platformId, seed.title, seed.company),
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
  };
}

const SEEDS: MockJobSeed[] = [
  {
    title: "Desenvolvedor Backend Sênior",
    company: "Vertexa Tech",
    platformId: "linkedin",
    location: "São Paulo, SP",
    salaryLabel: "R$ 14k – 18k",
    salaryMin: 14000,
    workModel: "Remoto",
    contractType: "PJ",
    seniority: "Sênior",
    postedAtLabel: "há 2 h",
    description:
      "Você vai atuar no núcleo de pagamentos, evoluindo serviços que processam milhões de transações por mês.",
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
    salaryLabel: "R$ 16k – 21k",
    salaryMin: 16000,
    workModel: "Híbrido",
    contractType: "CLT",
    seniority: "Pleno/Sênior",
    postedAtLabel: "há 5 h",
    description:
      "Liderança do produto de crédito para pequenas empresas, do descobrimento à métrica.",
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
    salaryLabel: "R$ 11k – 14k",
    salaryMin: 11000,
    workModel: "Remoto",
    contractType: "CLT",
    seniority: "Pleno",
    postedAtLabel: "há 1 d",
    description:
      "Design de ponta a ponta em um app de energia solar residencial, com muita pesquisa com usuários.",
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
];

/** TODO: replace with a recommendations query when the endpoint exists. */
export const RECOMMENDED_JOBS: Job[] = SEEDS.map(seedToJob);
