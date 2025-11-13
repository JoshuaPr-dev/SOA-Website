"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"; 

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [supabase] = useState(() =>
    createBrowserSupabaseClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      options: {
        auth: {
          persistSession: true, 
          autoRefreshToken: true, 
          detectSessionInUrl: true, 
          storageKey: "strength-supabase-auth", 
        },
      },
    })
  );

  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (mounted) setSession(data?.session ?? null);

        const { data: listener } = supabase.auth.onAuthStateChange(
          (_event, sess) => {
            if (mounted) setSession(sess);
          }
        );

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
