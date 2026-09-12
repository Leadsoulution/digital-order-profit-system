import { NextResponse } from "next/server";
import { getSupabaseAuthClient } from "@/lib/supabase/auth";

/** Deconnexion : Supabase efface les cookies de session. */
export async function POST() {
  const supabase = await getSupabaseAuthClient();
  await supabase.auth.signOut();
  return NextResponse.json({ ok: true });
}
