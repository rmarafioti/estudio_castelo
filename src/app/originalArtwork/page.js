"use client";

import FadeInSection from "../_components/Fade_In_Section";
import Image from "next/image";
import { originalArtwork } from "../_data/photos";

import styles from "../_styling/original_artwork.module.css";

export default function Original_Artwork() {
  return (
    <FadeInSection>
      <div className={styles.header_section}>
        <h1>Original Artwork</h1>
        <p>
          A selection of original, hand-made drawings and paintings by Felipe de
          Sousa. Every piece is hand-signed and dated on the back.
        </p>
      </div>
      <div className={styles.original_artwork_container}>
        {originalArtwork.map(({ id, src, height, width, alt }) => (
          <div key={id} className={styles.artwork_frame}>
            <Image
              src={src}
              height={height}
              width={width}
              alt={alt}
              className={styles.artwork}
            />
          </div>
        ))}
      </div>
    </FadeInSection>
  );
}
