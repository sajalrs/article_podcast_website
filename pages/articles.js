import React, {useEffect, useContext } from "react";
import MediumCard from "../components/Cards/MediumCard/MediumCard.js";
import LargeCard from "../components/Cards/LargeCard/LargeCard.js";
import Page from "../components/Page/Page";
import styles from "../components/Page/Page.module.css";
import { DeviceContext } from "../contexts/reducers/deviceContext";
import { LoginContext } from "../contexts/reducers/loginContext";
import axios from "axios";
import { useRouter } from "next/router";
import { Card } from "../components/Cards/Card";
import { initializeApollo, addApolloState } from "../lib/apolloClient";
import { gql, useQuery, NetworkStatus } from "@apollo/client";

export const ALL_ARTICLES_QUERY = gql`
  query allArticlesQuery {
    articles {
      _id
      date
      image
      title
      author
      authorId
      isApproved
    }
  }
`;

const Articles = (props) => {
  
  const {
    loading,
    error,
    fetchMore,
    data,
    networkStatus,
    refetch,
  } = useQuery(ALL_ARTICLES_QUERY, { notifyOnNetworkStatusChange: true });

  const loadingMoreArticles = networkStatus === NetworkStatus.fetchMore;

  let articles;
  if (loading && !loadingMoreArticles) {
    articles = [];
  } else {
    articles = data.articles.map((item, index) => {
      return {
        index: index,
        ...item,
        contentType: Card.ContentType["article-internal"],
        link: `/article?id=${item["_id"]}`,
      };
    });
  }

  const [deviceState, deviceDispatch] = useContext(DeviceContext);
  const [loginState, loginDispatch] = useContext(LoginContext);
  // const [articles, setArticles] = useState(props.articles);
  const screen = deviceState.screen;
  const user = loginState.user;
  const loggedIn = loginState.isLoggedIn;
  const history = useRouter();

  useEffect(() => {
    refetch();
  }, [user]);

  const getArticle = async () => {
    axios
      .get("/api/create/articles")
      .then((res) => {
        alert(
          "Article template created. Template needs to be edited and submitted for moderator approval."
        );
        history.push(`article/edit?id=${res.data["_id"]}`);
      })
      .catch((err) => {
        if (err.response && err.response.status) {
          if (err.response.status === 401 || err.response.status === 400) {
            if (err.response.data) {
              alert(err.response.data.error);
            }
          } else if (err.response.status !== 200) {
            throw Error(err);
          }
        } else {
          console.log(err);
        }
      });
  };

  const toolbar = (
    <div
      style={{ paddingTop: "0px", paddingBottom: "0px" }}
      className={`${styles["main-pane-item"]}`}
    >
      <div
        className={`${styles["submit-button"]}`}
        onClick={() => {
          getArticle();
        }}
      >
        <label style={{ paddingRight: "0px", paddingLeft: "0px" }}>
          CREATE NEW ARTICLE{" "}
          <i
            className={`fas fa-plus`}
            style={{ fontSize: "1rem", paddingLeft: "5px" }}
          />
        </label>
      </div>
    </div>
  );

  const list = articles.map((item, index) =>
    screen === "mobile" ? (
      <div
        className={`${styles["main-pane-item"]} ${styles["main-pane-item-centered"]}`}
      >
        <LargeCard
          image={item.image}
          date={item.date}
          title={item.title}
          text={item.description}
          author={item.author}
          isApproved={item.isApproved}
          isEditable={user && (user.isModerator || user._id === item.authorId)}
          contentType={item.contentType}
          link={item.link}
        />
      </div>
    ) : (
      <div className={`${styles["main-pane-item"]}`}>
        <MediumCard
          image={item.image}
          date={item.date}
          title={item.title}
          text={item.description}
          author={item.author}
          isApproved={item.isApproved}
          isEditable={user && (user.isModerator || user._id === item.authorId)}
          contentType={item.contentType}
          link={item.link}
        />
      </div>
    )
  );

  const contents = (
    <>
      {loggedIn ? toolbar : null}
      {list}
    </>
  );

  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export async function getServerSideProps(context) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_ARTICLES_QUERY,
  });

  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_DOMAIN}/api/articles/pages`
  // );
  // const json = await res.json();
  // let articles = json["links"].map((item, index) => {
  //   return {
  //     index: index,
  //     ...item,
  //     contentType: Card.ContentType["article-internal"],
  //     link: `/article?id=${item["_id"]}`,
  //   };
  // });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default Articles;
