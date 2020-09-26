import React, { useRef, useState, useEffect } from "react";
import MediumCard from "../../components/Cards/MediumCard/MediumCard.js";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import styles from "./Podcasts.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {useSelector} from "react-redux"
const Podcasts = (props) => {
  const headerBoxRef = useRef();
  const topOffset = useSelector(state => state.sidebar.topOffset);
  const podcasts = useSelector(state=> state.audioPlayer.podcasts);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const sidebarFixed = useSelector(state => state.sidebar.fixed);
 


  const renderOnceSidePanel = (
    <SidePanel
      headerBoxRef={headerBoxRef}
      sidebarFixTopOffset={0}
    />
  );
  return (
    <div className={styles["Podcasts"]}>
      <Header
        ref={headerBoxRef}
        className={styles["Header"]}
      />
      <div className={styles["content-pane"]}>
        <div className={styles["main-pane"]}>
          {podcasts.map((item) => {
            return (
              <div className={`${styles["main-pane-item"]}`}>
                <MediumCard
                  image={item.image}
                  date={item.date}
                  title={item.title}
                  text={item.description}
                  contentType={item.contentType}
                  index={item.index}
                />
              </div>
            );
          })}
        </div>
        <div className={styles["side-pane"]}></div>
        {sidebarFixed ? (
          <div
            style={{ position: "fixed", top: topOffset, right: "0px",zIndex: 1  }}
          >
            {renderOnceSidePanel}
          </div>
        ) : (
          <div style={{ marginTop: topOffset }}>
            {renderOnceSidePanel}
          </div>
        )}
      </div>

      <div className={styles["footer-container"]}>
        <Footer/>
      </div>
    </div>
  );
};

export default Podcasts;
