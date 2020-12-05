import React, { useState } from "react";
import Page from "../components/Page/Page";
import styles from "../components/Page/Page.module.css";
import { Value } from "slate";
import styles2 from "../components/Comment/Comment.module.css";
import TextEditor from "../components/TextEditor/TextEditor";
import {DeviceContext} from "../contexts/reducers/deviceContext";
import {LoginContext} from "../contexts/reducers/loginContext"
import axios from "axios";
import { useHistory } from "react-router-dom";

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
                text: "Edit text, save and press send to message us...",
              },
            ],
          },
        ],
      },
    ],
  },
};

const ContactUs = (props) => {
  const [deviceState, deviceDispatch] = useContext(DeviceContext);
  const [loginState, loginDispatch] = useContext(LoginContext);
  const screen = deviceState.screen;
  const isLoggedIn = loginState.isLoggedIn;
  const user = loginState.user;
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: isLoggedIn && user ? user.firstName : "",
    lastName: isLoggedIn && user ? user.lastName : "",
    email: isLoggedIn ? user.email : "",
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
    registerUser();
  };

  const registerUser = () => {
    const toPost = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      subject: formData.subject,
      content: textEditorValue.toJSON(),
    };

    const options = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post("/messages/create", JSON.stringify(toPost), options)
      .then((res) => {
        alert("Message Sent");
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

  const sidePaneContents = (
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
              value={textEditorValue}
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

  const address =
    "The False 9 Podcast \nBhotekoshi Marga \nChappalkarkhana \nKathmandu \n44600 \nNepal";

  const phone = "+12144975731\n+9779841360410";
  const mainPaneContents = (
    <>
      <div
        className={`${styles["main-pane-item"]} ${styles["main-pane-item-centered"]}`}
        style={{ paddingBottom: "0px", paddingTop: "0px" }}
      >
        <h1 className={styles["heading-special"]} style={{ margin: "10px" }}>
          Contact Us
        </h1>
      </div>

      <div
        className={`${styles["main-pane-item"]} ${styles["main-pane-item-centered"]} `}
        style={{ flexDirection: "column" }}
      >
        <div>
          <h1 className={styles["heading"]}>
            <i class="fas fa-map-marker-alt"></i> Address:{" "}
          </h1>

          <p style={{ whiteSpace: "pre-wrap", width: "min-content" }}>
            {address}
          </p>
          <div>
            <h1 className={styles["heading"]}>
              <i class="fas fa-envelope"></i> Emails:{" "}
            </h1>
            <label
              style={
                screen === "mobile"
                  ? { display: "flex", flexDirection: "column" }
                  : { display: "flex", flexDirection: "row" }
              }
            >
              <h2
                className={styles["sub-heading"]}
                style={{ padding: "0px", paddingRight: "10px", margin: "0px" }}
              >
                General:
              </h2>
              <p style={{ padding: "0px", margin: "0px" }}>
                email@thefalseninepodcast.com
              </p>
            </label>
            <label
              style={
                screen === "mobile"
                  ? { display: "flex", flexDirection: "column" }
                  : { display: "flex", flexDirection: "row" }
              }
            >
              <h2
                className={styles["sub-heading"]}
                style={{ padding: "0px", margin: "0px", paddingRight: "10px" }}
              >
                Ishan Sharma:
              </h2>
              <p style={{ padding: "0px", margin: "0px" }}>
                ishanvilla@gmail.com
              </p>
            </label>
            <label
              style={
                screen === "mobile"
                  ? { display: "flex", flexDirection: "column" }
                  : { display: "flex", flexDirection: "row" }
              }
            >
              <h2
                className={styles["sub-heading"]}
                style={{ padding: "0px", margin: "0px", paddingRight: "10px" }}
              >
                Susajjan Dhungana:
              </h2>
              <p style={{ padding: "0px", margin: "0px" }}>2086@nmcth.edu</p>
            </label>
            <label
              style={
                screen === "mobile"
                  ? { display: "flex", flexDirection: "column" }
                  : { display: "flex", flexDirection: "row" }
              }
            >
              <h2
                className={styles["sub-heading"]}
                style={{ padding: "0px", margin: "0px", paddingRight: "10px" }}
              >
                Ojash Dangal:
              </h2>
              <p style={{ padding: "0px", margin: "0px" }}>
                ojashdangal@gmail.com
              </p>
            </label>
            <label
              style={
                screen === "mobile"
                  ? { display: "flex", flexDirection: "column" }
                  : { display: "flex", flexDirection: "row" }
              }
            >
              <h2
                className={styles["sub-heading"]}
                style={{ padding: "0px", margin: "0px", paddingRight: "10px" }}
              >
                Madhu Acharya:
              </h2>
              <p style={{ padding: "0px", margin: "0px" }}>
                madhu.acharya@gmail.com
              </p>
            </label>
            <label
              style={
                screen === "mobile"
                  ? { display: "flex", flexDirection: "column" }
                  : { display: "flex", flexDirection: "row" }
              }
            >
              <h2
                className={styles["sub-heading"]}
                style={{ padding: "0px", margin: "0px", paddingRight: "10px" }}
              >
                Sajal Satyal:
              </h2>
              <p style={{ padding: "0px", margin: "0px" }}>
                sajalsatyal@gmail.com
              </p>
            </label>
          </div>
          <h1 className={styles["heading"]}>
            <i class="fas fa-phone"></i> Phone:{" "}
          </h1>

          <p
            style={{
              whiteSpace: "pre-wrap",
              width: "min-content",
              letterSpacing: "1px",
            }}
          >           
            {phone}
          </p>
        </div>
      </div>
      <div>
          {!(screen === "desktop") && sidePaneContents}
      </div>
    </>
  );

  return (
    <Page
      sidebarFixTopOffset={0}
      mainPane={mainPaneContents}
      sidePane={screen === "desktop"? sidePaneContents : null}
    />
  );
};

export default ContactUs;
