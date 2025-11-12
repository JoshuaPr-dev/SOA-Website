"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "../../context/supabase-provider";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { supabase } = useSupabase();
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // ✅ Ne pas bloquer la page de login
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    const initSession = async () => {
      try {
        // 🔹 Récupérer la session existante (si déjà logué)
        const { data } = await supabase.auth.getSession();
        setSession(data?.session ?? null);

        // 🔹 Écouter les changements de connexion/déconnexion
        const { data: listener } = supabase.auth.onAuthStateChange(
          (_event, newSession) => {
            setSession(newSession);
          }
        );

        // Attendre un court instant pour laisser Supabase recharger
        await new Promise((r) => setTimeout(r, 300));

        if (!data?.session) {
          router.replace("/admin/login");
        }
      } catch (err) {
        console.error("Erreur vérification session :", err);
        router.replace("/admin/login");
      } finally {
        setChecking(false);
      }
    };

    initSession();
  }, [pathname, supabase, router]);

  // ✅ Pendant la vérification
  if (checking) {
    return <div className="loadingAdmin">Chargement en cours...</div>;
  }

  // ✅ Si pas de session après chargement
  if (!session && pathname !== "/admin/login") {
    return <div className="loadingAdmin">Redirection en cours...</div>;
  }

  return children;
}
