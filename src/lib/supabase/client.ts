import { createClient } from "@supabase/supabase-js";

/**
 * Browser-side Supabase client.
 *
 * Uses the publishable key, which is safe to expose to the browser —
 * access is governed by Row Level Security policies on each table, so
 * never put the secret key here.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && publishableKey);

export function getSupabaseClient() {
  if (!url || !publishableKey) {
    throw new Error(
      "Supabase non configure : NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY sont requis."
    );
  }
  return createClient(url, publishableKey);
}
