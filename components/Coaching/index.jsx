export default function Coaching() {
  return (
    <div className="divCoaching">
      <h2 className="h2 h2PageCoaching h2TabletteMobile">COACHING</h2>
      <div className="divPaddingCoaching">
        <img
          src="/coaching.jpg"
          alt="Test"
          className="imgCoaching"
          loading="lazy"
        />
        <div>
          <h2 className="h2 h2PageCoaching h2TabletteCoaching">COACHING</h2>
          <p className="pFooter fontP">
            Mes services s’adressent à{" "}
            <span className="spanFooter">chaque athlète, déterminé</span> à{" "}
            <span className="spanFooter">
              travailler pour atteindre ses objectifs
            </span>
            .{" "}
          </p>
          <p className="pFooter fontP">
            Je propose un{" "}
            <span className="spanFooter">suivi unique journalier</span> :{" "}
          </p>
          <p className="pFooter pCoaching fontP">
            <span>
              -{" "}
              <span className="spanFooter">
                Programmation personnalisée, périodisée et cyclée
              </span>{" "}
              mise à jour{" "}
              <span className="spanFooter">chaque semaine</span>{" "}
            </span>
            <br />
            <span>
              - <span className="spanFooter">Analyse vidéo</span> de chacun de
              vos entraînements et{" "}
              <span className="spanFooter">retour sous 24h</span>
            </span>
            <br />
            <span>
              -{" "}
              <span className="spanFooter">
                Disponibilité du lundi au vendredi
              </span>{" "}
              afin d’échanger sur tout ce qui tourne autour de l’entraînement
            </span>
          </p>
          <p className="pFooter fontP">
            Après avoir répondu à un{" "}
            <span className="spanFooter">questionnaire général</span> vous
            concernant, nous prévoirons un{" "}
            <span className="spanFooter">appel afin d’échanger</span> sur votre{" "}
            <span className="spanFooter">pratique</span>, vos{" "}
            <span className="spanFooter">habitudes</span>, vos{" "}
            <span className="spanFooter">objectifs</span>, etc. Vous aurez
            ensuite accès, sous{" "}
            <span className="spanFooter">quelques jours</span>, à un{" "}
            <span className="spanFooter">document en ligne</span> permettant le{" "}
            <span className="spanFooter">suivi à distance</span>.
          </p>
          <p className="pFooter fontP">
            De plus, dans la mesure du possible, je me rends{" "}
            <span className="spanFooter">
              disponible les week-ends de compétition
            </span>{" "}
            afin de{" "}
            <span className="spanFooter">
              ous accompagner tout au long de la journée
            </span>
            . Mon objectif est de{" "}
            <span className="spanFooter">
              vous mettre dans les meilleures conditions pour performer
            </span>
            .
          </p>
        </div>
      </div>
      <div className="barre"></div>
    </div>
  );
}
