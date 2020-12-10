import React, { useState, useEffect, useContext } from "react";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
// import { useParams } from "react-router-dom";
import Html from "slate-html-serializer";
import { getRules } from "../../components/TextEditor/TextEditor";
import CommentBar from "../../components/Comment/CommentBar";
import axios from "axios";
import { LoginContext } from "../../contexts/reducers/loginContext";
import { Card } from "../../components/Cards/Card.js";
import { useRouter } from "next/router";
const ArticlePage = (props) => {
  const router = useRouter();
  const { id } = router.query;
  // const socket = useSelector((state) => state.network.socket);
  const [loginState, loginDispatch] = useContext(LoginContext);
  const user = loginState.user;
  const [article, setArticle] = useState(props.article);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const postComment = (comment) => {
    const toPost = { id: id.toString(), content: comment };
    const options = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post("/api/articles/postcomment", JSON.stringify(toPost), options)
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
        link={`article?id=${id}`}
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


export async function getServerSideProps({ query }) {
  const rules = getRules(styles);
  const html = new Html({ rules });

  const res = await fetch(`http://localhost:3000/api/articles/page?id=${query.id}`);
  const json = await res.json();
  const article = {
        title: json.title,
        author: json.author,
        date: json.date,
        image: json.image,
        isApproved: json.isApproved,
        content: json.content ? html.serialize(json.content) : `<p></p>`,
        comments: json.comments,
  }

  return {
    props: {
      article,
    },
  };
}


export default ArticlePage;
