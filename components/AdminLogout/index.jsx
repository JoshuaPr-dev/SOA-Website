"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/logout", { method: "GET" });
      if (!res.ok) throw new Error("Erreur de déconnexion serveur");
      router.push("/");
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
