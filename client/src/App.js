import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import Home from "./pages/Home/Home.js";
import CreateArticle from "./pages/CreateArticle";
import Articles from "./pages/Articles/Articles";
import Podcasts from "./pages/Podcasts/Podcasts";
import ArticlePage from "./pages/Articles/ArticlePage.js";
import Edit from "./pages/Articles/Edit";
import "./App.css";
import Card from "./components/Cards/Card.js";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.js";
import TermsOfService from "./pages/Legal/TermsOfService/TermsOfService"
import Privacy from "./pages/Legal/Privacy/Privacy"
import AboutUs from "./pages/AboutUs/AboutUs"
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
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
  const [audioPlayerFixed, setAudioPlayerFixed] = useState(false);
  const [player, setPlayer] = useState("paused");
  const [youtube, setYoutube] = useState({
    items: [],
  });
  const [podcasts, setPodcasts] = useState({
    items: [
      {
        title: "False Nine Podcast #17 Champions League RO16 first leg review",
        by: "Ishan Sharma, Susajjan Dhungana and Ojash Dangal",
        link:
          "https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a",
        date: "Sat, 12 Sep 2020 08:42:34 GMT",
        image: "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/8497059/8497059-1599895849523-cbb8b2f53d641.jpg"
      },
    ],
    currentlyPlaying: 0,
  });
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef();




  useEffect(() => {
    const getVideoIds = async () => {
      const response = await fetch("/youtube");
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };

    getVideoIds().then((res) => {
      const curVideos = res["items"].map((item) => {
        return { id: item.id, title: item.title, date: item.date };
      });
      setYoutube({ curVideos });
    });
  }, []);

  useEffect(() => {
    const getPodcasts = async () => {
      const response = await fetch("/podcasts");
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };

    getPodcasts().then((res) => {
      setPodcasts({ items: res["items"], currentlyPlaying: 0 });
    });

  }, []);

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



  const setNavbarClicked = (toSet) => {
    if (toSet) {
      setTopOffset(topOffset + 140);
      setSideBarClickedOrig(false);
    } else {
      if (topOffset != 100) {
        setTopOffset(topOffset - 140);
      }
    }
    setNavbarClickedOrig(toSet);
  };
  const scrollLockRef = useRef();

  const setSideBarClicked = (toSet) => {
    if (toSet) {
      if (navbarClicked) {
        setNavbarClicked(false);
      }
    } else {
      clearAllBodyScrollLocks();
    }

    setSideBarClickedOrig(toSet);
  };


  const playVideo = (videoSrc) => {
    setVideo({ ...video, src: videoSrc, isPlaying: true });
    disableBodyScroll(scrollLockRef.current);
    setPlayer("paused");
  };
  const closeVideo = () => {
    setVideo({ ...video, isPlaying: false });
    enableBodyScroll(scrollLockRef.current);
  };

  const playAudio = (podcastIndex) => {
     setPodcasts({ ...podcasts, currentlyPlaying: podcastIndex });
  }

  const rewindPodcasts = () => {
    setCurrentTime(0);
    if (podcasts.currentlyPlaying === podcasts.items.length - 1) {
      setPodcasts({ ...podcasts, currentlyPlaying: 0 });
    } else {
      setPodcasts({
        ...podcasts,
        currentlyPlaying: podcasts.currentlyPlaying + 1,
      });
    }
  };

  const forwardPodcasts = () => {
    setCurrentTime(0);
    if (podcasts.currentlyPlaying === 0) {
      setPodcasts({ ...podcasts, currentlyPlaying: podcasts.items.length - 1 });
    } else {
      setPodcasts({
        ...podcasts,
        currentlyPlaying: podcasts.currentlyPlaying - 1,
      });
    }
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
  };

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
      <audio ref={audioRef} src="https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a" type="audio/mpeg"/>
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
                    topOffset={topOffset}
                    youtubeVideos={youtube}
                    selectedTrack={podcasts}
                    setSelectedTrack={setPodcasts}
                    player={player}
                    setPlayer={setPlayer}
                    forwardPodcasts={forwardPodcasts}
                    rewindPodcasts={rewindPodcasts}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    audioPlayerFixed={audioPlayerFixed}
                    setAudioPlayerFixed={setAudioPlayerFixed}
                    audioRef={audioRef}
                    playAudio={playAudio}
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
                    topOffset={topOffset}
                    youtubeVideos={youtube}
                    selectedTrack={podcasts}
                    setSelectedTrack={setPodcasts}
                    player={player}
                    setPlayer={setPlayer}
                    forwardPodcasts={forwardPodcasts}
                    rewindPodcasts={rewindPodcasts}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    audioPlayerFixed={audioPlayerFixed}
                    setAudioPlayerFixed={setAudioPlayerFixed}
                    audioRef={audioRef}
                    playAudio={playAudio}
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
                    topOffset={topOffset}
                    youtubeVideos={youtube}
                    selectedTrack={podcasts}
                    setSelectedTrack={setPodcasts}
                    player={player}
                    setPlayer={setPlayer}
                    forwardPodcasts={forwardPodcasts}
                    rewindPodcasts={rewindPodcasts}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    audioPlayerFixed={audioPlayerFixed}
                    setAudioPlayerFixed={setAudioPlayerFixed}
                    audioRef={audioRef}
                    playAudio={playAudio}
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
                    topOffset={topOffset}
                    youtubeVideos={youtube}
                    selectedTrack={podcasts}
                    setSelectedTrack={setPodcasts}
                    player={player}
                    setPlayer={setPlayer}
                    forwardPodcasts={forwardPodcasts}
                    rewindPodcasts={rewindPodcasts}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    audioPlayerFixed={audioPlayerFixed}
                    setAudioPlayerFixed={setAudioPlayerFixed}
                    audioRef={audioRef}
                    playAudio={playAudio}
                  />
                );
              }}
            />
             <Route
              exact
              path="/podcasts"
              render={() => {
                return (
                  <Podcasts
                    fitLarge={fitLarge}
                    playVideo={playVideo}
                    getImageLink={getImageLink}
                    getHyperLink={getHyperLink}
                    topOffset={topOffset}
                    youtubeVideos={youtube}
                    selectedTrack={podcasts}
                    setSelectedTrack={setPodcasts}
                    player={player}
                    setPlayer={setPlayer}
                    forwardPodcasts={forwardPodcasts}
                    rewindPodcasts={rewindPodcasts}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    audioPlayerFixed={audioPlayerFixed}
                    setAudioPlayerFixed={setAudioPlayerFixed}
                    audioRef={audioRef}
                    playAudio={playAudio}
                  />
                );
              }}
            />
                    <Route
              exact
              path="/legal/privacy"
              render={() => {
                return (
                  <Privacy
                    fitLarge={fitLarge}
                    playVideo={playVideo}
                    getImageLink={getImageLink}
                    getHyperLink={getHyperLink}
                    topOffset={topOffset}
                    youtubeVideos={youtube}
                    selectedTrack={podcasts}
                    setSelectedTrack={setPodcasts}
                    player={player}
                    setPlayer={setPlayer}
                    forwardPodcasts={forwardPodcasts}
                    rewindPodcasts={rewindPodcasts}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    audioPlayerFixed={audioPlayerFixed}
                    setAudioPlayerFixed={setAudioPlayerFixed}
                    audioRef={audioRef}
                    playAudio={playAudio}
                  />
                );
              }}
            />
              <Route
              exact
              path="/legal/termsofservice"
              render={() => {
                return (
                  <TermsOfService
                    fitLarge={fitLarge}
                    playVideo={playVideo}
                    getImageLink={getImageLink}
                    getHyperLink={getHyperLink}
                    topOffset={topOffset}
                    youtubeVideos={youtube}
                    selectedTrack={podcasts}
                    setSelectedTrack={setPodcasts}
                    player={player}
                    setPlayer={setPlayer}
                    forwardPodcasts={forwardPodcasts}
                    rewindPodcasts={rewindPodcasts}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    audioPlayerFixed={audioPlayerFixed}
                    setAudioPlayerFixed={setAudioPlayerFixed}
                    audioRef={audioRef}
                    playAudio={playAudio}
                  />
                );
              }}
            />
                  <Route
              exact
              path="/about"
              render={() => {
                return (
                  <AboutUs
                    fitLarge={fitLarge}
                    playVideo={playVideo}
                    getImageLink={getImageLink}
                    getHyperLink={getHyperLink}
                    topOffset={topOffset}
                    youtubeVideos={youtube}
                    selectedTrack={podcasts}
                    setSelectedTrack={setPodcasts}
                    player={player}
                    setPlayer={setPlayer}
                    forwardPodcasts={forwardPodcasts}
                    rewindPodcasts={rewindPodcasts}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    audioPlayerFixed={audioPlayerFixed}
                    setAudioPlayerFixed={setAudioPlayerFixed}
                    audioRef={audioRef}
                    playAudio={playAudio}
                  />
                );
              }}
            />
            <Route
              path="/create/articles"
              render={() => {
                return <CreateArticle />;
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
