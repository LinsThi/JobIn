export const authCopy = {
  signIn: {
    title: "Entrar no JobIn",
    subtitle: "Use seu e-mail. A gente envia um código de 6 dígitos para confirmar.",
    emailLabel: "E-mail",
    emailPlaceholder: "voce@exemplo.com",
    submit: "Enviar código",
    submitting: "Enviando...",
    invalidEmail: "Digite um e-mail válido.",
    genericError: "Não foi possível enviar o código. Tente novamente.",
  },
  verify: {
    title: "Digite o código",
    subtitle: (email: string) => `Enviamos um código de 6 dígitos para ${email}.`,
    submit: "Confirmar",
    submitting: "Confirmando...",
    resend: "Reenviar código",
    resendIn: (seconds: number) => `Reenviar em ${seconds}s`,
    resent: "Código reenviado.",
    invalidCode: "Código inválido ou expirado. Tente de novo.",
    genericError: "Não foi possível confirmar o código. Tente novamente.",
  },
};
