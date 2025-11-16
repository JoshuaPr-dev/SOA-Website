import Link from "next/link";

export default function ConditionsGenerales() {
  return (
    <div className="divPaddingConditionsGenerales">
      <h2 className="h2 h2Footer">CONDITIONS GÉNÉRALES D'UTILISATION (CGU)</h2>
      <h3 className="h3Footer">1. Présentation du site</h3>
      <p className="pFooter">
        Le présent site, accessible à l’adresse:{" "}
        <span className="spanFooter">
          <Link
            href="https://strengthoptimizationacademy.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvrir Vercel"
          >
            https://strengthoptimizationacademy.com
          </Link>
        </span>
        , est édité par Dorian Prevost, exerçant sous le nom{" "}
        <span className="spanFooter">Strength Optimization Academy (SOA)</span>.
        <br />
        dorianprevostcoaching@gmail.com <br />
        Hébergeur : Vercel Inc -{" "}
        <span className="spanFooter">
          <Link
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvrir Vercel"
          >
            https://vercel.com
          </Link>
        </span>{" "}
        - société basée aux États-Unis, assurant l’hébergement technique du
        site.
      </p>
      <h3 className="h3Footer">2. Objet du site</h3>
      <p className="pFooter">
        Le site <span className="spanFooter">SOA</span> est un{" "}
        <span className="spanFooter">site vitrine </span>
        destiné à présenter l’activité et les services de coaching sportif
        proposés par <span className="spanFooter">Dorian Prevost</span>,
        spécialisé dans le{" "}
        <span className="spanFooter">
          powerlifting et l’optimisation de la performance.
        </span>
      </p>
      <p className="pFooter">Le site comprend :</p>
      <div className="divPaddingConditions">
        <p className="pFooter">
          - Une page de présentation du coach et de la structure,
          <br />- Une page de témoignages avec les retours d’expérience de
          clients,
          <br />- Une page de contact permettant aux utilisateurs de poser des
          questions ou de demander un suivi personnalisé.
        </p>
      </div>
      <p className="pFooter">
        Aucune transaction ni paiement ne sont réalisés directement sur le site.
      </p>
      <h3 className="h3Footer">3. Acceptation des conditions</h3>
      <p className="pFooter">
        L’accès et l’utilisation du site <span className="spanFooter">SOA</span>{" "}
        impliquent l’acceptation pleine et entière des présentes{" "}
        <span className="spanFooter">
          Conditions Générales d’Utilisation (CGU)
        </span>
        .
        <br />
        L’utilisateur reconnaît avoir pris connaissance de ces conditions avant
        toute utilisation du site. <br /> Les CGU peuvent être modifiées à tout
        moment, sans préavis. Les utilisateurs sont invités à les consulter
        régulièrement.
      </p>
      <h3 className="h3Footer">4. Propriété intellectuelle</h3>
      <p className="pFooter">
        Tous les éléments présents sur le site (textes, logos, images, vidéos,
        graphismes, structure, code, etc.) sont la propriété exclusive de{" "}
        <span className="spanFooter">
          Dorian Prevost / Strength Optimization Academy (SOA)
        </span>
        , sauf mention contraire. <br /> Toute reproduction, diffusion,
        modification ou exploitation sans autorisation préalable écrite est
        strictement interdite et constitue une violation du{" "}
        <span className="spanFooter">Code de la Propriété Intellectuelle</span>.
      </p>
      <h3 className="h3Footer">5. Responsabilités</h3>
      <p className="pFooter">
        <span className="spanFooter">SOA</span> s’efforce d’assurer la
        disponibilité, la sécurité et la fiabilité du site, ainsi que la
        véracité des informations publiées. <br /> Toutefois,{" "}
        <span className="spanFooter">Dorian Prevost / SOA</span> ne saurait être
        tenu responsable :
      </p>
      <div className="divPaddingConditions">
        <p className="pFooter">
          - D’erreurs, omissions ou inexactitudes dans le contenu,
          <br />- D’éventuelles interruptions ou dysfonctionnements du site,
          <br />- De dommages directs ou indirects liés à l’utilisation du site
          ou des informations qu’il contient.
        </p>
      </div>
      <p className="pFooter">
        Les conseils et contenus sportifs publiés sur le site ont un but
        informatif. Avant toute pratique physique, il est{" "}
        <span className="spanFooter">
          recommandé de consulter un professionnel de santé
        </span>{" "}
        afin de s’assurer de sa capacité à pratiquer une activité sportive.
      </p>

      <h3 className="h3Footer">6. Liens externes</h3>
      <p className="pFooter">
        Le site peut contenir des liens vers des sites tiers (réseaux sociaux,
        partenaires, articles, etc.). <br />{" "}
        <span className="spanFooter">SOA</span> décline toute responsabilité
        quant au contenu ou au fonctionnement de ces sites externes.
      </p>

      <h3 className="h3Footer">7. Données personnelles</h3>
      <p className="pFooter">
        Les informations collectées via le formulaire de contact sont traitées
        conformément au{" "}
        <span className="spanFooter">
          Règlement Général sur la Protection des Données (RGPD)
        </span>
        . <br /> Elles sont utilisées uniquement pour permettre à{" "}
        <span className="spanFooter">SOA</span> de répondre aux demandes de
        contact. <br />
        Pour plus de détails, consultez la page{" "}
        <Link href="/confidentialite">
          <span className="spanFooter">Confidentialité</span>
        </Link>
      </p>

      <h3 className="h3Footer">8. Droit applicable</h3>
      <p className="pFooter">
        Les présentes conditions sont régies par le droit français. En cas de
        litige, et à défaut de solution amiable, les tribunaux français seront
        seuls compétents.
      </p>

      <h3 className="h3Footer">9. Contact</h3>
      <p className="pFooter">
        Pour toute question relative au site ou aux présentes conditions :{" "}
        <br />
        <span className="spanFooter">dorianprevostcoaching@gmail.com</span>
      </p>

      <p className="pFooter">
        <span className="spanFooter">Site réalisé par Joshua</span> —
        joshuaprv.contact@gmail.com
      </p>
      <div className="barre"></div>
    </div>
  );
}
