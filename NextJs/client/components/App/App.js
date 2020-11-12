import React, { useEffect, useRef } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer.js";
import { useDispatch, useSelector } from "react-redux";
import { setAudioPlayerRef, setScreen, setUser } from "../../redux/actions";
import { fetchBlogArticles } from "../../pages/_app";
import styles from "./App.module.css"

const AppGlobal = (props) => {
  const audioPlayerRef = useRef();
  const dispatch = useDispatch();
  const scrollLockRef = useRef();
  const screen = useSelector((state) => state.device.screen);
  // const socket = useSelector((state) => state.network.socket);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("logged out", () => {
  //       dispatch(fetchBlogArticles());
  //       dispatch(setUser(null));
  //     });
  //   }
  // }, [socket]);

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
    <div className={styles["overarching"]}>
      <div ref={scrollLockRef}></div>
      <VideoPlayer scrollLockRef={scrollLockRef} />

      <audio
        ref={audioPlayerRef}
        src="https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a"
        type="audio/mpeg"
        data-testid="html5-audio"
      />
      <div className={styles["App"]}>
        {props.children}
      </div>
    </div>
  );
};

export default AppGlobal;
