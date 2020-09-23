import React, { useRef, useState, useEffect } from "react";
import MediumCard from "../../components/Cards/MediumCard/MediumCard.js";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import Card from "../../components/Cards/Card.js";
import styles from "./Articles.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SmallCard from "../../components/Cards/SmallCard/SmallCard.js";
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux"
const Articles = (props) => {
  const history = useHistory();
  const sidebarFixed = useSelector(state => state.sidebar.fixed);
  const topOffset = useSelector(state => state.sidebar.topOffset);

  const headerBoxRef = useRef();
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [homepageLinks, setHomePageLinks] = useState({
    links: [],
  });
  useEffect(() => {
    const getHomepageLinks = async () => {
      const response = await fetch("articles/pages");
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };

    getHomepageLinks().then((res) => {
      setHomePageLinks({ links: res["links"] });
    });
  }, []);

  const getLinkFunction = (linkType) => {
    switch (linkType) {
      case Card.LinkType["video-youtube"]:
        return props.playVideo;
      case Card.LinkType["article-internal"]:
        return (articleLink) => {
          history.push(articleLink);
        };
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
    <div className={styles["Articles"]}>
      <Header
        ref={headerBoxRef}
        className={styles["Header"]}
      />
      <div className={styles["content-pane"]}>
        <div className={styles["main-pane"]}>
          {homepageLinks.links.map((item) => {
            return (
              <div className={`${styles["main-pane-item"]}`}>
                <LargeCard
                  image={item.image}
                  date={item.date}
                  title={item.title}
                  text={item.description}
                  author={item.author}
                  LinkType={Card.LinkType["article-internal"]}
                  link={props.getHyperLink(Card.LinkType["article-internal"])(
                    item["_id"]
                  )}
                  onClick={getLinkFunction(Card.LinkType["article-internal"])}
                  audioRef={props.audioRef}
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
        <Footer
          selectedTrack={props.selectedTrack}
          setSelectedTrack={props.setSelectedTrack}
          
            forwardPodcasts={props.forwardPodcasts}
            rewindPodcasts={props.rewindPodcasts}
           
            audioRef={props.audioRef}
        
            headerBoxRef={headerBoxRef}
            sidebarFixTopOffset={0}
        />
      </div>
    </div>
  );
};

export default Articles;
