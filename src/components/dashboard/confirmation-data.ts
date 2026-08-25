export type AgentPerformance = {
  name: string;
  email: string;
  active: boolean;
  avatarColor: string;
  confirmRate: number;
  avgResponseTime: string;
  firstResponseTime: string;
  avgCallDuration: string;
  assigned: number;
  contacted: number;
  confirmed: number;
  pending: number;
};

export const agentPerformance: AgentPerformance[] = [
  {
    name: "Fatima Zahra",
    email: "agent@lead2door.com",
    active: true,
    avatarColor: "bg-emerald-500",
    confirmRate: 83,
    avgResponseTime: "17h 8m",
    firstResponseTime: "53m",
    avgCallDuration: "54s",
    assigned: 8437,
    contacted: 7917,
    confirmed: 6577,
    pending: 174,
  },
  {
    name: "Hamza Berrada",
    email: "agent@lead2door.com",
    active: true,
    avatarColor: "bg-blue-500",
    confirmRate: 77,
    avgResponseTime: "13h 6m",
    firstResponseTime: "21m",
    avgCallDuration: "8m 57s",
    assigned: 5623,
    contacted: 5272,
    confirmed: 4075,
    pending: 581,
  },
  {
    name: "Imane Lahlou",
    email: "agent@lead2door.com",
    active: true,
    avatarColor: "bg-violet-500",
    confirmRate: 74,
    avgResponseTime: "5h 44m",
    firstResponseTime: "26m",
    avgCallDuration: "6m 12s",
    assigned: 5635,
    contacted: 5276,
    confirmed: 3903,
    pending: 91,
  },
  {
    name: "Karim El Mansouri",
    email: "agent@lead2door.com",
    active: true,
    avatarColor: "bg-orange-500",
    confirmRate: 66,
    avgResponseTime: "9h 3m",
    firstResponseTime: "34m",
    avgCallDuration: "5m 30s",
    assigned: 3724,
    contacted: 3503,
    confirmed: 2312,
    pending: 66,
  },
  {
    name: "Nadia El Fassi",
    email: "agent@lead2door.com",
    active: false,
    avatarColor: "bg-pink-500",
    confirmRate: 48,
    avgResponseTime: "8h 44m",
    firstResponseTime: "48m",
    avgCallDuration: "3m 40s",
    assigned: 3512,
    contacted: 3512,
    confirmed: 1671,
    pending: 48,
  },
  {
    name: "Omar Tazi",
    email: "agent@lead2door.com",
    active: true,
    avatarColor: "bg-cyan-500",
    confirmRate: 82,
    avgResponseTime: "7h 1m",
    firstResponseTime: "17m",
    avgCallDuration: "7h 1m",
    assigned: 6140,
    contacted: 6140,
    confirmed: 5035,
    pending: 82,
  },
  {
    name: "Salma Bennani",
    email: "agent@lead2door.com",
    active: true,
    avatarColor: "bg-rose-500",
    confirmRate: 70,
    avgResponseTime: "6h 21m",
    firstResponseTime: "44m",
    avgCallDuration: "4m 12s",
    assigned: 5613,
    contacted: 5275,
    confirmed: 3693,
    pending: 70,
  },
  {
    name: "soufiane imil",
    email: "agent@lead2door.com",
    active: false,
    avatarColor: "bg-gray-400",
    confirmRate: 0,
    avgResponseTime: "—",
    firstResponseTime: "—",
    avgCallDuration: "—",
    assigned: 0,
    contacted: 0,
    confirmed: 0,
    pending: 0,
  },
  {
    name: "Youssef Idrissi",
    email: "agent@lead2door.com",
    active: true,
    avatarColor: "bg-indigo-500",
    confirmRate: 62,
    avgResponseTime: "10h 39m",
    firstResponseTime: "39m",
    avgCallDuration: "5m 20s",
    assigned: 7020,
    contacted: 7020,
    confirmed: 4352,
    pending: 118,
  },
];

export type CallHistoryEntry = {
  reference: string;
  phone: string;
  duration: string;
  status: "Confirme" | "Repart" | "Pas de reponse" | "Numero incorrect";
};

