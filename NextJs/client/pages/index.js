import React, { useContext } from "react";
import LargeCard from "../components/Cards/LargeCard/LargeCard.js";
import MediumCard from "../components/Cards/MediumCard/MediumCard.js";
import Page from "../components/Page/Page";
import styles from "../components/Page/Page.module.css";
import { useHistory } from "react-router-dom";
import { DeviceContext } from "../contexts/reducers/deviceContext";
import { LoginContext } from "../contexts/reducers/loginContext";
import axios from "axios";
import { Card } from "../components/Cards/Card";

const Home = (props) => {
  const [deviceState, deviceDispatch] = useContext(DeviceContext);
  const [loginState, loginDispatch] = useContext(LoginContext);

  const articles = props.articles;
  const screen = deviceState.screen;
  const loggedIn = loginState.isLoggedIn;
  const user = loginState.user;
  const history = useHistory();

  const getArticle = async () => {
    axios
      .get("/api/create/articles")
      .then((res) => {
        alert(
          "Article template created. Template needs to be edited and submitted for moderator approval."
        );
        console.log(res.data);
        history.push(`/edit?id=id=${item["_id"]}`);
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 400)
        ) {
          alert(err.response.data.error);
        } else if (err.response.status !== 200) {
          throw Error(err);
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
    index % 4 == 0 || screen === "mobile" ? (
      <div
        key={index}
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
  const res = await fetch("http://localhost:3000/api/articles/pages");
  const json = await res.json();
  let articles = json["links"].map((item, index) => {
    return {
      index: index,
      ...item,
      contentType: Card.ContentType["article-internal"],
      link: `/article?id=${item["_id"]}`,
    };
  });

  return {
    props: {
      articles,
    },
  };
}

export default Home;
