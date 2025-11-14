"use client";

import { useState } from "react";
import { useSupabase } from "@/context/supabase-provider";
import { useRouter } from "next/navigation";

import Header from "../../../../components/Header/index";
import Footer from "../../../../components/Footer/index";

export default function AdminLogin() {
  const { supabase } = useSupabase();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      if (!email || !password) {
        setErrorMsg("Merci de renseigner l'email et le mot de passe.");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message?.toLowerCase().includes("invalid")) {
          setErrorMsg(
            "Identifiants invalides — vérifie l'email et le mot de passe."
          );
        } else {
          setErrorMsg(error.message || "Erreur lors de la connexion");
        }
        return;
      }

      router.push("/admin/temoignages");
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
      setErrorMsg("Erreur réseau ou inconnue");
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputAdminLoginMdp"
          />

          <button type="submit" className="buttonAdminLogin buttonHover">
            SE CONNECTER
          </button>
        </div>
      </form>

      {errorMsg && <p className="p">{errorMsg}</p>}

      <div className="barre"></div>
      <Footer />
    </div>
  );
}
