"use client";

import { Outfit } from "next/font/google";

import { useState, useEffect } from "react";

import Navbar from "../_layout/Navbar";
import Footer from "../_layout/Footer";
import Access_Menu from "../_components/accessibility/Access_Menu";

const outfit = Outfit({
  variable: "--main-font",
  weight: ["300", "600"],
  subsets: ["latin"],
});

export default function AppWrapper({ children }) {
  const [accessibility, setAccessibility] = useState({
    isThemeDark: false,
    isRemoveFontStyle: false,
    fontSizeAdjust: 1,
  });

  useEffect(() => {
    setAccessibility((prev) => ({
      ...prev,
      isThemeDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
    }));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      accessibility.isThemeDark ? "dark" : "light",
    );
  }, [accessibility.isThemeDark]);

  const adjustFontSize = (increment) => {
    setAccessibility((prev) => ({
      ...prev,
      fontSizeAdjust: Math.max(
        1,
        Math.min(2.5, prev.fontSizeAdjust + increment),
      ),
    }));
  };

  const toggleSetting = (key) => {
    setAccessibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetAccessibility = () => {
    setAccessibility({
      isThemeDark: false,
      isRemoveFontStyle: false,
      fontSizeAdjust: 1,
    });
  };

  return (
    <div>
      <Navbar />
      <Access_Menu
        accessibility={accessibility}
        toggleSetting={toggleSetting}
        adjustFontSize={adjustFontSize}
        resetAccessibility={resetAccessibility}
      />
      <article
        className={`
          appContainer
          ${
            accessibility.isRemoveFontStyle
              ? "accessible-font"
              : outfit.className
          }
        `}
        style={{
          fontSize: `${1 + 0.25 * accessibility.fontSizeAdjust}rem`,
        }}
      >
        {children}
      </article>
      <Footer />
    </div>
  );
}
