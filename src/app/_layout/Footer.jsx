"use client";

import { logo } from "../_data/photos";
import Link from "next/link";
import Image from "next/image";

import styles from "../_styling/footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={styles.copy_container}>
        <Link href="/">
          <Image
            src={logo.src}
            alt={logo.alt}
            height={logo.height}
            width={logo.width}
            className={styles.logo}
          />
        </Link>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Marf Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
