import { NextResponse } from "next/server";
import { getCities } from "@/lib/forcelog/client";
import { ForceLogApiError } from "@/lib/forcelog/types";

export async function GET() {
  const apiKey = process.env.FORCELOG_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Cle API ForceLog non configuree." },
      { status: 500 }
    );
  }

  try {
    const cities = await getCities(apiKey);
    return NextResponse.json({ cities });
  } catch (error) {
    const message =
      error instanceof ForceLogApiError
        ? error.message
        : "Erreur inattendue lors de la recuperation des villes.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
