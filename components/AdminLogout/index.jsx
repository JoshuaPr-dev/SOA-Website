"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export default function AdminLogout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Echec de la deconnexion", error.message);
        setLoading(false);
        return;
      }
      router.push("/");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading} className="buttonAdmin buttonHover">
      {loading ? 'DÉCONNECTION...' : "SE DÉCONNECTER"}
    </button>
  );
}
