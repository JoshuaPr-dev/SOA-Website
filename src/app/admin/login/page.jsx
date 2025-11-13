"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/context/supabase-provider";

export default function AdminLogin() {
  const router = useRouter();
  const { supabase, session } = useSupabase();

  useEffect(() => {
    if (session) {
      console.log("🔁 Déjà connecté, redirection vers /admin/temoignages");
      setTimeout(() => router.replace("/admin/temoignages"), 0);
    }
  }, [session, router]);

  if (session) {
    return <p>Redirection vers le tableau de bord...</p>;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Erreur de connexion : " + error.message);
    } else {
      console.log("✅ Connexion réussie !");
      router.replace("/admin/temoignages");
    }
  };

  return (
    <div className="login-page">
      <h1>Connexion Admin</h1>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
