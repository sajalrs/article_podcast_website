import React, { useState } from "react";
import Comment from "./Comment";
import TextEditor from "../TextEditor/TextEditor";
import { Value } from "slate";
import {useSelector} from "react-redux"
import styles from "./Comment.module.css";

const initialValue = {
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "Edit text and save to post comment...",
              },
            ],
          },
        ],
      },
    ],
  },
};

const loginWarning = {
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "Please login to post comments...",
              },
            ],
          },
        ],
      },
    ],
  },
};



const CommentBar = (props) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const [textEditorValue, setTextEditorValue] = useState(
    Value.fromJSON(initialValue)
  );


  const postComment = () => {
    props.postComment(textEditorValue);
  };

  return (
    <div style={{width: "100%"}}>
      <h1 className={styles["heading-special"]}>Comments</h1>
   <div   style={{
          borderStyle: "solid solid solid solid",
          borderColor: "var(--secondary-color)",
          width: "100%"
        }}>
   <div
        style={{
          width: "100%"
        }}
      >
        <TextEditor
          value={isLoggedIn? textEditorValue : Value.fromJSON(loginWarning)}
          setValue={isLoggedIn ? setTextEditorValue : () => {}}
          onSave={() => {
            postComment();
          }}
          toolbarFixed={false}
          styles={styles}
        />
      </div>

      {props.comments.map((item) => {
        return (
          <Comment
            author={item.author}
            date={item.updatedAt}
            commentText={item.content}
          />
        );
      })}
      </div>
    </div>

  );
};

export default CommentBar;
