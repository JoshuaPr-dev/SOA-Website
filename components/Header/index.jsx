"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Header() {
  useEffect(() => {
    const handleIconClick = () => {
      const nav = document.querySelector("#nav");
      nav?.classList.toggle("active");
    };

    const handleLinkClick = () => {
      const nav = document.querySelector("#nav");
      nav?.classList.remove("active");
    };

    const icons = document.querySelector("#icons");
    const links = document.querySelectorAll("nav li");

    icons?.addEventListener("click", handleIconClick);
    links?.forEach((link) => link.addEventListener("click", handleLinkClick));

    return () => {
      icons?.removeEventListener("click", handleIconClick);
      links?.forEach((link) =>
        link.removeEventListener("click", handleLinkClick)
      );
    };
  }, []);

  return (
    <div>
      <nav id="nav">
        <Link className="buttonContact1 buttonHover" href="/contact">
          CONTACT
        </Link>
        <ul>
          <li>
            <Link href="/" className="navLinkHeader">
              ACCUEIL
            </Link>
          </li>
          <li>
            <Link href="/aPropos" className="navLinkHeader">
              À PROPOS
            </Link>
          </li>
          <li>
            <Link href="/coaching" className="navLinkHeader">
              COACHING
            </Link>
          </li>
          <li>
            <Link href="/temoignages" className="navLinkHeader">
              TÉMOIGNAGES
            </Link>
          </li>
          <li>
            <Link href="/contact" className="navLinkHeader">CONTACT</Link>
          </li>
        </ul>
        <div id="icons"></div>
        <Link href="/">
          <img className="logo" src="/logo.png" alt="Logo SOA" />
        </Link>
        <Link className="buttonContact2 " href="/contact">
          CONTACT
        </Link>
      </nav>
    </div>
  );
}
