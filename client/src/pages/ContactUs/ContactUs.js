import React, { useState } from "react";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import { Value } from "slate";
import styles2 from "../../components/Comment/Comment.module.css"
import TextEditor from "../../components/TextEditor/TextEditor"
import axios from "axios";

const initialValue = {
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "Edit text, save and press send to send message...",
              },
            ],
          },
        ],
      },
    ],
  },
};

const ContactUs = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
  });

  const [textEditorValue, setTextEditorValue] = useState(
    Value.fromJSON(initialValue)
  );

  const onFirstNameChange = (e) => {
    setFormData({ ...formData, firstName: e.target.value });
  };

  const onLastNameChange = (e) => {
    setFormData({ ...formData, lastName: e.target.value });
  };

  const onEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onSubjectChange = (e) => {
    setFormData({ ...formData, subject: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // const registerUser = () => {
  //   const toPost = {
  //     name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
  //     email: formData.email,
  //     password: formData.password,
  //   };

  //   const options = {
  //     headers: { "Content-Type": "application/json" },
  //   };

  //   axios
  //     .post("/auth/register", JSON.stringify(toPost), options)
  //     .then((res) => {
  //       alert("New User Registered");
  //       history.push("/");
  //     })
  //     .catch((err) => {
  //       if (err.response.status === 401 || err.response.status === 400) {
  //         alert(err.response.data.error);
  //       } else if (err.response.status !== 200) {
  //         throw Error(err);
  //       }
  //     });
  // };

  const contents = (
    <div
      className={`${styles["main-pane-item"]} ${styles["main-pane-item-centered"]}`}
    >
      <div className={`${styles["contact-us-form"]}`}>
        <h2>MESSAGE US</h2>
        <div className={`${styles["contact-us-form-padded"]}`}>
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
              <label>Subject: </label>
              <input
                className={styles["headline-form-input"]}
                type="text"
                value={formData.subject}
                onChange={onSubjectChange}
              />
            </div>

            <TextEditor
              value={
                textEditorValue
              }
              setValue={setTextEditorValue}
              onSave={() => {}}
              toolbarFixed={false}
              styles={styles2}
            />

            <input
              type="submit"
              value="Send"
              className={styles["submit-button"]}
            />
          </form>
          <div className={styles["register-login-form-text"]}></div>
        </div>
      </div>
    </div>
  );

  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export default ContactUs;
