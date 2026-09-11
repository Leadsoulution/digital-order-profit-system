import { NextResponse } from "next/server";
import { listLeads, updateLead } from "@/lib/supabase/leads";
import { isSupabaseServerConfigured } from "@/lib/supabase/server";
import { collectStatusUpdates } from "@/lib/forcelog/dispatch";

/**
 * Rafraichit les statuts de livraison et de paiement depuis ForceLog.
 *
 * Appelee au chargement de la page Leads & Commandes et par l'action
 * "Synchroniser". Ne renvoie que les commandes reellement modifiees.
 */
export async function POST() {
  if (!isSupabaseServerConfigured) {
    return NextResponse.json({ error: "Supabase non configure." }, { status: 500 });
  }

  try {
    const leads = await listLeads();
    const { updates, checked, error } = await collectStatusUpdates(leads);

    if (error) {
      return NextResponse.json({ error, checked }, { status: 502 });
    }

    const updated = await Promise.all(
      [...updates.entries()].map(([id, changes]) => updateLead(id, changes))
    );

    return NextResponse.json({ updated, checked });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}
