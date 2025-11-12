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

    const checkAuth = async () => {
      try {
        const {
          data: { session: activeSession },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Erreur Supabase :", error.message);
        }

        if (!activeSession && !session) {
          console.log(
            "❌ Aucune session active, redirection vers /admin/login"
          );
          router.replace("/admin/login");
        } else {
          console.log("✅ Session détectée :", activeSession || session);
        }
      } catch (err) {
        console.error("Erreur lors de la vérification de session :", err);
        router.replace("/admin/login");
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [pathname, router, supabase, session]);

  if (checking)
    return <div className="loadingAdmin">Chargement en cours...</div>;

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
