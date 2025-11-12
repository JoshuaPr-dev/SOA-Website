import Link from "next/link";

export default function MentionsLegales() {
  return (
    <div className="divMentions">
      <h2 className="h2 h2Footer">MENTIONS LÉGALES</h2>

      <h3 className="h3Footer">Éditeur du site :</h3>
      <p className="pFooter">
        Dorian Prevost, exerçant sous le nom Strength Optimization Academy (SOA)
      </p>
      <p className="pFooter">
        Contact :{" "}
        <span className="spanFooter">dorianprevostcoaching@gmail.com</span>
      </p>

      <h3 className="h3Footer">Directeur de publication :</h3>
      <p className="pFooter">Dorian Prevost</p>

      <h3 className="h3Footer">Hébergement :</h3>
      <p className="pFooter">
        Vercel Inc -{" "}
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
        - société basée aux États-Unis
      </p>

      <h3 className="h3Footer">Propriété intellectuelle :</h3>
      <p className="pFooter">
        L’ensemble du contenu du site (textes, images, vidéos, logos,
        graphismes) est la propriété exclusive de{" "}
        <span className="spanFooter">Dorian Prevost / SOA.</span> Toute
        reproduction ou utilisation sans autorisation est interdite.
      </p>

      <h3 className="h3Footer">Données personnelles :</h3>
      <p className="pFooter">
        Les informations collectées via le formulaire de contact sont utilisées
        uniquement pour répondre aux demandes des utilisateurs, conformément à
        la{" "}
        <span className="spanFooter">
          <Link href="/confidentialite">POLITIQUE DE CONFIDENTIALITÉ</Link>
        </span>
      </p>

      <p className="pFooter">
        <span className="spanFooter">Site réalisé par Joshua</span> —
        joshuaprv.contact@gmail.com
      </p>
      <div className="barre"></div>
    </div>
  );
}
