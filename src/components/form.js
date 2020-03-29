import React, { useReducer } from "react";
import styles from "./form.module.css";

const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  body: "",
  status: "IDLE"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.value };
    case "updateStatus":
      return { ...state, status: action.status };
    case "reset":
    default:
      return INITIAL_STATE;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleSubmit = e => {
    e.preventDefault();
    setStatus("PENDING");

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(state)
    })
      .then(response => response.json())
      .then(response => {
        setStatus("SUCCESS");
      });
  };

  const setStatus = status => dispatch({ type: "updateStatus", status });

  // Curried function below,
  // Instead of simply calling a function with 2 args, call the function with one arg, then return another function that
  // Accepts the *SECOND* argument
  // Allows a function to be returned that has the scope of all the outer scope variables
  // This is tricky to see in use because the second arg (e) comes for free
  // onChange={e => updateFieldValue("name")(e)} is more illustrative
  const updateFieldValue = field => event => {
    dispatch({
      type: "updateFieldValue",
      field,
      value: event.target.value
    });
  };

  if (state.status === "SUCCESS") {
    return (
      <p className={styles.success}>
        Message sent!{" "}
        <button type="reset" onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
      </p>
    );
  }

  return (
    <>
      {state.status === "ERROR" && (
        <p className={styles.error}>ERROR! Try again</p>
      )}
      <form
        className={`${styles.form} ${state.status === "PENDING" &&
          styles.pending}`}
        onSubmit={handleSubmit}
      >
        <label className={styles.label}>
          name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={state.name}
            onChange={e => updateFieldValue("name")(e)}
          />
        </label>
        <label className={styles.label}>
          email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={state.email}
            onChange={updateFieldValue("email")}
          />
        </label>
        <label className={styles.label}>
          subject
          <input
            className={styles.input}
            type="text"
            name="subject"
            value={state.subject}
            onChange={updateFieldValue("subject")}
          />
        </label>
        <label className={styles.label}>
          Body
          <textarea
            className={styles.input}
            name="body"
            value={state.body}
            onChange={updateFieldValue("body")}
          />
        </label>
        <button className={styles.button}> send </button>
      </form>
    </>
  );
};

export default Form;
