import React, { useState, useRef, useEffect } from "react";
import styles from "./AudioPlayer.module.css";
const AudioPlayer = (props) => {
  // const [selectedTrack, setSelectedTrack] = useState({
  //   title: "False Nine Podcast #17 Champions League RO16 first leg review",
  //   by: "Ishan Sharma, Susajjan Dhungana and Ojash Dangal",
  //   link:
  //     "https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a",
  //   duration: 0,
  //   date: "Sat, 12 Sep 2020 08:42:34 GMT",
  //   currentTime: 0
  // });
  // const [player, setPlayer] = useState("paused");
  const audioRef = useRef();
  const prevTrack = usePrevious(
    props.selectedTrack.items[props.selectedTrack.currentlyPlaying]
  );
  const prevPlayer = usePrevious(props.player);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const seekBarRef = useRef();
  useEffect(() => {
    console.log("Ran");
    if (
      props.selectedTrack.items[props.selectedTrack.currentlyPlaying] !==
      prevTrack
    ) {
      let track;
      track = props.selectedTrack
        ? props.selectedTrack.items[props.selectedTrack.currentlyPlaying].link
        : null;
      if (track) {
        audioRef.current.src = track;
        audioRef.current.play();
        props.setPlayer("playing");
      }
    }
  }, [props.selectedTrack.items[props.selectedTrack.currentlyPlaying]].title);

  useEffect(() => {
    console.log("Ran this");
    if (props.player !== prevPlayer) {
      if (props.player === "paused") {
        audioRef.current.pause();
      } else if (props.player === "playing" && prevPlayer === "paused") {
        audioRef.current.play();
      }
    }
  }, [props.player]);

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", (e) => {
      setCurrentTime(e.target.currentTime);
      setDuration(e.target.duration);
    });
    return () => {
      audioRef.current.removeEventListener("timeupdate", () => {});
    };
  }, []);

  const handleSliderChange = (e) => {
    const time = duration * (e.target.value / 100);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  function getTime(time) {
    if (!isNaN(time)) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    }
  }
  const progressDuration = getTime(duration);
  const progressTime = getTime(currentTime);
  const progress = (100 / duration) * currentTime;
  return (
    <div>
      <div>
        <h1>
          {
            props.selectedTrack.items[props.selectedTrack.currentlyPlaying]
              .title
          }
        </h1>
        {props.player === "paused" && (
          <i
            onClick={() => props.setPlayer("playing")}
            className={`${styles["play-button"]} ${styles["far"]} ${styles["fa-play-circle"]} far fa-play-circle`}
          ></i>
        )}
        {props.player === "playing" && (
          <i
            onClick={() => props.setPlayer("paused")}
            className={`${styles["pause-button"]} ${styles["far"]} ${styles["fa-pause-circle"]} far fa-pause-circle`}
          ></i>
        )}
        {props.player === "playing" || props.player === "paused" ? (
          <div>
            {progressTime} / {progressDuration}
            <input
              ref={seekBarRef}
              type="range"
              onChange={handleSliderChange}
              value={progress}
            />
          </div>
        ) : (
          ""
        )}
        <i
          onClick={() => props.rewindPodcasts()}
          className={`${styles["backward-button"]} ${styles["fas"]} ${styles["fa-step-backward"]} fas fa-step-backward`}
        ></i>
        <i
          onClick={() => props.forwardPodcasts()}
          className={`${styles["forward-button"]} ${styles["fas"]} ${styles["fa-step-forward"]} fas fa-step-forward`}
        ></i>
      </div>

      <audio ref={audioRef} />
      {/*https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a  */}
    </div>
  );
};

export default AudioPlayer;
