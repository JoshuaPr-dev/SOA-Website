import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer footerAccueil">
      <Link
        href="https://www.instagram.com/dorianprevost_soa/?hl=fr"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ouvrir mon compte Instagram"
      >
        <Image
          src="/insta.svg"
          width="20"
          height="20"
          className="insta linkFooter"
          alt="Logo Instagram"
        />
      </Link>
      <ul>
        <div className="flexFooterTop">
          <li className="liFooter">
            <Link href="/aPropos" className="linkFooter">À PROPOS</Link>
          </li>
          <li className="liFooter">
            <Link href="/contact" className="linkFooter">CONTACT</Link>
          </li>
        </div>

        <div className="flexFoooterBottom ">
          <li className="liFooter">
            <Link href="/mentionsLegales" className="linkFooter">MENTIONS LÉGALES</Link>
          </li>
          <li className="liFooter">
            <Link href="/confidentialite" className="linkFooter">CONFIDENTIALITÉ</Link>
          </li>
        </div>

        <div >
          <li className="liFooter">
            <Link href="/conditionsGenerales" className="linkFooter">CONDITIONS GÉNÉRALES</Link>
          </li>
        </div>
      </ul>
    </div>
  );
}
