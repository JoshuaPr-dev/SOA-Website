"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const supabase =
    globalThis.__supabase ||
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          storageKey: "strength-supabase-auth",
          detectSessionInUrl: false,
        },
      }
    );

  globalThis.__supabase = supabase;

  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) setSession(data?.session ?? null);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, sess) => {
      if (mounted) setSession(sess);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => useContext(SupabaseContext);
