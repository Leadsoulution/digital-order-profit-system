export type Lead = {
  id: string;
  reference: string;
  productLabel: string;
  client: string;
  phone: string;
  source: "Excel import" | "whatsapp" | "Agent Manual" | "nouveau";
  assignedTo: string;
  amount: string;
  status: string;
  shipping: string;
  date: string;
};

export const leads: Lead[] = [
  {
    id: "1",
    reference: "spc-1003",
    productLabel: "SAC",
    client: "soufiane imil",
    phone: "0660164362",
    source: "Excel import",
    assignedTo: "Imane Lahlou",
    amount: "500 MAD",
    status: "Assigne",
    shipping: "En attente",
    date: "19 aout 2026, 21:59",
  },
  {
    id: "2",
    reference: "spc-1002",
    productLabel: "DIF",
    client: "soufiane imil",
    phone: "0660164361",
    source: "Excel import",
    assignedTo: "soufiane imil",
    amount: "200 MAD",
    status: "Assigne",
    shipping: "En attente",
    date: "19 aout 2026, 21:59",
  },
  {
    id: "3",
    reference: "spc-1001",
    productLabel: "DIF",
    client: "soufiane imil",
    phone: "0660164360",
    source: "Excel import",
    assignedTo: "soufiane imil",
    amount: "200 MAD",
    status: "Assigne",
    shipping: "En attente",
    date: "19 aout 2026, 21:59",
  },
  {
    id: "4",
    reference: "MO-E8HQ7-0811",
    productLabel: "BOIS",
    client: "ayoub",
    phone: "0622161711",
    source: "whatsapp",
    assignedTo: "Youssef Idrissi",
    amount: "249 MAD",
    status: "Assigne",
    shipping: "En attente",
    date: "21 aout 2026, 22:39",
  },
  {
    id: "5",
    reference: "MO-MX7NC-0802",
    productLabel: "BOIS",
    client: "Yassin",
    phone: "0630053131",
    source: "whatsapp",
    assignedTo: "Fatima Zahra",
    amount: "279 MAD",
    status: "Assigne",
    shipping: "En attente",
    date: "20 aout 2026, 19:14",
  },
  {
    id: "6",
    reference: "MO-DWZW8-0728",
    productLabel: "SAC",
    client: "achraf",
    phone: "0666686869",
    source: "Agent Manual",
    assignedTo: "Fatima Zahra",
    amount: "837 MAD",
    status: "Assigne",
    shipping: "En attente",
    date: "23 juil. 2026, 22:39",
  },
  {
    id: "7",
    reference: "MO-EES7K-0728",
    productLabel: "SAC",
    client: "samba",
    phone: "0623145234",
    source: "nouveau",
    assignedTo: "Fatima Zahra",
    amount: "558 MAD",
    status: "Assigne",
    shipping: "En attente",
    date: "28 juil. 2026, 08:40",
  },
];

export const tabs = [
  { label: "Tous", count: 48745 },
  { label: "Nouveaux", count: 1728 },
  { label: "Assignes", count: 4598 },
  { label: "Confirmes", count: 31327 },
  { label: "Rappels", count: 1512 },
  { label: "Pas de rep.", count: 0 },
  { label: "Annules", count: 1843 },
  { label: "A revoir", count: 1584 },
];

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
