import React from "react";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import {useParams } from "react-router-dom";
const ArticlePage = (props) => {
  const { id } = useParams();
  const [article, setArticle] = useState({
    title: "",
    author: "",
    date: "",
    images: [],
    content: `<p></p>`,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
                  <di className={styles["main-pane"]}v className={styles["main-pane-item"]}>
                    <p>{children}</p>
                  </di>
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

  const contents = (
    <div>
      <div className={styles["headline"]}>
        <LargeCard
          title={article.title}
          author={article.author}
          date={article.date}
          image={article.image}
          onClick={() => {}}
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
    </div>
  );

  return <Page sidebarFixTopOffset={35 + 644} mainPane={contents} />;
};

export default ArticlePage;
