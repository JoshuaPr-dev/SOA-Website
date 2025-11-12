"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../../../context/supabase-provider";

import Header from "../../../../components/Header/index";
import Footer from "../../../../components/Footer/index";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { supabase } = useSupabase();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Merci de renseigner l'email et le mot de passe.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Résultat de la connexion :", { data, error });

      if (error) {
        if (error.message?.toLowerCase().includes("invalid")) {
          setError(
            "Identifiants invalides — vérifie l'email et le mot de passe."
          );
        } else {
          setError(error.message || "Erreur lors de la connexion.");
        }
        setLoading(false);
        return;
      }

      if (data?.session) {
        router.replace("/admin/temoignages");
      } else {
        setError("La session n’a pas pu être créée. Réessaie.");
      }
    } catch (err) {
      console.error("Erreur inattendue :", err);
      setError("Erreur réseau ou inconnue.");
    } finally {
      setLoading(false);
    }
  };

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
