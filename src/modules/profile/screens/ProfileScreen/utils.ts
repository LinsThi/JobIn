export function setupProgress(skillCount: number, categoryCount: number) {
  const skillsShare = Math.min(skillCount, 3) / 3;
  return Math.min(100, Math.round(skillsShare * 60 + (categoryCount > 0 ? 40 : 0)));
}
