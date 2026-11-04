// The Original Artwork page: the hardcoded header, then the artwork gallery from the Headless
// CMS. A Server Component, so the gallery is fetched at build/regeneration time and the page
// stays static. A missing or unpublished gallery shows the 404 page.
import { notFound } from "next/navigation";

import FadeInSection from "../_components/Fade_In_Section";
import Artwork_Gallery from "../_components/Artwork_Gallery";
import { getGallery } from "../_lib/getGallery";

import styles from "../_styling/original_artwork.module.css";

// The gallery's Gallery Code (slug) in the CMS dashboard.
const GALLERY_CODE = "test-test-test";

export const metadata = {
  title: "Original Artwork | Estudio Castelo",
  description:
    "Original, hand-made drawings and paintings by Felipe de Sousa, mixed media on paper.",
};

export default async function Original_Artwork() {
  const gallery = await getGallery(GALLERY_CODE);
  if (!gallery) notFound();

  return (
    <FadeInSection>
      <div className={styles.header_section}>
        <h1>Original Artwork</h1>
        <p>
          A selection of original, hand-made drawings and paintings by Felipe de
          Sousa. Every piece 9&quot;x12&quot; mixed media on paper, hand-signed
          and dated on the back.
        </p>
      </div>
      <Artwork_Gallery images={gallery.images} />
    </FadeInSection>
  );
}
