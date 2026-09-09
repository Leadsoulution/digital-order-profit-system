import { NextRequest, NextResponse } from "next/server";

/**
 * Receives parcel status push notifications from ForceLog.
 *
 * ForceLog's REST docs don't specify a webhook payload shape or a
 * signing scheme, so this accepts a tracking-event-like body and
 * optionally checks a shared secret configured on both sides via
 * FORCELOG_WEBHOOK_SECRET (sent back as `X-Webhook-Secret`). Leave the
 * env var empty to accept unauthenticated calls during setup/testing.
 *
 * This app has no database, so there is nothing durable to update yet —
 * this endpoint validates and logs the event so it's ready to wire into
 * real order storage once one exists.
 */

type ForceLogWebhookPayload = {
  CODE?: string;
  TRACKING_NUMBER?: string;
  ORDER_NUM?: string;
  STATUS_CODE?: string;
  STATUS_NAME?: string;
  CITY_NAME?: string;
  TIMESTAMP?: number;
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

  if (!payload.TRACKING_NUMBER && !payload.CODE) {
    return NextResponse.json(
      { error: "Evenement invalide : TRACKING_NUMBER ou CODE requis." },
      { status: 400 }
    );
  }

  console.log("[forcelog-webhook] statut recu", payload);

  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({
    message:
      "Endpoint webhook ForceLog. Configurez cette URL cote ForceLog pour recevoir les mises a jour de statut des colis (POST).",
  });
}
