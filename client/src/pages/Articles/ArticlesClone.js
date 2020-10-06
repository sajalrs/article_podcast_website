import React from "react";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import { useSelector } from "react-redux";
const Articles = (props) => {
  const articles = useSelector((state) => state.blog.articles);
  const contents = articles.map((item) => (
    <div className={`${styles["main-pane-item"]}`}>
      <LargeCard
        image={item.image}
        date={item.date}
        title={item.title}
        text={item.description}
        author={item.author}
        contentType={item.contentType}
        link={item.link}
      />
    </div>
  ));
  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export default Articles;
