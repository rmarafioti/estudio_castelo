"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

import { IoChevronForwardCircle } from "react-icons/io5";
import { IoChevronBackCircle } from "react-icons/io5";
import { FaCircle } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

import styles from "../_styling/gallery.module.css";

export default function Gallery({
  onNext,
  onPrev,
  currentIndex,
  currentImageObj,
  photos,
}) {
  const [isZoomed, setIsZoomed] = useState(false);

  function Zoomed_Gallery() {
    return (
      <div className={styles.zoom_overlay} onClick={() => setIsZoomed(false)}>
        <Image
          src={currentImageObj.src}
          alt={currentImageObj.alt}
          width={currentImageObj.width}
          height={currentImageObj.height}
          className={styles.zoomed_photo}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
        />
        <button
          className={styles.close_button}
          onClick={() => setIsZoomed(false)}
        >
          <IoCloseCircle />
        </button>
      </div>
    );
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsZoomed(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  };

  return (
    <div className={styles.gallery}>
      <div
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={styles.navigate_section}
      >
        <button
          className={styles.gallery_button_left}
          onClick={onPrev}
          aria-label="previous photo"
        >
          <IoChevronBackCircle className={styles.icon} />
        </button>
        <div className={styles.image_section}>
          <Image
            src={currentImageObj.src}
            alt={currentImageObj.alt}
            width={currentImageObj.width}
            height={currentImageObj.height}
            className={`${styles.photo} ${isZoomed ? styles.zoomed : ""}`}
            onClick={() => setIsZoomed(true)}
            priority
          />
          {currentImageObj.description ? (
            <p className={styles.description}>{currentImageObj.description}</p>
          ) : (
            ""
          )}
        </div>
        <button
          className={styles.gallery_button_right}
          onClick={onNext}
          aria-label="next photo"
        >
          <IoChevronForwardCircle className={styles.icon} />
        </button>
      </div>

      {isZoomed && <Zoomed_Gallery />}

      <div className={styles.indicator_section}>
        <div className={styles.indicators}>
          {photos.map((photo, index) => (
            <FaCircle
              key={photo.id}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.active : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
