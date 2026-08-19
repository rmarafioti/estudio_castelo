"use client";

import { heroPhoto } from "./_data/photos";
import FadeInSection from "./_components/Fade_In_Section";
import Responsive_Image_Layout from "./_components/Responsive_Image_Layout";

import styles from "./_styling/landing_page.module.css";

export default function Home() {
  return (
    <FadeInSection>
      <Responsive_Image_Layout
        photoData={heroPhoto}
        className={styles.heroPhoto}
      />
    </FadeInSection>
  );
}
