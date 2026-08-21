"use client";

import FadeInSection from "../_components/Fade_In_Section";
import Image_Gallery_Modal from "../_components/Image_Gallery_Modal";
import usePhotoGallery from "../_hooks/usePhotoGallery";
import Image from "next/image";
import { originalArtwork } from "../_data/photos";

import styles from "../_styling/original_artwork.module.css";

function Photo_Card({ photo, onClick }) {
  return (
    <div className={styles.artwork_frame}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        onClick={onClick}
        className={styles.artwork}
      />
    </div>
  );
}

export default function Original_Artwork() {
  const {
    handleNext,
    handlePrev,
    openModal,
    closeModal,
    currentImageObj,
    currentIndex,
    isOpen,
    photos,
  } = usePhotoGallery(originalArtwork);

  return (
    <>
      <FadeInSection>
        <div className={styles.header_section}>
          <h1>Original Artwork</h1>
          <p>
            A selection of original, hand-made drawings and paintings by Felipe
            de Sousa. Every piece is hand-signed and dated on the back.
          </p>
        </div>
        <div className={styles.original_artwork_container}>
          {originalArtwork.map((photo, index) => (
            <Photo_Card
              photo={photo}
              key={photo.id}
              onClick={() => openModal(index)}
            />
          ))}
        </div>
      </FadeInSection>
      <Image_Gallery_Modal
        isOpen={isOpen}
        closeModal={closeModal}
        onNext={handleNext}
        onPrev={handlePrev}
        currentIndex={currentIndex}
        currentImageObj={currentImageObj}
        photos={photos}
      />
    </>
  );
}
