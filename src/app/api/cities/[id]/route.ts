import { NextResponse } from "next/server";
import { deleteCities, updateCity } from "@/lib/supabase/cities";

export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/cities/[id]">
) {
  const { id } = await ctx.params;
  try {
    const changes = await request.json();
    return NextResponse.json({ city: await updateCity(id, changes) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/cities/[id]">
) {
  const { id } = await ctx.params;
  try {
    await deleteCities([id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}
