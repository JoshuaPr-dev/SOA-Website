"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "@/context/supabase-provider";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { supabase, session } = useSupabase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathname.startsWith("/admin/login")) {
      setLoading(false);
      return;
    }

    const verifySession = async () => {
      if (session === undefined) return; // encore en chargement

      if (!session) {
        console.warn("🔒 Pas de session, redirection login");
        router.replace("/admin/login");
      }
      setLoading(false);
    };

    verifySession();
  }, [pathname, session, router]);

  if (loading) {
    return <div className="loadingAdmin">Chargement...</div>;
  }

  return children;
}
