import React from "react";
import Comment from "./Comment";

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

 
  return (
    <div>
      <Comment
        initialValue={initialValue}        
        isEditable={true}
      />
   <Comment
        author="Sajal Satyal"
        date={Date()}
        initialValue={initialValue}        
        isEditable={false}
      />
    </div>
  );
};

export default CommentBar;
