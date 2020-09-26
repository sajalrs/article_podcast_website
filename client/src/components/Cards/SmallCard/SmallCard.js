import React from "react";
import styles from "./SmallCard.module.css";
import Card from "../Card.js";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { playAudio, playVideo } from "../../../redux/actions";

const SmallCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const audioPlayerRef = useSelector(
    (state) => state.audioPlayer.audioPlayerRef
  );

  const onClick = () => {
    switch (props.contentType) {
      case Card.ContentType["article-internal"]:
  
        history.push(props.link);
        break;
      case Card.ContentType["audio-internal"]:
        dispatch(playAudio(props.index));
        break;
      case Card.ContentType["video-youtube"]:
        dispatch(playVideo(props.link));
        break;
      default:
    }
  };

  const isPlayable =
    props.contentType === Card.ContentType["video-external"] ||
    props.contentType === Card.ContentType["video-youtube"] ||
    props.contentType === Card.ContentType["audio-internal"];

  return (
    <article className={styles["card"]}>
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
      />
    </article>
  );
};

const ImageContainer = (props) => {

  return props.image ? (
    <div
      className={styles["img-container"]}
      style={{ backgroundImage: `url('${props.image}')` }}
      onClick={() => {
        if (props.audioPlayerRef) {
          props.audioPlayerRef.current.play();
        }
        props.onClick();
      }}
    >
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
      <h2>{props.title}</h2>
    </div>
  ) : null;
};

export default SmallCard;
