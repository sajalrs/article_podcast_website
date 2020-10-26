import React, { useState, useEffect, useRef } from "react";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import { useParams } from "react-router-dom";
import Html from "slate-html-serializer";
import { getRules } from "../../components/TextEditor/TextEditor";
import CommentBar from "../../components/Comment/CommentBar";
import axios from "axios";
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
    const rules = getRules(styles);
    const html = new Html({ rules });

    const getArticle = async () => {
      const response = await axios.get(`/articles/?${id}`);
      const body = await response.data;
      if (response.status !== 200) throw Error(body.message);
      return body;
    };

    getArticle()
      .then((res) => {
        setArticle({
          title: res.title,
          author: res.author,
          date: res.date,
          image: res.image,
          content: res.content ? html.serialize(res.content) : `<p></p>`,
        });
      })
      .catch((err) => {
        throw Error(err);
      });
  }, []);

  const headline = (
    <div className={styles["headline"]}>
      <LargeCard
        title={article.title}
        author={article.author}
        date={article.date}
        image={article.image}
        onClick={() => {}}
      />
    </div>
  );

  const contents = (
    <div>
      <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
      <div className={styles["main-pane-item"]}>
        <CommentBar />
      </div>
    </div>
  );

  return (
    <Page
      // sidebarFixTopOffset={35 + 644}
      sidebarFixTopOffset={0}
      headline={headline}
      mainPane={contents}
    />
  );
};

export default ArticlePage;
