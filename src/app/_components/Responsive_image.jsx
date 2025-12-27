"use client";

import { getImageProps } from "next/image";

import styles from "../_styling/responsive_image.module.css";

export default function Responsive_Image({ photoData }) {
  const { desktop, mobile, alt } = photoData;
  const primaryAttributes = { alt, priority: true };

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...primaryAttributes,
    src: mobile.src,
    height: mobile.height,
    width: mobile.width,
  });

  const {
    props: { ...desktopProps },
  } = getImageProps({
    ...primaryAttributes,
    src: desktop.src,
    height: desktop.height,
    width: desktop.width,
  });

  return (
    <picture>
      <source media="(max-width: 800px)" srcSet={mobileSrcSet} />
      <img {...desktopProps} className={styles.image} />
    </picture>
  );
}
