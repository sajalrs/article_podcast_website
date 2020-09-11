import React, { useState, useRef } from "react";
import { Editor, getEventTransfer } from "slate-react";
import { Block} from "slate";
import styles from "./TextEditor.module.css";
import FormatToolbar from "./FormatToolbar";
import { isKeyHotkey } from "is-hotkey";
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'




const schema = {
    document: {
      last: { type: 'paragraph' },
      normalize: (editor, { code, node, child }) => {
        switch (code) {
          case 'last_child_type_invalid': {
            const paragraph = Block.create('paragraph')
            return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
          }
        }
      },
    },
    blocks: {
      image: {
        isVoid: true,
      },
    },
  }
  

const TextEditor = (props) => {

  const ref = useRef();
  const value = props.value;
  const setValue = props.setValue;
  const DEFAULT_NODE = 'paragraph'
  const isBoldHotkey = isKeyHotkey("mod+b");
  const isItalicHotkey = isKeyHotkey("mod+i");
  const isUnderlinedHotkey = isKeyHotkey("mod+u");
  const isCodeHotkey = isKeyHotkey("mod+`");
  const isTabHotkey = isKeyHotkey("tab");

  const hasMark = type => {
    return value.activeMarks.some(mark => mark.type === type);
  };

 const hasBlock = type => {
    return value.blocks.some(node => node.type === type)
  }

  const isImage = (url) => {
    return imageExtensions.includes(getExtension(url));
  }

  const getExtension = (url) => {
      return new URL(url).pathname.split('.').pop;
  }

  const insertImage = (editor, src, target) => {
    if(target){
        editor.select(target)
    }

    editor.insertBlock({
        type: 'image',
        data: {src},
    })
  } 


  const renderMarkButton = (type, icon) => {
    const isActive = hasMark(type);
    return (
      <button
        active={isActive}
        onPointerDown={(event) => onClickMark(event, type)}
        className={isActive? `styles["active] styles["tooltip-icon-button"]`: styles["tooltip-icon-button"]}
      >
        <i className={icon} />
      </button>
    );
  };

  const renderImageButton = (icon) => {
      return(
        <button
        className={styles["tooltip-icon-button"]}
        onPointerDown={onClickImage}
      >
        <i className={icon} />
      </button>
      )
  }

  const renderSaveButton = (icon) => {
    return(
      <button
      className={styles["tooltip-icon-button"]}
      onPointerDown={props.onSave? props.onSave : () => console.log(JSON.stringify(value.toJSON()))}
    >
      <i className={icon} />
    </button>
    )
}


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
      className={isActive? `styles["active] styles["tooltip-icon-button"]`: styles["tooltip-icon-button"]}
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
      case "image": {
        const src = node.data.get('src')
        return (
          <img
            {...attributes}
            src={src}
          />
        )
      }
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
    } else if (isTabHotkey(event)) {
      event.preventDefault();
      return next()
    }else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  const onClickMark = (event, type) => {
    event.preventDefault();
    ref.current.toggleMark(type);
  };

  const onClickImage = event => {
      event.preventDefault();
      const src = window.prompt("enter the URL of the image:");
      // const caption = window.prompt("enter a caption for the image")
      if(!src) return
      ref.current.command(insertImage, src)
  }

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

   const onDropOrPaste = (event, editor, next) => {
    const target = editor.findEventRange(event)
    if (!target && event.type === 'drop') return next()

    const transfer = getEventTransfer(event)
    const { type, text, files } = transfer

    if (type === 'files') {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')
        if (mime !== 'image') continue

        reader.addEventListener('load', () => {
          editor.command(insertImage, reader.result, target)
        })

        reader.readAsDataURL(file)
      }
      return
    }

    if (type === 'text') {
      if (!isUrl(text)) return next()
      if (!isImage(text)) return next()
      editor.command(insertImage, text, target)
      return
    }

    next()
  }


  return (
    <div className={styles["overarching"]}>
      <FormatToolbar>
        {renderMarkButton("bold", `${styles["fas"]} ${styles["fa-bold"]} fas fa-bold`)}
        {renderMarkButton("italic", `${styles["fas"]} ${styles["fa-italic"]} fas fa-italic`)}
        {renderMarkButton("underlined", `${styles["fas"]} ${styles["fa-underline"]} fas fa-underline`)}
        {renderMarkButton("code", `${styles["fas"]} ${styles["fa-code"]} fas fa-code`)}
        {renderBlockButton("heading-one", `${styles["fas"]} ${styles["fa-h1"]} fas fa-heading`)}
        {renderBlockButton("heading-two", `${styles["fas"]} ${styles["fa-h2"]} fas fa-heading`)}
        {renderBlockButton("block-quote", `${styles["fas"]} ${styles["fa-quote-right"]} fas fa-quote-right`)}
        {renderBlockButton("numbered-list", `${styles["fas"]} ${styles["fa-list-ol"]} fas fa-list-ol`)}
        {renderBlockButton("bulleted-list", `${styles["fas"]} ${styles["fa-list-ul"]} fas fa-list-ul`)}
        {renderImageButton(`${styles["fas"]} ${styles["fa-image"]} fas fa-image`)}
        {renderSaveButton(`${styles["fas"]} ${styles["fa-save"]} fas fa-save`)}
 
      </FormatToolbar>
      <Editor
        ref={ref}
        className={styles["Editor"]}
        value={value}
        onChange={(opts) => setValue(opts.value)}
        onKeyDown={onKeyDown}
        renderMark={renderMark}
        renderBlock={renderBlock}
        onDrop={onDropOrPaste}
        schema={schema}
      />
    </div>
  );
  };



export default TextEditor;
