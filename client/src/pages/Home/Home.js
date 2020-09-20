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
const Home = (props) => {
  const history = useHistory();
  const [sidePanelFixed, setSidePanelFix] = useState(false);
  const headerBoxRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fixNavbar = (e) => {
      if (window.scrollY > headerBoxRef.current.clientHeight - 66) {
        setSidePanelFix(true);
      } else {
        setSidePanelFix(false);
      }
    };

    window.addEventListener("scroll", fixNavbar);
    return () => {
      window.removeEventListener("scroll", fixNavbar);
    };
  }, [sidePanelFixed]);
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
      sideBarClicked={props.sideBarClicked}
      setSideBarClicked={props.setSideBarClicked}
      youtubeVideos={props.youtubeVideos}
      getImageLink={props.getImageLink}
      playVideo={props.playVideo}
      getHyperLink={props.getHyperLink}
      sidePanelFixed={sidePanelFixed}
    />
  );
  return (
    <div className={styles["Home"]}>
      <Header
        ref={headerBoxRef}
        className={styles["Header"]}
        sideBarClicked={props.sideBarClicked}
        setSideBarClicked={props.setSideBarClicked}
        navbarClicked={props.navbarClicked}
        setNavbarClicked={props.setNavbarClicked}
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
        {sidePanelFixed ? (
          <div
            style={{
              position: "fixed",
              top: props.topOffset,
              right: "0px",
              zIndex: 1,
            }}
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
          audioPlayerFixed={props.audioPlayerFixed}
          setAudioPlayerFixed={props.setAudioPlayerFixed}
          sidePanelFixed={sidePanelFixed}
          audioRef={props.audioRef}
          sideBarClicked={props.sideBarClicked}
          setSideBarClicked={props.setSideBarClicked}
          navbarClicked={props.navbarClicked}
          setNavbarClicked={props.setNavbarClicked}
        />
      </div>
    </div>
  );
};

export default Home;
