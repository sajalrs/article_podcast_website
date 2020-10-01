import React, {useEffect, useRef, useState} from "react";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import styles from "./Page.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar"
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer"
import { useSelector } from "react-redux";

const Page = (props) => {
  const headerBoxRef = useRef();
  const sidebarFixed = useSelector((state) => state.sidebar.fixed);
  const topOffset = useSelector((state) => state.sidebar.topOffset);
  const [navFixed, changeNavFix] = useState(false);
  const [isActive, setActive] = useState(false);
  const [boxHeight, setBoxHeight] = useState(202);
  const audioPlayerBoxRef = useRef();
  const [audioPlayerFixed, setAudioPlayerFixed] = useState(false);
  const footerBoxRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fixNavbar = (e) => {
      if (window.scrollY > headerBoxRef.current.clientHeight) {
        changeNavFix(true);
      } else {
        changeNavFix(false);
      }
    };

    window.addEventListener("scroll", fixNavbar);
    return () => {
      window.removeEventListener("scroll", fixNavbar);
    };
  });
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
        setAudioPlayerFixed(false);
      } else {
        setAudioPlayerFixed(true);
      }
    
    };

    window.addEventListener("scroll", fixAudioPlayer);
    return () => {
      window.removeEventListener("scroll", fixAudioPlayer);
    };
  });


  const renderOnceNavbar = (
    <Navbar/>
  );

  const renderOnceSidePanel = (
    <SidePanel headerBoxRef={headerBoxRef} sidebarFixTopOffset={0} />
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
    <div className={styles["Page"]}>
      <Header ref={headerBoxRef} className={styles["Header"]} />
      {navFixed ? (
        <div>
          <div style={{ width: "100%", height: "66px" }}></div>
          <div style={{ position: "fixed", width: "100%", top: "0px", zIndex: 1 }}>
            {renderOnceNavbar}
          </div>
        </div>
      ) : (
        <div style={{ position: "relative", width: "100%" }}>
          {renderOnceNavbar}
        </div>
      )}
      <div className={styles["content-pane"]}>
        <div className={styles["main-pane"]}>
          {props.mainPane.map((item) => {
            return <div className={`${styles["main-pane-item"]}`}>{item}</div>;
          })}
        </div>
        <div className={styles["side-pane"]}></div>
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
          <div style={{ marginTop: topOffset }}>{renderOnceSidePanel}</div>
        )}
      </div>

      <div className={styles["footer-container"]}>
      {audioPlayerFixed && sidebarFixed ?(
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
        <Footer ref={footerBoxRef}/>
      </div>
    </div>
  );
};

export default Page;