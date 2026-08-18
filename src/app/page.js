"use client";

import { heroPhoto } from "./_data/photos";
import FadeInSection from "./_components/Fade_In_Section";
import Responsive_Image_Layout from "./_components/Responsive_Image_Layout";
import Contact_Form from "./_components/forms/Contact_Form";

import styles from "./_styling/landing_page.module.css";

export default function Home() {
  return (
    <main>
      <FadeInSection>
        <h1>Landing Page</h1>
        <h2>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet
          consectetur adipiscing elit quisque faucibus.
        </h2>
        <div className={styles.image_container}>
          <Responsive_Image_Layout
            photoData={heroPhoto}
            /*className={styles.hero_photo}*/
          />
        </div>
        <Contact_Form />
      </FadeInSection>
    </main>
  );
}
