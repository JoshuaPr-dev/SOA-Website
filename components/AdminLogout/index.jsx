"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/context/supabase-provider";

export default function AdminLogout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { supabase } = useSupabase();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut({ scope: "local" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="buttonAdmin buttonHover"
    >
      {loading ? "DÉCONNEXION..." : "SE DÉCONNECTER"}
    </button>
  );
}
