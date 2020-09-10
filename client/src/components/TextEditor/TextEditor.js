import React, { useState, useRef } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import styles from "./TextEditor.module.css";
import FormatToolbar from "./FormatToolbar";
import { isKeyHotkey } from "is-hotkey";

const initialValue = Value.fromJSON({
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
                text: "My first paragraph",
              },
            ],
          },
        ],
      },
    ],
  },
});

const TextEditor = () => {
  const [value, setValue] = useState(initialValue);
  const ref = useRef();
  const DEFAULT_NODE = 'paragraph'
  const isBoldHotkey = isKeyHotkey("mod+b");
  const isItalicHotkey = isKeyHotkey("mod+i");
  const isUnderlinedHotkey = isKeyHotkey("mod+u");
  const isCodeHotkey = isKeyHotkey("mod+`");

  const hasMark = (type) => {
    return value.activeMarks.some((node) => node.type === type);
  };

 const hasBlock = type => {
    return value.blocks.some(node => node.type === type)
  }


  const renderMarkButton = (type, icon) => {
    const isActive = hasMark(type);
    return (
      <button
        active={isActive}
        onPointerDown={(event) => onClickMark(event, type)}
      >
        <i className={icon} />
      </button>
    );
  };

  const renderBlockButton = (type, icon) => {
    let isActive = hasBlock(type);
    if (["numbered-list", "bulleted-list"].includes(type)) {
      const { document, blocks } = value;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = hasBlock("list-item") && parent && parent.type === type;
      }
    }

    return (
      <button
        active={isActive}
        onPointerDown={(event) => onClickBlock(event, type)}
      >
        <i className={icon}></i>
      </button>
    );
  };

  const renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "heading-one":
        return <h1 {...attributes}>{children}</h1>;
      case "heading-two":
        return <h2 {...attributes}>{children}</h2>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  };

  const renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return <code {...attributes}>{children}</code>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underlined":
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  const onKeyDown = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = "bold";
    } else if (isItalicHotkey(event)) {
      mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
      mark = "underlined";
    } else if (isCodeHotkey(event)) {
      mark = "code";
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  const onClickMark = (event, type) => {
    event.preventDefault();
    ref.current.toggleMark(type);
  };

  const onClickBlock = (event, type) => {
    event.preventDefault();

    const editor = ref.current;
    const value = editor.value;
    const document = value.document;

    // Handle everything but list buttons.
    if (type !== "bulleted-list" && type !== "numbered-list") {
      const isActive = hasBlock(type);
      const isList = hasBlock("list-item");

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = hasBlock("list-item");
      const isType = value.blocks.some((block) => {
        return !!document.getClosest(
          block.key,
          (parent) => parent.type === type
        );
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        editor
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks("list-item").wrapBlock(type);
      }
    }
  };

  return (
    <div className={styles["overarching"]}>
      <FormatToolbar>
        {renderMarkButton("bold", "fas fa-bold")}
        {renderMarkButton("italic", "fas fa-italic")}
        {renderMarkButton("underlined", "fas fa-underline")}
        {renderMarkButton("code", "fas fa-code")}
        {renderBlockButton("heading-one", "fas fa-heading")}
        {renderBlockButton("heading-two", "fas fa-heading")}
        {renderBlockButton("block-quote", "fas fa-quote-right")}
        {renderBlockButton("numbered-list", "fas fa-list-ol")}
        {renderBlockButton("bulleted-list", "fas fa-list-ul")}
      </FormatToolbar>
      <Editor
        ref={ref}
        className={styles["Editor"]}
        value={value}
        onChange={(opts) => setValue(opts.value)}
        onKeyDown={onKeyDown}
        renderMark={renderMark}
        renderBlock={renderBlock}
      />
    </div>
  );
};



export default TextEditor;
