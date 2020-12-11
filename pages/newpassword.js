import React, { useState } from "react";
import Page from "../components/Page/Page";
import styles from "../components/Page/Page.module.css";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
const NewPassword = (props) => {
  const history = useHistory();
  const {id, token} = useParams();
  const [formData, setFormData] = useState({
    password: "",
    reenteredPassword: "",
  });

  
  const onPasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const onReenteredPasswordChange = (e) => {
    setFormData({ ...formData, reenteredPassword: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.reenteredPassword) {
      resetPassword();
    } else {
      alert("Password and re-typed password don't match");
    }
  };

  const resetPassword = () => {
    const toPost = {
      id: id,
      token: token,  
      password: formData.password,
    };

    const options = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post("/api/auth/resetpassword", JSON.stringify(toPost), options)
      .then((res) => {
        alert("Password changed successfully");
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
        <h2>RESET PASSWORD</h2>
        <div className={`${styles["register-login-form-padded"]}`}>
          <form onSubmit={handleSubmit} className={styles["headline-form"]}>
         
            <div className={styles["horizontal"]}>
              <label>New Password: </label>
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
              value="Reset"
              className={styles["submit-button"]}
            />
          </form>
          {/* <div className={styles["register-login-form-text"]}>
            <label>
              <Link to={"/login"}>Already have an account?</Link>
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );

  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export default NewPassword;
