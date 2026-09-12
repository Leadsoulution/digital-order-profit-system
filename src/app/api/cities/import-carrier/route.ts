import { NextResponse } from "next/server";
import { getCities } from "@/lib/forcelog/client";
import { ForceLogApiError } from "@/lib/forcelog/types";
import { upsertCities, type CityInput } from "@/lib/supabase/cities";

/**
 * Importe les villes desservies par ForceLog, avec leurs frais de
 * livraison. Les villes deja presentes sont mises a jour, sauf celles
 * dont le tarif a ete force en interne : c'est tout l'objet d'un tarif
 * force que de resister a un reimport.
 */
export async function POST() {
  const apiKey = process.env.FORCELOG_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Cle API ForceLog non configuree." },
      { status: 500 }
    );
  }

  try {
    const cities = await getCities(apiKey);
    const inputs: CityInput[] = Object.values(cities)
      .filter((city) => city?.NAME)
      .map((city) => ({
        name: city.NAME,
        carrierCode: city.CODE,
        tariff: Number(city.D_FEES) || 0,
        tariffSource: "transporteur" as const,
      }));

    const result = await upsertCities(inputs);
    return NextResponse.json({ ...result, total: inputs.length });
  } catch (error) {
    const message =
      error instanceof ForceLogApiError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Erreur inattendue lors de l'import.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
