import { NextResponse } from "next/server";
import { getSessionProfile } from "@/lib/supabase/auth";

/** Fiche de l'utilisateur connecte, pour l'en-tete de l'application. */
export async function GET() {
  try {
    const profile = await getSessionProfile();
    if (!profile) {
      return NextResponse.json({ error: "Non connecte." }, { status: 401 });
    }
    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}
