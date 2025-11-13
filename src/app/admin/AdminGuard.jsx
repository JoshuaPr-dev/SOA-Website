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
    const checkAuth = async () => {
      if (pathname === "/admin/login") {
        setChecking(false);
        return;
      }

      if (session === undefined) {
        console.log("⏳ En attente de l’hydratation Supabase...");
        return;
      }

      if (!session) {
        console.warn("❌ Aucune session active, redirection...");
        router.replace("/admin/login");
      } else {
        console.log("✅ Session active, accès autorisé à", pathname);
      }

      setChecking(false);
    };

    checkAuth();
  }, [pathname, session, router]);

  if (checking || session === undefined) {
    return <div className="loadingAdmin">Chargement de la session...</div>;
  }

  if (!session && pathname !== "/admin/login") {
    return <div>Redirection...</div>;
  }

  return children;
}
