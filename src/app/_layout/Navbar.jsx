"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/* naming conventions to define responsive design*/
import pc from "../_styling/navbar.module.css";
import mobile from "../_styling/mobile_nav.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/featureOne", label: "One" },
    { href: "/featureTwo", label: "Two" },
    { href: "/featureThree", label: "Three" },
  ];

  return (
    <>
      <nav>
        <div className={pc.link_container}>
          {links
            .filter((link) => link.href)
            .map(({ href, label }) => (
              <Link key={href} href={href} className={pc.nav_link}>
                {label}
              </Link>
            ))}
        </div>

        {/* mobile navigation menu below */}
        <div className={pc.mobile_nav}>
          <Link href="/" className={pc.nav_link}>
            Home
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
        {links
          .filter((link) => link.href !== "/")
          .map(({ href, label }) => (
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
