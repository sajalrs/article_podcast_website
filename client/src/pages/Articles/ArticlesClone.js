import React,{useState, useEffect} from "react";
import MediumCard from "../../components/Cards/MediumCard/MediumCard.js";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import { useSelector } from "react-redux";
const Articles = (props) => {
  const articles = useSelector((state) => state.blog.articles);
  const isMobile = useSelector((state) => state.device.isMobile);
  const contents = articles.map((item, index) =>
    isMobile ? (
      <div
        className={`${styles["main-pane-item"]} ${styles["main-pane-item-centered"]}`}
      >
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
    ) : (
      <div className={`${styles["main-pane-item"]}`}>
        <MediumCard
          image={item.image}
          date={item.date}
          title={item.title}
          text={item.description}
          author={item.author}
          contentType={item.contentType}
          link={item.link}
        />
      </div>
    )
  );
  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export default Articles;
