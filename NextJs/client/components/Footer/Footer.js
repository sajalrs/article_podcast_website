import React, { useState, useEffect, forwardRef } from "react";
import styles from "./Footer.module.css";
import { useSelector } from "react-redux";
// import { Link, useHistory } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/router";
const Footer = forwardRef((props, ref) => {
  const history = useRouter();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const user = useSelector((state) => state.login.user);
  const [emailInput, setEmailInput] = useState();
  useEffect(() => {
    if (isLoggedIn && user && user.email) {
      setEmailInput(user.email);
    }
  }, [isLoggedIn, user]);

  const onEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`login/email=${emailInput}`);
  };

  return (
    <div>
      <div ref={ref} className={styles["footer-container"]}>
        <section className={styles["footer-subscription"]}>
          {isLoggedIn && user && user.isSubscribed ? (
            <p className={styles["footer-subscription-heading"]}>
              You are subscribed to our newsletter
            </p>
          ) : (
            <>
              <p className={styles["footer-subscription-heading"]}>
                Join our newsletter
              </p>

              <div className={styles["input-area"]}>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={emailInput}
                    onChange={onEmailChange}
                    placeholder="Enter your email"
                    className={styles["footer-input"]}
                  />
                  <input
                    type="submit"
                    className={styles["submit-btn"]}
                    value="Subscribe"
                  />
                </form>
              </div>
            </>
          )}
        </section>

        <div className={styles["footer-links"]}>
          <div className={styles["footer-link-wrapper"]}>
            <div className={styles["footer-link-items"]}>
              <h2>About Us</h2>
              <Link href="/aboutus">Team</Link>
              <Link href="/contactus">Contact Us</Link>
            </div>
            <div className={styles["footer-link-items"]}>
              <h2>Podcasts</h2>
              <a href="https://anchor.fm/thefalse9podcast" target="_blank">
                Anchor
              </a>
              <a
                href="https://open.spotify.com/show/5AFWCgFUdp0S7VGmv23EiB"
                target="_blank"
              >
                Spotify
              </a>
              <a
                href="https://podcasts.apple.com/us/podcast/the-false-nine-podcast/id1467336074"
                target="_blank"
              >
                Apple Podcasts
              </a>
              <a
                href="https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy8zMzNlMTIyYy9wb2RjYXN0L3Jzcw=="
                target="_blank"
              >
                Google Podcasts
              </a>
            </div>
          </div>

          <div className={styles["footer-link-wrapper"]}>
            <div className={styles["footer-link-items"]}>
              <h2>Social</h2>
              <a href="https://www.facebook.com/False9Podcast" target="_blank">
                Facebook
              </a>
              <a href="https://twitter.com/TFalse9podcast" target="_blank">
                Twitter
              </a>
              <a
                href="https://www.instagram.com/thefalse9podcast/"
                target="_blank"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/channel/UCV2Y62okiOmoXzYIh_xAcGw"
                target="_blank"
              >
                YouTube
              </a>
            </div>
            <div className={styles["footer-link-items"]}>
              <h2>Legal</h2>
              <Link href="/legal/privacy">Privacy</Link>

              <Link href="/legal/termsofservice">Terms of Service</Link>
            </div>
          </div>
        </div>

        <small className={styles["website-rights"]}>
          The False 9 Podcast ©
        </small>
        <section className={styles["social-media"]}>
          <div className={styles["social-media-wrap"]}>
            <div className={styles["social-icons"]}>
              <a
                href="https://www.facebook.com/False9Podcast"
                target="_blank"
                className={styles["social-icon-link"]}
              >
                <i
                  className={`${styles["fab"]} ${styles["fa-facebook-f"]} fab fa-facebook-f`}
                />
              </a>
              <a
                href="https://twitter.com/TFalse9podcast"
                target="_blank"
                className={styles["social-icon-link"]}
              >
                <i
                  className={`${styles["fab"]} ${styles["fa-twitter"]} fab fa-twitter`}
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCV2Y62okiOmoXzYIh_xAcGw"
                target="_blank"
                className={styles["social-icon-link"]}
              >
                <i
                  className={`${styles["fab"]} ${styles["fa-youtube"]} fab fa-youtube`}
                />
              </a>
              <a
                href="https://www.instagram.com/thefalse9podcast/"
                target="_blank"
                className={styles["social-icon-link"]}
              >
                <i
                  className={`${styles["fab"]} ${styles["fa-instagram"]} fab fa-instagram`}
                />
              </a>
              <a
                href="https://hamroaudio.appspot.com/feed/podcast/5656298525818880?fbclid=IwAR1fGF-0jFifAl5MVsMAODjFWAcUTtyPTXQHpDCfKqx1Nr0zoLwGqGmZV2g"
                target="_blank"
                className={styles["social-icon-link"]}
              >
                <i
                  className={`${styles["fab"]} ${styles["fas"]} ${styles["fas-rss"]} fas fa-rss`}
                />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});

export default Footer;
