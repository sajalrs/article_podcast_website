import React, { useState, useEffect } from "react";
import Page from "../components/Page/Page";
import styles from "../components/Page/Page.module.css";
// import { Link } from "react-router-dom";
// import { useHistory, useParams } from "react-router-dom";
import {useRouter} from "next/router"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUser } from "../redux/actions";
import { fetchBlogArticles } from "./_app.js";
import axios from "axios";

const Login = (props) => {
  const history = useRouter();
  const { email } = history.query;

  const dispatch = useDispatch();
  const isLoggedInGlobal = useSelector((state) => state.login.isLoggedIn);
  const userGlobal = useSelector((state) => state.login.user);
  // const socket = useSelector((state) => state.network.socket);
  useEffect(() => {
    if (isLoggedInGlobal && formData.password === "") {
      if (email) {
        subscribeNewsletter().then(() => {
          if (userGlobal && !userGlobal.isSubscribed) {
            dispatch(setUser({ ...userGlobal, isSubscribed: true }));
          }
        });
      } else {
        alert("You are already logged in");
      }
      history.push("/");
    }
  }, [isLoggedInGlobal]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const subscribeNewsletter = async () => {
    const toPost = { isSubscribed: true };
    const options = {
      headers: { "Content-Type": "application/json" },
    };

    await axios
      .post("api/auth/subscribe", JSON.stringify(toPost), options)
      .then((res) => {
        alert("Subscribed to newsletter");
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 400) {
          alert(err.response.data.error);
        } else if (err.response.status !== 200) {
          throw Error(err);
        }
      });
  };

  useEffect(() => {
    if (email) {
      setFormData({ ...formData, email: email });
    }
  }, [email]);

  const onEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onPasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const loginUser = () => {
    const options = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post("api/auth/login", JSON.stringify(formData), options)
      .then((res) => {
        alert("Login Successful");

        isLoggedIn().then(() => {
          if (email && userGlobal && !userGlobal.isSubscribed) {
            subscribeNewsletter().then(() => {
              if (userGlobal && !userGlobal.isSubscribed) {
                dispatch(setUser({ ...userGlobal, isSubscribed: true }));
              }
            });
          }
          history.push("/");
        });
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 400) {
          alert(err.response.data.error);
        } else if (err.response.status !== 200) {
          throw Error(err);
        }
      });
  };

  const isLoggedIn = async () => {
    await axios.get("api/auth/isloggedin").then((response) => {
      if (response.status !== 200) {
        dispatch(setIsLoggedIn(false));
      } else {
        dispatch(setIsLoggedIn(true));
        dispatch(setUser(response.data.user));
        // socket && socket.emit("join", { _id: response.data.user._id, tokenCreated: response.data.user.tokenCreated });
        dispatch(fetchBlogArticles());
      }
    });
  };
  const contents = (
    <div
      className={`${styles["main-pane-item"]} ${styles["main-pane-item-centered"]}`}
    >
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
              <Link href={"/forgotpassword"}><a>
                Forgot your password or locked out?
                </a>
              </Link>
            </label>
            <label>
              <a>
              <Link href={"/register"}>Don't have an account?</Link>
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export default Login;
