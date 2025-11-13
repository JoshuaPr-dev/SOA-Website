"use client";
export const dynamic = "force-dynamic"; 

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "../../context/supabase-provider";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { supabase, session } = useSupabase();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    const verifySession = async () => {
      try {
        console.log("🔍 Vérification de la session admin...");
        const { data } = await supabase.auth.getSession();
        console.log("📦 Session trouvée:", data.session);

        if (!data?.session) {
          console.warn("❌ Pas de session, redirection vers /admin/login");
          router.replace("/admin/login");
        } else {
          console.log("✅ Accès autorisé à la page admin");
        }
      } catch (err) {
        console.error("⚠️ Erreur vérification session :", err);
        router.replace("/admin/login");
      } finally {
        setChecking(false);
      }
    };

    const timeout = setTimeout(verifySession, 400);
    return () => clearTimeout(timeout);
  }, [pathname, supabase, router]);

  if (checking) {
    return <div className="loadingAdmin">Chargement en cours...</div>;
  }

  return children;
}
