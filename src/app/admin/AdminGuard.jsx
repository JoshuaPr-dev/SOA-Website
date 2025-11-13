"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "../../context/supabase-provider";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { supabase } = useSupabase();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔍 Vérification de la session...");

      try {
        const { data } = await supabase.auth.getSession();
        console.log("📦 Session trouvée :", data?.session);

        if (data?.session) {
          console.log("✅ Session valide, accès autorisé");
          setSession(data.session);
        } else {
          console.warn("❌ Pas de session — redirection vers /admin/login");
          if (pathname !== "/admin/login") {
            router.replace("/admin/login");
          }
        }
      } catch (err) {
        console.error("⚠️ Erreur lors de la vérification de la session :", err);
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log("🔄 Changement de session détecté :", newSession);
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, [pathname, supabase, router]);

  if (loading) {
    return <div className="loadingAdmin">Chargement de la session...</div>;
  }

  if (!session && pathname !== "/admin/login") {
    return <div>Redirection...</div>;
  }

  return children;
}
