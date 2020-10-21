import React, { useState } from "react";
import TextEditor from "../TextEditor/TextEditor";
import { Value } from "slate";
import styles from "../Page/Page.module.css"
import Html from "slate-html-serializer";
const Comment = (props) => {
  const [textEditorValue, setTextEditorValue] = useState(
    Value.fromJSON(props.initialValue)
  );
  const [isEditable, setIsEditable] = useState(props.isEditable)
 
  const BLOCK_TAGS = {
    p: "paragraph",
    blockquote: "block-quote",
    ul: `bulleted-list`,
    h1: `heading-one`,
    h2: `heading-two`,
    li: `list-item`,
    ol: `numbered-list`,
    img: `image`,
  };

  // Add a dictionary of mark tags.
  const MARK_TAGS = {
    em: "italic",
    strong: "bold",
    u: "underlined",
    code: `code`,
  };

  const rules = [
    {
      deserialize(el, next) {
        const type = BLOCK_TAGS[el.tagName.toLowerCase()];
        if (type) {
          return {
            object: "block",
            type: type,
            data: {
              className: el.getAttribute("class"),
            },
            nodes: next(el.childNodes),
          };
        }
      },
      serialize(obj, children) {
        if (obj.object == "block") {
          switch (obj.type) {
            case "paragraph":
              return (
                <di
                  className={styles["main-pane"]}
                  v
                  className={styles["main-pane-item"]}
                >
                  <p>{children}</p>
                </di>
              );
            case "block-quote":
              return (
                <div className={`${styles["main-pane-item"]} ${styles["main-pane-item-centered"]}`}>
                  <blockquote>{children}</blockquote>
                </div>
              );
            case "bulleted-list":
              return (
                <div className={styles["main-pane-item"]}>
                  <ul>{children}</ul>
                </div>
              );
            case "heading-one":
              return (
                <div className={styles["main-pane-item"]}>
                  <h1 className={styles["heading"]}>{children}</h1>
                </div>
              );
            case "heading-two":
              return (
                <div className={styles["main-pane-item"]}>
                  <h2>{children}</h2>
                </div>
              );
            case "list-item":
              return <li>{children}</li>;
            case "numbered-list":
              return (
                <div className={styles["main-pane-item"]}>
                  <ol>{children}</ol>
                </div>
              );
            case "image": {
              const src = obj.data["src"];
              return (
                <div className={`${styles["main-pane-item"]} ${styles["main-pane-item-centered"]}`}>
                  <figure className={styles["image-container"]}>
                    <img src={src} loading="lazy"/>
                  </figure>
                </div>
              );
            }
            case "figure": {
              const src = obj.data["src"];
              return (
                <div className={`${styles["main-pane-item"]} ${styles["main-pane-item-centered"]}`}>
                  <figure className={styles["image-container"]}>
                    <img src={src} loading="lazy"/>
                    <figcaption>
                      <strong>{children}</strong>
                    </figcaption>
                  </figure>
                </div>
              );
            }
          }
        }
      },
    },
    // Add a new rule that handles marks...
    {
      deserialize(el, next) {
        const type = MARK_TAGS[el.tagName.toLowerCase()];
        if (type) {
          return {
            object: "mark",
            type: type,
            nodes: next(el.childNodes),
          };
        }
      },
      serialize(obj, children) {
        if (obj.object == "mark") {
          switch (obj.type) {
            case "bold":
              return <strong>{children}</strong>;
            case "italic":
              return <em>{children}</em>;
            case "code":
              return <code>{children}</code>;
            case "underlined":
              return <u>{children}</u>;
          }
        }
      },
    },
  ];
  const html = new Html({ rules });
 
 
 
  return (
    <div>
      {isEditable? 
      (<TextEditor
        value={textEditorValue}
        setValue={setTextEditorValue}
        onSave={() => {}}
        toolbarFixed={false}
      />): 
  (<div dangerouslySetInnerHTML={{ __html:  html.serialize(textEditorValue) }}></div>)
        
    }
    </div>
  );
};

export default Comment;
