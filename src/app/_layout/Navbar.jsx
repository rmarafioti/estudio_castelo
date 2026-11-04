// The site navigation: logo, desktop links, and the mobile hamburger menu, which closes on
// route change.
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { siteLogo } from "../_data/photos";

/* naming conventions to define responsive design*/
import pc from "../_styling/navbar.module.css";
import mobile from "../_styling/mobile_nav.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // The route the menu last rendered on. When the route changes, close the menu during render
  // (React's pattern for resetting state on a prop change), so it never carries over to a page.
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const links = [
    { href: "/about", label: "About" },
    { href: "/originalArtwork", label: "Original Artwork" },
    /*{ href: "/featureThree", label: "Three" },*/
  ];

  return (
    <>
      <nav>
        <Link href="/" className={pc.nav_container}>
          <Image
            src={siteLogo.src}
            height={siteLogo.height}
            width={siteLogo.width}
            alt={siteLogo.alt}
            className={pc.siteLogo}
            priority
          />
        </Link>

        <div className={pc.link_container}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={pc.nav_link}>
              {label}
            </Link>
          ))}
        </div>

        {/* mobile navigation menu below */}
        <div className={pc.mobile_nav}>
          <Link href="/">
            <Image
              src={siteLogo.src}
              height={siteLogo.height}
              width={siteLogo.width}
              alt={siteLogo.alt}
              className={mobile.siteLogo}
              priority
            />
          </Link>
          {/*hamburger menu*/}
          <div id={mobile.hamMenuContainer} onClick={toggleMenu}>
            <div
              className={`${mobile.menuButtonBurger} ${
                menuOpen ? mobile.open : ""
              }`}
            ></div>
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      <menu
        className={`${pc.menu} ${menuOpen ? pc.active : ""}`}
        aria-label="Mobile Navigation"
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            role="heading"
            className={mobile.nav_link}
          >
            {label}
          </Link>
        ))}
      </menu>
    </>
  );
}