export const callHistoryByAgent: Record<string, CallHistoryEntry[]> = {
  "Fatima Zahra": [
    { reference: "LD-000034-0424", phone: "0660164362", duration: "3s", status: "Confirme" },
    { reference: "LD-000091-0422", phone: "0660164370", duration: "3s", status: "Repart" },
    { reference: "GS-000309-0423", phone: "0622161711", duration: "4s", status: "Confirme" },
    { reference: "GS-000562-0427", phone: "0630053131", duration: "8s", status: "Pas de reponse" },
    { reference: "LD-000467-0423", phone: "0666686869", duration: "11s", status: "Numero incorrect" },
    { reference: "LD-000068-0423", phone: "0623145234", duration: "3s", status: "Confirme" },
    { reference: "LD-000543-0425", phone: "0606060606", duration: "13s", status: "Confirme" },
    { reference: "LD-000202-0422", phone: "0661122334", duration: "4s", status: "Repart" },
  ],
  "Hamza Berrada": [
    { reference: "GS-048083-0779", phone: "0622161711", duration: "10m 25s", status: "Confirme" },
    { reference: "LD-048641-0779", phone: "0630053131", duration: "8m 55s", status: "Confirme" },
    { reference: "LD-048225-0779", phone: "0666686869", duration: "12m 45s", status: "Confirme" },
    { reference: "MO-048583-0779", phone: "0623145234", duration: "4m 35s", status: "Confirme" },
    { reference: "LD-048078-0779", phone: "0606060606", duration: "4m", status: "Pas de reponse" },
  ],
};

export const rebalanceModes = [
  "Par pourcentage",
  "Par produit",
  "Par source",
  "Par region",
  "Manuel",
];

export type PercentageRule = {
  name: string;
  avatarColor: string;
  weight: number;
  percent: number;
};

export const percentageRules: PercentageRule[] = [
  { name: "Fatima Zahra", avatarColor: "bg-emerald-500", weight: 10, percent: 10 },
  { name: "Hamza Berrada", avatarColor: "bg-blue-500", weight: 10, percent: 10 },
  { name: "Imane Lahlou", avatarColor: "bg-violet-500", weight: 13, percent: 12 },
  { name: "Karim El Mansouri", avatarColor: "bg-orange-500", weight: 8, percent: 8 },
  { name: "Nadia El Fassi", avatarColor: "bg-pink-500", weight: 8, percent: 8 },
  { name: "Omar Tazi", avatarColor: "bg-cyan-500", weight: 10, percent: 9 },
  { name: "Salma Bennani", avatarColor: "bg-rose-500", weight: 7, percent: 7 },
  { name: "soufiane imil", avatarColor: "bg-gray-400", weight: 25, percent: 27 },
  { name: "Youssef Idrissi", avatarColor: "bg-indigo-500", weight: 9, percent: 9 },
];

export type ProductCatalogItem = {
  name: string;
  sku: string;
};

export const productCatalog: ProductCatalogItem[] = [
  { name: "Argan Care Intense", sku: "ARGAN CREME-03" },
  { name: "Bracelet Atlas Silver", sku: "BRACELET ATLAS-05" },
  { name: "Diffuseur Atlas Zen", sku: "DIFFUSEUR ATLAS-02" },
  { name: "Ecouteurs Elite ANC", sku: "ECOUTEURS ANC-01" },
  { name: "Kit Elan Argan", sku: "KIT ELAN ARGAN-04" },
  { name: "Lampe Casa Smart", sku: "LAMPE CASA-06" },
  { name: "Montre Pro X V2", sku: "MONTRE PRO X-V2" },
  { name: "Organiseur Voyage Nomad", sku: "ORGANIZER NOMAD-01" },
  { name: "Poudre Drops Casa Soft", sku: "POUDRE DROPS-02" },
  { name: "Powerbank MagSafe Atlas", sku: "POWERBANK ATLAS-03" },
  { name: "SAC LO", sku: "SAC LO-01" },
  { name: "Sac Atlas Marrakech", sku: "SAC MARRAKECH-07" },
  { name: "Serum Derma Glow", sku: "SERUM DERMA-01" },
];

export const sourceKeyOptions = [
  "agent_manual",
  "direct",
  "excel_import",
  "facebook",
  "google",
  "Google Search",
  "Google Sheets",
  "google_sheets",
  "instagram",
  "Instagram Ads",
  "landing_page",
  "Meta Ads",
  "Mobile app",
  "mobile_app",
  "new",
  "shopify",
  "snapchat",
  "Snapchat Ads",
  "tiktok",
];

export const regionOptions = [
  "Agadir",
  "Casablanca",
  "Fes",
  "Guelmim",
  "Hay Al Qods",
  "Hay Salam",
  "Kenitra",
  "Maamora",
  "Maarif",
  "Malabata",
  "Marrakech",
  "Martil",
  "Meknes",
  "Oujda",
  "Rabat",
  "Tanger",
];

export type AssignedRule = {
  id: string;
  label: string;
  sublabel?: string;
  agent: string;
};

export const initialProductRules: AssignedRule[] = [];

export const initialSourceRules: AssignedRule[] = [
  { id: "meta-ads", label: "Meta Ads", agent: "Fatima Zahra" },
  { id: "instagram-ads", label: "Instagram Ads", agent: "Youssef Idrissi" },
];

export const initialRegionRules: AssignedRule[] = [];

export const excludedFromReassignment = ["Fatima Zahra"];
