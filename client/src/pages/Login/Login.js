import React, { useState } from "react";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../redux/actions";
import axios from "axios";

const Login = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onPasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  const registerUser = () => {
    const options = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post("/auth/login", JSON.stringify(formData), options)
      .then((res) => {
        alert("Login Successful");
        dispatch(setIsLoggedIn(true));
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
    <div className={`${styles["main-pane-item"]} ${styles["main-pane-item-centered"]}`}>
     <div className={`${styles["register-login-form"]}`}>
     <h2>LOGIN</h2>
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
        <div className={styles["horizontal"]}>
          <label>Password: </label>
          <input
            className={styles["headline-form-input"]}
            type="password"
            value={formData.password}
            onChange={onPasswordChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className={styles["submit-button"]}
        />
      </form>
      <div className={styles["register-login-form-text"]}>
      <label>
        <Link to={"/"}>Forgot your password or locked out?</Link>
      </label>
      <label>
        <Link to={"/register"}>Don't have an account?</Link>
      </label>
      </div>
      </div> 
      </div>
    </div>
  );

  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export default Login;
