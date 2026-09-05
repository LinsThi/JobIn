export const notificationsCopy = {
  title: "Notificações",
  countLabel: (unread: number) => {
    if (unread === 0) return "Você está em dia";
    return unread === 1 ? "1 não lida" : `${unread} não lidas`;
  },
  emptyTitle: "Nenhuma notificação por aqui",
  emptyBody: "Avisamos quando uma busca encontrar novas vagas para você.",
  sendTestAction: "Enviar notificação de teste",
  clearAllAction: "Limpar tudo",
};
