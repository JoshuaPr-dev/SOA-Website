"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "../../context/supabase-provider";
import AdminLogout from "../../../components/AdminLogout";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { supabase } = useSupabase();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    const checkAuth = async () => {
      try {
        await new Promise((r) => setTimeout(r, 300));
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) router.replace("/admin/login");
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
