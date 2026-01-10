"use client";

import Contact_Form from "../_components/forms/Contact_Form";
import FadeInSection from "../_components/Fade_In_Section";

import styles from "../_styling/contact_form.module.css";

export default function Contact() {
  return (
    <main>
      <FadeInSection className={styles.contact_header_section}>
        <h1>Get in touch</h1>
        <p className={styles.sub_header}>
          Fill out the form below to request tattoo appointments, inquire about
          art comissions, purchases or any general questions.
        </p>
        <Contact_Form />
      </FadeInSection>
    </main>
  );
}
