import React from "react";
import { Card } from "../components/Cards/Card.js";
import App from "next/app";
import axios from "axios";
import AppGlobal from "../components/App/App";
import { AudioPlayerContextProvider } from "../../contexts/reducers/audioPlayerContext";
import { BlogContextProvider } from "../../contexts/reducers/blogContext";
import { DeviceContextProvider } from "../../contexts/reducers/deviceContext";
import { HeaderContextProvider } from "../../contexts/reducers/headerContext";
import { LoginContextProvider } from "../../contexts/reducers/loginContext";
import { VideoPlayerContextProvider } from "../../contexts/reducers/headerContext";

const MyApp = ({ Component, pageProps }) => {
  const {
    audioPlayerInitialState,
    blogInitialState,
    loginInitialState,
    videoPlayerInitialState,
  } = pageProps;
  return (
    <AudioPlayerContextProvider initialState={audioPlayerInitialState}>
      <BlogContextProvider initialState={blogInitialState}>
        <DeviceContextProvider>
          <HeaderContextProvider>
            <LoginContextProvider initialState={loginInitialState}>
              <VideoPlayerContextProvider
                initialState={videoPlayerInitialState}
              >
                <AppGlobal>
                  <Component {...pageProps} />
                </AppGlobal>
              </VideoPlayerContextProvider>
            </LoginContextProvider>
          </HeaderContextProvider>
        </DeviceContextProvider>
      </BlogContextProvider>
    </AudioPlayerContextProvider>
  );
};

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);

  let user;
  try {
    await axios.get("/api/auth/isloggedin").then((response, err) => {
      user = response.data.user;
    });
  } catch {
    user = null;
  }

  appProps.pageProps.loginInitialState = {
    isLoggedIn: user != null,
    user: user,
  };

  let articles = [];

  axios
    .get("/api/articles/pages")
    .then((response) => {
      articles = response.data["links"].map((item, index) => {
        return {
          index: index,
          ...item,
          contentType: Card.ContentType["article-internal"],
          link: `/article?id=${item["_id"]}`,
        };
      });
    })
    .catch((error) => {
      console.log(error.message);
    });

  appProps.pageProps.blogInitialState = {
    articles: articles,
  };

  let podcasts = [];

  await axios
    .get("/api/podcasts")
    .then((response) => {
      podcasts = response.data["items"].map((item, index) => {
        return {
          index: index,
          ...item,
          contentType: Card.ContentType["audio-internal"],
        };
      });
    })
    .catch((error) => {
      console.log(error.message);
    });

  appProps.pageProps.audioPlayerInitialState = {
    selected: 0,
    isPlaying: false,
    currentTime: 0,
    podcasts: podcasts,
    audioPlayerRef: null,
  };

  const curVideos = [];
  await axios
    .get("/api/youtube")
    .then((response) => {
      curVideos = response.data["items"].map((item, index) => {
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
    })
    .catch((error) => {
      console.log(error.message);
    });

  appProps.pageProps.videoPlayerInitialState = {
    selected:
      "https://www.youtube.com/embed/vpWIvnnWxaY?rel=0&start=0&autoplay=1",
    isPlaying: false,
    youtubeVideos: curVideos,
  };

  return { ...appProps };
};

export default MyApp;
