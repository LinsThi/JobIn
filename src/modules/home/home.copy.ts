import { JOB_PLATFORMS, JobPlatformId } from "~/src/shared/domain/job";

const SUBTITLE_PLATFORMS: JobPlatformId[] = [
  "linkedin",
  "gupy",
  "infojobs",
  "catho",
  "trabalhabrasil",
];

function buildPlatformsSentence(): string {
  const names = SUBTITLE_PLATFORMS.map((id) => JOB_PLATFORMS[id].name);
  const last = names.pop();

  return `${names.join(", ")} e ${last} em um só lugar.`;
}

export const homeCopy = {
  greeting: "Ache sua próxima vaga.",
  subtitle: buildPlatformsSentence(),
  searchCta: "Buscar vagas",
  recentTitle: "Pesquisas recentes",
  recentClear: "Limpar",
  recommendedTitle: "Recomendados para você",
  newJobsTitle: "Novos empregos encontrados",
  newJobsAction: "Ver mais",
};
