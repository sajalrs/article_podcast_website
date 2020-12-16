import React, { useEffect, useRef, useContext } from "react";
import SmallCard from "../Cards/SmallCard/SmallCard.js";
import styles from "./SidePanel.module.css";
import { Card } from "../Cards/Card.js";
import { VideoPlayerContext } from "../../contexts/reducers/videoPlayerContext";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { NetworkStatus, useQuery } from "@apollo/client";
import { ALL_YOUTUBE_LINKS_QUERY } from "../../pages/_app";

const SidePanel = (props) => {
  const cardListRef = useRef();
  const sidePanelDivRef = useRef();
  const [videoPlayerState, videoPlayerDispatch] = useContext(
    VideoPlayerContext
  );

  const {
    loading,
    error,
    fetchMore,
    data,
    networkStatus,
  } = useQuery(ALL_YOUTUBE_LINKS_QUERY, { notifyOnNetworkStatusChange: true });

  const loadingMoreYoutubeLinks = networkStatus === NetworkStatus.fetchMore;

  let youtubeVideos;
  if (loading && !loadingMoreYoutubeLinks) {
    youtubeVideos = [];
  } else {
    youtubeVideos = data.youtubeLinks.map((item, index) => 
      ({
        index: index,
        id: item.id,
        title: item.title,
        image: `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
        link: `https://www.youtube.com/embed/${item.id}?rel=0&start=0&autoplay=1`,
        date: item.date,
        contentType: Card.ContentType["video-youtube"],
      })
    );
  }

  useEffect(() => {
    if (props.sidebarClicked && props.sidebarFixed) {
      disableBodyScroll(cardListRef.current);
    } else {
      enableBodyScroll(cardListRef.current);
    }
  }, [props.sidebarClicked, props.sidebarFixed]);

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
      <label
        className={
          props.sidebarFixed
            ? styles["side-panel-title"]
            : `${styles["side-panel-title"]} ${styles["side-panel-title-not-fixed"]} `
        }
        onClick={() => {
          props.setSidebarClicked(!props.sidebarClicked);
        }}
      >
        <label className={styles["side-panel-title-text"]}>
          VIDEO PODCASTS{" "}
        </label>
        <i
          className={
            props.sidebarClicked
              ? `${styles["fas"]} ${styles["fa-chevron-right"]} fas fa-chevron-right`
              : `${styles["fas"]} ${styles["fa-chevron-left"]} fas fa-chevron-left`
          }
        ></i>
      </label>
      <ul
        ref={cardListRef}
        className={
          props.sidebarFixed
            ? `${styles["card-list"]} ${styles["card-list-fixed"]} `
            : `${styles["card-list"]} ${styles["card-list-not-fixed"]} `
        }
      >
        {youtubeVideos.map((item, index) => {
          return (
            <li key={index}>
              <SmallCard
                title={item.title}
                image={item.image}
                contentType={Card.ContentType["video-youtube"]}
                onClick={props.playVideo}
                link={item.link}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidePanel;
