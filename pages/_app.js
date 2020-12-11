import React from "react";
import { Card } from "../components/Cards/Card.js";
import App from "next/app";
import axios from "axios";
import AppGlobal from "../components/App/App";
import { AudioPlayerContextProvider } from "../contexts/reducers/audioPlayerContext";
import { DeviceContextProvider } from "../contexts/reducers/deviceContext";
import { HeaderContextProvider } from "../contexts/reducers/headerContext";
import { LoginContextProvider } from "../contexts/reducers/loginContext";
import { VideoPlayerContextProvider } from "../contexts/reducers/videoPlayerContext";
import { SocketContextProvider } from "../contexts/reducers/socketContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AudioPlayerContextProvider
      initialState={pageProps.audioPlayerInitialState}
    >
      <DeviceContextProvider>
        <HeaderContextProvider>
          <LoginContextProvider initialState={pageProps.loginInitialState}>
            <VideoPlayerContextProvider
              initialState={pageProps.videoPlayerInitialState}
            >
              <SocketContextProvider>
                <AppGlobal>
                  <Component {...pageProps} />
                </AppGlobal>
              </SocketContextProvider>
            </VideoPlayerContextProvider>
          </LoginContextProvider>
        </HeaderContextProvider>
      </DeviceContextProvider>
    </AudioPlayerContextProvider>
  );
};

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);

  appProps.pageProps.loginInitialState = {
    isLoggedIn: false,
    user: null,
  };

  let podcasts = [
    {
      title: "False Nine Podcast #17 Champions League RO16 first leg review",
      by: "Ishan Sharma, Susajjan Dhungana and Ojash Dangal",
      link:
        "https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a",
      date: "Sat, 12 Sep 2020 08:42:34 GMT",
      image:
        "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/8497059/8497059-1599895849523-cbb8b2f53d641.jpg",
      description:
        "In this episode, Ishan, Ojash and Susajjan review the first leg ties of the Champions league Round of 16 first leg.\n\n",
    },
  ];

  try {
    const res = await fetch("http://localhost:3000/api/podcasts");
    const json = await res.json();
    podcasts = json["items"].map((item, index) => {
      return {
        index: index,
        ...item,
        contentType: Card.ContentType["audio-internal"],
      };
    });
  } catch (error){
    console.log(error.message);
  }

  appProps.pageProps.audioPlayerInitialState = {
    selected: 0,
    isPlaying: false,
    currentTime: 0,
    podcasts: podcasts,
    audioPlayerRef: null,
  };

  let curVideos = [];

  try {
    const res = await fetch("http://localhost:3000/api/youtube");
    const json = await res.json();
    curVideos = json["items"].map((item, index) => {
      return {
        index: index,
        id: item.id,
        title: item.title,
        image: `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
        link: `https://www.youtube.com/embed/${item.id}?rel=0&start=0&autoplay=1`,
        date: item.date,
        contentType: Card.ContentType["video-youtube"],
      };
    });
  } catch(error) {
    console.log(error.message);
  }

  appProps.pageProps.videoPlayerInitialState = {
    selected:
      "https://www.youtube.com/embed/vpWIvnnWxaY?rel=0&start=0&autoplay=1",
    isPlaying: false,
    youtubeVideos: curVideos,
  };

  return { ...appProps };
};

export default MyApp;
