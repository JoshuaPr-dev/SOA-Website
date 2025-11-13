"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  );

  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.error("Erreur getSession:", error);
        if (mounted) setSession(data?.session ?? null);

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, newSession) => {
          if (mounted) setSession(newSession);
        });

        return () => subscription.unsubscribe();
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
