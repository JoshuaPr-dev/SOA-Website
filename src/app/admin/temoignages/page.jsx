"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../../../context/supabase-provider";

import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

export default function AdminTemoignages() {
  const router = useRouter();
  const { supabase, session } = useSupabase();

  const [temoignages, setTemoignages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        console.log("🚫 Aucune session, redirection vers /admin/login");
        router.replace("/admin/login");
      } else {
        console.log("✅ Session valide détectée !");
        await fetchTemoignages();
      }
      setCheckingSession(false);
    };
    checkSession();
  }, [supabase, router]);

  const fetchTemoignages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setTemoignages(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (checkingSession) return <p>Vérification de la session...</p>;
  if (!session) return null;

  return (
    <div className="divAdminTemoignages">
      <Header />
      <div className="barre"></div>

      <div className="flex justify-between items-center px-4">
        <h2 className="h2 h2AdminTemoignages">DASHBOARD TÉMOIGNAGES</h2>
        <button onClick={handleLogout} className="buttonAdminTemoignages buttonHover">
          SE DÉCONNECTER
        </button>
      </div>

      {loading ? (
        <p className="p">CHARGEMENT...</p>
      ) : (
        <ul>
          {temoignages.map((t) => (
            <li key={t.id}>
              <h3>{t.nom}</h3>
              <p>{t.message}</p>
            </li>
          ))}
        </ul>
      )}

      <Footer />
    </div>
  );
}
