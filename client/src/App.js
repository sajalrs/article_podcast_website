import React, { useState, useEffect, useRef } from "react";
import Home from "./pages/Home/Home.js";
import ArticlePage from "./pages/Articles/ArticlePage.js";
import "./App.css";
import Card from "./components/Cards/Card.js";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.js";

import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  const [fitLarge, setFitLarge] = useState(true);
  const [sideBarClicked, setSideBarClicked] = useState(false);
  const [video, setVideo] = useState({
    src: "https://www.youtube.com/embed/jbG9LJs_Npg?rel=0&autoplay=1",
    isPlaying: false,
  });

  useEffect(() => {
    const updateWindowType = () => {
      setFitLarge(window.innerWidth >= 940);
    };
    window.addEventListener("resize", updateWindowType);
    return () => {
      window.removeEventListener("resize", updateWindowType);
      // clearAllBodyScrollLocks();
    };
  });
  const scrollLockRef = useRef();

  const playVideo = (videoSrc) => {
    setVideo({ ...video, src: videoSrc, isPlaying: true });
    disableBodyScroll(scrollLockRef.current);
  };
  const closeVideo = () => {
    setVideo({ ...video, isPlaying: false });
    enableBodyScroll(scrollLockRef.current);
  };

  const getImageLink = (id) => {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  };

  const getEmbedPlayerLink = (id, start) => {
    return `https://www.youtube.com/embed/${id}?rel=0&start=${
      start ? start : 0
    }&autoplay=1`;
  };

  const getLinkFunction = (linkType) => {
    switch (linkType) {
      case Card.LinkType["video-youtube"]:
        return playVideo;
      default:
        break;
    }
  };

  return (
    <div className="overarching">
      <div ref={scrollLockRef}></div>
      {video.isPlaying && (
        <VideoPlayer closeVideo={closeVideo} src={video.src} />
      )}
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <Home
                    fitLarge={fitLarge}
                    playVideo={playVideo}
                    getImageLink={getImageLink}
                    getEmbedPlayerLink={getEmbedPlayerLink}
                    getLinkFunction={getLinkFunction}
                    sideBarClicked={sideBarClicked}
                    setSideBarClicked={setSideBarClicked}
                  />
                );
              }}
            />
            <Route
              path="/articles"
              exact
              render={() => {
                return (
                  <ArticlePage
                    fitLarge={fitLarge}
                    playVideo={playVideo}
                    getImageLink={getImageLink}
                    getEmbedPlayerLink={getEmbedPlayerLink}
                    getLinkFunction={getLinkFunction}
                    sideBarClicked={sideBarClicked}
                    setSideBarClicked={setSideBarClicked}
                  />
                );
              }}
            />
            <Route
              path="/"
              render={() => {
                return <div>404</div>;
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
