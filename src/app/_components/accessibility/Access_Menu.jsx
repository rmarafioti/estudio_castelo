"use client";

import { useState, useEffect } from "react";
import { IoAccessibility } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";

import Toggle from "./Toggle";

import styles from "../../_styling/access_menu.module.css";

export default function AccessMenu({
  accessibility,
  toggleSetting,
  adjustFontSize,
  resetAccessibility,
}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <>
      <IoAccessibility
        className={styles.accessIcon}
        role="button"
        onClick={() => setIsMenuVisible(true)}
      />

      {isMenuVisible && (
        <menu className={styles.accessMenu}>
          <div className={styles.headerSection}>
            <p className={styles.menuHeader}>Accessibility Menu</p>
            <button
              className={styles.closeButton}
              onClick={() => setIsMenuVisible(false)}
            >
              Close
            </button>
          </div>
          <article className={styles.controls}>
            <div className={styles.controlSection}>
              <p className={styles.controlItem}>Theme</p>
              <div className={styles.controlItem}>
                <Toggle
                  onToggle={() => toggleSetting("isThemeDark")}
                  isToggled={accessibility.isThemeDark}
                />
              </div>
            </div>
            <div className={styles.controlSection}>
              <p className={styles.controlItem}>Remove Font Style</p>
              <div className={styles.controlItem}>
                <Toggle
                  onToggle={() => toggleSetting("isRemoveFontStyle")}
                  isToggled={accessibility.isRemoveFontStyle}
                />
              </div>
            </div>
            <div className={styles.controlSection}>
              <p className={styles.controlItem}>Font Size</p>
              <div className={styles.resizingContainer}>
                <FaMinus
                  className={styles.sizeItem}
                  role="button"
                  onClick={() => adjustFontSize(-0.5)}
                  aria-label="decrease font size"
                />
                <div className={styles.indicators}>
                  {[1, 1.5, 2, 2.5].map((level) => (
                    <FaCircle
                      key={level}
                      className={`${styles.indicator} ${
                        accessibility.fontSizeAdjust === level
                          ? styles.active
                          : ""
                      }`}
                    />
                  ))}
                </div>
                <FaPlus
                  className={styles.sizeItem}
                  role="button"
                  onClick={() => {
                    adjustFontSize(0.5);
                  }}
                  aria-label="increase font size"
                />
              </div>
            </div>
          </article>
          <button className={styles.resetButton} onClick={resetAccessibility}>
            Reset
          </button>
        </menu>
      )}
    </>
  );
}
