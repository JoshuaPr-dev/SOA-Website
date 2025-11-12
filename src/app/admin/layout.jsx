"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "@/components/supabase-provider";
import AdminLogout from "../../../components/AdminLogout";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = useSupabase(); // ✅ utilisation du provider
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // ✅ On ne vérifie pas l'auth sur la page login
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Erreur Supabase :", error.message);
        }

        if (!session) {
          router.replace("/admin/login");
        }
      } catch (err) {
        console.error("Erreur lors de la vérification de session :", err);
        router.replace("/admin/login");
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [pathname, router, supabase]);

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
