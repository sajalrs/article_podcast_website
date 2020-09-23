import React, { useState, useEffect, useRef } from "react";
import LargeCard from "../../components/Cards/LargeCard/LargeCard.js";
import SidePanel from "../../components/SidePanel/SidePanel.js";
import Card from "../../components/Cards/Card.js";
import styles from "./Edit.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useHistory, useParams } from "react-router-dom";
import TextEditor from "../../components/TextEditor/TextEditor";
import { Value } from "slate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useSelector} from "react-redux"
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

const Edit = (props) => {
  const sidebarFixed = useSelector(state => state.sidebar.fixed);
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
  const { id } = useParams();
  const history = useHistory();
  const [toolbarFixed, setToolbarFix] = useState(false);
  const headerBoxRef = useRef();
  const headlineFormRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    const fixToolbar = (e) => {
      if (
        window.scrollY >
        headerBoxRef.current.clientHeight +
          headlineFormRef.current.clientHeight -
          66 +
          644
      ) {
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
    console.log(id);
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
      console.log("Running Effect");
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

  const saveArticle = async () => {
    const editedArticle = { ...article, content: textEditorValue.toJSON() };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedArticle),
    };

    const response = await fetch(`/articles/edit`, requestOptions);
    const data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    alert("Article saved");
  };

  const getLinkFunction = (linkType) => {
    switch (linkType) {
      case Card.LinkType["video-youtube"]:
        return props.playVideo;
      case Card.LinkType["article-internal"]:
        return (articleLink) => {
          history.push(articleLink);
        };
      default:
        break;
    }
  };

  const renderOnceSidePanel = (
    <SidePanel
      youtubeVideos={props.youtubeVideos}
      getImageLink={props.getImageLink}
      playVideo={props.playVideo}
      getHyperLink={props.getHyperLink}
      headerBoxRef={headerBoxRef}
      sidebarFixTopOffset={35 + 644}
    />
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // if(!(article.title === formData.title && article.image === formData.image && article.author === formData.author)){
    setArticle({
      ...article,
      title: formData.title,
      author: formData.author,
      date: formData.date,
      image: formData.image,
    });
    console.log(article);
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

  return (
    <div className={styles["overarching"]}>
      <div className={styles["primary-color-background"]}></div>
      <div className={styles["Edit"]}>
        <Header
          ref={headerBoxRef}
        />
        <div className={styles["headline"]}>
          <LargeCard
            title={article.title}
            author={article.author}
            date={article.date}
            image={article.image}
            onClick={() => {}}
          />
        </div>
        <div className={styles["content-pane"]}>
          <div className={styles["main-pane"]}>
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
            />
          </div>

          <div className={styles["side-pane"]}></div>
          {sidebarFixed ? (
            <div
              style={{ position: "fixed", top: props.topOffset, right: "0px",zIndex: 1  }}
            >
              {/* <div style={{ position: "fixed", top: "103.5px", right: "0px"}}> */}
              {renderOnceSidePanel}
            </div>
          ) : (
            <div style={{ marginTop: props.topOffset }}>
              {renderOnceSidePanel}
            </div>
          )}
        </div>

        <div className={styles["footer-container"]}>
          <Footer
             selectedTrack={props.selectedTrack}
             setSelectedTrack={props.setSelectedTrack}
             player={props.player}
               setPlayer={props.setPlayer}
               forwardPodcasts={props.forwardPodcasts}
               rewindPodcasts={props.rewindPodcasts}
               currentTime={props.currentTime}
               setCurrentTime={props.setCurrentTime}
               audioRef={props.audioRef}
               audioPlayerFixed={props.audioPlayerFixed}
               setAudioPlayerFixed={props.setAudioPlayerFixed}
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
