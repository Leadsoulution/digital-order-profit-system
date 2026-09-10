import { NextRequest, NextResponse } from "next/server";
import { deleteLead, updateLead } from "@/lib/supabase/leads";
import { isSupabaseServerConfigured } from "@/lib/supabase/server";

function notConfigured() {
  return NextResponse.json(
    { error: "Supabase non configure." },
    { status: 500 }
  );
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/leads/[id]">
) {
  if (!isSupabaseServerConfigured) return notConfigured();
  const { id } = await ctx.params;

  let changes;
  try {
    changes = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  try {
    return NextResponse.json({ lead: await updateLead(id, changes) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/leads/[id]">
) {
  if (!isSupabaseServerConfigured) return notConfigured();
  const { id } = await ctx.params;

  try {
    await deleteLead(id);
    return NextResponse.json({ deleted: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}
