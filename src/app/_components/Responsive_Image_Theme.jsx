"use client";

import styles from "../_styling/responsive_image.module.css";

export default function Responsive_Image_Theme({ photoData, className = "" }) {
  const { src_light, src_dark, alt, height, width } = photoData;

  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={src_dark} />
      <img
        src={src_light}
        width={width}
        height={height}
        alt={alt}
        className={className}
      />
    </picture>
  );
}
