import React from "react";
import styles from "./SmallCard.module.css";
import Card from "../Card.js";

const SmallCard = (props) => {
  return (
    <article className={styles["card"]}>
      <ImageContainer
        image={props.image}
        LinkType={props.LinkType}
        onClick={props.onClick}
        link={props.link}
      />
      <CardBody
        title={props.title}
        text={props.text}
        date={Card.formatDate(props.date)}
        author={props.author}
      />
    </article>
  );
};

const ImageContainer = (props) => {
  const isVideo =
    props.LinkType === Card.LinkType["video-external"] ||
    props.LinkType === Card.LinkType["video-youtube"];
  return props.image ? (
    <div
      className={styles["img-container"]}
      style={{ backgroundImage: `url('${props.image}')` }}
      onClick={() => {
        if(props.LinkType === Card.LinkType["audio-internal"]){
          props.audioRef.current.play();
        }
        props.onClick(props.link);
      }}
    >
      <div>
        {isVideo && (
          <i
            className={`${styles["play-button"]} ${styles["far"]} ${styles["fa-play-circle"]} far fa-play-circle`}
          ></i>
        )}
      </div>
    </div>
  ) : null;
};

const CardBody = (props) => {
  return props.title ? (
    <div className={styles["card-body"]}>
      <h2>{props.title}</h2>
    </div>
  ) : null;
};

export default SmallCard;
