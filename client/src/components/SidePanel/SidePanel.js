import React from "react";
import SmallCard from "../Cards/SmallCard/SmallCard.js";
import styles from "./SidePanel.module.css";

const SidePanel = (props) => {
  const vidArray = props.vidArray;
  return (
    <div className={styles.SidePanel}>
      <label className={styles["side-panel-title"]}>VIDEO PODCASTS</label>
      <ul className={styles["card-list"]}>
        {vidArray.map((item, index) => {
          return (
            <li key={index}>
              <SmallCard
                title={item.title}
                image={item.image}
                LinkType={item.LinkType}
                onClick={item.onClick}
                link={item.link}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidePanel;
