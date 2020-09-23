import React, { useState, forwardRef, useEffect, useRef } from "react";
import SmallCard from "../Cards/SmallCard/SmallCard.js";
import styles from "./SidePanel.module.css";
import Card from "../Cards/Card.js";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import {useSelector, useDispatch} from 'react-redux'
import {setSidebarClicked, setSidebarFixed, setNavbarClicked} from '../.././actions';


const SidePanel = (props) => {
  const cardListRef = useRef();
  const sidePanelDivRef = useRef();
  const [titlePos, setTitlePos] = useState();
  const sidebarClicked = useSelector(state => state.sidebar.clicked);
  const sidebarFixed = useSelector(state => state.sidebar.fixed);
  const navbarClicked = useSelector(state => state.navbar.clicked)
  const topOffset = useSelector(state => state.sidebar.topOffset);
  const dispatch = useDispatch();
  useEffect(() => {

  
    if (sidebarClicked) {
      if (navbarClicked) {
        dispatch(setNavbarClicked(false));
      }
    } else {
      clearAllBodyScrollLocks();
    }



  }
  , [sidebarClicked])
  
  useEffect(() => {
    if(sidebarClicked && sidebarFixed){
      disableBodyScroll(cardListRef.current);
    } else{
      enableBodyScroll(cardListRef.current);
    }
  }, [sidebarClicked, sidebarFixed])
  useEffect(() => {
    const fixSidebar = (e) => {
      if (window.scrollY > props.headerBoxRef.current.clientHeight - 66 + props.sidebarFixTopOffset) {
        dispatch(setSidebarFixed(true));
      } else {
        dispatch(setSidebarFixed(false));
      }
    };

    window.addEventListener("scroll", fixSidebar);
    return () => {
      window.removeEventListener("scroll", fixSidebar);
    };
  }, [sidebarFixed]);


  useEffect(() => {
    setTitlePos(sidePanelDivRef.current.innerWidth);
  },[])
  const vidArray = props.youtubeVideos.curVideos;
  return (
    <div
      ref={sidePanelDivRef}
      style={{top: props.top}}
      className={
        sidebarClicked
          ? `${styles["SidePanel"]} ${styles["maximized"]}`
          : `${styles["SidePanel"]} ${styles["minimized"]}`
      }
    >
      {/* style={{right: titlePos}} */}
      <label className={styles["side-panel-title"]}  onClick={() => {dispatch(setSidebarClicked(!sidebarClicked))}}>
        <label className={styles["side-panel-title-text"]}>VIDEO PODCASTS{" "}</label>
        <i
          className={sidebarClicked? `${styles["fas"]} ${styles["fa-chevron-up"]} fas fa-chevron-up` :`${styles["fas"]} ${styles["fa-chevron-down"]} fas fa-chevron-down`}
        ></i>
      </label>
      <ul ref={cardListRef} className={sidebarFixed? `${styles["card-list"]} ${styles["card-list-fixed"]} `: `${styles["card-list"]} ${styles["card-list-not-fixed"]} ` } >
        {vidArray?
        vidArray.map((item, index) => {
          return (
            <li key={index}>
              <SmallCard
                title={item.title}
                image={props.getImageLink(item.id)}
                LinkType={Card.LinkType["video-youtube"]}
                onClick={props.playVideo}
                link={props.getHyperLink(Card.LinkType["video-youtube"])(item.id)}
              />
            </li>
          );
        }): null}
      </ul>
    </div>
  );
};

export default SidePanel;
