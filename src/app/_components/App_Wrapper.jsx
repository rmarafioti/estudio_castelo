"use client";

import { Germania_One } from "next/font/google";

import { useState, useEffect } from "react";

import Navbar from "../_layout/Navbar";
import Footer from "../_layout/Footer";
import Access_Menu from "../_components/accessibility/Access_Menu";

const germania_one = Germania_One({
  variable: "--main-font",
  weight: ["400"],
  subsets: ["latin"],
});

export default function AppWrapper({ children }) {
  const [accessibility, setAccessibility] = useState({
    isRemoveFontStyle: false,
    fontSizeAdjust: 1,
  });

  const adjustFontSize = (increment) => {
    setAccessibility((prev) => ({
      ...prev,
      fontSizeAdjust: Math.max(1, Math.min(4, prev.fontSizeAdjust + increment)),
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
      isRemoveFontStyle: false,
      fontSizeAdjust: 1,
    });
  };

  return (
    <div className={germania_one.variable}>
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
              : germania_one.className
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
