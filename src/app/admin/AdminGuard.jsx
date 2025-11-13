"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "@/context/supabase-provider";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { session } = useSupabase(); // ✅ on utilise directement la session du Provider
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    // ✅ on attend que la session soit initialisée par le provider
    if (session === undefined) return; // encore en train de charger
    if (session === null) {
      console.warn("❌ Pas de session, redirection vers /admin/login");
      router.replace("/admin/login");
    } else {
      console.log("✅ Session valide, accès autorisé :", session.user?.email);
    }

    setChecking(false);
  }, [pathname, session, router]);

  if (checking) {
    return <div className="loadingAdmin">Vérification de la session...</div>;
  }

  if (!session && pathname !== "/admin/login") {
    return <div>Redirection...</div>;
  }

  return <>{children}</>;
}
