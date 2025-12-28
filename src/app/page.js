"use client";

import { heroPhoto } from "./_data/photos";
import FadeInSection from "./_components/Fade_In_Section";
import Responsive_Image from "./_components/Responsive_image";

import styles from "./_styling/landing_page.module.css";

export default function Home() {
  return (
    <main>
      <FadeInSection>
        <div className={styles.copy_container}>
          <h1 className={styles.header}>Welcome to Estúdio Castelo</h1>
          <p className={styles.copy}>
            Estúdio Castelo is Felipe de Sousa&apos;s virtual private studio, a
            space to explore new mediums and materials beyond his tattoo
            artistry, a place to share art thoughts and concepts directly with
            patrons without the limitations of social media platforms
            algorithms.
          </p>
          <p className={styles.copy}>
            For updates on booking a tattoo, buying prints and original artworks
            by Felipe or knowing what&apos;s new in the path of the artist.
            Enter your email below to subscribe to the Estúdio Castelo
            newsletter
          </p>
        </div>
      </FadeInSection>
      <div className={styles.image_container}>
        <Responsive_Image photoData={heroPhoto} />
      </div>
    </main>
  );
}
