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
        <FadeInSection className={styles.tattooing_copy_container}>
          <h1 className={styles.header}>Tattooing</h1>
          <p className={styles.copy}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            feugiat pulvinar nisl sed viverra. Proin dapibus sed metus sit amet
            rhoncus. Nam ante felis, tempus vitae leo vel, interdum ultrices
            ipsum. Nullam tincidunt orci massa, et commodo lectus vulputate
            quis. Maecenas eu suscipit diam. Cras porta eros eros, in vehicula
            ipsum dignissim porta. Vestibulum imperdiet massa ut augue blandit,
            in vestibulum nisl mollis. Ut justo massa, ultrices ullamcorper
            imperdiet bibendum, dapibus sit amet urna. Sed eleifend velit vel
            malesuada cursus. Etiam dapibus nunc lacus, et dignissim augue
            interdum at.
          </p>
        </FadeInSection>
      </article>
    </main>
  );
}
