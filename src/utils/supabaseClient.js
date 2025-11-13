"use client";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("🔍 Vérif Supabase client:");
console.log("URL:", supabaseUrl || "❌ Aucune URL trouvée");
console.log(
  "Key:",
  supabaseAnonKey ? "✅ Clé détectée" : "❌ Aucune clé trouvée"
);

const isBrowser = typeof window !== "undefined";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "strength-supabase-auth",
    storage: isBrowser ? window.localStorage : undefined,
  },
});
