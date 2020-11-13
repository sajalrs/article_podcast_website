import React, { useState, useEffect } from "react";
import MediumCard from "../components/Cards/MediumCard/MediumCard.js";
import LargeCard from "../components/Cards/LargeCard/LargeCard.js";
import Page from "../components/Page/Page";
import styles from "../components/Page/Page.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Articles = (props) => {
  const articles = useSelector((state) => state.blog.articles);
  const screen = useSelector((state) => state.device.screen);
  const user = useSelector((state) => state.login.user);
  const loggedIn = useSelector((state) => state.login.isLoggedIn);
  const history = useHistory();

  const getArticle = async () => {
    axios
      .get("/create/articles")
      .then((res) => {
        alert(
          "Article template created. Template needs to be edited and submitted for moderator approval."
        );
        console.log(res.data);
        history.push(`articles/id=${res.data.data["_id"]}/edit`);
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

export default Articles;