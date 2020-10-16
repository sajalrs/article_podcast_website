import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { playAudio, playVideo } from "../../redux/actions";



const Card = {
    ContentType: Object.freeze({"article-internal":1, "article-external":2, "video-youtube":3, "video-external":4, "audio-internal": 5}),
    formatDate: (dateString) => {
        const date = new Date(dateString);
        const monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
      
        return day + ' ' + monthNames[monthIndex] + ', ' + year;
      }
}

const CardComponent = (props) => {
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
    <article className={props.styles? props.styles.card: ""}>
      <ImageContainer
        styles={props.styles}
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
        styles={props.styles}
        title={props.title}
        text={props.text}
        date={props.date? Card.formatDate(props.date): null}
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
      className={props.styles["img-container"]}
      onClick={() => {
        if (props.audioPlayerRef) {
          props.audioPlayerRef.current.play();
        }
        props.onClick();
      }}
    >
      <img src={props.image} loading="lazy" />
      <div>
        {props.isPlayable && (
          <i
            className={`${props.styles["play-button"]} ${props.styles["far"]} ${props.styles["fa-play-circle"]} far fa-play-circle`}
          ></i>
        )}
      </div>
    </div>
  ) : null;
};

const CardBody = (props) => {
  return props.title || props.author || props.date || props.text? (
    <div className={props.styles["card-body"]}>
      {props.title && <h2
        onClick={() => {
          if (props.audioPlayerRef) {
            props.audioPlayerRef.current.play();
          }
          props.onClick();
        }}
      >
        {props.title}
      </h2>}
      {(props.author || props.date ) ?
      <p>
       {(props.author) && <span className={props.styles["author"]}>{props.author}</span>}
        {(props.date) && <span className={props.styles["date"]}>{props.date}</span>}
      </p>: null}
      {props.text && <p className={props.styles["body-content"]}>{props.text}</p>}
    </div>
  ) : null;
};

export {CardComponent};
export {Card};