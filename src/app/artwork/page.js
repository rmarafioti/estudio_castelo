"use client";

import FadeInSection from "../_components/Fade_In_Section";

import styles from "../_styling/artwork.module.css";

export default function Artwork() {
  return (
    <main>
      <FadeInSection className={styles.contact_header_section}>
        <h1>Artwork</h1>
        <h2>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet
          consectetur adipiscing elit quisque faucibus.
        </h2>
      </FadeInSection>
    </main>
  );
}
