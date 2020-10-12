import React, { useState } from "react";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import {useHistory} from 'react-router-dom'
import axios from 'axios'
const SignUp = (props) => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const onEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onPasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser()
  }

  const registerUser = async () => {

     const options = {
      headers: { "Content-Type": "application/json" },
    };

     axios
     .post("/auth/register", JSON.stringify(formData), options)
     .then((res) => {
       alert("New User Registered");
       history.push('/')
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
    <div>
      <form
        onSubmit={handleSubmit}
        className={styles["headline-form"]}
      >
        <div className={styles["horizontal"]}>
          <label>Name: </label>
          <input
            className={styles["headline-form-input"]}
            type="text"
            value={formData.name}
            onChange={onNameChange}
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

export default SignUp;
