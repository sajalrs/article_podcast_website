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
  const maximized = html.serialize(props.commentText);
  const oneNode = {...props.commentText.toJSON(), document: {...props.commentText.toJSON().document, nodes: props.commentText.toJSON().document.nodes.filter((item, index) => index === 0)}}
  const minimized = html.serialize(oneNode);

  const [isMinimized, setMinimized] = useState(true);
  return (
    <div className={styles["Comment"]}>
      <div className={styles["card-body"]}>
        {author ? (
          <p>
            {author && <span className={styles["author"]}>{author}</span>}
                  </p>
        ) : null}
      </div>

      <div
        className={
          isMinimized
            ? `${styles["minimized"]} ${styles["comment-body"]}`
            : styles["comment-body"]
        }
        dangerouslySetInnerHTML={{ __html: isMinimized? minimized : maximized}}
      ></div>


<div className={styles["date-time-ellipsis"]}>
{date || time ? (
          <p>
            {date && <span className={styles["date"]}>{date}</span>}
            {time && <span className={styles["time"]}>{time}</span>}
          </p>): null}
{props.commentText.toJSON().document.nodes.length > 1 &&(<div>
{isMinimized ? (
            <i
              onClick={() => setMinimized(false)}
  
              className={`${styles["comment-maximize"]} ${styles["fas"]} ${styles["fa-ellipsis-h"]} fas fa-ellipsis-h`}
            ></i>
          ) : (
            <i
              onClick={() => setMinimized(true)}
              className={`${styles["comment-minimize"]} ${styles["fas"]} ${styles["fa-chevron-up"]} fas fa-chevron-up`}
            ></i>
          )}
        </div>)}
        </div>
    </div>
  );
};

export default Comment;
