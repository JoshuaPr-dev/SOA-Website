"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "../../context/supabase-provider";
import AdminLogout from "../../../components/AdminLogout";

export default function AdminLayout({ children }) {
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
        await new Promise((r) => setTimeout(r, 600));

        const {
          data: { session: activeSession },
        } = await supabase.auth.getSession();

        if (!activeSession) {
          // Pas de session → retour login
          router.replace("/admin/login");
        }
      } catch (err) {
        console.error("Erreur vérification session :", err);
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

  return (
    <div className="divAdmin">
      <div className="divAdminFlex">
        <h2 className="h2">ADMIN</h2>
        <AdminLogout />
      </div>
      <main>{children}</main>
    </div>
  );
}
