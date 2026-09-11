import { NextResponse } from "next/server";
import { getStock } from "@/lib/forcelog/client";
import { ForceLogApiError } from "@/lib/forcelog/types";

/** Produits disponibles dans le depot ForceLog, pour les colis de stock. */
export async function GET() {
  const apiKey = process.env.FORCELOG_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Cle API ForceLog non configuree." },
      { status: 500 }
    );
  }

  try {
    const stock = await getStock(apiKey);

    // Aplati en une liste de variantes directement affichable, en
    // ecartant celles qui ne sont plus disponibles.
    const items = Object.values(stock).flatMap((product) =>
      (product.variants ?? [])
        .filter((variant) => variant.quantity > 0)
        .map((variant) => ({
          ref: variant.ref,
          name: variant.name || product.product_name,
          productName: product.product_name,
          barcode: variant.barcode ?? null,
          quantity: variant.quantity,
          image: product.image ?? null,
        }))
    );

    return NextResponse.json({ items });
  } catch (error) {
    const message =
      error instanceof ForceLogApiError
        ? error.message
        : "Erreur inattendue lors de la recuperation du stock.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
