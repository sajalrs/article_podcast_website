import React, { useContext } from "react";
import MediumCard from "../components/Cards/MediumCard/MediumCard.js";
import Page from "../components/Page/Page";
import styles from "../components/Page/Page.module.css";
import { AudioPlayerContext } from "../contexts/reducers/audioPlayerContext";
const Podcasts = (props) => {
  const [audioPlayerState, audioPlayerDispatch] = useContext(
    AudioPlayerContext
  );
  const podcasts = audioPlayerState.podcasts;
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
  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export default Podcasts;
