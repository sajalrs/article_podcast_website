import React, { useState, forwardRef, useEffect, useRef } from "react";
import SmallCard from "../Cards/SmallCard/SmallCard.js";
import styles from "./SidePanel.module.css";
import Card from "../Cards/Card.js";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const SidePanel = (props) => {
  const cardListRef = useRef();
  const sidePanelDivRef = useRef();
  const [titlePos, setTitlePos] = useState();
  useEffect(() => {
    if(props.sideBarClicked){
      disableBodyScroll(cardListRef.current);
    } else{
      enableBodyScroll(cardListRef.current);
    }
  }, [props.sideBarClicked])
  
  useEffect(() => {
    setTitlePos(sidePanelDivRef.current.innerWidth);
  },[])
  const vidArray = props.youtubeIds;
  return (
    <div
      ref={sidePanelDivRef}
      style={{top: props.top}}
      className={
        props.sideBarClicked
          ? `${styles["SidePanel"]} ${styles["maximized"]}`
          : `${styles["SidePanel"]} ${styles["minimized"]}`
      }
    >
      {/* style={{right: titlePos}} */}
      <label className={styles["side-panel-title"]}  onClick={() => {props.setSideBarClicked(!props.sideBarClicked)}}>
        <label className={styles["side-panel-title-text"]}>VIDEO PODCASTS{" "}</label>
        <i
          className={props.sideBarClicked? `${styles["fas"]} ${styles["fa-chevron-up"]} fas fa-chevron-up` :`${styles["fas"]} ${styles["fa-chevron-down"]} fas fa-chevron-down`}
        ></i>
      </label>
      <ul ref={cardListRef} className={styles["card-list"]}>
        {vidArray?
        vidArray.map((item, index) => {
          return (
            <li key={index}>
              <SmallCard
                title="Podcast"
                image={props.getImageLink(item)}
                LinkType={Card.LinkType["video-youtube"]}
                onClick={props.playVideo}
                link={props.getHyperLink(Card.LinkType["video-youtube"])(item)}
              />
            </li>
          );
        }): null}
      </ul>
    </div>
  );
};

export default SidePanel;
