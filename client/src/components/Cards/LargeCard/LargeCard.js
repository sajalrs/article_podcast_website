import React, { useRef, forwardRef, useState, useEffect } from "react";
import styles from "./LargeCard.module.css";
import Card from "../Card.js";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { playAudio, playVideo } from "../../../redux/actions";

const LargeCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const audioPlayerRef = useSelector(
    (state) => state.audioPlayer.audioPlayerRef
  );

  const onClick = () => {
    switch (props.contentType) {
      case Card.ContentType["article-internal"]:
        history.push(props.link);
      case Card.ContentType["audio-internal"]:
        dispatch(playAudio(props.index));
      case Card.ContentType["video-youtube"]:
        dispatch(playVideo(props.link));
      default:
    }
  };

  const isPlayable =
    props.contentType === Card.ContentType["video-external"] ||
    props.contentType === Card.ContentType["video-youtube"] ||
    props.contentType === Card.ContentType["audio-internal"];

  return (
    <article className={styles.card}>
      <ImageContainer
        image={props.image}
        onClick={onClick}
        audioPlayerRef={
          props.contentType === Card.ContentType["audio-internal"]
            ? audioPlayerRef
            : null
        }
        isPlayable={isPlayable}
      />
      <CardBody
        title={props.title}
        text={props.text}
        date={Card.formatDate(props.date)}
        author={props.author}
        onClick={onClick}
        audioPlayerRef={
          props.contentType === Card.ContentType["audio-internal"]
            ? audioPlayerRef
            : null
        }
      />
    </article>
  );
};

const ImageContainer = (props) => {
  return props.image ? (
    <div
      className={styles["img-container"]}
      onClick={() => {
        if (props.audioPlayerRef) {
          props.audioPlayerRef.current.play();
        }
        props.onClick();
      }}
    >
      <img src={props.image} />
      <div>
        {props.isPlayable && (
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
      <h2
        onClick={() => {
          if (props.audioPlayerRef) {
            props.audioPlayerRef.current.play();
          }
          props.onClick();
        }}
      >
        {props.title}
      </h2>
      <p>
        <span className={styles["author"]}>{props.author}</span>
        <span className={styles["date"]}>{props.date}</span>
      </p>
      {props.text && <p className={styles["body-content"]}>{props.text}</p>}
    </div>
  ) : null;
};

export default LargeCard;
