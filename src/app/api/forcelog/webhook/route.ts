import { NextRequest, NextResponse } from "next/server";
import { findLeadByTrackingNumber, updateLead } from "@/lib/supabase/leads";
import { isSupabaseServerConfigured } from "@/lib/supabase/server";

/**
 * Recoit les notifications de changement de statut envoyees par ForceLog.
 *
 * ForceLog ne documente ni format de payload ni signature, donc on accepte
 * un evenement proche de la forme des colis renvoyes par GetParcels et on
 * protege l'endpoint par un secret partage optionnel
 * (FORCELOG_WEBHOOK_SECRET, transmis en en-tete `X-Webhook-Secret`).
 * Laisser la variable vide accepte les appels non authentifies, utile le
 * temps de la mise en place.
 *
 * C'est le chemin qui permet de mettre a jour un colis au-dela des 20 plus
 * recents, seuls accessibles en lecture via l'API.
 */

type ForceLogWebhookPayload = {
  TRACKING_NUMBER?: string;
  CODE?: string;
  ORDER_NUM?: string;
  STATUS?: string;
  STATUS_CODE?: string;
  SITUATION?: string;
  /**
   * Livreur et date de livraison : absents de GetParcels, donc le webhook
   * est la seule source transporteur possible. Le nom exact du champ n'est
   * pas documente, on accepte les variantes rencontrees.
   */
  DELIVERY_AGENT?: string;
  DELIVERYMAN?: string;
  LIVREUR?: string;
  DELIVERY_DATE?: string;
  DELIVERED_AT?: string;
  DELIVERY_TIME?: string;
};

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.FORCELOG_WEBHOOK_SECRET;
  if (expectedSecret) {
    const provided = request.headers.get("x-webhook-secret");
    if (provided !== expectedSecret) {
      return NextResponse.json({ error: "Signature invalide." }, { status: 401 });
    }
  }

  let payload: ForceLogWebhookPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requete JSON invalide." },
      { status: 400 }
    );
  }

  const trackingNumber = payload.TRACKING_NUMBER ?? payload.CODE;
  if (!trackingNumber) {
    return NextResponse.json(
      { error: "Evenement invalide : TRACKING_NUMBER ou CODE requis." },
      { status: 400 }
    );
  }

  if (!isSupabaseServerConfigured) {
    return NextResponse.json({ error: "Supabase non configure." }, { status: 500 });
  }

  try {
    const lead = await findLeadByTrackingNumber(trackingNumber);
    if (!lead) {
      // 200 volontaire : le colis n'appartient pas a cette application,
      // ce n'est pas une erreur pour ForceLog qui n'a pas a reessayer.
      return NextResponse.json({ received: true, matched: false });
    }

    await updateLead(lead.id, {
      deliveryStatus: payload.STATUS ?? lead.deliveryStatus,
      deliveryStatusCode: payload.STATUS_CODE ?? lead.deliveryStatusCode,
      paymentStatus: payload.SITUATION ?? lead.paymentStatus,
      deliverer:
        payload.DELIVERY_AGENT ??
        payload.DELIVERYMAN ??
        payload.LIVREUR ??
        lead.deliverer,
      deliveryDate:
        payload.DELIVERY_DATE ??
        payload.DELIVERED_AT ??
        payload.DELIVERY_TIME ??
        lead.deliveryDate,
    });

    return NextResponse.json({ received: true, matched: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inattendue." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message:
      "Endpoint webhook ForceLog. Configurez cette URL cote ForceLog pour recevoir les mises a jour de statut des colis (POST).",
  });
}
