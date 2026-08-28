export type Supplier = {
  id: string;
  name: string;
  contactName: string;
  phone: string;
  email: string;
  productsCount: number;
  unitsSupplied: number;
  paid: number;
  balanceDue: number;
  dueDate: string;
};

export const suppliers: Supplier[] = [
  {
    id: "atlas-tech-distribution",
    name: "Atlas Tech Distribution",
    contactName: "Youssef Benkirane",
    phone: "+212661245780",
    email: "contact@atlastech.ma",
    productsCount: 3,
    unitsSupplied: 96000,
    paid: 26185200,
    balanceDue: 1594800,
    dueDate: "09 sept. 2026",
  },
  {
    id: "sahara-beauty-labs",
    name: "Sahara Beauty Labs",
    contactName: "Raja El Amrani",
    phone: "+212662104533",
    email: "orders@saharabeauty.ma",
    productsCount: 2,
    unitsSupplied: 68000,
    paid: 7211920,
    balanceDue: 486080,
    dueDate: "09 sept. 2026",
  },
  {
    id: "casa-home-textile",
    name: "Casa Home Textile",
    contactName: "Soukaina Kabbaj",
    phone: "+212663882419",
    email: "sourcing@casahometextile.ma",
    productsCount: 3,
    unitsSupplied: 58000,
    paid: 10554800,
    balanceDue: 625200,
    dueDate: "09 sept. 2026",
  },
  {
    id: "marrakech-craft-studio",
    name: "Marrakech Craft Studio",
    contactName: "Amina Bensalem",
    phone: "+212650338711",
    email: "commercial@marrakechcraft.ma",
    productsCount: 2,
    unitsSupplied: 39000,
    paid: 4987400,
    balanceDue: 282600,
    dueDate: "09 sept. 2026",
  },
  {
    id: "rif-logistics-supply",
    name: "Rif Logistics Supply",
    contactName: "Omar Tazi",
    phone: "+212539801234",
    email: "pro@riflogistics.ma",
    productsCount: 1,
    unitsSupplied: 18000,
    paid: 2350400,
    balanceDue: 129600,
    dueDate: "09 sept. 2026",
  },
  {
    id: "maghreb-care-labs",
    name: "Maghreb Care Labs",
    contactName: "Nora El Idrissi",
    phone: "+212661902744",
    email: "sales@maghrebcare.ma",
    productsCount: 1,
    unitsSupplied: 34000,
    paid: 4602640,
    balanceDue: 273360,
    dueDate: "09 sept. 2026",
  },
];
