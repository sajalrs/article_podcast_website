import React, { useState, useEffect, useContext } from "react";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import Html from "slate-html-serializer";
import { getRules } from "../../components/TextEditor/TextEditor";
import CommentBar from "../../components/Comment/CommentBar";
import axios from "axios";
import { LoginContext } from "../../contexts/reducers/loginContext";
import { SocketContext } from "../../contexts/reducers/socketContext";
import { Card } from "../../components/Cards/Card.js";
import { useRouter } from "next/router";
import { initializeApollo, addApolloState } from "../../lib/apolloClient";
import { gql, useQuery, useMutation, NetworkStatus } from "@apollo/client";

export const ARTICLE_QUERY = gql`
  query articleQuery($_id: String!) {
    article(_id: $_id) {
      _id
      date
      image
      title
      author
      authorId
      isApproved
      content
      comments {
        _id
        authorId
        author
        content
        createdAt
        updatedAt
      }
    }
  }
`;

export const POST_COMMENT_MUTATION = gql`
  mutation postComment($_id: String!, $content: String!) {
    postComment(_id: $_id, content: $content) {
      _id
      date
      image
      title
      author
      authorId
      isApproved
      content
      comments {
        _id
        authorId
        author
        content
        createdAt
        updatedAt
      }
    }
  }
`;
const ArticlePage = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, fetchMore, data, networkStatus, refetch } = useQuery(
    ARTICLE_QUERY,
    {
      variables: { _id: id },
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadingArticle = networkStatus === NetworkStatus.fetchMore;
  const rules = getRules(styles);
  const html = new Html({ rules });
  let article;
  if (loading && !loadingArticle) {
    article = {};
  } else {
    article = {
      ...data.article,
      date: JSON.parse(data.article.date),
      content: data.article.content
        ? html.serialize(JSON.parse(data.article.content))
        : `<p></p>`,
      comments: data.article.comments.map((comment) => ({
        ...comment,
        content: JSON.parse(comment.content),
        createdAt: JSON.parse(comment.createdAt),
        updatedAt: JSON.parse(comment.updatedAt),
      })),
    };
  }

  const [savePostedComments, { _ }] = useMutation(POST_COMMENT_MUTATION);

  // const socket = useSelector((state) => state.network.socket);
  const [loginState, loginDispatch] = useContext(LoginContext);
  const [socketState, socketDispatch] = useContext(SocketContext);
  const socket = socketState.socket;
  const user = loginState.user;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("comments changed", (data) => {
        console.log("Comments changed");
        if (data.articleId === id) {
          refetch();
        }
      });
    }
  }, [socket]);

  const postComment = (comment) => {
    // const toPost = { id: id.toString(), content: comment };
    // const options = {
    //   headers: { "Content-Type": "application/json" },
    // };

    // axios
    //   .post("/api/articles/postcomment", JSON.stringify(toPost), options)
    //   .then((res) => {
    //     alert("Comment Posted");
    //   })
    //   .catch((err) => {
    //     if (err.response.status === 401 || err.response.status === 400) {
    //       alert(err.response.data.error);
    //     } else if (err.response.status !== 200) {
    //       throw Error(err);
    //     }
    //   });

    savePostedComments({
      variables: { _id: id.toString(), content: JSON.stringify(comment) },
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
  // const rules = getRules(styles);
  // const html = new Html({ rules });

  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ARTICLE_QUERY,
    variables: { _id: query.id },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default ArticlePage;
