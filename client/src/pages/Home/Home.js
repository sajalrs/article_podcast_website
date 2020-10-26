import React from "react";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import MediumCard from "../../components/Cards/MediumCard/MediumCard.js";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import { useSelector } from "react-redux";
import CommentBar from "../../components/Comment/CommentBar"

const Home = (props) => {
  const articles = useSelector((state) => state.blog.articles);
  const isMobile = useSelector((state) => state.device.isMobile);

  const contents = articles.map((item, index) =>
    index % 4 == 0 || isMobile ? (
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

export default Home;
