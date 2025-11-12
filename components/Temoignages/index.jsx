"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function Temoignages() {
  const [temoignages, setTemoignages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemoignages = async () => {
      const { data: testimonials, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur lors de la récupération des témoignages:", error);
        return;
      }

      const updatedTestimonials = testimonials.map((t) => {
        if (t.photo_url && !t.photo_url.startsWith("http")) {
          const { data } = supabase.storage
            .from("testimonials-photos")
            .getPublicUrl(t.photo_url);
          return { ...t, photo_url: data.publicUrl };
        }
        return t;
      });

      console.log("Témoignages mis à jour:", updatedTestimonials);
      setTemoignages(updatedTestimonials);
      setLoading(false);
    };
    fetchTemoignages();
  }, []);

  return (
    <div className="divPageTemoignages">
      <div className="topPageWrapper">
        <img
          src="picTemoignages.jpeg"
          alt="Coach avec 4 athlètes"
          className="imgTopTemoignages"
        />
      </div>
      <div className="divBlocTemoignages">
        <h2 className="h2 h2Temoignages">TÉMOIGNAGES</h2>
        {loading ? (
          <p className="p">Chargement...</p>
        ) : (
          <div className="divFlexTemoignages">
            {temoignages.map((t) => (
              <div key={t.id} className="divTailleBloc">
                {t.photo_url ? (
                  <div className="photo-wrapper">
                    <img
                      src={t.photo_url}
                      alt={`Photo de ${t.nom}`}
                      onError={(e) => {
                        console.error(
                          "Erreur de chargement de l'image:",
                          t.photo_url
                        );
                        e.target.style.display = "none";
                      }}
                      className="imgTemoignages"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="h2">{t.nom[0]}</h2>
                  </div>
                )}
                <div className="divCardTemoignages">
                  <h3 className="h3Temoignages">{t.nom}</h3>
                  <p className="pTemoignages">{t.message}</p>
                  <div className="barre barreTemoignages"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="barre barreTemoignagesBottom"></div>
    </div>
  );
}
