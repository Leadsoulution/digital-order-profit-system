import { getSupabaseServerClient } from "./server";

/**
 * Acces aux produits, alimentes par le stock ForceLog.
 *
 * `ref` est le code article du transporteur : c'est lui qu'on transmet
 * dans le champ STOCK d'un colis de stock, d'ou son unicite en base.
 */

export type StockProduct = {
  id: string;
  ref: string;
  name: string;
  productName: string;
  barcode?: string;
  quantity: number;
  waitingQuantity: number;
  image?: string;
};

type ProductRow = {
  id: string;
  ref: string;
  name: string;
  product_name: string | null;
  barcode: string | null;
  quantity: number;
  waiting_quantity: number;
  image: string | null;
};

const COLUMNS =
  "id,ref,name,product_name,barcode,quantity,waiting_quantity,image";

function toProduct(row: ProductRow): StockProduct {
  return {
    id: row.id,
    ref: row.ref,
    name: row.name,
    productName: row.product_name ?? row.name,
    barcode: row.barcode ?? undefined,
    quantity: row.quantity,
    waitingQuantity: row.waiting_quantity,
    image: row.image ?? undefined,
  };
}

export async function listProducts(): Promise<StockProduct[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(COLUMNS)
    .order("quantity", { ascending: false })
    .order("ref", { ascending: true });

  if (error) throw new Error(error.message);
  return (data as ProductRow[]).map(toProduct);
}

/**
 * Remplace le catalogue par l'etat courant du stock ForceLog.
 * `upsert` sur `ref` conserve les identifiants existants, ce qui evite de
 * casser d'eventuelles references a un produit deja connu.
 */
export async function syncProductsFromStock(
  items: Array<{
    ref: string;
    name: string;
    productName: string;
    barcode?: string | null;
    quantity: number;
    waitingQuantity: number;
    image?: string | null;
  }>
): Promise<number> {
  if (items.length === 0) return 0;

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .upsert(
      items.map((item) => ({
        ref: item.ref,
        name: item.name,
        product_name: item.productName,
        barcode: item.barcode ?? null,
        quantity: item.quantity,
        waiting_quantity: item.waitingQuantity,
        image: item.image ?? null,
      })),
      { onConflict: "ref" }
    )
    .select("ref");

  if (error) throw new Error(error.message);
  return data.length;
}
