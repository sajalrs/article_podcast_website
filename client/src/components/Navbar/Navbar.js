import React, { useState, useEffect } from "react";
import MenuItems from "./MenuItems.js";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import FalseNineIcon from "../../Icons/FalseNineFitting";
import { useSelector, useDispatch } from "react-redux";
import {setIsLoggedIn} from "../../redux/actions"

const Navbar = (props) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();
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
      <div className={styles["navbar-title-logo"]}>
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
                  <Link
                    onClick={() => {
                      if (props.sidebarClicked) {
                        props.setSidebarClicked(false);
                      }
                      props.setNavbarClicked(false);
                    }}
                    to={item.url}
                    className={styles[item.className]}
                  >
                    <label className={styles["link-text"]}>
                      {item.title.toUpperCase()}
                    </label>
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
                <Link
                  onClick={() => {
                    const onLogout = async () => {
                      const response = await fetch("/auth/logout");
                      const body = await response.json();
                      if (response.status !== 200) {
                        throw Error(body.message);
                      }
                    };

                    onLogout().then((res) => {
                      if (props.sidebarClicked) {
                        props.setSidebarClicked(false);
                      }
                      props.setNavbarClicked(false);
                      dispatch(setIsLoggedIn(false));
                    });
                  }}
                  to={"/"}
                  className={styles["submit-btn"]}
                >
                  <label className={styles["link-text"]}>
                    {"Logout".toUpperCase()}
                  </label>
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
                <Link
                  onClick={() => {
                    if (props.sidebarClicked) {
                      props.setSidebarClicked(false);
                    }
                    props.setNavbarClicked(false);
                  }}
                  to={"/login"}
                  className={styles["submit-btn"]}
                >
                  <label className={styles["link-text"]}>
                    {"Login".toUpperCase()}
                  </label>
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
