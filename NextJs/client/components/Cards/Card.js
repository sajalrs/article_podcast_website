import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { playAudio, playVideo } from "../../redux/actions";
import styles from "../../components/Page/Page.module.css";

const editButton = (onClick) => (
  <div style={{ paddingTop: "0px", paddingBottom: "0px", margin: "10px" }}>
    <div
      className={`${styles["submit-button"]}`}
      onClick={() => onClick()}
      style={{ padding: "10px" }}
    >
      <label
        style={{ paddingRight: "0px", paddingLeft: "0px", fontSize: "0.95rem" }}
      >
        EDIT <i className={`fas fa-edit`} style={{ fontSize: "0.9rem" }} />
      </label>
    </div>
  </div>
);

const pendingApproval = (
  <div style={{ paddingTop: "0px", paddingBottom: "0px", margin: "10px" }}>
    <div
      className={`${styles["submit-button"]}`}
      onClick={() => {
        alert("Please wait for article to be approved by moderator");
      }}
      style={{ padding: "10px" }}
    >
      <label
        style={{ paddingRight: "0px", paddingLeft: "0px", fontSize: "0.95rem" }}
      >
        PENDING APPROVAL{" "}
        <i className={`fas fa-hourglass-half`} style={{ fontSize: "0.9rem" }} />
      </label>
    </div>
  </div>
);

const Card = {
  ContentType: Object.freeze({
    "article-internal": 1,
    "article-external": 2,
    "video-youtube": 3,
    "video-external": 4,
    "audio-internal": 5,
  }),
  formatDate: (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    let hours = date.getHours() % 12;
    hours = hours === 0 ? 12 : hours;
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const meridian = date.getHours() < 12 === 0 ? "AM" : "PM";

    const time = `${hours}:${minutes} ${meridian}`;
    const fullDate = day + " " + monthNames[monthIndex] + ", " + year;
    return { date: fullDate, time: time };
  },
};

const CardComponent = (props) => {
  const dispatch = useDispatch();
  const history = useRouter();
  const audioPlayerRef = useSelector(
    (state) => state.audioPlayer.audioPlayerRef
  );
  const isEditable = props.isEditable;
  const isPendingApproval = props.contentType === Card.ContentType["article-internal"] && !props.isApproved;
  const edit = () => {
    history.push(`${props.link}`.replace("article", "article/edit"));
  };

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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row"}}>
        {isEditable && editButton(edit)}
        {isPendingApproval && pendingApproval}
      </div>

      <article className={props.styles ? props.styles.card : ""}>
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
          date={props.date ? Card.formatDate(props.date).date : null}
          author={props.author}
          onClick={onClick}
          audioPlayerRef={
            props.contentType === Card.ContentType["audio-internal"]
              ? audioPlayerRef
              : null
          }
        />
      </article>
    </div>
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
  return props.title || props.author || props.date || props.text ? (
    <div className={props.styles["card-body"]}>
      {props.title && (
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
      )}
      {props.author || props.date ? (
        <p>
          {props.author && (
            <span className={props.styles["author"]}>{props.author}</span>
          )}
          {props.date && (
            <span className={props.styles["date"]}>{props.date}</span>
          )}
        </p>
      ) : null}
      {props.text && (
        <p className={props.styles["body-content"]}>{props.text}</p>
      )}
    </div>
  ) : null;
};

export { CardComponent };
export { Card };
