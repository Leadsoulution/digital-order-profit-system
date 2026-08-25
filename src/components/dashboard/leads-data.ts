export type LeadStatus =
  | "Nouveau"
  | "Assigne"
  | "En cours"
  | "Confirme"
  | "Rappel"
  | "Pas de reponse"
  | "Numero incorrect"
  | "Annule"
  | "Duplique"
  | "A revoir";

export type Lead = {
  id: string;
  reference: string;
  productLabel: string;
  productName: string;
  client: string;
  phone: string;
  source: "Excel import" | "whatsapp" | "Agent Manual" | "nouveau";
  assignedTo: string;
  amount: string;
  status: LeadStatus;
  shipping: string;
  date: string;
  ville?: string;
  quartier?: string;
  adresse?: string;
};

export const leads: Lead[] = [
  {
    id: "1",
    reference: "spc-1003",
    productLabel: "SAC",
    productName: "SAC LO",
    client: "soufiane imil",
    phone: "0660164362",
    source: "Excel import",
    assignedTo: "Imane Lahlou",
    amount: "500 MAD",
    status: "Assigne",
    shipping: "En attente",
    date: "19 aout 2026, 21:59",
    ville: "Casablanca",
    quartier: "Maarif",
    adresse: "11 Rue Example",
  },
  {
    id: "2",
    reference: "spc-1002",
    productLabel: "DIF",
    productName: "Diffuseur Atlas Zen",
    client: "soufiane imil",
    phone: "0660164361",
    source: "Excel import",
    assignedTo: "soufiane imil",
    amount: "200 MAD",
    status: "Nouveau",
    shipping: "En attente",
    date: "19 aout 2026, 21:59",
  },
  {
    id: "3",
    reference: "spc-1001",
    productLabel: "DIF",
    productName: "Diffuseur Atlas Zen",
    client: "soufiane imil",
    phone: "0660164360",
    source: "Excel import",
    assignedTo: "soufiane imil",
    amount: "200 MAD",
    status: "Nouveau",
    shipping: "En attente",
    date: "19 aout 2026, 21:59",
  },
  {
    id: "4",
    reference: "MO-E8HQ7-0811",
    productLabel: "BOIS",
    productName: "Sac Cuir Marrakech",
    client: "ayoub",
    phone: "0622161711",
    source: "whatsapp",
    assignedTo: "Youssef Idrissi",
    amount: "249 MAD",
    status: "Confirme",
    shipping: "En attente",
    date: "21 aout 2026, 22:39",
  },
  {
    id: "5",
    reference: "MO-MX7NC-0802",
    productLabel: "BOIS",
    productName: "Bracelet Atlas Silver",
    client: "Yassin",
    phone: "0630053131",
    source: "whatsapp",
    assignedTo: "Fatima Zahra",
    amount: "279 MAD",
    status: "Rappel",
    shipping: "En attente",
    date: "20 aout 2026, 19:14",
  },
  {
    id: "6",
    reference: "MO-DWZW8-0728",
    productLabel: "SAC",
    productName: "SAC LO",
    client: "achraf",
    phone: "0666686869",
    source: "Agent Manual",
    assignedTo: "Fatima Zahra",
    amount: "837 MAD",
    status: "Annule",
    shipping: "En attente",
    date: "23 juil. 2026, 22:39",
  },
  {
    id: "7",
    reference: "MO-EES7K-0728",
    productLabel: "SAC",
    productName: "Serum Derma Glow",
    client: "samba",
    phone: "0623145234",
    source: "nouveau",
    assignedTo: "Fatima Zahra",
    amount: "558 MAD",
    status: "A revoir",
    shipping: "En attente",
    date: "28 juil. 2026, 08:40",
  },
];

const tabDefinitions: { label: string; status: LeadStatus | null }[] = [
  { label: "Tous", status: null },
  { label: "Nouveaux", status: "Nouveau" },
  { label: "Assignes", status: "Assigne" },
  { label: "Confirmes", status: "Confirme" },
  { label: "Rappels", status: "Rappel" },
  { label: "Pas de rep.", status: "Pas de reponse" },
  { label: "Annules", status: "Annule" },
  { label: "A revoir", status: "A revoir" },
];

export const tabs = tabDefinitions.map((tab) => ({
  ...tab,
  count: tab.status
    ? leads.filter((lead) => lead.status === tab.status).length
    : leads.length,
}));

export const dateRanges = [
  "Tout",
  "Aujourd'hui",
  "Hier",
  "7 derniers jours",
  "Ce mois-ci",
  "Maximum",
  "Personnalisee",
];

export const sourceBadgeStyles: Record<Lead["source"], string> = {
  "Excel import": "bg-blue-50 text-blue-600",
  whatsapp: "bg-pink-50 text-pink-600",
  "Agent Manual": "bg-gray-100 text-gray-600",
  nouveau: "bg-emerald-50 text-emerald-600",
};

export const statusBadgeStyles: Record<LeadStatus, string> = {
  Nouveau: "bg-sky-50 text-sky-600",
  Assigne: "bg-blue-50 text-blue-600",
  "En cours": "bg-indigo-50 text-indigo-600",
  Confirme: "bg-green-50 text-green-700",
  Rappel: "bg-orange-50 text-orange-600",
  "Pas de reponse": "bg-gray-100 text-gray-500",
  "Numero incorrect": "bg-red-100 text-red-700",
  Annule: "bg-red-50 text-red-600",
  Duplique: "bg-yellow-50 text-yellow-700",
  "A revoir": "bg-purple-50 text-purple-600",
};

export const agents = [
  "Fatima Zahra",
  "Hamza Berrada",
  "Imane Lahlou",
  "Karim El Mansouri",
  "Nadia El Fassi",
  "Omar Tazi",
  "Salma Bennani",
  "soufiane imil",
  "Youssef Idrissi",
];

export const moroccanCities = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Tanger",
  "Fes",
  "Agadir",
  "Meknes",
  "Oujda",
];

export const expeditionStatuses = [
  "En attente",
  "Expedie",
  "En transit",
  "Livre",
  "Retourne",
  "Refuse",
];

export const sourceOptions = [
  "agent_manual",
  "Excel import",
  "Google Sheets",
  "Landing page",
  "Mobile app",
  "nouveau",
  "Shopify",
  "whatsapp",
  "WooCommerce",
];

export const leadStatusOptions = [
  "Aucun changement",
  "En cours",
  "Confirme",
  "Rappel",
  "Pas de reponse",
  "Numero incorrect",
  "Annule",
  "Duplique",
  "A revoir",
];

export const productNames = [
  "SAC LO",
  "Diffuseur Atlas Zen",
  "Serum Derma Glow",
  "Powerbank MagSafe Atlas",
];

export const attentionLevels = ["Urgent", "Normal", "Faible"];

export const reminderDueOptions = [
  "En retard",
  "Aujourd'hui",
  "Demain",
  "Cette semaine",
];

export const amountRanges = [
  "0 - 200 MAD",
  "200 - 500 MAD",
  "500 - 1000 MAD",
  "1000 MAD et plus",
];

export const notesOptions = ["Avec notes", "Sans notes"];
