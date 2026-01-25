"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { logo } from "../_data/photos";
import Image from "next/image";
import Link from "next/link";

/* naming conventions to define responsive design*/
import pc from "../_styling/navbar.module.css";
import mobile from "../_styling/mobile_nav.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToContact = () => {
    setTimeout(() => {
      const contactSection = document.getElementById("contactform");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.warn("Contact form section not found");
      }
    }, 200);
  };

  const links = [
    { href: "/tattooing", label: "Tattooing" },
    { href: "/artwork", label: "Artwork" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav>
        <div className={pc.link_container}>
          <Link href="/">
            <Image
              src={logo.src}
              alt={logo.alt}
              height={logo.height}
              width={logo.width}
              className={pc.logo}
            />
          </Link>
          {links
            .filter((link) => link.href)
            .map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${pc.nav_link} ${
                  isActive(href) ? pc.active_link : ""
                }`}
              >
                {label}
              </Link>
            ))}
        </div>

        {/* mobile navigation menu below */}
        <div className={pc.mobile_nav}>
          <Link href="/">
            <Image
              src={logo.src}
              alt={logo.alt}
              height={logo.height}
              width={logo.width}
              className={mobile.logo}
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
