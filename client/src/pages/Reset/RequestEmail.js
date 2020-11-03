import React, { useState } from "react";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
const RequestEmail = (props) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
  });

  const onEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmailAddress();
  };

  const sendEmailAddress = () => {
    const toPost = {
      email: formData.email,
    };

    const options = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post("/auth/forgotpassword", JSON.stringify(toPost), options)
      .then((res) => {
        alert("Password reset link sent to email");
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
        <h2>PASSWORD RESET</h2>
        <div className={`${styles["register-login-form-padded"]}`}>
          <form onSubmit={handleSubmit} className={styles["headline-form"]}>
            <div className={styles["horizontal"]}>
              <label>Email: </label>
              <input
                className={styles["headline-form-input"]}
                type="text"
                value={formData.email}
                onChange={onEmailChange}
              />
            </div>

            <input
              type="submit"
              value="Request"
              className={styles["submit-button"]}
            />
          </form>
          <div className={styles["register-login-form-text"]} style={{color: "#072339"}}>
            <label >
              Enter your email to receive a password reset link
            </label>
            <label>
            <Link to={"/login"}>Back to Login Page</Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export default RequestEmail;
