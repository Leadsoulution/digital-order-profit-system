export type FinanceKpi = {
  label: string;
  value: number;
  subtitle: string;
  badge?: string;
  badgeTone: "emerald" | "orange" | "red" | "neutral";
  spark?: number[];
  sparkPositive?: boolean;
};

export const financeKpis: FinanceKpi[] = [
  {
    label: "Revenu total",
    value: 27297076,
    subtitle: "commandes confirmees",
    badgeTone: "neutral",
    spark: [4, 5, 5, 6, 6, 8, 22],
    sparkPositive: true,
  },
  {
    label: "COD recu",
    value: 19759002,
    subtitle: "livre et collecte",
    badgeTone: "neutral",
    spark: [3, 4, 4, 5, 6, 7, 16],
    sparkPositive: true,
  },
  {
    label: "COD en attente",
    value: 7538075,
    subtitle: "a collecter",
    badge: "En cours",
    badgeTone: "orange",
  },
  {
    label: "Profit estime",
    value: -28891198,
    subtitle: "revenu - depenses",
    badge: "negatif",
    badgeTone: "red",
    spark: [10, 22, 30, 24, 12, 6, 6],
    sparkPositive: false,
  },
];

export type ExpenseKpi = {
  label: string;
  value: number;
  subtitle: string;
};

export const expenseKpis: ExpenseKpi[] = [
  {
    label: "Achats fournisseurs",
    value: 55194000,
    subtitle: "sorties achat produit",
  },
  {
    label: "Paiements fournisseurs",
    value: 3930000,
    subtitle: "reglements fournisseur",
  },
  {
    label: "Frais livraison",
    value: 979874,
    subtitle: "sorties livraison des commandes",
  },
  {
    label: "Depenses manuelles",
    value: 14400,
    subtitle: "depenses operationnelles",
  },
  {
    label: "Total depenses",
    value: 60118274,
    subtitle: "livraison + achats + paiements",
  },
];

export const cashflowMonths = ["mars", "avr.", "mai", "juin", "juil.", "aout"];

export const cashflowSeries = [
  { name: "depenses", data: [6000, 55000, 8000, 1200, 900, 700], color: "#ef4444" },
  { name: "revenu", data: [0, 200, 700, 8500, 11800, 15200], color: "#10b981" },
];

export const expenseCategories = [
  "Achat produit",
  "Livraison",
  "Marketing",
  "Salaires",
  "Loyer",
  "Logiciels",
  "Autre",
];
