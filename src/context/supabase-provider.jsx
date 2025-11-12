"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const syncSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session ?? null);
    };

    syncSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase doit être utilisé dans un <SupabaseProvider>");
  }
  return context;
};
