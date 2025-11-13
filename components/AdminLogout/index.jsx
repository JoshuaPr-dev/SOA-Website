"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/context/supabase-provider";

export default function AdminLogout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { supabase } = useSupabase();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      router.push("/admin/login");
    } catch (err) {
      console.error("Erreur de déconnexion :", err);
    } finally {
      setLoading(false);
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
