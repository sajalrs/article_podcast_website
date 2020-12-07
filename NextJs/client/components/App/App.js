import React, { useEffect, useRef, useContext } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer.js";
import Head from "next/head";
import styles from "./App.module.css";
import {
  setAudioPlayerRefAction,
  setScreenAction,
  setIsLoggedInAction,
  setUserAction
} from "../../contexts/actions";
import { AudioPlayerContext } from "../../contexts/reducers/audioPlayerContext";
import { DeviceContext } from "../../contexts/reducers/deviceContext";
import {LoginContext} from "../../contexts/reducers/loginContext"
const AppGlobal = (props) => {
  //TO DO: Pressing on the right card doesn't play the right audio
  const audioPlayerRef = useRef();
  const scrollLockRef = useRef();
  const [audioPlayerState, audioPlayerDispatch] = useContext(
    AudioPlayerContext
  );
  const [deviceState, deviceDispatch] = useContext(DeviceContext);
  const [loginState, loginDispatch] = useContext(LoginContext);

  const screen = deviceState.screen;

  const setAudioPlayerRef = (setTo) => {
    audioPlayerDispatch(setAudioPlayerRefAction(setTo));
  };

  const setScreen = (setTo) => {
    deviceDispatch(setScreenAction(setTo));
  };

  const setIsLoggedIn = (setTo) => {
    loginDispatch(setIsLoggedInAction(setTo));
  }

  const setUser = (setTo) => {
    loginDispatch(setUserAction(setTo));
  }

  useEffect(() => {
   setAudioPlayerRef(audioPlayerRef);
  }, [audioPlayerRef]);


  useEffect(async () => {
    let user;
    try {
      const res = await fetch("http://localhost:3000/api/auth/isloggedin");
      const json = await res.json();
      user = json.user;
    } catch {
      user = null;
    }

    setIsLoggedIn(user);
    setUser(user);
  }, [])

  useEffect(() => {
    const updateDeviceSize = () => {
      if (window.innerWidth <= 550) {
        if (screen !== "mobile") {
          setScreen("mobile");
        }
      } else if (window.innerWidth > 550 && window.innerWidth <= 1350) {
        if (screen !== "tablet") {
          setScreen("tablet");
        }
      } else if (window.innerWidth > 1350) {
        if (screen !== "desktop") {
          setScreen("desktop");
        }
      }
    };
    window.addEventListener("resize", updateDeviceSize);
    return () => {
      window.addEventListener("resize", updateDeviceSize);
    };
  }, []);
  return (
    <div className={styles["overarching"]}>
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Football has been the number one sport in the world, and it is the same case for Nepal. People here are passionate about the game and are always eager to watch it. However, what our football scenario lacks is people who analyze this beautiful game. This podcast is for all the people who would love to understand and learn more about football. This podcast includes 3 guys doing what they do every day, talking about the game they saw yesterday or within the week. This isn't some classy high production scripted show, this is just us talking casually about the thing we love the most, football. Every week we choose a topic which is football related and dive deep into it and try to make it understandable and clear to the audience. We also briefly discuss the major fixtures being played all across Europe and most important of all, we'll talk about Nepali football. This is the false 9 podcast where football is cut wide open."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
          integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc"
          crossorigin="anonymous"
        />
        {/* <script
          data-ad-client="ca-pub-5436897490138523"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script> */}

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

        <title>The False 9 Podcast</title>
      </Head>
      <div ref={scrollLockRef}></div>
      <VideoPlayer scrollLockRef={scrollLockRef} />

      <audio
        ref={audioPlayerRef}
        src="https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a"
        type="audio/mpeg"
        data-testid="html5-audio"
      />
      <div className={styles["App"]}>{props.children}</div>
    </div>
  );
};

export default AppGlobal;
