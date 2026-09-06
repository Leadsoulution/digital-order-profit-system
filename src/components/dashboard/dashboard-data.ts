export type KpiCard = {
  label: string;
  value: number;
  unit?: "MAD";
  subtitle?: string;
  trend: string;
  trendUp: boolean;
  spark: number[];
};

export const kpiCards: KpiCard[] = [
  {
    label: "Leads de la periode",
    value: 48745,
    trend: "-100%",
    trendUp: false,
    spark: [8, 6, 7, 5, 6, 8, 55],
  },
  {
    label: "Confirmes",
    value: 31328,
    subtitle: "64%",
    trend: "-100%",
    trendUp: false,
    spark: [6, 5, 6, 4, 5, 7, 42],
  },
  {
    label: "En attente",
    value: 6325,
    subtitle: "a traiter",
    trend: "-100%",
    trendUp: false,
    spark: [4, 3, 5, 6, 8, 12, 20],
  },
  {
    label: "Pas de reponse",
    value: 0,
    trend: "+0%",
    trendUp: false,
    spark: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    label: "Expedies",
    value: 5455,
    trend: "-100%",
    trendUp: false,
    spark: [3, 2, 3, 2, 4, 6, 18],
  },
  {
    label: "Livres",
    value: 22869,
    subtitle: "76% livres",
    trend: "-100%",
    trendUp: false,
    spark: [5, 4, 5, 4, 6, 9, 38],
  },
  {
    label: "COGS collecte",
    value: 19485231.34,
    unit: "MAD",
    trend: "-100%",
    trendUp: false,
    spark: [6, 5, 7, 5, 8, 12, 40],
  },
  {
    label: "Profit net estime",
    value: -29278287,
    unit: "MAD",
    subtitle: "marge nette",
    trend: "+100%",
    trendUp: true,
    spark: [2, 3, 3, 4, 5, 6, 8],
  },
];

export const periodScale: Record<string, number> = {
  "Aujourd'hui": 0.015,
  Hier: 0.018,
  "7 derniers jours": 0.11,
  "Ce mois-ci": 0.32,
  Maximum: 1,
};

export function scaleCount(value: number, scale: number) {
  return Math.round(value * scale);
}

export function formatKpiValue(kpi: { value: number; unit?: "MAD" }, scale: number) {
  const scaled = kpi.value * scale;
  const hasDecimals = !Number.isInteger(kpi.value);
  const sign = scaled < 0 ? "-" : "";
  const formatted = Math.abs(scaled).toLocaleString("fr-FR", {
    maximumFractionDigits: hasDecimals ? 2 : 0,
    minimumFractionDigits: hasDecimals ? 2 : 0,
  });
  return kpi.unit ? `${sign}${formatted} ${kpi.unit}` : `${sign}${formatted}`;
}

export type FunnelStage = {
  label: string;
  value: number;
  percent: number;
  delta: string;
  color: string;
};

export const funnelStages: FunnelStage[] = [
  { label: "Total leads", value: 48745, percent: 100, delta: "", color: "bg-blue-500" },
  { label: "Assignes", value: 47017, percent: 96, delta: "+4%", color: "bg-violet-500" },
  { label: "Contactes", value: 42430, percent: 87, delta: "+10%", color: "bg-indigo-500" },
  { label: "Confirmes", value: 31328, percent: 64, delta: "+26%", color: "bg-emerald-500" },
  { label: "Expedies", value: 30173, percent: 62, delta: "+4%", color: "bg-cyan-500" },
  { label: "Livres", value: 22869, percent: 47, delta: "+24%", color: "bg-green-500" },
];

export type SourceSlice = {
  label: string;
  value: number;
  percent: number;
  color: string;
};

export const leadsBySource: SourceSlice[] = [
  { label: "landing_page", value: 35226, percent: 72, color: "#3b82f6" },
  { label: "shopify", value: 3418, percent: 7, color: "#22c55e" },
  { label: "woocommerce", value: 2828, percent: 6, color: "#a855f7" },
  { label: "google_sheets", value: 2743, percent: 6, color: "#f59e0b" },
  { label: "direct", value: 1916, percent: 4, color: "#6366f1" },
  { label: "whatsapp", value: 2612, percent: 5, color: "#ec4899" },
];

export const weeklyTrend = {
  labels: ["3 aout", "10 aout", "17 aout", "24 aout", "31 aout", "7 sept.", "14 sept."],
  leads: [1200, 1450, 1380, 1600, 1820, 2100, 6800],
  confirmes: [800, 950, 900, 1050, 1200, 1450, 4400],
};

export const operationalInsights = [
  { text: "4 produits en stock bas", tone: "warning" as const },
  { text: "Top produit : Montre Pro X V2", tone: "info" as const },
  { text: "Top agent : Fatima Zahra", tone: "info" as const },
  { text: "Meilleure source : landing_page", tone: "info" as const },
];

export const topProducts = [
  { name: "Montre Pro X V2", count: 1284 },
  { name: "Ecouteurs Elite ANC", count: 976 },
  { name: "Serum Derma Glow", count: 842 },
  { name: "Sac Cuir Marrakech", count: 711 },
];

export const adPerformance = [
  { platform: "Instagram", campaign: "Instagram Ads", metric: "+18%" },
  { platform: "TikTok", campaign: "TikTok Spark Ads", metric: "+9%" },
  { platform: "Meta", campaign: "Meta COD Ads", metric: "+14%" },
  { platform: "Google", campaign: "Google Search Ads", metric: "+6%" },
  { platform: "Snapchat", campaign: "Snapchat Ads", metric: "+3%" },
];

export type SourceHealth = {
  name: string;
  status: string;
  color: string;
  fill: number;
};

export const leadSourceHealth: SourceHealth[] = [
  { name: "Google Sheets", status: "Derniere synchronisation il y a 2h", color: "bg-amber-500", fill: 62 },
  { name: "Shopify", status: "Derniere synchronisation il y a 5 min", color: "bg-emerald-500", fill: 96 },
  { name: "WooCommerce", status: "Derniere synchronisation il y a 1j", color: "bg-violet-500", fill: 40 },
];

export const carrierHealth: SourceHealth[] = [
  { name: "Sendit", status: "Derniere synchronisation il y a 10 min", color: "bg-emerald-500", fill: 92 },
  { name: "Ozexpress", status: "Derniere synchronisation il y a 1h", color: "bg-blue-500", fill: 78 },
  { name: "Cathedis", status: "Derniere synchronisation il y a 3h", color: "bg-amber-500", fill: 54 },
];
