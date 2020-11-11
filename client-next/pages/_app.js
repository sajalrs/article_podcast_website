import React, { useEffect, useRef } from "react";
import Home from "./home.js";
import Articles from "./articles";
import Podcasts from "./podcasts";
import ArticlePage from "./article_page.js";
import Edit from "./edit.js";
// import "./App.css";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer.js";
import TermsOfService from "./terms_of_service";
import Privacy from "./privacy";
import AboutUs from "./about_us";
import SignUp from "./sign_up";
import Login from "./login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAudioPlayerRef, setScreen, setUser } from "../redux/actions";
import { fetchBlogArticles } from "./index";
import ContactUs from "./contact_us.js";
import RequestEmail from "./request_email.js";
import NewPassword from "./new_password.js";

const App = () => {
  const audioPlayerRef = useRef();
  const dispatch = useDispatch();
  const scrollLockRef = useRef();
  const screen = useSelector((state) => state.device.screen);
  const socket = useSelector((state) => state.network.socket);

  useEffect(() => {
    if (socket) {
      socket.on("logged out", () => {
        dispatch(fetchBlogArticles());
        dispatch(setUser(null));
      });
    }
  }, [socket]);

  useEffect(() => {
    dispatch(setAudioPlayerRef(audioPlayerRef));
  }, [audioPlayerRef]);

  useEffect(() => {
    const updateDeviceSize = () => {
      if (window.innerWidth <= 550) {
        if (screen !== "mobile") {
          dispatch(setScreen("mobile"));
        }
      } else if (window.innerWidth > 550 && window.innerWidth <= 1350) {
        if (screen !== "tablet") {
          dispatch(setScreen("tablet"));
        }
      } else if (window.innerWidth > 1350) {
        if (screen !== "desktop") {
          dispatch(setScreen("desktop"));
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
              exact
              path="/contact"
              render={() => {
                return <ContactUs />;
              }}
            />
            <Route
              exact
              path="/register"
              render={() => {
                return <SignUp />;
              }}
            />
            <Route
              exact
              path="/login"
              render={() => {
                return <Login />;
              }}
            />
            <Route
              exact
              path="/login/email=:email"
              render={() => {
                return <Login />;
              }}
            />
            <Route
              exact
              path="/forgotpassword"
              render={() => {
                return <RequestEmail />;
              }}
            />
            <Route
              exact
              path="/resetpassword/:id/:token"
              render={() => {
                return <NewPassword />;
              }}
            />

            <Route
              exact
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
