export interface AppUpdateInfo {
  /** "What's new" bullets. Empty/omitted falls back to a generic message. */
  notes: string[];
  /**
   * Dismissible ("Agora não") by default. Set to `false` for a breaking
   * release the old version can't keep working against (e.g. an API route it
   * depends on gets removed) — the modal then has no dismiss option and the
   * Android back button won't close it, forcing the update.
   */
  isOptionalToUpdate?: boolean;
}

/**
 * Per-version update info shown in AppUpdateModal, keyed by the exact version
 * string from app.json (the same one Google Play reports back as
 * `storeVersion`). A version with no entry (or empty `notes`) falls back to a
 * generic "new version available" message.
 */
export const APP_UPDATE_CHANGELOG: Record<string, AppUpdateInfo> = {
  "1.1.0": {
    notes: [
      "Redesign completo do app, com novo visual e experiência de uso",
      "Nova metodologia de busca de vagas, mais rápida e precisa",
      "Novas plataformas de vagas adicionadas à busca",
      "Sistema de indicação de vagas com base na compatibilidade com suas habilidades cadastradas",
      "Cache de vagas para resultados mais rápidos em buscas repetidas",
      "Novo aviso de atualização: agora você é avisado quando uma versão mais recente do JobIn estiver disponível na Play Store",
    ],
    isOptionalToUpdate: false,
  },
};
