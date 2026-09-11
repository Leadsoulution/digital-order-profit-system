import { NextRequest, NextResponse } from "next/server";
import { createLead, listLeads, updateLead, updateLeads } from "@/lib/supabase/leads";
import { isSupabaseServerConfigured } from "@/lib/supabase/server";
import { AUTO_DISPATCH_STATUS, dispatchToForceLog } from "@/lib/forcelog/dispatch";

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
    const updated = await updateLeads(ids, changes);

    // Passage en "Confirme" : la commande part automatiquement chez
    // ForceLog, sauf si elle y a deja ete envoyee. Un echec transporteur
    // est enregistre dans `trackingError` et n'annule pas le changement
    // de statut.
    if (changes.status === AUTO_DISPATCH_STATUS) {
      const dispatched = await Promise.all(
        updated
          .filter((lead) => !lead.trackingNumber)
          .map(async (lead) => updateLead(lead.id, await dispatchToForceLog(lead)))
      );
      const byId = new Map(dispatched.map((lead) => [lead.id, lead]));
      return NextResponse.json({
        leads: updated.map((lead) => byId.get(lead.id) ?? lead),
      });
    }

    return NextResponse.json({ leads: updated });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}
