"use client";

import {
  heroPhoto,
  reviewSectionBackground,
  landingPageBioPhoto,
  landingPageTattooPhoto,
} from "./_data/photos";
import { reviews } from "./_data/copy";
import FadeInSection from "./_components/Fade_In_Section";
import Responsive_Image from "./_components/Responsive_image";
import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";

import styles from "./_styling/landing_page.module.css";

function Review_Card({ name, review }) {
  return (
    <div className={styles.review_card}>
      <div>
        <IoStarSharp />
        <IoStarSharp />
        <IoStarSharp />
        <IoStarSharp />
        <IoStarSharp />
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.review}>{review}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <article className={styles.hero_section}>
        <div className={styles.hero_image_container}>
          <Responsive_Image photoData={heroPhoto} />
        </div>
        <FadeInSection className={styles.hero_copy_container}>
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
        </FadeInSection>
      </article>
      {/*<div>
        <div>
          <Image
            src={landingPageTattooPhoto.src}
            alt={landingPageTattooPhoto.alt}
            height={landingPageTattooPhoto.height}
            width={landingPageTattooPhoto.width}
          />
          <h2>Tattooing</h2>
          <p>View Felipe's porfolio</p>
        </div>
        <Image
          src={landingPageBioPhoto.src}
          alt={landingPageBioPhoto.alt}
          height={landingPageBioPhoto.height}
          width={landingPageBioPhoto.width}
        />
        <h2>About</h2>
        <p>Get to know Felipe</p>
      </div>*/}
      <article className={styles.review_section}>
        <div className={styles.review_image_container}>
          <Responsive_Image photoData={reviewSectionBackground} />
        </div>
        <FadeInSection className={styles.review_copy_container}>
          <h2 className={styles.header_review}>
            Professional tattooing & customer service
          </h2>
          <p className={styles.review_copy}>
            Read what clients are saying
            <em className={styles.note}> *hover & scroll to read reviews</em>
          </p>
          <div className={styles.review_cards}>
            {reviews.map((review, index) => (
              <Review_Card
                key={index}
                name={review.name}
                review={review.review}
              />
            ))}
          </div>
        </FadeInSection>
      </article>
    </main>
  );
}
