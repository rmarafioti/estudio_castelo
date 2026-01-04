"use client";

import FadeInSection from "../_components/Fade_In_Section";
import Responsive_Image from "../_components/Responsive_image";
import { tattooHeaderBackground } from "../_data/photos";

import styles from "../_styling/tattooing.module.css";

export default function Tattooing() {
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
    </main>
  );
}
