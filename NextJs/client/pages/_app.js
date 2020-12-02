import React from "react";
import { Card } from "../components/Cards/Card.js";
import App from "next/app";
import { wrapper } from "../redux/store";
import axios from "axios";
import {
  setAudioPlayerPodcasts,
  setVideoPlayerYoutubeVideos,
  setBlogArticles,
  setIsLoggedIn,
  setUser,
} from "../redux/actions";
import AppGlobal from "../components/App/App";
import { AudioPlayerContextProvider } from "../../contexts/audioPlayerContext";
import { DeviceContextProvider } from "../../contexts/DeviceContext";
const getSocket = () => {
  return async (dispatch) => {
    // const socket = io.connect();
    // dispatch(setSocket(socket));
    try {
      await axios.get("http://localhost:3000/api/auth/isloggedin").then((response, err) => {
        dispatch(setIsLoggedIn(true));
        dispatch(setUser(response.data.user));
        // socket.emit("join", {
        //   _id: response.data.user._id,
        //   tokenCreated: response.data.user.tokenCreated,
        // });
      });
    } catch {
      dispatch(setIsLoggedIn(false));
    }
  };
};

// const getCSRFToken = () => {
//   return async () => {
//     await axios.get("/csrf-token").then((token, err) => {
//       if (err) {
//         console.log(err.message);
//       } else {
//         axios.defaults.headers.common = {
//           "X-CSRF-Token": token.data.csrfToken,
//         };
//       }
//     });
//   };
// };

export const fetchBlogArticles = () => {
  return async (dispatch) => {
    await axios
      .get("http://localhost:3000/api/articles/pages")
      .then((response) => {
        const articles = response.data["links"].map((item, index) => {
          return {
            index: index,
            ...item,
            contentType: Card.ContentType["article-internal"],
            link: `/article?id=${item["_id"]}`,
          };
        });
        dispatch(setBlogArticles(articles));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export const fetchPodcasts = () => {
  return async (dispatch) => {
    await axios
      .get("http://localhost:3000/api/podcasts")
      .then((response) => {
        const podcasts = response.data["items"].map((item, index) => {
          return {
            index: index,
            ...item,
            contentType: Card.ContentType["audio-internal"],
          };
        });
        dispatch(setAudioPlayerPodcasts(podcasts));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

const fetchYoutubeVideos = () => {
  return async (dispatch) => {
    await axios
      .get("http://localhost:3000/api/youtube")
      .then((response) => {
        const curVideos = response.data["items"].map((item, index) => {
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
        dispatch(setVideoPlayerYoutubeVideos(curVideos));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

// export default function App({ Component, pageProps }) {
//   const store = useStore(pageProps.initialReduxState);
//   // store.dispatch(getCSRFToken());

//   return (
//     <Provider store={store}>
//       <AppGlobal>
//         <Component {...pageProps} />
//       </AppGlobal>
//     </Provider>
//   );
// }

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    await ctx.store.dispatch(getSocket());
    await ctx.store.dispatch(fetchBlogArticles());
    await ctx.store.dispatch(fetchPodcasts());
    await ctx.store.dispatch(fetchYoutubeVideos());

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
        pathname: ctx.pathname,
      },
    };
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <DeviceContextProvider>
      <AudioPlayerContextProvider>
      <AppGlobal>
        <Component {...pageProps} />
      </AppGlobal>
      </AudioPlayerContextProvider>
    </DeviceContextProvider> 
    );
  }
}

export default wrapper.withRedux(MyApp);
