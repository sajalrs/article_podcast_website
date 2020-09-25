import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import axios from "axios";
import {
  setAudioPlayerPodcasts,
  setVideoPlayerYoutubeVideos,
  setBlogArticles,
} from "./redux/actions";

const fetchBlogArticles = () => {
  return (dispatch) => {
    axios
      .get("/articles/pages")
      .then((response) => {
        const articles = response.data["links"].map((item, index) => {
          return {
            index: index,
            ...item,
            link: `articles/id=${item.id}`,
          };
        });
        dispatch(setBlogArticles(articles));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

const fetchPodcasts = () => {
  return (dispatch) => {
    axios
      .get("/podcasts")
      .then((response) => {
        const podcasts = response.data["items"].map((item, index) => {
          return {
            index: index,
            ...item
          }
        })
        dispatch(setAudioPlayerPodcasts(podcasts));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

const fetchYoutubeVideos = () => {
  return (dispatch) => {
    axios
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
          };
        });
        dispatch(setVideoPlayerYoutubeVideos(curVideos));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
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
