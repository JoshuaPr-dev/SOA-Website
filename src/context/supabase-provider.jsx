"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storageKey: "strength-supabase-auth",
        },
      }
    )
  );

  const [session, setSession] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session ?? null);

      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, sess) => setSession(sess)
      );

      return () => {
        listener.subscription.unsubscribe();
      };
    };

    init();
  }, [supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => useContext(SupabaseContext);
