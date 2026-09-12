import { NextResponse } from "next/server";
import {
  createCity,
  deleteCities,
  listCities,
  upsertCities,
} from "@/lib/supabase/cities";
import { isSupabaseServerConfigured } from "@/lib/supabase/server";

/**
 * Dictionnaire des villes canoniques.
 *
 * L'acces est deja filtre par le proxy : seule une personne connectee
 * arrive ici. Contrairement aux comptes, les villes se consultent et se
 * corrigent par toute l'equipe, pas seulement par un administrateur.
 */

export async function GET() {
  if (!isSupabaseServerConfigured) {
    return NextResponse.json({ error: "Supabase non configure." }, { status: 500 });
  }
  try {
    return NextResponse.json({ cities: await listCities() });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Un tableau : import en masse (fichier ou transporteur).
    if (Array.isArray(body.cities)) {
      const result = await upsertCities(body.cities);
      return NextResponse.json(result);
    }
    return NextResponse.json({ city: await createCity(body) }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Aucune ville a supprimer." }, { status: 400 });
    }
    await deleteCities(ids);
    return NextResponse.json({ ok: true, deleted: ids.length });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}
