"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../../../context/supabase-provider";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { supabase, session } = useSupabase(); // ✅ on récupère la session depuis le provider

  // 🔁 Si l'utilisateur est déjà connecté, on le redirige vers /admin/temoignages
  useEffect(() => {
    if (session) {
      console.log("🔁 Déjà connecté, redirection vers /admin/temoignages");
      // ⏱️ On laisse le temps à React d'hydrater avant la navigation
      setTimeout(() => {
        router.replace("/admin/temoignages");
      }, 0);
    }
  }, [session, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Merci de renseigner l'email et le mot de passe.");
        return;
      }

      console.log("🔐 Tentative de connexion...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("📡 Réponse Supabase:", { data, error });

      if (error) {
        console.error("❌ Erreur Supabase:", error.message);
        setError("Identifiants invalides — vérifie l'email et le mot de passe.");
        return;
      }

      if (data?.session) {
        console.log("✅ Connexion réussie :", data.session);
        setTimeout(() => router.replace("/admin/temoignages"), 200);
      } else {
        setError("⚠️ La session n’a pas pu être créée. Réessaie.");
      }
    } catch (err) {
      console.error("⚠️ Erreur inattendue :", err);
      setError("Erreur réseau ou inconnue.");
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return (
      <div className="divAdminLogin">
        <Header />
        <div className="barre"></div>
        <p className="p" style={{ textAlign: "center" }}>
          Redirection vers votre espace administrateur...
        </p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="divAdminLogin">
      <Header />
      <div className="barre"></div>
      <h2 className="h2 h2AdminLogin">CONNEXION ADMIN</h2>

      <form onSubmit={handleLogin} className="formAdminLogin">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputAdminLoginEmail"
          disabled={loading}
        />

        <div className="divAdminLoginFlex">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputAdminLoginMdp"
            disabled={loading}
          />
          <button
            type="submit"
            className="buttonAdminLogin buttonHover"
            disabled={loading}
          >
            {loading ? "Connexion..." : "SE CONNECTER"}
          </button>
        </div>
      </form>

      {error && (
        <p className="p" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <div className="barre"></div>
      <Footer />
    </div>
  );
}
