import { NextResponse } from "next/server";
import { getSessionProfile } from "@/lib/supabase/auth";
import { createProfile, listProfiles } from "@/lib/supabase/profiles";
import { isSupabaseServerConfigured } from "@/lib/supabase/server";

/**
 * Gestion des comptes. Reserve aux administrateurs : le proxy verifie
 * seulement qu'une session existe, l'autorisation se decide ici.
 */
async function requireAdmin() {
  const profile = await getSessionProfile();
  if (!profile) {
    return { error: NextResponse.json({ error: "Non connecte." }, { status: 401 }) };
  }
  if (profile.role !== "Admin") {
    return {
      error: NextResponse.json(
        { error: "Reserve aux administrateurs." },
        { status: 403 }
      ),
    };
  }
  return { profile };
}

export async function GET() {
  if (!isSupabaseServerConfigured) {
    return NextResponse.json({ error: "Supabase non configure." }, { status: 500 });
  }
  const guard = await requireAdmin();
  if (guard.error) return guard.error;

  try {
    return NextResponse.json({ users: await listProfiles() });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard.error) return guard.error;

  try {
    const body = await request.json();
    if (!body.password) {
      return NextResponse.json({ error: "Mot de passe requis." }, { status: 400 });
    }
    return NextResponse.json({ user: await createProfile(body) }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 400 }
    );
  }
}
