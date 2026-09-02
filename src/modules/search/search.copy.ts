export const searchCopy = {
  title: "Buscar vagas",
  inputPlaceholder: "Cargo, empresa ou palavra-chave",
  recentTitle: "Pesquisas recentes",
  recentClear: "Limpar",
  consultingTitle: "Consultando plataformas…",
  statusSearching: "buscando…",
  statusDone: "concluído",
  resultsCount: (count: number) =>
    `${count} ${count === 1 ? "vaga encontrada" : "vagas encontradas"}`,
  activeFiltersSummary: (count: number) =>
    `${count} ${count === 1 ? "filtro ativo" : "filtros ativos"}`,
  allPlatformsSummary: "Várias plataformas",
  emptyTitle: "Nenhuma vaga com esses filtros",
  emptyBody: "Tente ampliar a faixa salarial ou incluir mais plataformas.",
  idleTitle: "Busque uma oportunidade agora",
  idleBody: "Escolha os filtros da maneira que você quiser e encontre a oportunidade perfeita.",
  speedLabel: {
    fast: "Resposta rápida",
    mid: "Tempo médio",
    slow: "Pode demorar",
  } as const,
  filters: {
    title: "Filtros",
    workModel: "Modelo de trabalho",
    platforms: "Plataformas",
    location: "Localização",
    contract: "Contrato",
    salary: "Salário mínimo",
    anySalary: "Qualquer",
    clear: "Limpar filtros",
    apply: "Aplicar filtros",
  },
};
