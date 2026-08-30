export type StatusColor =
  | "blue"
  | "violet"
  | "amber"
  | "emerald"
  | "orange"
  | "gray"
  | "rose"
  | "red"
  | "purple"
  | "cyan";

export type StatusDef = {
  code: string;
  label: string;
  icon: string;
  color: StatusColor;
  default: boolean;
  active: boolean;
};

export const leadStatuses: StatusDef[] = [
  { code: "new", label: "Nouveau", icon: "sparkles", color: "blue", default: true, active: true },
  { code: "assigned", label: "Assigne", icon: "user-plus", color: "violet", default: true, active: true },
  { code: "in_progress", label: "En cours", icon: "loader", color: "amber", default: true, active: true },
  { code: "confirmed", label: "Confirme", icon: "check-circle", color: "emerald", default: true, active: true },
  { code: "callback", label: "Rappel", icon: "clock", color: "orange", default: true, active: true },
  { code: "no_answer", label: "Pas de reponse", icon: "phone-off", color: "gray", default: true, active: true },
  { code: "wrong_number", label: "Numero incorrect", icon: "phone-missed", color: "rose", default: true, active: true },
  { code: "cancelled", label: "Annule", icon: "x-circle", color: "red", default: true, active: true },
  { code: "duplicate", label: "Doublon", icon: "copy", color: "purple", default: true, active: true },
  { code: "fake_lead", label: "Faux lead", icon: "shield-alert", color: "rose", default: true, active: true },
  { code: "needs_review", label: "A revoir", icon: "eye", color: "amber", default: true, active: true },
];

export const shippingStatuses: StatusDef[] = [
  { code: "pending", label: "En attente", icon: "clock", color: "gray", default: true, active: true },
  { code: "shipped", label: "Expedie", icon: "send", color: "blue", default: true, active: true },
  { code: "in_transit", label: "En transit", icon: "truck", color: "cyan", default: true, active: true },
  { code: "delivered", label: "Livre", icon: "package-check", color: "emerald", default: true, active: true },
  { code: "returned", label: "Retourne", icon: "rotate-ccw", color: "orange", default: true, active: true },
  { code: "refused", label: "Refuse", icon: "ban", color: "red", default: true, active: true },
];

export type NotificationPref = {
  key: string;
  label: string;
  description: string;
};

export const notificationPrefs: NotificationPref[] = [
  {
    key: "confirmation-backlog",
    label: "Backlog de confirmation",
    description: "Afficher les alertes pour les leads nouveaux ou assignes en attente de confirmation",
  },
  {
    key: "callbacks-today",
    label: "Rappels du jour",
    description: "Afficher les alertes pour les callbacks a traiter aujourd'hui",
  },
  {
    key: "no-answer-followup",
    label: "Suivi sans reponse",
    description: "Afficher les alertes pour les leads en file de suivi sans reponse",
  },
  {
    key: "shipping-exceptions",
    label: "Exceptions d'expedition",
    description: "Afficher les alertes pour les colis retournes ou refuses",
  },
  {
    key: "integrations-attention",
    label: "Attention integrations",
    description: "Afficher les alertes pour les integrations deconnectees ou en erreur",
  },
];

export const currencyOptions = [
  "MAD — Dirham marocain",
  "EUR — Euro",
  "USD — Dollar americain",
];

export const timezoneOptions = [
  "Africa/Casablanca (GMT+1)",
  "Europe/Paris (GMT+1)",
  "UTC (GMT+0)",
];

export const languageOptions = ["Francais", "Anglais", "Arabe"];
