export const savedCopy = {
  title: "Vagas salvas",
  countLabel: (count: number) => {
    if (count === 0) return "Nada guardado por aqui ainda";
    return count === 1 ? "1 vaga guardada" : `${count} vagas guardadas`;
  },
  emptyTitle: "Você ainda não salvou nenhuma vaga",
  emptyBody: "Toque no ícone de marcador em qualquer vaga para guardá-la aqui.",
  emptyAction: "Buscar vagas",
};
