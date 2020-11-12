import React, { useState, useEffect } from "react";
import LargeCard from "../components/Cards/LargeCard/LargeCard.js";
import Page from "../components/Page/Page";
import styles from "../components/Page/Page.module.css";
// import { useParams } from "react-router-dom";
import Html from "slate-html-serializer";
import { getRules } from "../components/TextEditor/TextEditor";
import CommentBar from "../components/Comment/CommentBar";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card } from "../components/Cards/Card";
import { useRouter } from "next/router";
const ArticlePage = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const socket = useSelector((state) => state.network.socket);
  const user = useSelector((state) => state.login.user);
  const [article, setArticle] = useState({
    title: "",
    author: "",
    date: "",
    images: [],
    content: `<p></p>`,
    isApproved: false,
    comments: [],
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const rules = getRules(styles);
    const html = new Html({ rules });

    const getArticle = async () => {
      const response = await axios.get(`api/articles/page?${id}`);
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
          isApproved: res.isApproved,
          content: res.content ? html.serialize(res.content) : `<p></p>`,
          comments: res.comments,
        });
      })
      .catch((err) => {
        throw Error(err);
      });

    if (socket) {
      socket.on("comments changed", (data) => {
        if (data.articleId === id.substring(3)) {
          getArticle()
            .then((res) => {
              setArticle({
                title: res.title,
                author: res.author,
                date: res.date,
                image: res.image,
                isApproved: res.isApproved,
                content: res.content ? html.serialize(res.content) : `<p></p>`,
                comments: res.comments,
              });
            })
            .catch((err) => {
              throw Error(err);
            });
        }
      });
    }
  }, [socket]);

  const postComment = (comment) => {
    const toPost = { id: id.substring(3), content: comment };
    const options = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post("/articles/postcomment", JSON.stringify(toPost), options)
      .then((res) => {
        alert("Comment Posted");
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 400) {
          alert(err.response.data.error);
        } else if (err.response.status !== 200) {
          throw Error(err);
        }
      });
  };

  const isEditable =
    user && (user.isModerator || user._id === article.authorId);
  const isPendingApproval = !article.isApproved;

  const headline = (
    <div
      className={styles["headline"]}
      style={
        isEditable || isPendingApproval
          ? { marginTop: "36px" }
          : { marginTop: "0px" }
      }
    >
      <LargeCard
        title={article.title}
        author={article.author}
        date={article.date}
        isApproved={article.isApproved}
        contentType={Card.ContentType["article-internal"]}
        link={`${id}`}
        isEditable={user && (user.isModerator || user._id === article.authorId)}
        image={article.image}
        onClick={() => {}}
      />
    </div>
  );

  const contents = (
    <div>
      <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
      <div className={styles["main-pane-item"]}>
        <CommentBar postComment={postComment} comments={article.comments} />
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
