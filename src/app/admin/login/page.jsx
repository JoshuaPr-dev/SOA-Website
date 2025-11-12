"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";

import Header from "../../../../components/Header/index";
import Footer from "../../../../components/Footer/index";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!email || !password) {
        setError("Merci de renseigner l'email et le mot de passe.");
        return;
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("Résultat de l'inscription", { data, error });
      if (error) {
        if (error.message && error.message.toLowerCase().includes("invalid")) {
          setError(
            "Identifiants invalides — vérifie l'email et le mot de passe ."
          );
        } else {
          setError(error.message || "Erreur lors de la connexion");
        }
        return;
      }
      router.push("/admin/temoignages");
    } catch (err) {
      console.error("Connexion exceptionelle", err);
      setError("Erreur réseau ou inconnue");
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
        />
        <div className="divAdminLoginFlex">
          <input
            type="password"
            placeholder="Mot de passe"
            defaultValue={""}
            onChange={(e) => setPassword(e.target.value)}
            className="inputAdminLoginMdp"
          />
          <button type="submit" className="buttonAdminLogin buttonHover">
            SE CONNECTER
          </button>
        </div>
      </form>
      {error && <p className="p">{error}</p>}
      <div className="barre"></div>
      <Footer />
    </div>
  );
}
