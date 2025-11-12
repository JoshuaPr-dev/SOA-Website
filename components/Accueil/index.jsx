"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function Accueil() {
  const [temoignages, setTemoignages] = useState([]);
  const [loadingTemoignages, setLoadingTemoignages] = useState(true);
  const [indexSlide, setIndexSlide] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchTemoignages = async () => {
      try {
        const { data: testimonials, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Erreur récupération témoignages:", error);
          setLoadingTemoignages(false);
          return;
        }

        const updatedAll = await Promise.all(
          (testimonials || []).map(async (t) => {
            if (t.photo_url && !t.photo_url.startsWith("http")) {
              try {
                const { data } = supabase.storage
                  .from("testimonials-photos")
                  .getPublicUrl(t.photo_url);
                return { ...t, photo_url: data.publicUrl };
              } catch (err) {
                console.error("Erreur génération URL photo:", err);
                return t;
              }
            }
            return t;
          })
        );

        // garder tous les témoignages (on affichera 3 par slide)
        setTemoignages(updatedAll || []);
      } catch (err) {
        console.error("Erreur fetchTemoignages:", err);
      } finally {
        setLoadingTemoignages(false);
      }
    };

    fetchTemoignages();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const n = (temoignages || []).length;

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (n <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndexSlide((i) => (i + 1) % n);
    }, 4500);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  useEffect(() => {
    if (indexSlide >= n) setIndexSlide(0);
  }, [n]);

  const prev = () => {
    if (!n) return;
    setIndexSlide((i) => (i - 1 + n) % n);
  };

  const next = () => {
    if (!n) return;
    setIndexSlide((i) => (i + 1) % n);
  };

  return (
    <div>
      <div className="topPageWrapper">
        <img
          className="topPage"
          src="/topPage.jpeg"
          alt="Coach avec 3 athlètes"
          loading="lazy"
        />
      </div>

      <div className="blocAccueil">
        <h1 className="h2 titrePrincipal">STRENGTH OPTIMIZATION ACADEMY</h1>

        <div className="blocEnSavoirPlus">
          <img className="coach" src="/coach.png" alt="Photo du coach" loading="lazy"/>
          <div className="blocEnSavoirPlusRelative">
            <h2 className="h2 h2_1">QUI SUIS-JE ?</h2>
            <p className="p p1Accueil">
              Dorian, athlète et coach sportif spécialisé en force athlétique
              depuis 2023. Fondateur de la structure Strength Optimization
              Academy, accompagnant au quotidien un grand nombre d’athlètes vers
              la performance.
            </p>
            <p className="p">Si tu souhaites en découvrir plus sur moi. </p>
            <div className="divButton divButtonAPropos ">
              <Link className="button buttonHover" href="/aPropos">
                EN SAVOIR PLUS
              </Link>
            </div>
          </div>
        </div>

        <div className="barre barreAccueil"></div>
        <video
          src="/accueil.mov"
          autoPlay
          loop
          muted
          playsInline
          type="video/quicktime"
          className="video"
        ></video>
        <div className="flexVideo">
          <div>
            <h2 className="h2">+50 </h2>
            <p className="pVideo">athlètes accompagnés</p>
          </div>

          <div>
            <h2 className="h2">+2 ANS</h2>
            <p className="pVideo">d'expérience</p>
          </div>

          <div>
            <h2 className="h2">+20 </h2>
            <p className="pVideo">compétitions encadrées</p>
          </div>
        </div>
        <div className="divButton divButtonCoaching">
          <Link className="button buttonHover" href="/coaching">
            COACHING ET SUIVI
          </Link>
        </div>
        <div className="barre"></div>

        {/* Carousel  */}
        <section className="carouselSection">
          <h3 className="h2">TÉMOIGNAGES</h3>
          {loadingTemoignages ? (
            <p className="p">Chargement des témoignages...</p>
          ) : temoignages.length === 0 ? (
            <p className="p">Aucun témoignage pour le moment.</p>
          ) : (
            <div
              className="carousel"
              onMouseEnter={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
              }}
              onMouseLeave={() => startAutoPlay()}
            >
              {n === 0 ? null : (
                <div className="slideContent">
                  {n >= 2
                    ? (() => {
                        const prevIdx = (indexSlide - 1 + n) % n;
                        const t = temoignages[prevIdx];
                        return (
                          <div key={t.id} className={`card left`}>
                            {t.photo_url ? (
                              <img
                                src={t.photo_url}
                                alt={`Photo de ${t.nom}`}
                                loading="lazy"
                                className="slidePhoto"
                                onError={(e) =>
                                  (e.target.style.display = "none")
                                }
                              />
                            ) : (
                              <div className="slideAvatar">
                                {t.nom ? t.nom[0] : "?"}
                              </div>
                            )}
                            <div className="slideText">
                              <h3 className="h3Carousel">{t.nom}</h3>
                              <p className="pCarousel">{t.message}</p>
                            </div>
                          </div>
                        );
                      })()
                    : null}

                  {(() => {
                    const curIdx = indexSlide % n;
                    const t = temoignages[curIdx];
                    return (
                      <div key={t.id} className={`card center`}>
                        {t.photo_url ? (
                          <img
                            src={t.photo_url}
                            alt={`Photo de ${t.nom}`}
                            loading="lazy"
                            className="slidePhoto"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        ) : (
                          <div>{t.nom ? t.nom[0] : "?"}</div>
                        )}
                        <div className="slideText">
                          <h3 className="h3Carousel">{t.nom}</h3>
                          <p className="pCarousel">{t.message}</p>
                        </div>
                      </div>
                    );
                  })()}
                  {n >= 2
                    ? (() => {
                        const nextIdx = (indexSlide + 1) % n;
                        const t = temoignages[nextIdx];
                        return (
                          <div key={t.id} className={`card right`}>
                            {t.photo_url ? (
                              <img
                                src={t.photo_url}
                                alt={`Photo de ${t.nom}`}
                                loading="lazy"
                                className="slidePhoto"
                                onError={(e) =>
                                  (e.target.style.display = "none")
                                }
                              />
                            ) : (
                              <div className="slideAvatar">
                                {t.nom ? t.nom[0] : "?"}
                              </div>
                            )}
                            <div className="slideText">
                              <h3 className="h3Carousel">{t.nom}</h3>
                              <p className="pCarousel">{t.message}</p>
                            </div>
                          </div>
                        );
                      })()
                    : null}
                </div>
              )}

              <div className="carousel-dots" role="tablist" aria-label="Slides">
                {Array.from({ length: n }).map((_, d) => (
                  <button
                    key={`dot-${d}`}
                    className={`dot ${d === indexSlide ? "active" : ""}`}
                    disabled
                    aria-current={d === indexSlide}
                    aria-label={`Slide ${d + 1}`}
                  />
                ))}
              </div>

              <div className="carousel-controls">
                <button
                  onClick={prev}
                  aria-label="Précédent"
                  className="buttonFleche"
                >
                  ‹
                </button>
                <Link
                  href="/temoignages"
                  className="button buttonCarousel buttonHover"
                >
                  TÉMOIGNAGES
                </Link>
                <button
                  onClick={next}
                  aria-label="Suivant"
                  className="buttonFleche"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
      <div className="bottomImgWrapper">
        <img src="/bottomPage.jpeg" alt="Coach de dos" className="bottomImg" loading="lazy" />
      </div>
    </div>
  );
}
