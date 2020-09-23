import React, { useRef, useState, useEffect } from "react";
import MediumCard from "../../components/Cards/MediumCard/MediumCard.js";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import Card from "../../components/Cards/Card.js";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SmallCard from "../../components/Cards/SmallCard/SmallCard.js";
import { useHistory } from "react-router-dom";
import TextEditor from "../../components/TextEditor/TextEditor.js";
import {useSelector} from 'react-redux'
const Home = (props) => {
  const history = useHistory();
  const headerBoxRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const sidebarFixed = useSelector(state => state.sidebar.fixed);
  const topOffset = useSelector(state => state.sidebar.topOffset);

  const [articles, setArticles] = useState({
    links: [],
  });
  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch("articles/pages");
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };

    getArticles().then((res) => {
      setArticles({ links: res["links"] });
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
    <div className={styles["Home"]}>
      <Header
        ref={headerBoxRef}
        className={styles["Header"]}
      />
      <div className={styles["content-pane"]}>
        <div className={styles["main-pane"]}>
          {articles.links.map((item) => {
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

        />
      </div>
    </div>
  );
};

export default Home;
