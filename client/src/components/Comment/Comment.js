import React, { useState } from "react";
import styles from "./Comment.module.css";
import { getRules } from "../../components/TextEditor/TextEditor";
import { Card } from "../Cards/Card";
import Html from "slate-html-serializer";
const Comment = (props) => {
  const author = props.author;
  const fullDate = Card.formatDate(props.date);
  const date = fullDate.date;
  const time = fullDate.time;
  const rules = getRules(styles);
  const html = new Html({ rules });

  return (
    <div className={styles["Comment"]}>
      <div className={styles["card-body"]}>
        {author || date ? (
          <p>
            {author && <span className={styles["author"]}>{author}</span>}
            {date && <span className={styles["date"]}>{date}</span>}
            {time && <span className={styles["time"]}>{time}</span>}
          </p>
        ) : null}
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: html.serialize(props.commentText) }}
      ></div>
    </div>
  );
};

export default Comment;
