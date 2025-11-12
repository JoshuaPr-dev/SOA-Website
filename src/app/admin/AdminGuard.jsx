"use client";
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
        const { data } = await supabase.auth.getSession();
        console.log("📦 Session récupérée :", data.session);

        if (!data?.session) {
          console.warn("❌ Aucune session, redirection vers /admin/login");
          router.replace("/admin/login");
        } else {
          console.log("✅ Session valide, accès autorisé");
        }
      } catch (err) {
        console.error("⚠️ Erreur vérification session :", err);
        router.replace("/admin/login");
      } finally {
        setChecking(false);
      }
    };

    verifySession();
  }, [pathname, supabase, router]);

  if (checking) {
    return <div className="loadingAdmin">Chargement en cours...</div>;
  }

  return children;
}
