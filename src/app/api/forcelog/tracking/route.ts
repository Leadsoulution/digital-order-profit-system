import { NextRequest, NextResponse } from "next/server";
import { getTracking } from "@/lib/forcelog/client";
import { ForceLogApiError } from "@/lib/forcelog/types";

export async function GET(request: NextRequest) {
  const apiKey = process.env.FORCELOG_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Cle API ForceLog non configuree." },
      { status: 500 }
    );
  }

  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json(
      { error: "Parametre 'code' requis." },
      { status: 400 }
    );
  }

  try {
    const tracking = await getTracking(apiKey, code);
    return NextResponse.json(tracking);
  } catch (error) {
    const message =
      error instanceof ForceLogApiError
        ? error.message
        : "Erreur inattendue lors de la recuperation du tracking.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
