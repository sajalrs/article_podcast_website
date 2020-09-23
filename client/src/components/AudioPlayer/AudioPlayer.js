import React, { useState, useRef, useEffect, forwardRef } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {setAudioPlayerPlayer, setAudioPlayerCurrentTime} from '../../redux/actions'
import styles from "./AudioPlayer.module.css";
const AudioPlayer = forwardRef((props, ref) => {
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
  
  const prevTrack = usePrevious(
    props.selectedTrack.items[props.selectedTrack.currentlyPlaying]
  ) || {
    title: "False Nine Podcast #17 Champions League RO16 first Leg review",
    by: "Ishan Sharma, Susajjan Dhungana and Ojash Dangal",
    link:
      "https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a",
    date: "Sat, 12 Sep 2020 08:42:34 GMT",
    image:
      "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/8497059/8497059-1599895849523-cbb8b2f53d641.jpg",
  };
  const player = useSelector(state => state.audioPlayer.player);
  const currentTime = useSelector(state => state.audioPlayer.currentTime);
  const dispatch = useDispatch();
  const prevPlayer = usePrevious(player);
  const [duration, setDuration] = useState(2172.892);
  
  const seekBarRef = useRef();
  useEffect(() => {
    if (player !== prevPlayer) {
      if (player === "paused") {
        props.audioRef.current.pause();
      } else if (player === "playing" && prevPlayer === "paused") {
        props.audioRef.current.play();
      }
    }
  }, [player]);

  useEffect(() => {
    if (
      props.selectedTrack.items[props.selectedTrack.currentlyPlaying].title !==
      prevTrack.title
    ) {
      let track = props.selectedTrack
        ? props.selectedTrack.items[props.selectedTrack.currentlyPlaying].link
        : null;
      if (track) {
        if (props.audioRef.current.src !== track) {
          props.audioRef.current.src = track;
          props.audioRef.current.play();
          dispatch(setAudioPlayerPlayer("playing"));
        }
      }
    }
  }, [props.selectedTrack.items[props.selectedTrack.currentlyPlaying]]);

  useEffect(() => {
    props.audioRef.current.addEventListener("timeupdate", (e) => {
      dispatch(setAudioPlayerCurrentTime(e.target.currentTime));
    });
    return () => {
      props.audioRef.current.removeEventListener("timeupdate", () => {});
    };
  }, []);

  const handleSliderChange = (e) => {
    const time = duration * (e.target.value / 100);
    props.audioRef.current.currentTime = time;
    dispatch(setAudioPlayerCurrentTime(time));
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
    <div ref={ref} className={styles["audio-player"]}>
      <div
        className={
          props.isActive
            ? styles["image-container"]
            : `${styles["image-container"]} ${styles["image-container-inactive"]}`
        }
      >
        <img
          className={styles["image"]}
          src={
            props.selectedTrack.items[props.selectedTrack.currentlyPlaying]
              .image
          }
        />
      </div>
      <div className={styles["player"]}>
        <div className={styles["minimized"]}>
          {!props.isActive && <div id={styles["bars"]}>
          <div className={player === "playing" ? styles["bar"] : styles["bar-paused"]}></div>
            <div className={player === "playing" ? styles["bar"] : styles["bar-paused"]}></div>
            <div className={player === "playing" ? styles["bar"] : styles["bar-paused"]}></div>

            <div className={player === "playing" ? styles["bar"] : styles["bar-paused"]}></div>
            <div className={player === "playing" ? styles["bar"] : styles["bar-paused"]}></div>
            <div className={player === "playing" ? styles["bar"] : styles["bar-paused"]}></div>
            <div className={player === "playing" ? styles["bar"] : styles["bar-paused"]}></div>
            <div className={player === "playing" ? styles["bar"] : styles["bar-paused"]}></div>
            <div className={player === "playing" ? styles["bar"] : styles["bar-paused"]}></div>
            <div className={player === "playing" ? styles["bar"] : styles["bar-paused"]}></div>
            <div className={player === "playing" ? styles["bar"] : styles["bar-paused"]}></div>
            <div className={player === "playing" ? styles["bar"] : styles["bar-paused"]}></div>
            <div className={player === "playing" ? styles["bar"] : styles["bar-paused"]}></div>
          </div>}

          <div
            className={styles["title-container"]}
            onClick={() => props.setActive(!props.isActive)}
          >
            {props.selectedTrack.items[
              props.selectedTrack.currentlyPlaying
            ].title.toUpperCase()}
          </div>

          {props.isActive ? (
            <i
              onClick={() => props.setActive(false)}
              className={`${styles["audio-player-inactive"]} ${styles["fas"]} ${styles["fa-chevron-down"]} fas fa-chevron-down`}
            ></i>
          ) : (
            <i
              onClick={() => props.setActive(true)}
              className={`${styles["audio-player-active"]} ${styles["fas"]} ${styles["fa-chevron-up"]} fas fa-chevron-up`}
            ></i>
          )}
        </div>

        <div
          className={
            props.isActive
              ? styles["image-controls"]
              : `${styles["image-controls"]} ${styles["image-controls-inactive"]}`
          }
        >
          <div className={styles["controls"]}>
            <i
              onClick={() => props.rewindPodcasts()}
              className={`${styles["backward-button"]} ${styles["fas"]} ${styles["fa-step-backward"]} fas fa-step-backward`}
            ></i>
            {player === "paused" && (
              <i
                onClick={() => {props.audioRef.current.play();dispatch(setAudioPlayerPlayer("playing"))}}
                className={`${styles["play-button"]} ${styles["far"]} ${styles["fa-play-circle"]} far fa-play-circle`}
              ></i>
            )}
            {player === "playing" && (
              <i
                onClick={() => dispatch(setAudioPlayerPlayer("paused"))}
                className={`${styles["pause-button"]} ${styles["far"]} ${styles["fa-pause-circle"]} far fa-pause-circle`}
              ></i>
            )}
            <i
              onClick={() => props.forwardPodcasts()}
              className={`${styles["forward-button"]} ${styles["fas"]} ${styles["fa-step-forward"]} fas fa-step-forward`}
            ></i>
          </div>
          <div className={styles["progress-bar"]}>
            {progressTime}{" "}
            <input
              ref={seekBarRef}
              type="range"
              className={styles["progress-bar-slider"]}
              onChange={handleSliderChange}
              value={progress}
            />{" "}
            {progressDuration}
          </div>
        </div>
      </div>

      {/*https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a  */}
    </div>
  );
});

export default AudioPlayer;
