import React, { useState } from "react";
import TextEditor from "../TextEditor/TextEditor";
import { Value } from "slate";
import styles from "./Comment.module.css"
import styles2 from "../Page/Page.module.css"
import {getRules} from "../../components/TextEditor/TextEditor"
import Html from "slate-html-serializer";
const Comment = (props) => {
  const [textEditorValue, setTextEditorValue] = useState(
    Value.fromJSON(props.initialValue)
  );
  const [isEditable, setIsEditable] = useState(props.isEditable)
 
  
  const rules = getRules(styles2)
  const html = new Html( {rules});
 
 
 
  return (
    <div className={styles["card-body"]}>
       {(props.author || props.date ) ?
      <p>
       {(props.author) && <span className={styles["author"]}>{props.author}</span>}
        {(props.date) && <span className={styles["date"]}>{props.date}</span>}
      </p>: null}
      {isEditable? 
      (<TextEditor
        value={textEditorValue}
        setValue={setTextEditorValue}
        onSave={() => {setIsEditable(false)}}
        toolbarFixed={false}
      />): 
  (<div dangerouslySetInnerHTML={{ __html:  html.serialize(textEditorValue) }}></div>)
        
    }
    </div>
  );
};

export default Comment;
