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
          storageKey: "strength-supabase-auth",
          storage: typeof window !== "undefined" ? window.localStorage : undefined, 
        },
      }
    )
  );

  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session ?? null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => useContext(SupabaseContext);
