import React, { useState, useEffect, useRef } from "react";
import SmallCard from "../../components/Cards/SmallCard/SmallCard.js";
import MediumCard from "../../components/Cards/MediumCard/MediumCard.js";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import Card from "../../components/Cards/Card.js";
import styles from "./Edit.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useHistory, useParams } from "react-router-dom";
import TextEditor from '../../components/TextEditor/TextEditor'
const Edit = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [sidePanelFixed, setSidePanelFix] = useState(false);
  const headerBoxRef = useRef();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fixNavbar = (e) => {
      if (window.scrollY > headerBoxRef.current.clientHeight - 66 - 35 + 644) {
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

  const [article, setArticle] = useState({
    title: "",
    author: "",
    date: "",
    sections: [],
    images: [],
  });

  const largeCardRef = useRef();
  useEffect(() => {
    console.log(id);
    const getArticle = async () => {
      console.log(id);
      const response = await fetch("/articles?" + id);
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };

    getArticle().then((res) => {
      setArticle({
        title: res.title,
        author: res.author,
        date: res.date,
        image: res.image,
        sections: res.sections,
      });
    });
  }, [article.title]);

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
      youtubeIds={props.youtubeIds}
      getImageLink={props.getImageLink}
      playVideo={props.playVideo}
      getHyperLink={props.getHyperLink}
      sidePanelFixed={sidePanelFixed}
    />
  );

  return (
    <div className={styles["overarching"]}>
      <div className={styles["primary-color-background"]}></div>
      <div className={styles["Edit"]}>
        <Header
          ref={headerBoxRef}
          sideBarClicked={props.sideBarClicked}
          setSideBarClicked={props.setSideBarClicked}
          navbarClicked={props.navbarClicked}
          setNavbarClicked={props.setNavbarClicked}
        />
        <div className={styles["headline"]}>
          <LargeCard
            title={article.title}
            author={article.author}
            date={article.date}
            image={article.image}
            onClick={() => {}}
          />
        </div>
        <div className={styles["content-pane"]}>
          <div className={styles["main-pane"]}>
            <TextEditor/>
          </div>

          <div className={styles["side-pane"]}></div>
          {sidePanelFixed ? (
            <div
              style={{ position: "fixed", top: props.topOffset, right: "0px" }}
            >
              {/* <div style={{ position: "fixed", top: "103.5px", right: "0px"}}> */}
              {renderOnceSidePanel}
            </div>
          ) : (
            <div style={{ marginTop: props.topOffset }}>
              {renderOnceSidePanel}
            </div>
          )}
        </div>

        <div className={styles["footer-container"]}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Edit;
