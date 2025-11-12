"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

import AdminLogout from "../../../components/AdminLogout";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error);
        router.push("/admin/login");
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (checking) return <div>CHARGEMENT...</div>;

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
