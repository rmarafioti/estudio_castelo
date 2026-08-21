"use client";

import React from "react";
import Image from "next/image";

import { IoIosClose } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaCircle } from "react-icons/fa6";

import styles from "../_styling/gallery_modal.module.css";

export default function Gallery_Modal({
  isOpen,
  closeModal,
  onNext,
  onPrev,
  currentIndex,
  currentImageObj,
  photos,
}) {
  if (!isOpen || !currentImageObj) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  };

  return (
    <div
      className={styles.modal}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={styles.modalContent}>
        <div className={styles.section}>
          <div className={styles.indicator_section}>
            <IoIosClose
              onClick={closeModal}
              className={styles.closeButton}
              aria-label="close modal button"
            />
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
          <div className={styles.artwork_frame}>
            <Image
              src={currentImageObj.src}
              alt={currentImageObj.alt}
              width={currentImageObj.width}
              height={currentImageObj.height}
              className={styles.photo}
              priority
            />
          </div>
          <button
            className={styles.gallery_button}
            onClick={onNext}
            aria-label="next photo"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}
