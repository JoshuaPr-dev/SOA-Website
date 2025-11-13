"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [supabase] = useState(() =>
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: typeof window !== "undefined" ? window.localStorage : undefined,
        },
      }
    )
  );

  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await new Promise((r) => setTimeout(r, 400));
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(data?.session ?? null);

        const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
          if (mounted) setSession(sess);
        });

        return () => listener.subscription.unsubscribe();
      } catch (err) {
        console.error("⚠️ Erreur d’initialisation Supabase:", err);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  if (session === undefined) {
    return <div className="loadingAdmin">Chargement de la session...</div>;
  }

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => useContext(SupabaseContext);
