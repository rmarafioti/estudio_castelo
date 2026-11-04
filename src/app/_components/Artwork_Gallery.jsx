// The artwork grid and its pop-over viewer. A client island: it receives the CMS gallery's
// images as props from the Server Component page and never fetches CMS data itself.
"use client";

import Image from "next/image";

import Image_Gallery_Modal from "./Image_Gallery_Modal";
import usePhotoGallery from "../_hooks/usePhotoGallery";

import styles from "../_styling/original_artwork.module.css";

function Photo_Card({ image, onClick }) {
  return (
    <div className={styles.artwork_frame}>
      <Image
        src={image.src}
        alt={image.altText}
        width={image.width}
        height={image.height}
        onClick={onClick}
        className={styles.artwork}
      />
    </div>
  );
}

export default function Artwork_Gallery({ images }) {
  const {
    handleNext,
    handlePrev,
    openModal,
    closeModal,
    currentImageObj,
    isOpen,
  } = usePhotoGallery(images);

  return (
    <>
      <div className={styles.original_artwork_container}>
        {/* CMS gallery images have no id and never reorder, so the index is a stable key. */}
        {images.map((image, index) => (
          <Photo_Card
            image={image}
            key={index}
            onClick={() => openModal(index)}
          />
        ))}
      </div>
      <Image_Gallery_Modal
        isOpen={isOpen}
        closeModal={closeModal}
        onNext={handleNext}
        onPrev={handlePrev}
        currentImageObj={currentImageObj}
      />
    </>
  );
}
