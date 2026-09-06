export const profileCopy = {
  setupTitle: "Complete seu perfil",
  setupSubtitle:
    "Adicione ao menos 3 habilidades e 1 área que você quer acompanhar (até 3). Isso fica salvo no seu dispositivo.",
  editTitle: "Seu perfil",
  editSubtitle: "Atualize suas habilidades e áreas quando quiser.",

  skillsLabel: "Habilidades",
  skillsHelper: "Digite e pressione Enter. Mínimo de 3.",
  skillsPlaceholder: "Ex.: React Native, SQL",
  skillsCount: (count: number) => (count === 1 ? "1 habilidade" : `${count} habilidades`),
  skillsCountMin: (count: number, min: number) => `${count} de ${min}`,

  categoriesLabel: "Áreas para acompanhar",
  categoriesHelper: "Digite o cargo que quer acompanhar. Mínimo de 1.",
  categoriesPlaceholder: "Ex.: Desenvolvedor Mobile",
  categoriesCount: (count: number, max: number) => `${count} de ${max}`,

  save: "Salvar",
  saveAndContinue: "Salvar e continuar",
  saved: "Perfil atualizado",
  saveError: "Não foi possível salvar. Tente novamente.",
};
