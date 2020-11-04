import React, { useState, useEffect, useRef } from "react";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import Page from "../../components/Page/Page";
import styles from "../../components/Page/Page.module.css";
import { useParams } from "react-router-dom";
import TextEditor from "../../components/TextEditor/TextEditor";
import { Value } from "slate";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
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
                text: "Edit text and save to submit for moderator approval...",
              },
            ],
          },
        ],
      },
    ],
  },
};

const Edit = (props) => {
  const [textEditorValue, setTextEditorValue] = useState(
    Value.fromJSON(initialValue)
  );

  const [formData, setFormData] = useState({
    title: "To be edited",
    author: "To be edited",
    date: new Date(),
    image:
      "data:image/png;base64,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",
  });
  const [article, setArticle] = useState({
    id: {},
    title: "",
    author: "",
    date: new Date(),
    image: "",
  });
  const headerBoxRef = useSelector((state) => state.header.headerBoxRef);
  const { id } = useParams();
  const [toolbarFixed, setToolbarFix] = useState(false);
  const headlineFormRef = useRef();
  useEffect(() => {
    const getArticle = async () => {
      const response = await fetch("/articles?" + id);
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };

    getArticle().then((res) => {
      setArticle({
        id: res._id,
        title: res.title,
        author: res.author,
        date: res.date,
        image: res.image,
      });

      if (res.content) setTextEditorValue(Value.fromJSON(res.content));
    });
  }, []);
  useEffect(() => {
    const height = headerBoxRef && headerBoxRef.current ? headerBoxRef.current.clientHeight : 380;
    const fixToolbar = (e) => {
      if (window.scrollY > 2 * height - 66 + 644) {
        setToolbarFix(true);
      } else {
        setToolbarFix(false);
      }
    };

    window.addEventListener("scroll", fixToolbar);
    return () => {
      window.removeEventListener("scroll", fixToolbar);
    };
  }, [toolbarFixed]);

  useEffect(() => {
    setFormData({
      title: article.title,
      author: article.author,
      date: new Date(article.date),
      image: article.image,
    });
  }, [
    article.title,
    article.author,
    article.author,
    article.date,
    article.image,
  ]);

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.keyCode === 83 && e.ctrlKey) {
        e.preventDefault();
        saveArticle();
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [article, textEditorValue]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const saveArticle = () => {
    const editedArticle = { ...article, content: textEditorValue.toJSON() };
    const options = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post("/articles/edit", JSON.stringify(editedArticle), options)
      .then((res) => {
        alert("Article submitted for moderator approval");
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 400) {
          alert(err.response.data.error);
        } else if (err.response.status !== 200) {
          throw Error(err);
        }
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setArticle({
      ...article,
      title: formData.title,
      author: formData.author,
      date: formData.date,
      image: formData.image,
    });
    // console.log(article);
    // }
  };

  const onTitleChange = (event) => {
    setFormData({
      ...formData,
      title: event.target.value,
    });
  };

  const onAuthorChange = (event) => {
    setFormData({
      ...formData,
      author: event.target.value,
    });
  };

  const onDateChange = (newDate) => {
    setFormData({
      ...formData,
      date: newDate,
    });
  };

  const onImageChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.value,
    });
  };

  const headline = (
    <div className={styles["headline"]}>
      <LargeCard
        title={article.title}
        author={article.author}
        date={article.date}
        image={article.image}
        onClick={() => {}}
      />
    </div>
  );

  const contents = (
    <div>
      <form
        ref={headlineFormRef}
        onSubmit={handleSubmit}
        className={styles["headline-form"]}
      >
        <div className={styles["horizontal"]}>
          <label>Title: </label>
          <input
            className={styles["headline-form-input"]}
            type="text"
            value={formData.title}
            onChange={onTitleChange}
          />
        </div>
        <div className={styles["horizontal-same-line"]}>
          <div className={styles["horizontal"]}>
            <label>Author: </label>
            <input
              className={`${styles["headline-form-input"]}`}
              type="text"
              value={formData.author}
              onChange={onAuthorChange}
            />
          </div>
          <div className={styles["horizontal"]}>
            <label>Date: </label>
            <DatePicker
              className={`${styles["DatePicker"]}`}
              selected={formData.date}
              onChange={onDateChange}
            />
          </div>
        </div>
        <div className={styles["horizontal"]}>
          <label>Image: </label>
          <input
            className={styles["headline-form-input"]}
            type="text"
            value={formData.image}
            onChange={onImageChange}
          />
        </div>
        <input
          type="submit"
          value="Change Card"
          className={styles["submit-button"]}
        />
      </form>
      <TextEditor
        value={textEditorValue}
        setValue={setTextEditorValue}
        onSave={saveArticle}
        toolbarFixed={toolbarFixed}
        styles={styles}
      />
    </div>
  );

  return (
    <Page sidebarFixTopOffset={0} headline={headline} mainPane={contents} />
  );
};

export default Edit;
