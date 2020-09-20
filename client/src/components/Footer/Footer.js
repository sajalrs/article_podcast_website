import React, { useState, useRef, useEffect } from "react";
import styles from "./Footer.module.css";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import SidePanel from "../SidePanel/SidePanel";
import {Link} from "react-router-dom";
const Footer = (props) => {
  
  const [isActive, setActive] = useState(false);
  const [boxHeight, setBoxHeight] = useState(0);
  const footerBoxRef = useRef();
  const audioPlayerBoxRef = useRef();
  useEffect(() => {
    const body = document.body,
    html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
    if(audioPlayerBoxRef.current.clientHeight !== boxHeight){
      setBoxHeight(Math.max(audioPlayerBoxRef.current.clientHeight, boxHeight))
    }
      const fixAudioPlayer = (e) => {
  
    
      if (
        window.scrollY >
        height - 2 * (footerBoxRef.current.clientHeight + boxHeight)
      ) {
        props.setAudioPlayerFixed(false);
      } else {
        props.setAudioPlayerFixed(true);
      }
    
    };

    window.addEventListener("scroll", fixAudioPlayer);
    return () => {
      window.removeEventListener("scroll", fixAudioPlayer);
    };
  });

  const renderOnceAudioPlayer = (
    <AudioPlayer
      ref={audioPlayerBoxRef}
      selectedTrack={props.selectedTrack}
      setSelectedTrack={props.setSelectedTrack}
      player={props.player}
      setPlayer={props.setPlayer}
      forwardPodcasts={props.forwardPodcasts}
      rewindPodcasts={props.rewindPodcasts}
      currentTime={props.currentTime}
      setCurrentTime={props.setCurrentTime}
      isActive={isActive}
      setActive={setActive}
      audioRef={props.audioRef}
    />
  );

  return (
    <div>
      {props.audioPlayerFixed && props.sidePanelFixed ?(
        <div>
          <div
            style={{
              width: "100%",
              height: boxHeight
            }}
          ></div>
          <div style={{ position: "fixed", width: "100%", bottom: "0px" }}>
            {renderOnceAudioPlayer}
          </div>
        </div>
      ) : (
        <div style={{ position: "relative", width: "100%" }}>
          {renderOnceAudioPlayer}
        </div>
      )}

      <div ref={footerBoxRef} className={styles["footer-container"]}>
        <section className={styles["footer-subscription"]}>
          <p className={styles["footer-subscription-heading"]}>
            Join our weekly newsletter
          </p>

          <div className={styles["input-area"]}>
            <form>
              <input
                type="email"
                name="email"
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
        </section>

        <div className={styles["footer-links"]}>
          <div className={styles["footer-link-wrapper"]}>
            <div className={styles["footer-link-items"]}>
              <h2>About Us</h2>
              <Link onClick={() => {if(props.sideBarClicked){props.setSideBarClicked(false)};props.setNavbarClicked(false);}} to="/about">Team</Link>
              <a href="">Contact</a>
              <a href="">Support</a>
              <a href="">Advertisements</a>
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
              <a href="https://www.facebook.com/False9Podcast" target="_blank" >Facebook</a>
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
              <Link onClick={() => {if(props.sideBarClicked){props.setSideBarClicked(false)};props.setNavbarClicked(false);}} to="/legal/privacy">Privacy</Link>
             
              <Link onClick={() => {if(props.sideBarClicked){props.setSideBarClicked(false)};props.setNavbarClicked(false);}} to="/legal/termsofservice">Terms of Service</Link>
            </div>
          </div>
        </div>

        <small className={styles["website-rights"]}>
          The False 9 Podcast ©
        </small>
        <section className={styles["social-media"]}>
          <div className={styles["social-media-wrap"]}>
            <div className={styles["social-icons"]}>
              <a href="https://www.facebook.com/False9Podcast" target='_blank' className={styles["social-icon-link"]}>
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
                  className={`${styles["fas"]} ${styles["fas-rss"]} fas fa-rss`}
                />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Footer;
