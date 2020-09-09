import React, { useCallback, useMemo, useState, forwardRef, Ref, PropsWithChildren } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor, Node } from "slate";
import { withHistory } from "slate-history";
import isUrl from "is-url";
import imageExtensions from "image-extensions";
import { cx, css } from 'emotion'

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const TextEditor = () => {
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <div>
        <MarkButton format="bold" />
        <MarkButton format="italic" />
        <MarkButton format="underline" />
        <MarkButton format="code" />
        <BlockButton format="heading-one" />
        <BlockButton format="heading-two" />
        <BlockButton format="block-quote" />
        <BlockButton format="numbered-list" />
        <BlockButton format="bulleted-list" />
        <BlockButton format="image" />
      </div>

      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};


const withImages = editor => {
    const { insertData, isVoid } = editor
  
    editor.isVoid = element => {
      return element.type === 'image' ? true : isVoid(element)
    }
  
    editor.insertData = data => {
      const text = data.getData('text/plain')
      const { files } = data
  
      if (files && files.length > 0) {
        for (const file of files) {
          const reader = new FileReader()
          const [mime] = file.type.split('/')
  
          if (mime === 'image') {
            reader.addEventListener('load', () => {
              const url = reader.result
              insertImage(editor, url)
            })
  
            reader.readAsDataURL(file)
          }
        }
      } else if (isImageUrl(text)) {
        insertImage(editor, text)
      } else {
        insertData(data)
      }
    }
  
    return editor
  }

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);
  const isImage = format === "image";
  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : !isImage? format : "",
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });
  
    return !!match;
  
 
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
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
    case "image":
      return (
        <div {...attributes}>
          <div contentEditable={false}>
            <img
              src={element.url}
            />
          </div>
          {children}
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format }) => {
  const editor = useSlate();
  if (format === "image") {
    return (<button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the image:')
        if(!url) return 
        toggleBlock(editor, format);
        insertImage(editor, url);
      }}
    >
      {format}
    </button>);
  } else {
    return (
      <button
        active={isBlockActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
      >
        {format}
      </button>
    );
  }
};

const MarkButton = ({ format }) => {
  const editor = useSlate();
  return (
    <button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {format}
    </button>
  );
};

const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};


const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text:
          ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }],
  },
  {
    type: 'image',
    url: 'https://source.unsplash.com/kFrdX5IeQzI',
    children: [{ text: '' }],
  },
];

const Button = React.forwardRef(
    (
      {
        className,
        active,
        reversed,
        ...props
      },
      ref) => (
      <span
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
            cursor: pointer;
            color: ${reversed
              ? active
                ? 'white'
                : '#aaa'
              : active
              ? 'black'
              : '#ccc'};
          `
        )}
      />
    )
  )

  const Icon = React.forwardRef(
    (
      { className, ...props },
      ref
    ) => (
      <span
        {...props}
        ref={ref}
        className={cx(
          'material-icons',
          className,
          css`
            font-size: 18px;
            vertical-align: text-bottom;
          `
        )}
      />
    )
  )

  const Toolbar = React.forwardRef(
    (
      { className, ...props },
      ref
    ) => (
      <Menu
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
            position: relative;
            padding: 1px 18px 17px;
            margin: 0 -20px;
            border-bottom: 2px solid #eee;
            margin-bottom: 20px;
          `
        )}
      />
    )
  )

  const Menu = React.forwardRef(
    (
      { className, ...props },
      ref
    ) => (
      <div
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
            & > * {
              display: inline-block;
            }
            & > * + * {
              margin-left: 15px;
            }
          `
        )}
      />
    )
  )
export default TextEditor;
