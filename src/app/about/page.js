"use client";

import FadeInSection from "../_components/Fade_In_Section";

import styles from "../_styling/about.module.css";

export default function About() {
  return (
    <FadeInSection>
      <div className={styles.header_section}>
        <h1>About</h1>
        <p>
          Felipe de Sousa is an award-winning Brazilian tattooer, illustrator
          and fine artist currently living and working in Chicago. ESTUDIO
          CASTELO is Felipe&#39;s art studio where he&#39;s mainly focused on
          figurative drawing.
        </p>
      </div>
    </FadeInSection>
  );
}
