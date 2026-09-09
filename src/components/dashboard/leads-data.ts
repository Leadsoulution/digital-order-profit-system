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
  | "A revoir"
  | "Faux / spam";

export type LeadSource =
  | "Excel import"
  | "whatsapp"
  | "Agent Manual"
  | "nouveau"
  | "Direct"
  | "Landing page"
  | "Lightfunnels";

export type Lead = {
  id: string;
  reference: string;
  productLabel: string;
  productName: string;
  itemCount?: number;
  client: string;
  phone: string;
  source: LeadSource;
  assignedTo: string;
  amount: string;
  status: LeadStatus;
  shipping: string;
  date: string;
  ville?: string;
  tarif?: string;
  quartier?: string;
  adresse?: string;
  trackingNumber?: string;
  trackingError?: string;
};

export const leads: Lead[] = [
  {
    id: "1",
    reference: "spc-1003",
    productLabel: "SAC",
    productName: "SAC LO",
    itemCount: 2,
    client: "soufiane imil",
    phone: "0660164362",
    source: "Agent Manual",
    assignedTo: "Imane Lahlou",
    amount: "500 MAD",
    status: "Assigne",
    shipping: "En attente",
    date: "19 aout 2026, 21:59",
    ville: "Oujda",
    tarif: "48 MAD",
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
    source: "Direct",
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
    source: "Landing page",
    assignedTo: "soufiane imil",
    amount: "200 MAD",
    status: "Nouveau",
    shipping: "En attente",
    date: "19 aout 2026, 21:59",
    ville: "Sale",
    tarif: "38 MAD",
  },
  {
    id: "4",
    reference: "MO-E8HQ7-0811",
    productLabel: "BOIS",
    productName: "Sac Cuir Marrakech",
    client: "ayoub",
    phone: "0622161711",
    source: "Lightfunnels",
    assignedTo: "Youssef Idrissi",
    amount: "249 MAD",
    status: "Confirme",
    shipping: "En attente",
    date: "21 aout 2026, 22:39",
    ville: "Meknes",
    tarif: "42 MAD",
  },
  {
    id: "5",
    reference: "MO-MX7NC-0802",
    productLabel: "BOIS",
    productName: "Bracelet Atlas Silver",
    itemCount: 2,
    client: "Yassin",
    phone: "0630053131",
    source: "Landing page",
    assignedTo: "Fatima Zahra",
    amount: "279 MAD",
    status: "Rappel",
    shipping: "En attente",
    date: "20 aout 2026, 19:14",
    ville: "Tanger",
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
  {
    id: "8",
    reference: "MO-QX21S-0705",
    productLabel: "WATCH",
    productName: "Montre Pro X V2",
    client: "hicham inconnu",
    phone: "0611223344",
    source: "Direct",
    assignedTo: "Karim El Mansouri",
    amount: "799 MAD",
    status: "Faux / spam",
    shipping: "En attente",
    date: "5 juil. 2026, 10:12",
  },
];

const tabDefinitions: { label: string; status: LeadStatus | null; flagged?: boolean }[] = [
  { label: "Tous", status: null },
  { label: "Nouveaux", status: "Nouveau" },
  { label: "Assignes", status: "Assigne" },
  { label: "Confirmes", status: "Confirme" },
  { label: "Rappels", status: "Rappel" },
  { label: "Pas de rep.", status: "Pas de reponse" },
  { label: "Annules", status: "Annule" },
  { label: "A revoir", status: "A revoir" },
  { label: "Faux / spam", status: "Faux / spam", flagged: true },
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

export const sourceBadgeStyles: Record<LeadSource, string> = {
  "Excel import": "bg-blue-50 text-blue-600",
  whatsapp: "bg-pink-50 text-pink-600",
  "Agent Manual": "bg-gray-100 text-gray-600",
  nouveau: "bg-emerald-50 text-emerald-600",
  Direct: "bg-gray-100 text-gray-600",
  "Landing page": "bg-blue-50 text-blue-600",
  Lightfunnels: "bg-blue-50 text-blue-600",
};

export const statusBadgeStyles: Record<LeadStatus, string> = {
  Nouveau: "bg-sky-500 text-white",
  Assigne: "bg-blue-600 text-white",
  "En cours": "bg-indigo-500 text-white",
  Confirme: "bg-emerald-600 text-white",
  Rappel: "bg-orange-500 text-white",
  "Pas de reponse": "bg-gray-500 text-white",
  "Numero incorrect": "bg-rose-500 text-white",
  Annule: "bg-red-600 text-white",
  Duplique: "bg-amber-600 text-white",
  "A revoir": "bg-purple-500 text-white",
  "Faux / spam": "bg-red-600 text-white",
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
  "Faux / spam",
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
