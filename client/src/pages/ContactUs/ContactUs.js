import React, { useState } from "react";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
const ContactUs = (props) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    reenteredPassword: "",
  });

  const onFirstNameChange = (e) => {
    setFormData({ ...formData, firstName: e.target.value });
  };

  const onLastNameChange = (e) => {
    setFormData({ ...formData, lastName: e.target.value });
  };

  const onEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onPasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const onReenteredPasswordChange = (e) => {
    setFormData({ ...formData, reenteredPassword: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.reenteredPassword) {
      registerUser();
    } else {
      alert("Password and re-typed password don't match");
    }
  };

  const registerUser = () => {
    const toPost = {
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email,
      password: formData.password,
    };

    const options = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post("/auth/register", JSON.stringify(toPost), options)
      .then((res) => {
        alert("New User Registered");
        history.push("/");
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 400) {
          alert(err.response.data.error);
        } else if (err.response.status !== 200) {
          throw Error(err);
        }
      });
  };

  const contents = (
    <div
      className={`${styles["main-pane-item"]} ${styles["main-pane-item-centered"]}`}
    >
      <div className={`${styles["register-login-form"]}`}>
      <h2>SIGN UP</h2>
     <div className={`${styles["register-login-form-padded"]}`}>
        <form onSubmit={handleSubmit} className={styles["headline-form"]}>
          <div className={styles["horizontal"]}>
            <label>First Name: </label>
            <input
              className={styles["headline-form-input"]}
              type="text"
              value={formData.firstName}
              onChange={onFirstNameChange}
            />
          </div>
          <div className={styles["horizontal"]}>
            <label>Last Name: </label>
            <input
              className={styles["headline-form-input"]}
              type="text"
              value={formData.lastName}
              onChange={onLastNameChange}
            />
          </div>
          <div className={styles["horizontal"]}>
            <label>Email: </label>
            <input
              className={styles["headline-form-input"]}
              type="text"
              value={formData.email}
              onChange={onEmailChange}
            />
          </div>
          <div className={styles["horizontal"]}>
            <label>Password: </label>
            <input
              className={styles["headline-form-input"]}
              type="password"
              value={formData.password}
              onChange={onPasswordChange}
            />
          </div>
          <div className={styles["horizontal"]}>
            <label>Re-enter Password: </label>
            <input
              className={styles["headline-form-input"]}
              type="password"
              value={formData.reenteredPassword}
              onChange={onReenteredPasswordChange}
            />
          </div>
          <input
            type="submit"
            value="Sign Up"
            className={styles["submit-button"]}
          />
        </form>
        <div className={styles["register-login-form-text"]}>
          <label>
            <Link to={"/login"}>Already have an account?</Link>
          </label>
        </div>
        </div>
      </div>
    </div>
  );

  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export default ContactUs;
