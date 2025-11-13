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
    const verifySession = async () => {
      console.log("🔍 Vérification de la session...");

      if (session) {
        console.log("✅ Session détectée via le contexte :", session);
        setChecking(false);
        return;
      }

      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        console.log("✅ Session valide détectée via getSession()");
        setChecking(false);
      } else {
        console.warn(
          "❌ Aucune session trouvée, redirection vers /admin/login"
        );
        router.replace("/admin/login");
      }
    };

    verifySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log("🔄 Changement de session détecté :", newSession);
      if (newSession) setChecking(false);
      else if (pathname !== "/admin/login") router.replace("/admin/login");
    });

    return () => subscription.unsubscribe();
  }, [supabase, session, router, pathname]);

  if (checking) {
    return <div className="loadingAdmin">Vérification de la session...</div>;
  }

  return children;
}
