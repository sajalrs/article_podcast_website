import React, { useRef, useState, useEffect } from "react";
import MediumCard from "../../components/Cards/MediumCard/MediumCard.js";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import Card from "../../components/Cards/Card.js";
import styles from "./Podcasts.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SmallCard from "../../components/Cards/SmallCard/SmallCard.js";
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux"
const Podcasts = (props) => {
  const history = useHistory();
  const headerBoxRef = useRef();
  const sidebarFixed = useSelector(state => state.sidebar.fixed);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const getLinkFunction = (linkType) => {
    switch (linkType) {
      case Card.LinkType["video-youtube"]:
        return props.playVideo;
      case Card.LinkType["article-internal"]:
        return (articleLink) => {
          history.push(articleLink);
        };
      case Card.LinkType["audio-internal"]:
        return props.playAudio;
      default:
        break;
    }
  };

  const renderOnceSidePanel = (
    <SidePanel
      youtubeVideos={props.youtubeVideos}
      getImageLink={props.getImageLink}
      playVideo={props.playVideo}
      getHyperLink={props.getHyperLink}
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
          {props.selectedTrack.items.map((item) => {
            return (
              <div className={`${styles["main-pane-item"]}`}>
                <MediumCard
                  image={item.image}
                  date={item.date}
                  title={item.title}
                  text={item.description}
                  LinkType={Card.LinkType["audio-internal"]}
                    link={item.index}
                  onClick={getLinkFunction(Card.LinkType["audio-internal"])}
                  audioRef={props.audioRef}
                />
              </div>
            );
          })}
        </div>
        <div className={styles["side-pane"]}></div>
        {sidebarFixed ? (
          <div
            style={{ position: "fixed", top: props.topOffset, right: "0px",zIndex: 1  }}
          >
            {renderOnceSidePanel}
          </div>
        ) : (
          <div style={{ marginTop: props.topOffset }}>
            {renderOnceSidePanel}
          </div>
        )}
      </div>

      <div className={styles["footer-container"]}>
        <Footer
          selectedTrack={props.selectedTrack}
          setSelectedTrack={props.setSelectedTrack}
          player={props.player}
            setPlayer={props.setPlayer}
            forwardPodcasts={props.forwardPodcasts}
            rewindPodcasts={props.rewindPodcasts}
            currentTime={props.currentTime}
            setCurrentTime={props.setCurrentTime}
            audioRef={props.audioRef}
            audioPlayerFixed={props.audioPlayerFixed}
            setAudioPlayerFixed={props.setAudioPlayerFixed}
        />
      </div>
    </div>
  );
};

export default Podcasts;
