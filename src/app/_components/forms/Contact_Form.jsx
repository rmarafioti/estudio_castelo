"use client";

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Form_Modal from "./Form_Modal";
import useModal from "../../_hooks/useModal";

import styles from "../../_styling/contact_form.module.css";

export default function Contact_Form() {
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState(null);
  const { isOpen, openModal, closeModal } = useModal();

  const inputForm = {
    full_name: "",
    email: "",
    message: "",
  };

  const [formValues, setFormValues] = useState(inputForm);

  const inputValidationError = {
    full_name: false,
    email: false,
    message: false,
  };

  const [validationError, setValidationError] = useState(inputValidationError);

  const validateAllFields = () => {
    const errors = {};
    Object.entries(formValues).forEach(([field, value]) => {
      if (field === "email") {
        errors[field] = !isValidEmail(value);
      } else {
        errors[field] = value.trim() === "";
      }
    });
    setValidationError(errors);
    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const errors = validateAllFields();
    const isValid = Object.values(errors).every((error) => !error);

    if (!isValid) {
      console.log("Form validation failed:", validationError);
      return;
    }

    setIsLoading(true);

    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    emailjs.sendForm(serviceID, templateID, formRef.current, publicKey).then(
      () => {
        console.log("MESSAGE SENT!");
        setMessageStatus("success");
        setIsLoading(false);
        setValidationError({});
        formRef.current.reset();
        setFormValues(inputForm);
        openModal();
      },
      (error) => {
        console.error("MESSAGE FAILED", error?.text);
        setMessageStatus("error");
        setIsLoading(false);
      }
    );
  };

  return (
    <article>
      <h3 className={styles.header}>Form</h3>
      <p className={styles.sub_header}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet
        consectetur adipiscing elit quisque faucibus.
      </p>
      <form ref={formRef} onSubmit={sendEmail}>
        <label className={styles.label}>Full name*</label>
        <input
          className={styles.name}
          type="text"
          name="full_name"
          aria-label="full_name"
          value={formValues.full_name}
          onChange={handleInputChange}
        />
        <label className={styles.label}>Email*</label>
        <input
          className={styles.email}
          type="email"
          name="email"
          aria-label="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
        <label className={styles.label}>Your message*</label>
        <textarea
          className={styles.message}
          name="message"
          aria-label="additional_information"
          value={formValues.message}
          onChange={handleInputChange}
        />
        <p className={styles.required}>*Required</p>
        <input
          className={styles.send}
          type="submit"
          aria-label="form_submit_button"
          value={isLoading ? "Sending..." : "Send"}
          disabled={isLoading}
        />

        {validationError.full_name && (
          <p className={styles.required_error}>*Please enter your full name</p>
        )}
        {validationError.email && (
          <p className={styles.required_error}>*Please enter your email</p>
        )}
        {validationError.message && (
          <p className={styles.required_error}>*Please leave us a message</p>
        )}
        {messageStatus === "error" && (
          <p className={styles.required_error}>
            *Message failed to send. Please try again
          </p>
        )}
      </form>
      <Form_Modal isOpen={isOpen} closeModal={closeModal} />
    </article>
  );
}
