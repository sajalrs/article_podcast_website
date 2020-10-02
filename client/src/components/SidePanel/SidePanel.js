import React, { useState, forwardRef, useEffect, useRef } from "react";
import SmallCard from "../Cards/SmallCard/SmallCard.js";
import styles from "./SidePanel.module.css";
import Card from "../Cards/Card.js";
import {useSelector, useDispatch} from 'react-redux'

const SidePanel = (props) => {
  const cardListRef = useRef();
  const sidePanelDivRef = useRef();
  const [titlePos, setTitlePos] = useState();
  const youtubeVideos = useSelector(state => state.videoPlayer.youtubeVideos)

  
  
 


  useEffect(() => {
    setTitlePos(sidePanelDivRef.current.innerWidth);
  },[])
 
  return (
    <div
      ref={sidePanelDivRef}
      className={
        props.sidebarClicked
          ? `${styles["SidePanel"]} ${styles["maximized"]}`
          : `${styles["SidePanel"]} ${styles["minimized"]}`
      }
    >
      {/* style={{right: titlePos}} */}
      <label className={styles["side-panel-title"]}  onClick={() => {props.setSidebarClicked(!props.sidebarClicked)}}>
        <label className={styles["side-panel-title-text"]}>VIDEO PODCASTS{" "}</label>
        <i
          className={props.sidebarClicked? `${styles["fas"]} ${styles["fa-chevron-up"]} fas fa-chevron-up` :`${styles["fas"]} ${styles["fa-chevron-down"]} fas fa-chevron-down`}
        ></i>
      </label>
      <ul ref={cardListRef} className={props.sidebarFixed? `${styles["card-list"]} ${styles["card-list-fixed"]} `: `${styles["card-list"]} ${styles["card-list-not-fixed"]} ` } >
        {
        youtubeVideos.map((item) => {
          return (
            <li key={item.index}>
              <SmallCard
                title={item.title}
                image={item.image}
                contentType={Card.ContentType["video-youtube"]}
                onClick={props.playVideo}
                link={item.link}
              />
            </li>
        )})}
      </ul>
    </div>
  );
};

export default SidePanel;
