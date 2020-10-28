import React, { useState } from "react";
import Comment from "./Comment";
import TextEditor from "../TextEditor/TextEditor";
import { Value } from "slate";
import styles from "./Comment.module.css";


const CommentBar = (props) => {
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

  const [textEditorValue, setTextEditorValue] = useState(
    Value.fromJSON(initialValue)
  );


  const postComment = () => {
    props.postComment(textEditorValue);
  };

  return (
    <div>
      <h1 className={styles["heading-special"]}>Comments</h1>
      <div
        style={{
          borderStyle: "solid solid solid solid",
          borderColor: "var(--secondary-color)",
        }}
      >
        <TextEditor
          value={textEditorValue}
          setValue={setTextEditorValue}
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
  );
};

export default CommentBar;
