import React, { useState, useEffect, useRef } from "react";
import Home from "./pages/Home/HomeClone.js";
import CreateArticle from "./pages/CreateArticle";
import Articles from "./pages/Articles/ArticlesClone";
import Podcasts from "./pages/Podcasts/PodcastsClone";
import ArticlePage from "./pages/Articles/ArticlePageClone.js";
import Edit from "./pages/Articles/EditClone.js";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.js";
import TermsOfService from "./pages/Legal/TermsOfService/TermsOfServiceClone";
import Privacy from "./pages/Legal/Privacy/PrivacyClone";
import AboutUs from "./pages/AboutUs/AboutUsClone";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAudioPlayerRef, setIsMobile } from "./redux/actions";
import { get } from "mongoose";

const App = () => {
  const audioPlayerRef = useRef();
  const dispatch = useDispatch();
  const scrollLockRef = useRef();

  useEffect(() => {
    const getCSRFToken = async () => {
      const tokenResponse = await axios.get("/csrf-token");
      const token = await tokenResponse.data;

      if (tokenResponse.status !== 200) {
        throw Error(token.message);
      }

      return token;
    };

    getCSRFToken().then((res) => {
      axios.defaults.headers.common = {
        "X-CSRF-Token": res.csrfToken,
      };
    });
  }, []);

  useEffect(() => {
    dispatch(setAudioPlayerRef(audioPlayerRef));
  }, [audioPlayerRef]);
  useEffect(() => {
    const updateIsMobile = () => {
      if (window.innerWidth <= 550) {
        dispatch(setIsMobile(true));
      } else {
        dispatch(setIsMobile(false));
      }
    };
    window.addEventListener("resize", updateIsMobile);
    return () => {
      window.addEventListener("resize", updateIsMobile);
    };
  }, []);
  return (
    <div className="overarching">
      <div ref={scrollLockRef}></div>
      <VideoPlayer scrollLockRef={scrollLockRef} />

      <audio
        ref={audioPlayerRef}
        src="https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a"
        type="audio/mpeg"
      />
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Home />;
              }}
            />
            <Route
              exact
              path="/articles/:id/edit"
              render={() => {
                return <Edit />;
              }}
            />
            <Route
              exact
              path="/articles/:id"
              render={() => {
                return <ArticlePage />;
              }}
            />
            <Route
              exact
              path="/articles"
              render={() => {
                return <Articles />;
              }}
            />
            <Route
              exact
              path="/podcasts"
              render={() => {
                return <Podcasts />;
              }}
            />
            <Route
              exact
              path="/legal/privacy"
              render={() => {
                return <Privacy />;
              }}
            />
            <Route
              exact
              path="/legal/termsofservice"
              render={() => {
                return <TermsOfService />;
              }}
            />
            <Route
              exact
              path="/about"
              render={() => {
                return <AboutUs />;
              }}
            />
            <Route
              path="/create/articles"
              render={() => {
                return <CreateArticle />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                return <SignUp />;
              }}
            />
            <Route
              path="/login"
              render={() => {
                return <Login />;
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
