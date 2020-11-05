import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { Card } from "./components/Cards/Card.js";
import io from "socket.io-client";
import axios from "axios";
import {
  setAudioPlayerPodcasts,
  setVideoPlayerYoutubeVideos,
  setBlogArticles,
  setIsLoggedIn,
  setSocket,
  setUser,
} from "./redux/actions";


const getSocket = () => {
  return async (dispatch) => {
    const socket = io.connect();
    dispatch(setSocket(socket));
    await axios.get("/auth/isloggedin").then((response) => {
      if (response.status !== 200) {
        dispatch(setIsLoggedIn(false));
      } else {
        dispatch(setIsLoggedIn(true));
        dispatch(setUser(response.data.user));   
        socket.emit("join", { _id: response.data.user._id });
      }
    });
  }
}

const getCSRFToken = () => {
  return async () => {
    await axios.get("/csrf-token").then((token, err) => {
      if (err) {
        console.log(err.message);
      } else {
        axios.defaults.headers.common = {
          "X-CSRF-Token": token.data.csrfToken,
        };
      }
    });
  };
};

export const fetchBlogArticles = () => {
  return async (dispatch) => {
    await axios
      .get("/articles/pages")
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

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancer = compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
store.dispatch(getCSRFToken());
store.dispatch(getSocket());
store.dispatch(fetchBlogArticles());
store.dispatch(fetchPodcasts());
store.dispatch(fetchYoutubeVideos());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
