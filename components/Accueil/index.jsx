"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useSupabase } from "@/context/supabase-provider";

export default function Accueil() {
  const { supabase } = useSupabase();

  const truncateForDevice = (text) => {
    if (!text) return "";
    const width = typeof window !== "undefined" ? window.innerWidth : 1200;
    let limit = 200;
    if (width < 500) limit = 100;
    else if (width < 900) limit = 150;
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const [temoignages, setTemoignages] = useState([]);
  const [loadingTemoignages, setLoadingTemoignages] = useState(true);
  const [indexSlide, setIndexSlide] = useState(0);
  const intervalRef = useRef(null);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const fetchTemoignages = async () => {
      try {
        const { data: testimonials, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
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
              } catch {
                return t;
              }
            }
            return t;
          })
        );

        setTemoignages(updatedAll || []);
      } catch {
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
    if (typeof window !== "undefined" && window.innerWidth < 900) {
      return;
    }
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
          <img
            className="coach"
            src="/coach.png"
            alt="Photo du coach"
            loading="lazy"
          />
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
        />

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

        <section className="carouselSection">
          <h3 className="h2">TÉMOIGNAGES</h3>
          {loadingTemoignages ? (
            <p className="p">Chargement des témoignages...</p>
          ) : temoignages.length === 0 ? (
            <p className="p">Aucun témoignage pour le moment.</p>
          ) : (
            <div
              className="carousel"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
              }}
              onMouseLeave={() => startAutoPlay()}
            >
              {n !== 0 && (
                <div className="slideContent">
                  {n >= 2 &&
                    (() => {
                      const prevIdx = (indexSlide - 1 + n) % n;
                      const t = temoignages[prevIdx];
                      return (
                        <div
                          key={t.id}
                          className="card left"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            (window.location.href = `/temoignages?focus=${t.id}`)
                          }
                        >
                          {t.photo_url ? (
                            <img
                              src={t.photo_url}
                              alt={`Photo de ${t.nom}`}
                              loading="lazy"
                              className="slidePhoto"
                            />
                          ) : (
                            <div className="slideAvatar">
                              {t.nom ? t.nom[0] : "?"}
                            </div>
                          )}
                          <div className="slideText">
                            <h3 className="h3Carousel">{t.nom}</h3>
                            <p className="pCarousel">
                              {truncateForDevice(t.message)}
                            </p>
                          </div>
                        </div>
                      );
                    })()}

                  {(() => {
                    const curIdx = indexSlide % n;
                    const t = temoignages[curIdx];
                    return (
                      <div
                        key={t.id}
                        className="card center"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          (window.location.href = `/temoignages?focus=${t.id}`)
                        }
                      >
                        {t.photo_url ? (
                          <img
                            src={t.photo_url}
                            alt={`Photo de ${t.nom}`}
                            loading="lazy"
                            className="slidePhoto"
                          />
                        ) : (
                          <div>{t.nom ? t.nom[0] : "?"}</div>
                        )}
                        <div className="slideText">
                          <h3 className="h3Carousel">{t.nom}</h3>
                          <p className="pCarousel">
                            {truncateForDevice(t.message)}
                          </p>
                        </div>
                      </div>
                    );
                  })()}

                  {n >= 2 &&
                    (() => {
                      const nextIdx = (indexSlide + 1) % n;
                      const t = temoignages[nextIdx];
                      return (
                        <div
                          key={t.id}
                          className="card right"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            (window.location.href = `/temoignages?focus=${t.id}`)
                          }
                        >
                          {t.photo_url ? (
                            <img
                              src={t.photo_url}
                              alt={`Photo de ${t.nom}`}
                              loading="lazy"
                              className="slidePhoto"
                            />
                          ) : (
                            <div className="slideAvatar">
                              {t.nom ? t.nom[0] : "?"}
                            </div>
                          )}
                          <div className="slideText">
                            <h3 className="h3Carousel">{t.nom}</h3>
                            <p className="pCarousel">
                              {truncateForDevice(t.message)}
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                </div>
              )}

              <div className="carousel-dots" role="tablist">
                {Array.from({ length: n }).map((_, d) => (
                  <button
                    key={d}
                    className={`dot ${d === indexSlide ? "active" : ""}`}
                    disabled
                  />
                ))}
              </div>

              <div className="carousel-controls">
                <button onClick={prev} className="buttonFleche">
                  ‹
                </button>
                <Link
                  href="/temoignages"
                  className="button buttonCarousel buttonHover"
                >
                  TÉMOIGNAGES
                </Link>
                <button onClick={next} className="buttonFleche">
                  ›
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="bottomImgWrapper">
        <img
          src="/bottomPage.jpeg"
          alt="Coach de dos"
          className="bottomImg"
          loading="lazy"
        />
      </div>
    </div>
  );
}
