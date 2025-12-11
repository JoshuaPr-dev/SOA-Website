export default function About() {
  return (
    <div className="div_about">
      <h2 className="h2 h2_about h2Mobile">À PROPOS DE MOI</h2>
      <div className="flexAbout">
        <img src="/coachAbout.png" alt="Photo du coach de la structure SOA de face" className="imgAbout" />
        <div className="texteAbout"> 
          <h2 className="h2 h2_about h2TablettePc">À PROPOS DE MOI</h2>
          <p className="p p1About fontP">
            Je m'appelle <span className="spanFooter">Dorian Prevost</span>. Après avoir pratiqué le <span className="spanFooter">karaté pendant
            onze ans</span> puis divers sports, je me suis intéressé à la <span className="spanFooter">musculation
            en 2018</span> et pris de passion pour la <span className="spanFooter">force athlétique entre 2019 et
            2020</span>.
          </p>
          <p className="p pAbout fontP">
            Suite à l'obtention de ma <span className="spanFooter">licence STAPS en entraînement sportif</span> et
            de mon <span className="spanFooter">supplément diplôme "musculation, force et haltérophilie" en
            2021</span>, me voici <span className="spanFooter">coach sportif</span>. J’ai pu <span className="spanFooter">partager durant deux ans mes
            conseils d’entraînement et développer mes capacités dans ce domaine</span>.
          </p>
          <p className="p pPaddingLeftAbout fontP">
            <span className="spanFooter">Début 2023</span>, j’ai fondé ma <span className="spanFooter">structure de coaching en force athlétique
            : Strength Optimization Academy</span>. Depuis, j’ai pu <span className="spanFooter">accompagner plus
            d’une cinquantaine d’athlètes du niveau débutant au niveau national</span>.
          </p>
          <p className="p pAbout fontP">
            Mon approche repose sur un <span className="spanFooter">accompagnement personnalisé</span> et une <span className="spanFooter">vision
            complète de l’entraînement</span>. <span className="spoanFooter">Rien n'est laissé au hasard</span> pour
            permettre à chaque athlète de <span className="spanFooter">progresser efficacement</span> et de{" "}
            <span className="spanFooter">développer pleinement son potentiel</span>.
          </p>
        </div>
      </div>
      <div className="barre"></div>
    </div>
  );
}
