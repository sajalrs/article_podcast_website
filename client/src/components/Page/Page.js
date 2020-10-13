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
  const offsetInitial = useRef(50);
  const [topOffset, setTopOffset] = useState(offsetInitial.current);
  const [navFixed, changeNavFix] = useState(false);
  const [isActive, setActive] = useState(false);
  // const [boxHeight, setBoxHeight] = useState(202);
  const audioPlayerBoxRef = useRef();
  const [audioPlayerFixed, setAudioPlayerFixed] = useState(false);
  const footerBoxRef = useRef();
  const [sidebarClicked, setSidebarClicked] = useState(false);
  const [sidebarFixed, setSidebarFixed] = useState(false);
  const [navbarClicked, setNavbarClicked] = useState(false);
  const contentPaneBoxRef = useRef();
  const headerBoxRef = useRef();
  const sidebarFixTopOffset = useRef(props.sidebarFixTopOffset);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // useEffect(() => {
  //   const fixNavbar = (e) => {
  //     if (window.scrollY > headerBoxRef.current.clientHeight) {
  //       changeNavFix(true);
  //     } else {
  //       changeNavFix(false);
  //     }
  //   };

  //   const fixSidebar = (e) => {

  //     if (window.scrollY > headerBoxRef.current.clientHeight + sidebarFixTopOffset.current && !sidebarFixed) {
  //       setSidebarFixed(true);

  //     } else {
  //       if(sidebarFixed){
  //         setSidebarFixed(false);

  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", fixSidebar);
  //   window.addEventListener("scroll", fixNavbar);

  //   return () => {
  //     window.removeEventListener("scroll", fixSidebar);
  //     window.removeEventListener("scroll", fixNavbar);

  //   }
  // }, []);

  useEffect(() => {
    const scrollEvents = (e) => {
      const curScroll = window.scrollY;
      console.log(
        `scroll: ${curScroll} header: ${headerBoxRef.current.clientHeight} content: ${contentPaneBoxRef.current.clientHeight} footer: ${footerBoxRef.current.clientHeight}`
      );

      if (curScroll > headerBoxRef.current.clientHeight) {
        changeNavFix(true);
        if (
          curScroll >
          headerBoxRef.current.clientHeight + props.sidebarFixTopOffset
        ) {
          setSidebarFixed(true);
          if (
            curScroll >
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

  // useEffect(() => {
  //   const body = document.body,
  //   html = document.documentElement;

  // const height = Math.max(
  //   body.scrollHeight,
  //   body.offsetHeight,
  //   html.clientHeight,
  //   html.scrollHeight,
  //   html.offsetHeight
  // );
  //   if(audioPlayerBoxRef.current.clientHeight !== boxHeight){
  //     setBoxHeight(Math.max(audioPlayerBoxRef.current.clientHeight, boxHeight))
  //   }
  //     const fixAudioPlayer = (e) => {

  //     if (
  //       window.scrollY >
  //       height - 2 * (footerBoxRef.current.clientHeight + boxHeight)
  //     ) {
  //       setAudioPlayerFixed(false);
  //     } else {
  //       setAudioPlayerFixed(true);
  //     }

  //   };

  //   window.addEventListener("scroll", fixAudioPlayer);
  //   return () => {
  //     window.removeEventListener("scroll", fixAudioPlayer);
  //   };
  // });

  useEffect(() => {
    if (sidebarClicked) {
      if (navbarClicked) {
        setNavbarClicked(false);
      }
    } else {
      clearAllBodyScrollLocks();
    }
  }, [sidebarClicked]);
  useEffect(() => {
    if (navbarClicked) {
      setTopOffset(topOffset + 140);
      sidebarFixTopOffset.current += 140;
      setSidebarClicked(false);
    } else {
      if (topOffset != offsetInitial.current) {
        setTopOffset(topOffset - 140);
        sidebarFixTopOffset.current -= 140;
      }
    }
  }, [navbarClicked]);

  // useEffect(() => {
  //   const fixSidebar = (e) => {
  //     if (window.scrollY > headerBoxRef.current.clientHeight + sidebarFixTopOffset && !sidebarFixed) {
  //       setSidebarFixed(true);

  //     } else {
  //       if(sidebarFixed){
  //         setSidebarFixed(false);

  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", fixSidebar);
  //   return () => {
  //     window.removeEventListener("scroll", fixSidebar);
  //   };
  // });

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
      isActive={isActive}
      setActive={setActive}
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
        {props.headline ? props.headline : null}
        <div className={styles["content-pane-side-bar"]}>
          <div ref={contentPaneBoxRef} className={styles["content-pane"]}>
            <div className={styles["main-pane"]}>{props.mainPane}</div>
            <div className={styles["side-pane"]}></div>
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
