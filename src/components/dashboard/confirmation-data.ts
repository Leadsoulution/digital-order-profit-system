export type AgentPerformance = {
  name: string;
  email: string;
  active: boolean;
  avatarColor: string;
  confirmRate: number;
  avgResponseTime: string;
  firstResponseTime: string;
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
    assigned: 5623,
    contacted: 5272,
    confirmed: 4075,
    pending: 103,
  },
  {
    name: "Imane Lahlou",
    email: "agent@lead2door.com",
    active: true,
    avatarColor: "bg-violet-500",
    confirmRate: 74,
    avgResponseTime: "5h 44m",
    firstResponseTime: "26m",
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
  status: "Confirme" | "Manque" | "En cours";
};

export const callHistoryByAgent: Record<string, CallHistoryEntry[]> = {
  "Fatima Zahra": [
    { reference: "LD-000834-0424", phone: "0660164362", duration: "15s", status: "Manque" },
  ],
  "Hamza Berrada": [
    { reference: "CS-048083-0779", phone: "0622161711", duration: "10m 25s", status: "Confirme" },
    { reference: "LD-048641-0779", phone: "0630053131", duration: "8m 55s", status: "Confirme" },
    { reference: "LD-048225-0779", phone: "0666686869", duration: "12m 45s", status: "Confirme" },
    { reference: "CS-045570-0779", phone: "0623145234", duration: "3m", status: "Manque" },
    { reference: "LD-048078-0779", phone: "0606060606", duration: "4m", status: "Confirme" },
  ],
};

export const rebalanceModes = ["Par pourcentage", "Par produit", "Par source"];

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

export const sourceKeyOptions = [
  "agent_manual",
  "direct",
  "excel_import",
  "facebook",
  "google",
  "google_search",
  "google_sheets",
  "instagram",
  "instagram_ads",
  "landing_page",
  "meta_ads",
  "mobile_app",
];

export type SourceRule = {
  source: string;
  agent: string;
};

export const sourceRules: SourceRule[] = [
  { source: "Meta Ads", agent: "Fatima Zahra" },
  { source: "Instagram Ads", agent: "Youssef Idrissi" },
];

export const excludedFromReassignment = ["Imane Lahlou"];
