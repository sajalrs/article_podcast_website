import React, { useState } from "react";
import TextEditor from "../TextEditor/TextEditor";
import { Value } from "slate";
import styles from "../Page/Page.module.css"
import {rules} from "../../components/TextEditor/TextEditor"
import Html from "slate-html-serializer";
const Comment = (props) => {
  const [textEditorValue, setTextEditorValue] = useState(
    Value.fromJSON(props.initialValue)
  );
  const [isEditable, setIsEditable] = useState(props.isEditable)
 
  
  const html = new Html({ rules });
 
 
 
  return (
    <div>
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
