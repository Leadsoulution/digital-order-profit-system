import { NextRequest, NextResponse } from "next/server";
import { getParcelLabel } from "@/lib/forcelog/client";
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
    const { FILE_BASE64 } = await getParcelLabel(apiKey, code);
    const pdf = Buffer.from(FILE_BASE64, "base64");
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="forcelog-${code}.pdf"`,
      },
    });
  } catch (error) {
    const message =
      error instanceof ForceLogApiError
        ? error.message
        : "Erreur inattendue lors de la recuperation de l'etiquette.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
