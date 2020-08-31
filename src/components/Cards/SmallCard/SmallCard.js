import React from "react";
import styles from "./SmallCard.module.css";
import Card from "../Card.js";

const SmallCard = (props) => {
  return (
    <article className={styles["card"]}>
      <ImageContainer
        image={props.image}
        LinkType={props.LinkType}
        playVideo={props.playVideo}
        link={props.link}
      />
      <CardBody
        title={props.title}
        text={props.text}
        date={props.date}
        author={props.author}
      />
    </article>
  );
};

const ImageContainer = (props) => {
  const isVideo =
    props.LinkType === Card.LinkType["video-external"] ||
    props.LinkType === Card.LinkType["video-youtube"];
  return (
    <div
      className={styles["img-container"]}
      style={{ backgroundImage: `url('${props.image}')` }}
      onClick={() => {props.playVideo(props.link);}}
    >
      <div>
        {isVideo && (
          <i
            className={`${styles["play-button"]} ${styles["far"]} ${styles["fa-play-circle"]} far fa-play-circle`} 
          ></i>
        )}
      </div>
    </div>
  );
};

const CardBody = (props) => {
  return (
    <div className={styles["card-body"]}>
      <h2>{props.title}</h2>
    </div>
  );
};

export default SmallCard;
