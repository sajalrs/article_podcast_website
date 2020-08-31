import React from "react";
import styles from "./LargeCard.module.css";
import Card from "../Card.js";
const LargeCard = (props) => {
  return (
    <article className={styles.card}>
      <ImageContainer
        image={props.image}
        LinkType={props.LinkType}
        onClick={props.onClick}
        link={props.link}
      />
      <CardBody
        title={props.title}
        text={props.text}
        date={props.date}
        author={props.author}
        onClick={props.onClick}
        link={props.link}
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
      onClick={() => {
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
  );
};

const CardBody = (props) => {
  return (
    <div className={styles["card-body"]}>
      <h2
        onClick={() => {
          props.onClick(props.link);
        }}
      >
        {props.title}
      </h2>
      <p>
        <span className={styles["author"]}>{props.author}</span> |{" "}
        <span className={styles["date"]}>{props.date}</span>
      </p>
      <p className={styles["body-content"]}>{props.text}</p>
    </div>
  );
};

export default LargeCard;
