"use client";

import { useSupabase } from "@/context/supabase-provider";
import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const { supabase } = useSupabase();
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <button className="buttonAdmin" onClick={logout}>
      Déconnexion
    </button>
  );
}
