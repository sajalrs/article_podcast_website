import React, { useEffect, useContext } from "react";
import MenuItems from "./MenuItems.js";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import FalseNineIcon from "../../Icons/FalseNineFitting";
import { LoginContext } from "../../contexts/reducers/loginContext";
import { setIsLoggedInAction } from "../../contexts/actions";

import axios from "axios";
const Navbar = (props) => {
  const [loginState, loginDispatch] = useContext(LoginContext);
  const isLoggedIn = loginState.isLoggedIn;
  const setIsLoggedIn = setTo = loginDispatch(setIsLoggedInAction(setTo));
  const history = useRouter();
  useEffect(() => {
    const updateDropDown = () => {
      if (window.innerWidth > 1250 && props.navbarClicked) {
        props.setNavbarClicked(window.innerWidth < 1250);
      }
    };
    window.addEventListener("resize", updateDropDown);
    return () => {
      window.addEventListener("resize", updateDropDown);
    };
  }, [props.navbarClicked]);

  return (
    <div className={styles["Navbar"]}>
      <div
        className={styles["navbar-title-logo"]}
        onClick={() => {
          if (props.sidebarClicked) {
            props.setSidebarClicked(false);
          }
          props.setNavbarClicked(false);
          history.push("/");
        }}
      >
        <FalseNineIcon width="37px" height="37px" />
        <label className={styles["navbar-title"]}>THE FALSE 9</label>
      </div>
      <nav>
        <div className={styles["navigation"]}>
          <ul
            className={
              props.navbarClicked
                ? `${styles["nav-links-list"]} ${styles["nav-links-list-active"]}`
                : `${styles["nav-links-list"]} ${styles["nav-links-list-inactive"]}`
            }
          >
            {MenuItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className={
                    index % 2 === 0
                      ? `${styles["list-item"]} ${styles["list-item-even"]}`
                      : `${styles["list-item"]} ${styles["list-item-odd"]}`
                  }
                >
                  <Link href={item.url}>
                    <a
                      onClick={() => {
                        if (props.sidebarClicked) {
                          props.setSidebarClicked(false);
                        }
                        props.setNavbarClicked(false);
                      }}
                      className={styles[item.className]}
                    >
                      <label className={styles["link-text"]}>
                        {item.title.toUpperCase()}
                      </label>
                    </a>
                  </Link>
                </li>
              );
            })}
            {isLoggedIn ? (
              <li
                key={MenuItems.length}
                className={
                  MenuItems.length % 2 === 0
                    ? `${styles["list-item"]} ${styles["list-item-even"]}`
                    : `${styles["list-item"]} ${styles["list-item-odd"]}`
                }
              >
                <Link href={"/"}>
                  <a
                    onClick={() => {
                      const onLogout = async () => {
                        axios
                          .get("api/auth/logout")
                          .then(async (res) => {
                            setIsLoggedIn(false);
                            alert("User Logged Out");
                            history.reload();
                          })
                          .catch((err) => {
                            throw Error(err);
                          });
                      };

                      onLogout().then((res) => {
                        if (props.sidebarClicked) {
                          props.setSidebarClicked(false);
                        }
                        props.setNavbarClicked(false);
                      });
                    }}
                    className={styles["submit-btn"]}
                  >
                    <label className={styles["link-text"]}>
                      {"Logout".toUpperCase()}
                    </label>
                  </a>
                </Link>
              </li>
            ) : (
              <li
                key={MenuItems.length}
                className={
                  MenuItems.length % 2 === 0
                    ? `${styles["list-item"]} ${styles["list-item-even"]}`
                    : `${styles["list-item"]} ${styles["list-item-odd"]}`
                }
              >
                <Link href={"/login"}>
                  <a
                    onClick={() => {
                      if (props.sidebarClicked) {
                        props.setSidebarClicked(false);
                      }
                      props.setNavbarClicked(false);
                    }}
                    className={styles["submit-btn"]}
                  >
                    <label className={styles["link-text"]}>
                      {"Login".toUpperCase()}
                    </label>
                  </a>
                </Link>
              </li>
            )}
          </ul>
          <ul className={styles["social-links"]}>
            <li>
              <i
                className={
                  props.navbarClicked
                    ? `${styles["fas"]} ${styles["fa-times"]} fas fa-times`
                    : `${styles["fas"]} ${styles["fa-bars"]} fas fa-bars`
                }
                onClick={() => {
                  props.setNavbarClicked(!props.navbarClicked);
                }}
              />
            </li>
            <li>
              <a href="https://www.facebook.com/False9Podcast" target="_blank">
                <i
                  className={`${styles["fab"]} ${styles["fa-facebook-f"]} fab fa-facebook-f`}
                />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/TFalse9podcast" target="_blank">
                <i
                  className={`${styles["fab"]} ${styles["fa-twitter"]} fab fa-twitter`}
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCV2Y62okiOmoXzYIh_xAcGw"
                target="_blank"
              >
                <i
                  className={`${styles["fab"]} ${styles["fa-youtube"]} fab fa-youtube`}
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/thefalse9podcast/"
                target="_blank"
              >
                <i
                  className={`${styles["fab"]} ${styles["fa-instagram"]} fab fa-instagram`}
                />
              </a>
            </li>
            <li>
              <a
                href="https://hamroaudio.appspot.com/feed/podcast/5656298525818880?fbclid=IwAR1fGF-0jFifAl5MVsMAODjFWAcUTtyPTXQHpDCfKqx1Nr0zoLwGqGmZV2g"
                target="_blank"
              >
                <i
                  className={`${styles["fas"]} ${styles["fas-rss"]} fas fa-rss`}
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
