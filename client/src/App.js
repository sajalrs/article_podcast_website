import React, { useEffect, useRef } from "react";
import Home from "./pages/Home/Home.js";
import CreateArticle from "./pages/CreateArticle";
import Articles from "./pages/Articles/Articles";
import Podcasts from "./pages/Podcasts/Podcasts";
import ArticlePage from "./pages/Articles/ArticlePage.js";
import Edit from "./pages/Articles/Edit.js";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.js";
import TermsOfService from "./pages/Legal/TermsOfService/TermsOfService";
import Privacy from "./pages/Legal/Privacy/Privacy";
import AboutUs from "./pages/AboutUs/AboutUsClone";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAudioPlayerRef,
  setScreen,
  setSocket,
} from "./redux/actions";
import io from "socket.io-client";
import ContactUs from "./pages/ContactUs/ContactUs.js";

const App = () => {
  const audioPlayerRef = useRef();
  const dispatch = useDispatch();
  const scrollLockRef = useRef();
  const screen = useSelector((state) => state.device.screen);

  useEffect(() => {
    const socket = io.connect();
    dispatch(setSocket(socket));

    return () => {
      socket.emit("disconnect");
      socket.disconnect();
    };
  }, []);

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
    const updateDeviceSize = () => {
      if (window.innerWidth <= 550) {
        if(screen !== "mobile"){
          dispatch(setScreen("mobile"))
        }
      } else if (window.innerWidth > 550 && window.innerWidth <= 1350) {
        if(screen !== "tablet"){
          dispatch(setScreen("tablet"))
        }
      } else if (window.innerWidth > 1350) {
        if(screen !== "desktop"){
          dispatch(setScreen("desktop"))
        }
      }
    };
    window.addEventListener("resize", updateDeviceSize);
    return () => {
      window.addEventListener("resize", updateDeviceSize);
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
        data-testid="html5-audio"
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
              path="/contact"
              render={() => {
                return <ContactUs />;
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
