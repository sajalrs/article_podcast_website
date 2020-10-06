import React from "react";
import MediumCard from "../../components/Cards/MediumCard/MediumCard.js";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import { useSelector } from "react-redux";
const Podcasts = (props) => {
  const podcasts = useSelector((state) => state.audioPlayer.podcasts);
  const contents = podcasts.map((item) => (
    <div className={`${styles["main-pane-item"]}`}>
      <MediumCard
        image={item.image}
        date={item.date}
        title={item.title}
        text={item.description}
        contentType={item.contentType}
        index={item.index}
      />
    </div>
  ));
  return <Page mainPane={contents} />;
};

export default Podcasts;
