import React from "react";
import styles from "./MediumCard.module.css";
import Card from "../Card.js";
const MediumCard = (props) => {
  return (
    <article className={styles["card"]}>
      <ImageContainer
        image={props.image}
        LinkType={props.LinkType}
        onClick={props.onClick}
        link={props.link}
        audioRef={props.audioRef}
      />
      <CardBody
        title={props.title}
        text={props.text}
        date={Card.formatDate(props.date)}
        author={props.author}
        onClick={props.onClick}
        link={props.link}
        LinkType={props.LinkType}
        audioRef={props.audioRef}
      />
    </article>
  );
};

const ImageContainer = (props) => {
  const isVideo =
    props.LinkType === Card.LinkType["video-external"] ||
    props.LinkType === Card.LinkType["video-youtube"] || 
    props.LinkType === Card.LinkType["audio-internal"];
  return (
    props.image?
    <div
    className={styles["img-container"]}
    onClick={() => {
      if(props.LinkType === Card.LinkType["audio-internal"]){
        props.audioRef.current.play();
      }
      props.onClick(props.link);
    }}
  >
     <img  src={props.image}/>
    <div>
     
      {isVideo && (
        <i
          className={`${styles["play-button"]} ${styles["far"]} ${styles["fa-play-circle"]} far fa-play-circle`}
        ></i>
      )}
      
    </div>
    </div>: null
  );
};

const CardBody = (props) => {
  return (
    props.title?
    <div className={styles["card-body"]}>
      <h2
        onClick={() => {
          if(props.LinkType === Card.LinkType["audio-internal"]){
            props.audioRef.current.play();
          }
          props.onClick(props.link);
        }}
      >
        {props.title}
      </h2>
      <p>
        <span className={styles["author"]}>{props.author}</span>
        <span className={styles["date"]}>{props.date}</span>
      </p>
      <p className={styles["body-content"]}>{props.text}</p>
    </div>: null
  );
};

export default MediumCard;
