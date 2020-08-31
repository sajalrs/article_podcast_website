import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import MediumCard from "./components/Cards/MediumCard/MediumCard.js";
import LargeCard from "./components/Cards/LargeCard/LargeCard.js";
import SidePanel from "./components/SidePanel/SidePanel.js";
import Card from "./components/Cards/Card.js";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.js"
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
 

const App = () => {
  const [fitLarge, setFitLarge] = useState(true);
  const [video, setVideo] = useState({
    src: "https://www.youtube.com/embed/jbG9LJs_Npg?rel=0&autoplay=1",
    isPlaying: false,
  });

  useEffect(() => {
    const updateWindowType = () => {
      setFitLarge(window.innerWidth >= 960);
    };
    window.addEventListener("resize", updateWindowType);
    return () => {
      window.removeEventListener("resize", updateWindowType);
    };
  });
  let targetElement = useRef(document.getElementById("scrollable-empty"));


  const playVideo = (videoSrc) => {setVideo({...video, src: videoSrc, isPlaying: true}); disableBodyScroll(targetElement)};
  const closeVideo = () => {setVideo({...video, isPlaying: false});enableBodyScroll(targetElement)};

  const getImageLink = (id) => {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  };

  const getEmbedPlayerLink = (id, start) => {
    return `https://www.youtube.com/embed/${id}?rel=0&start=${start? start : 0}&autoplay=1`;
  };


  return (
    

    <div className="overarching">
      <div id="scrollable-empty"></div>
      {video.isPlaying && (
        <VideoPlayer closeVideo={closeVideo} src={video.src}/>
      )}
      <div className="App">
        <header>
          <div className="App-header">
            <h1 id="header-title">THE FALSE 9</h1>
          </div>
          <Navbar />
        </header>
        <div className="content-pane">
          <div className="main-pane">
            {fitLarge ? (
              <div className="main-pane-item l">
                <LargeCard
                  image="https://cdn.vox-cdn.com/thumbor/Iqe-7rOwNq_9R1DTTI1IBV9U-b4=/0x152:3840x2312/850x479/filters:format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67302945/Halo_App_and_Halo_Band.0.jpg"
                  date="March 15, 2020"
                  title="Youtubers Partying During Pandemic"
                  text="Breaking down every fantasy-relevant situation to prepare you for your 2020 draft."
                  author="Ishan Sharma"
                  LinkType={Card.LinkType["video-external"]}
                />
              </div>
            ) : (
              <div className="main-pane-item m">
                <MediumCard
                  image="https://cdn.vox-cdn.com/thumbor/Iqe-7rOwNq_9R1DTTI1IBV9U-b4=/0x152:3840x2312/850x479/filters:format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67302945/Halo_App_and_Halo_Band.0.jpg"
                  date="March 15, 2020"
                  title="Youtubers Partying During Pandemic"
                  text="Breaking down every fantasy-relevant situation to prepare you for your 2020 draft."
                  author="Ishan Sharma"
                  LinkType={Card.LinkType["video-external"]}
                />
              </div>
            )}
            <div className="main-pane-item m">
              <MediumCard
                image="https://cdn.vox-cdn.com/thumbor/gl6Ss1kHw9REtww2xEZPEYeD-f4=/0x106:880x601/280x158/filters:format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67298922/Screen_Shot_2020_08_26_at_2.27.31_PM.0.png"
                date="March 15, 2020"
                title="Youtubers Partying During Pandemic"
                text="Breaking down every fantasy-relevant situation to prepare you for your 2020 draft."
                author="Ishan Sharma"
                LinkType={Card.LinkType["article-external"]}
              />
            </div>

            <div className="main-pane-item m">
              <MediumCard
                image="https://cdn.vox-cdn.com/thumbor/gl6Ss1kHw9REtww2xEZPEYeD-f4=/0x106:880x601/280x158/filters:format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67298922/Screen_Shot_2020_08_26_at_2.27.31_PM.0.png"
                date="March 15, 2020"
                title="Youtubers Partying During Pandemic"
                text="Breaking down every fantasy-relevant situation to prepare you for your 2020 draft."
                author="Ishan Sharma"
                LinkType={Card.LinkType["article-external"]}
              />
            </div>
            <div className="main-pane-item m">
              <MediumCard
                image="https://cdn.vox-cdn.com/thumbor/gl6Ss1kHw9REtww2xEZPEYeD-f4=/0x106:880x601/280x158/filters:format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67298922/Screen_Shot_2020_08_26_at_2.27.31_PM.0.png"
                date="March 15, 2020"
                title="Youtubers Partying During Pandemic"
                text="Breaking down every fantasy-relevant situation to prepare you for your 2020 draft."
                author="Ishan Sharma"
                isVideo={true}
                LinkType={Card.LinkType["video-youtube"]}
              />
            </div>
          </div>
          <div className="side-pane">
            <SidePanel
              vidArray={[
                {
                  title: "Podcast 1",
                  image: getImageLink("jbG9LJs_Npg"),
                  LinkType: Card.LinkType["video-youtube"],
                  playVideo: playVideo,
                  link: getEmbedPlayerLink("jbG9LJs_Npg")
                },
                {
                  title: "Podcast 2",
                  image: getImageLink("g-4UdaC2-F8"),
                  LinkType: Card.LinkType["video-youtube"],
                  playVideo: playVideo,
                  link: getEmbedPlayerLink("g-4UdaC2-F8")
                },
                
              ]}
            />
          </div>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
