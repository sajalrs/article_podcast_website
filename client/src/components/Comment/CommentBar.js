import React from "react";
import Comment from "./Comment";

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

  return (
    <div>
      <Comment
        initialValue={initialValue}        
        isEditable={true}
      />
   <Comment
        initialValue={initialValue}        
        isEditable={false}
      />
    </div>
  );
};

export default CommentBar;
