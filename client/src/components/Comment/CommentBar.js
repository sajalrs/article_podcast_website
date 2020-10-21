import React, { useState } from "react";
import TextEditor from "../TextEditor/TextEditor";
import { Value } from "slate";
const CommentBar = () => {
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
  const [textEditorValue, setTextEditorValue] = useState(Value.fromJSON(initialValue));

  return (
    <div>
      <TextEditor
        value={textEditorValue}
        setValue={setTextEditorValue}
        onSave={() => {}}
        toolbarFixed={false}
      />
    </div>
  );
};

export default CommentBar;
