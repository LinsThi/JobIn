import { Job } from "./job.entity";
import { getPlatformMeta, normalizePlatformId } from "./job.platform";

import { NormalizedJobDTO } from "~/src/shared/queries/useSearchJobs/types";
import { IVacationProps } from "~/src/shared/types/vacantion";
import { hashId } from "~/src/shared/utils/hash";

function firstSegment(value: string | null | undefined): string | undefined {
  const segment = (value ?? "").split(",")[0]?.trim();

  return segment ? segment : undefined;
}

/** ISO date -> short pt-BR "posted at" label, e.g. "há 3 h", "há 2 d". */
function postedAtLabel(iso: string | null | undefined): string {
  if (!iso) return "";

  const published = Date.parse(iso);
  if (Number.isNaN(published)) return "";

  const minutes = Math.max(0, Math.round((Date.now() - published) / 60000));

  if (minutes < 60) return "agora há pouco";
  if (minutes < 60 * 24) return `há ${Math.floor(minutes / 60)} h`;
  return `há ${Math.floor(minutes / (60 * 24))} d`;
}

/** Maps the raw job-search API shape into the domain `Job`. */
export function toJob(vacation: IVacationProps): Job {
  const platformId = normalizePlatformId(vacation.platform);
  const platform = getPlatformMeta(platformId);

  return {
    id: hashId(vacation.platform, vacation.vacationTitle, vacation.companyName),
    title: vacation.vacationTitle,
    company: vacation.companyName || "Não informado",
    companyImage: vacation.companyImage,
    location: vacation.vacantionLocation || "Local não informado",
    salaryLabel: vacation.vacantionSalary || "A combinar",
    workModel: firstSegment(vacation.vacantionType),
    contractType: firstSegment(vacation.vacantionContractType),
    seniority: firstSegment(vacation.vacantionProfessionalArea),
    platform: platform.name,
    platformId,
    platformMono: platform.mono,
    platformColor: platform.color,
    postedAtLabel: postedAtLabel(vacation.createdAt),
    description: vacation.vacantionDescription || undefined,
    requirements: vacation.vacantionRequirements ?? [],
    benefits: vacation.vacantionBenefits ?? [],
    url: vacation.vacantionLink || undefined,
    accent: platform.accent,
  };
}

/** Maps the async search endpoint's `NormalizedJob` into the domain `Job`. */
export function normalizedJobToJob(dto: NormalizedJobDTO): Job {
  const platformId = normalizePlatformId(dto.platform);
  const platform = getPlatformMeta(platformId);

  return {
    id: dto.id,
    title: dto.title,
    company: dto.company || "Não informado",
    companyImage: null,
    location: dto.location?.raw || "Local não informado",
    salaryLabel: dto.salary?.raw || "A combinar",
    salaryMin: dto.salary?.min,
    workModel: dto.workModel || undefined,
    contractType: dto.contractType || undefined,
    seniority: undefined,
    platform: platform.name,
    platformId,
    platformMono: platform.mono,
    platformColor: platform.color,
    postedAtLabel: postedAtLabel(dto.publishedAt),
    description: dto.description || undefined,
    requirements: dto.requirements ?? [],
    benefits: dto.benefits ?? [],
    url: dto.url || undefined,
    accent: platform.accent,
  };
}
