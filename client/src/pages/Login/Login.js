import React, { useState } from "react";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setJWTToken } from "../../redux/actions";

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

  const registerUser = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`/auth/login`, requestOptions);
    const data = await response.json();

    if (response.status === 400) {
      alert(data.error);
    } else if (response.status !== 200) {
      throw Error(data.message);
    } else {
      dispatch(setJWTToken(data.token));
      alert("Login Successful");
      history.push("/");
    }
  };

  const contents = (
    <div>
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
          value="Sign Up"
          className={styles["submit-button"]}
        />
      </form>
    </div>
  );

  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export default Login;
