"use client";

import FadeInSection from "../_components/Fade_In_Section";
import Responsive_Image from "../_components/Responsive_image";
import usePhotoGallery from "../_hooks/usePhotoGallery";
import Gallery from "../_components/Gallery";
import { tattooHeaderBackground } from "../_data/photos";
import { tattooPhotos } from "../_data/tattooGallery";

import styles from "../_styling/tattooing.module.css";

export default function Tattooing() {
  const { handleNext, handlePrev, currentImageObj, currentIndex, photos } =
    usePhotoGallery(tattooPhotos);

  return (
    <main>
      <article className={styles.tattooing_header_section}>
        <div className={styles.tattooing_image_container}>
          <Responsive_Image photoData={tattooHeaderBackground} />
        </div>
        <FadeInSection className={styles.tattooing_header_container}>
          <h1 className={styles.header}>Tattooing</h1>
        </FadeInSection>
        <FadeInSection className={styles.tattooing_copy_container}>
          <p className={styles.copy}>
            Felipe is an award-winning tattoo artist, mostly inspired by nature
            and classic tattoo imagery. He has experience in a range of tattoo
            styles and is currently focused on black and gray tattoos.
          </p>
        </FadeInSection>
      </article>
      <FadeInSection className={styles.tattoo_gallery}>
        <Gallery
          onNext={handleNext}
          onPrev={handlePrev}
          currentIndex={currentIndex}
          currentImageObj={currentImageObj}
          photos={photos}
        />
      </FadeInSection>
    </main>
  );
}
