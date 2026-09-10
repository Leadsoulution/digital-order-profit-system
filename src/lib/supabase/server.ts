import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client, for API routes only.
 *
 * Uses the secret key, which bypasses Row Level Security — it must never
 * be imported from a client component. Same convention as the ForceLog
 * client: the credential is read from the environment here and never
 * reaches the browser.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

export const isSupabaseServerConfigured = Boolean(url && secretKey);

export function getSupabaseServerClient() {
  if (!url || !secretKey) {
    throw new Error(
      "Supabase non configure cote serveur : NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SECRET_KEY sont requis."
    );
  }
  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
