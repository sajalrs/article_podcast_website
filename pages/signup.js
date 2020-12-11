import React, { useState } from "react";
import Page from "../components/Page/Page";
import styles from "../components/Page/Page.module.css";
// import { Link, useHistory } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
const SignUp = (props) => {
  const history = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    reenteredPassword: "",
    isSubscribed: false,
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

  const onIsSubscribedChange = () => {
    setFormData({ ...formData, isSubscribed: !formData.isSubscribed });
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
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    const options = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post("/api/auth/register", JSON.stringify(toPost), options)
      .then((res) => {
        alert("New User Registered");
        history.push("/login");
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

            <div className={styles["horizontal"]}>
              <label for="subscribe">
                Subscribe to Newsletter:{" "}
                <input
                  className={styles["headline-form-checkbox"]}
                  id="subscribe"
                  type="checkbox"
                  checked={formData.isSubscribed}
                  onChange={onIsSubscribedChange}
                />
              </label>
            </div>

            <div className={styles["horizontal"]}>
              <label
                style={{
                  color: "var(--primary-color)",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                By signing up you indicate that you have read and accept our
                terms and conditions
              </label>
            </div>

            <input
              type="submit"
              value="Sign Up"
              className={styles["submit-button"]}
            />
          </form>
          <div className={styles["register-login-form-text"]}>
            <label>
              <Link href={"/login"}><a>Already have an account?</a></Link>
            </label>
            <label>
              <Link href={"/legal/termsofservice"}>Terms and Conditions</Link>
            </label>
            <label>
              <Link href={"/legal/privacy"}>Privacy Statement</Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export default SignUp;
