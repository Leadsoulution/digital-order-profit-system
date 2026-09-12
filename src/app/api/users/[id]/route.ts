import { NextResponse } from "next/server";
import { getSessionProfile } from "@/lib/supabase/auth";
import {
  deleteProfile,
  setProfilePassword,
  updateProfile,
} from "@/lib/supabase/profiles";

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

export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/users/[id]">
) {
  const guard = await requireAdmin();
  if (guard.error) return guard.error;
  const { id } = await ctx.params;

  try {
    const { password, ...changes } = await request.json();
    if (password) await setProfilePassword(id, password);
    const user =
      Object.keys(changes).length > 0
        ? await updateProfile(id, changes)
        : undefined;
    return NextResponse.json({ ok: true, user });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/users/[id]">
) {
  const guard = await requireAdmin();
  if (guard.error) return guard.error;
  const { id } = await ctx.params;

  // Se supprimer soi-meme fermerait la porte a clef de l'interieur.
  if (guard.profile && id === guard.profile.id) {
    return NextResponse.json(
      { error: "Vous ne pouvez pas supprimer votre propre compte." },
      { status: 400 }
    );
  }

  try {
    await deleteProfile(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}
