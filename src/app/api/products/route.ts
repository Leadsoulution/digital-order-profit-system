import { NextResponse } from "next/server";
import { listProducts, syncProductsFromStock } from "@/lib/supabase/products";
import { isSupabaseServerConfigured } from "@/lib/supabase/server";
import { getStock } from "@/lib/forcelog/client";
import { ForceLogApiError } from "@/lib/forcelog/types";

function notConfigured() {
  return NextResponse.json({ error: "Supabase non configure." }, { status: 500 });
}

export async function GET() {
  if (!isSupabaseServerConfigured) return notConfigured();
  try {
    return NextResponse.json({ products: await listProducts() });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}

/** Rafraichit le catalogue depuis le stock ForceLog. */
export async function POST() {
  if (!isSupabaseServerConfigured) return notConfigured();

  const apiKey = process.env.FORCELOG_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Cle API ForceLog non configuree." },
      { status: 500 }
    );
  }

  try {
    const stock = await getStock(apiKey);
    const items = Object.values(stock).flatMap((product) =>
      (product.variants ?? []).map((variant) => ({
        ref: variant.ref,
        name: variant.name || product.product_name,
        productName: product.product_name,
        barcode: variant.barcode ?? null,
        quantity: variant.quantity ?? 0,
        waitingQuantity: variant.waiting_quantity ?? 0,
        image: product.image ?? null,
      }))
    );

    const synced = await syncProductsFromStock(items);
    return NextResponse.json({ synced, products: await listProducts() });
  } catch (error) {
    const message =
      error instanceof ForceLogApiError
        ? error.message
        : error instanceof Error
        ? error.message
        : "Erreur inattendue.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
