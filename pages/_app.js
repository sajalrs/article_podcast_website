import React from "react";
import { Card } from "../components/Cards/Card.js";
import App from "next/app";
import AppGlobal from "../components/App/App";
import Router from "next/router";
import NProgress from "nprogress";
import "../styles/loadingscreenspinner.css";
import { AudioPlayerContextProvider } from "../contexts/reducers/audioPlayerContext";
import { DeviceContextProvider } from "../contexts/reducers/deviceContext";
import { HeaderContextProvider } from "../contexts/reducers/headerContext";
import { LoginContextProvider } from "../contexts/reducers/loginContext";
import { VideoPlayerContextProvider } from "../contexts/reducers/videoPlayerContext";
import { SocketContextProvider } from "../contexts/reducers/socketContext";
import { ApolloProvider } from "@apollo/client";
import {
  useApollo,
  initializeApollo,
  addApolloState,
} from "../lib/apolloClient";
import { ALL_PODCASTS_QUERY } from "../components/AudioPlayer/AudioPlayer";
NProgress.configure({ showSpinner: true });

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <AudioPlayerContextProvider>
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
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async (ctx) => {
  const apolloClient = initializeApollo();

  const appProps = await App.getInitialProps(ctx);

  appProps.pageProps.loginInitialState = {
    isLoggedIn: false,
    user: null,
  };

  let curVideos = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/youtube`);
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
  } catch (error) {
    console.log(error.message);
  }

  appProps.pageProps.videoPlayerInitialState = {
    selected:
      "https://www.youtube.com/embed/vpWIvnnWxaY?rel=0&start=0&autoplay=1",
    isPlaying: false,
    youtubeVideos: curVideos,
  };

  await apolloClient.query({
    query: ALL_PODCASTS_QUERY,
  });

  return addApolloState(apolloClient, { ...appProps });
};

export default MyApp;
