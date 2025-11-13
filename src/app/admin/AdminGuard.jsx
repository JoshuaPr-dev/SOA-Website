"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "../../context/supabase-provider";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { supabase, session: contextSession } = useSupabase();

  const [session, setSession] = useState(contextSession);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      console.log("🔍 Vérification de la session...");

      if (contextSession) {
        console.log("✅ Session détectée via le contexte");
        setSession(contextSession);
        setLoading(false);
        return;
      }


      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(
          "⚠️ Erreur lors de la récupération de la session :",
          error
        );
      }

      if (data?.session) {
        console.log("✅ Session valide :", data.session);
        setSession(data.session);
      } else {
        console.warn("❌ Aucune session — redirection vers /admin/login");
        if (pathname !== "/admin/login") {
          router.replace("/admin/login");
        }
      }

      setLoading(false);
    };

    loadSession();


    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        console.log("🔄 Changement de session détecté :", newSession);
        setSession(newSession);
        if (newSession && pathname === "/admin/login") {
          router.replace("/admin/temoignages");
        }
        if (!newSession && pathname !== "/admin/login") {
          router.replace("/admin/login");
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [contextSession, pathname, supabase, router]);


  if (loading) {
    return <div className="loadingAdmin">Chargement de la session...</div>;
  }

  if (!session && pathname !== "/admin/login") {
    return <div>Redirection...</div>;
  }
  return children;
}
