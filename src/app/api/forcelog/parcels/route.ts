import { NextRequest, NextResponse } from "next/server";
import { addParcel } from "@/lib/forcelog/client";
import { mapOrderToParcel, type MappableOrder } from "@/lib/forcelog/mapping";
import { ForceLogApiError } from "@/lib/forcelog/types";

export async function POST(request: NextRequest) {
  const apiKey = process.env.FORCELOG_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Cle API ForceLog non configuree." },
      { status: 500 }
    );
  }

  let order: MappableOrder;
  try {
    order = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requete JSON invalide." },
      { status: 400 }
    );
  }

  if (!order?.reference || !order?.client || !order?.phone) {
    return NextResponse.json(
      { error: "Champs requis manquants (reference, client, phone)." },
      { status: 400 }
    );
  }

  try {
    const parcel = await addParcel(apiKey, mapOrderToParcel(order));
    return NextResponse.json({
      trackingNumber: parcel.TRACKING_NUMBER,
      code: parcel.CODE,
    });
  } catch (error) {
    const message =
      error instanceof ForceLogApiError
        ? error.message
        : "Erreur inattendue lors de la creation du colis.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
