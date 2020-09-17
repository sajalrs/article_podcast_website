import React, { useState, useEffect, useRef } from "react";
import SmallCard from "../../components/Cards/SmallCard/SmallCard.js";
import MediumCard from "../../components/Cards/MediumCard/MediumCard.js";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import Card from "../../components/Cards/Card.js";
import styles from "./ArticlePage.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useHistory, useParams } from "react-router-dom";
import { Value, Editor } from "slate";
import Html from "slate-html-serializer";
const ArticlePage = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [sidePanelFixed, setSidePanelFix] = useState(false);
  const headerBoxRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fixSidePanel = (e) => {
      if (window.scrollY > headerBoxRef.current.clientHeight - 66 - 35 + 644) {
        setSidePanelFix(true);
      } else {
        setSidePanelFix(false);
      }
    };

    window.addEventListener("scroll", fixSidePanel);
    return () => {
      window.removeEventListener("scroll", fixSidePanel);
    };
  }, [sidePanelFixed]);

  const [article, setArticle] = useState({
    title: "",
    author: "",
    date: "",
    images: [],
    content: `<p></p>`,
  });

  const largeCardRef = useRef();
  useEffect(() => {
    const BLOCK_TAGS = {
      p: "paragraph",
      blockquote: "block-quote",
      ul: `bulleted-list`,
      h1: `heading-one`,
      h2: `heading-two`,
      li: `list-item`,
      ol: `numbered-list`,
      img: `image`,
    };

    // Add a dictionary of mark tags.
    const MARK_TAGS = {
      em: "italic",
      strong: "bold",
      u: "underlined",
      code: `code`,
    };

    const rules = [
      {
        deserialize(el, next) {
          const type = BLOCK_TAGS[el.tagName.toLowerCase()];
          if (type) {
            return {
              object: "block",
              type: type,
              data: {
                className: el.getAttribute("class"),
              },
              nodes: next(el.childNodes),
            };
          }
        },
        serialize(obj, children) {
          if (obj.object == "block") {
            switch (obj.type) {
              case "paragraph":
                return (
                  <div className={styles["main-pane-item"]}>
                    <p>{children}</p>
                  </div>
                );
              case "block-quote":
                return (
                  <div className={styles["main-pane-item"]}>
                    <blockquote>{children}</blockquote>
                  </div>
                );
              case "bulleted-list":
                return (
                  <div className={styles["main-pane-item"]}>
                    <ul>{children}</ul>
                  </div>
                );
              case "heading-one":
                return (
                  <div className={styles["main-pane-item"]}>
                    <h1 className={styles["heading"]}>{children}</h1>
                  </div>
                );
              case "heading-two":
                return (
                  <div className={styles["main-pane-item"]}>
                    <h2>{children}</h2>
                  </div>
                );
              case "list-item":
                return <li>{children}</li>;
              case "numbered-list":
                return (
                  <div className={styles["main-pane-item"]}>
                    <ol>{children}</ol>
                  </div>
                );
              case "image": {
                const src = obj.data["src"];
                return (
                  <div className={styles["main-pane-item"]}>
                    <figure className={styles["image-container"]}>
                      <img src={src} />
                    </figure>
                  </div>
                );
              }
              case "figure": {
                const src = obj.data["src"];
                return (
                  <div className={styles["main-pane-item"]}>
                    <figure className={styles["image-container"]}>
                      <img src={src} />
                      <figcaption>
                        <strong>{children}</strong>
                      </figcaption>
                    </figure>
                  </div>
                );
              }
            }
          }
        },
      },
      // Add a new rule that handles marks...
      {
        deserialize(el, next) {
          const type = MARK_TAGS[el.tagName.toLowerCase()];
          if (type) {
            return {
              object: "mark",
              type: type,
              nodes: next(el.childNodes),
            };
          }
        },
        serialize(obj, children) {
          if (obj.object == "mark") {
            switch (obj.type) {
              case "bold":
                return <strong>{children}</strong>;
              case "italic":
                return <em>{children}</em>;
              case "code":
                return <code>{children}</code>;
              case "underlined":
                return <u>{children}</u>;
            }
          }
        },
      },
    ];
    const html = new Html({ rules });

    const getArticle = async () => {
      const response = await fetch("/articles/?" + id);
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
        content: res.content ? html.serialize(res.content) : `<p></p>`,
      });
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
    <div className={styles["overarching"]}>
      <div className={styles["primary-color-background"]}></div>
      <div className={styles["ArticlePage"]}>
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
          <div
            className={styles["main-pane"]}
            dangerouslySetInnerHTML={{ __html: article.content }}
          >
            {/* {article.sections.map((item) => {
              return (
                <div>
                  {item.hasOwnProperty("subheading") ? (
                    <h2 className={styles["subheading"]}>{item.subheading}</h2>
                  ) : item.hasOwnProperty("paragraph") ? (
                    <p>{item.paragraph.text}</p>
                  ) : item.hasOwnProperty("image") ? (
                    <div className={styles["main-pane-item"]}>
                      <figure className={styles["image-container"]}>
                        <img src={item.image.src} alt={item.image.caption} />
                        <figcaption>
                          {item.image.caption? (<i><strong>Picture:</strong> {item.image.caption}</i>) : null}
                        </figcaption>
                      </figure>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })} */}
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
          <Footer
            selectedTrack={props.selectedTrack}
            setSelectedTrack={props.setSelectedTrack}
            player={props.player}
            setPlayer={props.setPlayer}
            forwardPodcasts={props.forwardPodcasts}
            rewindPodcasts={props.rewindPodcasts}
 
          />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
