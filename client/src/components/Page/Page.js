import React, { useEffect, useRef, useState } from "react";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import styles from "./Page.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

const Page = (props) => {
  const offsetInitial = useRef(100);
  const [topOffset, setTopOffset] = useState(offsetInitial.current);
  const [navFixed, changeNavFix] = useState(false);
  const [audioPlayerActive, setAudioPlayerActive] = useState(false);
  // const [boxHeight, setBoxHeight] = useState(202);
  const audioPlayerBoxRef = useRef();
  const [audioPlayerFixed, setAudioPlayerFixed] = useState(false);
  const footerBoxRef = useRef();
  const [sidebarClicked, setSidebarClicked] = useState(false);
  const [sidebarFixed, setSidebarFixed] = useState(false);
  const [navbarClicked, setNavbarClicked] = useState(false);
  const contentPaneBoxRef = useRef();
  const headerBoxRef = useRef();
  const sidebarFixTopOffset = useRef(props.sidebarFixTopOffset + 85);
  const headlineBoxRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const scrollEvents = (e) => {
      const curScroll = window.scrollY;

      if (curScroll > headerBoxRef.current.clientHeight) {
        changeNavFix(true);
        if (
          curScroll >
          headerBoxRef.current.clientHeight +
            sidebarFixTopOffset.current +
            headlineBoxRef.current.clientHeight
        ) {
          setSidebarFixed(true);
          if (
            curScroll >
            headlineBoxRef.current.clientHeight +
              contentPaneBoxRef.current.clientHeight -
              headerBoxRef.current.clientHeight -
              footerBoxRef.current.clientHeight
          ) {
            setAudioPlayerFixed(false);
          } else {
            setAudioPlayerFixed(true);
          }
        } else {
          setSidebarFixed(false);
          setAudioPlayerFixed(false);
        }
      } else {
        changeNavFix(false);
        setSidebarFixed(false);
        setAudioPlayerFixed(false);
      }
    };

    window.addEventListener("scroll", scrollEvents);

    return () => {
      window.removeEventListener("scroll", scrollEvents);
    };
  });

  useEffect(() => {
    if (sidebarClicked) {
      if (navbarClicked) {
        setNavbarClicked(false);
      }
      if (audioPlayerActive) {
        setAudioPlayerActive(false);
      }
    } else {
      clearAllBodyScrollLocks();
    }
  }, [sidebarClicked]);
  useEffect(() => {
    if (navbarClicked) {
      setTopOffset(topOffset + 140);
      sidebarFixTopOffset.current += 140;
      if(sidebarClicked){
        setSidebarClicked(false);
      }
      if (audioPlayerActive) {
        setAudioPlayerActive(false);
      }
    } else {
      if (topOffset != offsetInitial.current) {
        setTopOffset(topOffset - 140);
        sidebarFixTopOffset.current -= 140;
      }
    }
  }, [navbarClicked]);
  useEffect(() => {
    if(audioPlayerActive){
      if(sidebarClicked){
        setSidebarClicked(false)
      } 
      if(navbarClicked){
        setNavbarClicked(false)
      }

    }
  }, [audioPlayerActive]);

  const renderOnceNavbar = (
    <Navbar
      sidebarClicked={sidebarClicked}
      setSidebarClicked={setSidebarClicked}
      navbarClicked={navbarClicked}
      setNavbarClicked={setNavbarClicked}
    />
  );

  const renderOnceSidePanel = (
    <SidePanel
      headerBoxRef={headerBoxRef}
      sidebarClicked={sidebarClicked}
      setSidebarClicked={setSidebarClicked}
      sidebarFixed={sidebarFixed}
      setSidebarFixed={setSidebarFixed}
    />
  );

  const renderOnceAudioPlayer = (
    <AudioPlayer
      ref={audioPlayerBoxRef}
      isActive={audioPlayerActive}
      setActive={setAudioPlayerActive}
      audioRef={props.audioRef}
    />
  );

  return (
    <div className={styles["overarching"]}>
      {props.headline ? (
        <div className={styles["primary-color-background"]}></div>
      ) : null}

      <div className={styles["Page"]}>
        <Header ref={headerBoxRef} className={styles["Header"]} />
        {navFixed ? (
          <div>
            <div style={{ width: "100%", height: "66px" }}></div>
            <div
              style={{
                position: "fixed",
                width: "100%",
                top: "0px",
                zIndex: 1,
              }}
            >
              {renderOnceNavbar}
            </div>
          </div>
        ) : (
          <div style={{ position: "relative", width: "100%" }}>
            {renderOnceNavbar}
          </div>
        )}
        <div ref={headlineBoxRef}>{props.headline ? props.headline : null}</div>
        <div className={styles["content-pane-side-bar"]}>
          <div ref={contentPaneBoxRef} className={styles["content-pane"]}>
            <div className={styles["main-pane"]}>{props.mainPane}</div>
            {props.sidePane ? (
              <div className={styles["side-pane"]}>{props.sidePane}</div>
            ) : null}
          </div>
          <div className={styles["side-bar"]}>
            {sidebarFixed ? (
              <div
                style={{
                  position: "fixed",
                  top: topOffset,
                  right: "0px",
                  zIndex: 1,
                }}
              >
                {renderOnceSidePanel}
              </div>
            ) : (
              <div style={{ marginTop: sidebarFixTopOffset.current }}>
                {renderOnceSidePanel}
              </div>
            )}
          </div>
        </div>
        <div className={styles["footer-container"]}>
          {audioPlayerFixed ? (
            <div>
              <div
                style={{
                  width: "100%",
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
          <Footer ref={footerBoxRef} />
        </div>
      </div>
    </div>
  );
};

export default Page;
