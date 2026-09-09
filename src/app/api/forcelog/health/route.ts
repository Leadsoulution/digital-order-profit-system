import { NextResponse } from "next/server";
import { checkHealth } from "@/lib/forcelog/client";

export async function GET() {
  const apiKey = process.env.FORCELOG_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { connected: false, message: "Cle API ForceLog non configuree." },
      { status: 200 }
    );
  }

  const connected = await checkHealth(apiKey);
  return NextResponse.json({
    connected,
    message: connected
      ? undefined
      : "Connexion ForceLog impossible avec cette cle API.",
  });
}
