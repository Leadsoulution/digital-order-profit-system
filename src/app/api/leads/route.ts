import { NextRequest, NextResponse } from "next/server";
import { createLead, listLeads, updateLeads } from "@/lib/supabase/leads";
import { isSupabaseServerConfigured } from "@/lib/supabase/server";

function notConfigured() {
  return NextResponse.json(
    { error: "Supabase non configure." },
    { status: 500 }
  );
}

export async function GET() {
  if (!isSupabaseServerConfigured) return notConfigured();
  try {
    return NextResponse.json({ leads: await listLeads() });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isSupabaseServerConfigured) return notConfigured();

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  if (!body?.reference || !body?.client || !body?.phone) {
    return NextResponse.json(
      { error: "Champs requis manquants (reference, client, phone)." },
      { status: 400 }
    );
  }

  try {
    return NextResponse.json({ lead: await createLead(body) }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}

/** Bulk update, used by the multi-select "Assigner" / "Changer statut" actions. */
export async function PATCH(request: NextRequest) {
  if (!isSupabaseServerConfigured) return notConfigured();

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const { ids, changes } = body ?? {};
  if (!Array.isArray(ids) || ids.length === 0 || !changes) {
    return NextResponse.json(
      { error: "Parametres requis : ids (tableau non vide) et changes." },
      { status: 400 }
    );
  }

  try {
    return NextResponse.json({ leads: await updateLeads(ids, changes) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}
