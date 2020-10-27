import React,{useState} from "react";
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
                  text: "This text is editable",
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


  return (
    <div>
           
      <h1 className={styles["heading-special"]}>Comments</h1>
      <div style={{ borderStyle: "solid solid solid solid", borderColor: "var(--secondary-color)"}}>
      <TextEditor
        value={textEditorValue}
        setValue={setTextEditorValue}
        onSave={() => {}}
        toolbarFixed={false}
        styles={styles}
      />
      </div>
      <Comment
        author="Sajal Satyal"
        date={Date()}
        commentText={textEditorValue}
      />
    </div>
  );
};

export default CommentBar;
