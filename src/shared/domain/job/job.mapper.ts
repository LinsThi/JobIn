import { Job } from "./job.entity";
import { getPlatformMeta, normalizePlatformId } from "./job.platform";

import { IVacationProps } from "~/src/shared/types/vacantion";
import { hashId } from "~/src/shared/utils/hash";

function firstSegment(value: string | null | undefined): string | undefined {
  const segment = (value ?? "").split(",")[0]?.trim();

  return segment ? segment : undefined;
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
    postedAtLabel: vacation.createdAt || "",
    description: vacation.vacantionDescription || undefined,
    requirements: vacation.vacantionRequirements ?? [],
    benefits: vacation.vacantionBenefits ?? [],
    url: vacation.vacantionLink || undefined,
    accent: platform.accent,
  };
}
