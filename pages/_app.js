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
import { ApolloProvider, gql } from "@apollo/client";
import {
  useApollo,
  initializeApollo,
  addApolloState,
} from "../lib/apolloClient";
import { ALL_PODCASTS_QUERY } from "../components/AudioPlayer/AudioPlayer";

export const ALL_YOUTUBE_LINKS_QUERY = gql`
  query allYoutubeLinksQuery {
    youtubeLinks {
      _id
      title
      id
      date
    }
  }
`;

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
              <VideoPlayerContextProvider>
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


  await apolloClient.query({
    query: ALL_PODCASTS_QUERY,
  });

  await apolloClient.query({
    query: ALL_YOUTUBE_LINKS_QUERY,
  });

  return addApolloState(apolloClient, { ...appProps });
};

export default MyApp;
