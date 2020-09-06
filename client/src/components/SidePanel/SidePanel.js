import React, { useState, forwardRef } from "react";
import SmallCard from "../Cards/SmallCard/SmallCard.js";
import styles from "./SidePanel.module.css";

const SidePanel = (props) => {
  const vidArray = props.vidArray;
  return (
    <div
      style={{top: props.top}}
      className={
        props.sideBarClicked
          ? `${styles["SidePanel"]} ${styles["maximized"]}`
          : `${styles["SidePanel"]} ${styles["minimized"]}`
      }
    >
      <label className={styles["side-panel-title"]} onClick={() => {props.setSideBarClicked(!props.sideBarClicked)}}>
        <label className={styles["side-panel-title-text"]}>VIDEO PODCASTS{" "}</label>
        <i
          className={props.sideBarClicked? `${styles["fas"]} ${styles["fa-chevron-up"]} fas fa-chevron-up` :`${styles["fas"]} ${styles["fa-chevron-down"]} fas fa-chevron-down`}
        ></i>
      </label>
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
