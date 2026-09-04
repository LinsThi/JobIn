export const profileCopy = {
  setupTitle: "Complete seu perfil",
  setupSubtitle:
    "Adicione suas habilidades e até 3 áreas que você quer acompanhar. Isso fica salvo na sua conta.",
  editTitle: "Seu perfil",
  editSubtitle: "Atualize suas habilidades e áreas quando quiser.",

  accountLabel: "Conta",

  skillsLabel: "Habilidades",
  skillsHelper: "Digite e pressione Enter. Adicione quantas quiser.",
  skillsPlaceholder: "Ex.: React Native, SQL",
  skillsCount: (count: number) => (count === 1 ? "1 habilidade" : `${count} habilidades`),

  categoriesLabel: "Áreas para acompanhar",
  categoriesHelper: "Digite o cargo que quer acompanhar.",
  categoriesPlaceholder: "Ex.: Desenvolvedor Mobile",
  categoriesCount: (count: number, max: number) => `${count} de ${max}`,

  save: "Salvar",
  saveAndContinue: "Salvar e continuar",
  saving: "Salvando...",
  saved: "Perfil atualizado",
  saveError: "Não foi possível salvar. Tente novamente.",

  signOut: "Sair da conta",
};
