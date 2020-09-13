import React, { useState, useEffect, useRef } from "react";
import Home from "./pages/Home/Home.js";
import CreateArticle from "./pages/CreateArticle";
import Articles from "./pages/Articles/Articles"
import ArticlePage from "./pages/Articles/ArticlePage.js";
import Edit from "./pages/Articles/Edit"
import "./App.css";
import Card from "./components/Cards/Card.js";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.js";

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {

  const [fitLarge, setFitLarge] = useState(true);
  const [sideBarClicked, setSideBarClickedOrig] = useState(false);
  const [topOffset, setTopOffset] = useState(100);
  const [video, setVideo] = useState({
    src: "https://www.youtube.com/embed/jbG9LJs_Npg?rel=0&autoplay=1",
    isPlaying: false,
  });
  const [navbarClicked, setNavbarClickedOrig] = useState(false); 
  useEffect(() => {
      const updateDropDown = () =>{
          if(window.innerWidth > 1250 && navbarClicked){
              setNavbarClicked(window.innerWidth < 1250);
          } 
      }
      window.addEventListener("resize", updateDropDown);
      return () => {
          window.addEventListener("resize", updateDropDown);
      }
  },[navbarClicked])
  const [youtube, setYoutube] = useState({
    items : []
  });
  useEffect(() => {

    const getVideoIds = async () => {
      const response = await fetch("/youtube");
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };


    getVideoIds().then((res) => {
      const curVideos = res["items"].map((item) => {return {"id": item.id, "title": item.title, "date": item.date}});
      setYoutube({curVideos});
    });
    }, []);
  const setNavbarClicked = (toSet) =>  {
    if(toSet){
      
      setTopOffset(topOffset + 140);
      setSideBarClickedOrig(false)
    } else {
      if(topOffset!= 100){
        setTopOffset(topOffset - 140);
      }
      
    }
    setNavbarClickedOrig(toSet);
 
  }

  const setSideBarClicked = (toSet) => {
    
    if(toSet){
        if(navbarClicked){
          setNavbarClicked(false);
        }
    }else {
      clearAllBodyScrollLocks();
    }
    
    setSideBarClickedOrig(toSet);
  }

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

  const getInternalArticleLink = (id) => {
    return "articles/id=" + id;
  }

  const getHyperLink = (linkType) => {
    switch (linkType) {
      case Card.LinkType["video-youtube"]:
        return getEmbedPlayerLink;
      case Card.LinkType["article-internal"]:
        return getInternalArticleLink;
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
              exact
              path="/"
              render={() => {
                return (
                  <Home
                    fitLarge={fitLarge}
                    playVideo={playVideo}
                    getImageLink={getImageLink}
                    getHyperLink={getHyperLink}
                    sideBarClicked={sideBarClicked}
                    setSideBarClicked={setSideBarClicked}
                    navbarClicked={navbarClicked}
                    setNavbarClicked={setNavbarClicked}
                    topOffset={topOffset}
                    youtubeVideos={youtube}
                  />
                );
              }}
            />
            <Route
              exact
              path="/articles/:id/edit"
              render={() => {
                return (
                  <Edit
                    fitLarge={fitLarge}
                    playVideo={playVideo}
                    getImageLink={getImageLink}
                    getHyperLink={getHyperLink}
                    sideBarClicked={sideBarClicked}
                    setSideBarClicked={setSideBarClicked}
                    navbarClicked={navbarClicked}
                    setNavbarClicked={setNavbarClicked}
                    navbarClicked={navbarClicked}
                    setNavbarClicked={setNavbarClicked}
                    topOffset={topOffset}
                    youtubeVideos={youtube}
                    />
                );
              }}
            />
            <Route
              exact
              path="/articles/:id"
              render={() => {
                return (
                  <ArticlePage
                    fitLarge={fitLarge}
                    playVideo={playVideo}
                    getImageLink={getImageLink}
                    getHyperLink={getHyperLink}
                    sideBarClicked={sideBarClicked}
                    setSideBarClicked={setSideBarClicked}
                    navbarClicked={navbarClicked}
                    setNavbarClicked={setNavbarClicked}
                    navbarClicked={navbarClicked}
                    setNavbarClicked={setNavbarClicked}
                    topOffset={topOffset}
                    youtubeVideos={youtube}
                    />
                );
              }}
            />
            <Route
              exact
              path="/articles"
              render={() => {
                return (
                  <Articles
                    fitLarge={fitLarge}
                    playVideo={playVideo}
                    getImageLink={getImageLink}
                    getHyperLink={getHyperLink}
                    sideBarClicked={sideBarClicked}
                    setSideBarClicked={setSideBarClicked}
                    navbarClicked={navbarClicked}
                    setNavbarClicked={setNavbarClicked}
                    navbarClicked={navbarClicked}
                    setNavbarClicked={setNavbarClicked}
                    topOffset={topOffset}
                    youtubeVideos={youtube}
                    />
                );
              }}
            />
            <Route
              path="/create/articles"
              render={() => {
                return <CreateArticle/>}}
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
