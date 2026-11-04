// The pop-over viewer for the artwork gallery: one full image at a time, with previous, next
// and close buttons, arrow-key navigation and the image's caption when it has one.
"use client";

import { useRef, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { IoIosClose } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

import styles from "../_styling/gallery_modal.module.css";

const MOBILE_BREAKPOINT = 667;

// The portal needs document.body, so render nothing on the server and during hydration, then
// render on the client. Nothing changes after that, so there is nothing to subscribe to.
function subscribe() {
  return () => {};
}

export default function Gallery_Modal({
  isOpen,
  closeModal,
  onNext,
  onPrev,
  currentImageObj,
}) {
  const dialogRef = useRef(null);
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

    if (isOpen && !isMobile) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  };

  if (!mounted || !currentImageObj) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.modal}
      onCancel={handleCancel}
      onKeyDown={handleKeyDown}
      aria-label={`Image viewer: ${currentImageObj.altText}`}
    >
      <div className={styles.modalContent}>
        <div className={styles.section}>
          <div className={styles.right_side_container}>
            <button
              type="button"
              className={styles.gallery_button}
              onClick={onPrev}
              aria-label="previous photo"
            >
              <IoIosArrowBack />
            </button>
          </div>

          <div className={styles.artwork_frame}>
            <Image
              src={currentImageObj.src}
              alt={currentImageObj.altText}
              width={currentImageObj.width}
              height={currentImageObj.height}
              className={styles.photo}
              priority
            />
          </div>

          <div className={styles.left_side_container}>
            <button
              type="button"
              onClick={closeModal}
              className={styles.closeButton}
              aria-label="close modal"
            >
              <IoIosClose aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.gallery_button}
              onClick={onNext}
              aria-label="next photo"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
        {currentImageObj.caption && <p>{currentImageObj.caption}</p>}
      </div>
    </dialog>,
    document.body,
  );
}
