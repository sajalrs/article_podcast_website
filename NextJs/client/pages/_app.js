import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import React from "react";
import { Card } from "../components/Cards/Card.js";
import io from "socket.io-client";
import axios from "axios";
import {
  setAudioPlayerPodcasts,
  setVideoPlayerYoutubeVideos,
  setBlogArticles,
  setIsLoggedIn,
  setSocket,
  setUser,
} from "../redux/actions";
import AppGlobal from "../components/App/App";

// const getSocket = () => {
//   return async (dispatch) => {
//     const socket = io.connect();
//     dispatch(setSocket(socket));
//     await axios.get("/auth/isloggedin").then((response) => {
//       if (response.status !== 200) {
//         dispatch(setIsLoggedIn(false));
//       } else {
//         dispatch(setIsLoggedIn(true));
//         dispatch(setUser(response.data.user));
//         socket.emit("join", {
//           _id: response.data.user._id,
//           tokenCreated: response.data.user.tokenCreated,
//         });
//       }
//     });
//   };
// };

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
      .get("api/articles/pages")
      .then((response) => {
        const articles = response.data["links"].map((item, index) => {
          return {
            index: index,
            ...item,
            contentType: Card.ContentType["article-internal"],
            link: `articles/id=${item["_id"]}`,
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
      .get("/podcasts")
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
      .get("/youtube")
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

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  // store.dispatch(getCSRFToken());
  // store.dispatch(getSocket());
  store.dispatch(fetchBlogArticles());
  store.dispatch(fetchPodcasts());
  store.dispatch(fetchYoutubeVideos());

  return (
    <Provider store={store}>
      <AppGlobal>
        <Component {...pageProps} />
      </AppGlobal>
    </Provider>
  );
}
