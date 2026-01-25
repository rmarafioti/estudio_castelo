"use client";

import FadeInSection from "../_components/Fade_In_Section";
import usePhotoGallery from "../_hooks/usePhotoGallery";
import Gallery from "../_components/Gallery";
import { artworkPhotos } from "../_data/artworkGallery";

import styles from "../_styling/artwork.module.css";

export default function Artwork() {
  const { handleNext, handlePrev, currentImageObj, currentIndex, photos } =
    usePhotoGallery(artworkPhotos);

  return (
    <main>
      <FadeInSection className={styles.contact_header_section}>
        <h1>Artwork</h1>
        <p className={styles.copy}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet
          consectetur adipiscing elit quisque faucibus.
        </p>
      </FadeInSection>
      <FadeInSection>
        <em className={styles.gallery_message}>*Click on photo to zoom in</em>
        <div className={styles.tattoo_gallery}>
          <Gallery
            onNext={handleNext}
            onPrev={handlePrev}
            currentIndex={currentIndex}
            currentImageObj={currentImageObj}
            photos={photos}
          />
        </div>
      </FadeInSection>
    </main>
  );
}
