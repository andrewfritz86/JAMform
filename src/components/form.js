import React from "react";
import styles from "./form.module.css";

const handleSubmit = e => {
  e.preventDefault();
};

const form = () => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        name
        <input className={styles.input} type="text" name="name" />
      </label>
      <label className={styles.label}>
        email
        <input className={styles.input} type="email" name="email" />
      </label>
      <label className={styles.label}>
        subject
        <input className={styles.input} type="text" name="subject" />
      </label>
      <label className={styles.label}>
        Body
        <textarea className={styles.input} name="body" />
      </label>
      <button className={styles.button}> send </button>
    </form>
  );
};

export default form;
