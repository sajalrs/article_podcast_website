import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useContext,
} from "react";
import { AudioPlayerContext } from "../../contexts/reducers/audioPlayerContext";
import {
  setAudioPlayerIsPlayingAction,
  setAudioPlayerCurrentTimeAction,
  setAudioPlayerSelectedAction,
} from "../../contexts/actions";
import styles from "./AudioPlayer.module.css";
import { gql, NetworkStatus, useQuery } from "@apollo/client";

export const ALL_PODCASTS_QUERY = gql`
  query AllPodcastsQuery {
    podcasts {
      title
      by
      link
      date
      image
      description
    }
  }
`;

const AudioPlayer = forwardRef((props, ref) => {
  const [audioPlayerState, audioPlayerDispatch] = useContext(
    AudioPlayerContext
  );
  // const podcasts = audioPlayerState.podcasts;
  const {
    loading,
    error,
    data,

    networkStatus,
  } = useQuery(ALL_PODCASTS_QUERY, { notifyOnNetworkStatusChange: true });

  const loadingMorePodcasts = networkStatus === NetworkStatus.fetchMore;

  let podcasts;
  if (loading && !loadingMorePodcasts) {
    podcasts = [
      {
        title: "False Nine Podcast #17 Champions League RO16 first leg review",
        by: "Ishan Sharma, Susajjan Dhungana and Ojash Dangal",
        link:
          "https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a",
        date: "Sat, 12 Sep 2020 08:42:34 GMT",
        image:
          "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/8497059/8497059-1599895849523-cbb8b2f53d641.jpg",
        description:
          "In this episode, Ishan, Ojash and Susajjan review the first leg ties of the Champions league Round of 16 first leg.\n\n",
      },
    ];
  } else {
    podcasts = data.podcasts;
  }

  //selected refers to the currently playing audio track.
  //It is global set to allow clicks and links to change tracks
  const selected = audioPlayerState.selected;

  //audioPLayerRef is initialized to an html5 audio element in the
  //App.js file and the reference is stored in the global redux
  //store. This was done for the player to hold its data between
  //page redirects.This is supposedly bad as only serializable
  // data should be kept in store but it does the job for now.
  const audioPlayerRef = audioPlayerState.audioPlayerRef;
  const prevTrack = usePrevious(podcasts[selected]) || {
    title: "False Nine Podcast #17 Champions League RO16 first Leg review",
    by: "Ishan Sharma, Susajjan Dhungana and Ojash Dangal",
    link:
      "https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a",
    date: "Sat, 12 Sep 2020 08:42:34 GMT",
    image:
      "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/8497059/8497059-1599895849523-cbb8b2f53d641.jpg",
  };

  const isPlaying = audioPlayerState.isPlaying;
  const currentTime = audioPlayerState.currentTime;

  //React redux useDispatch() hook
  const wasPlaying = usePrevious(isPlaying);
  const setAudioPlayerIsPlaying = (setTo) => {
    audioPlayerDispatch(setAudioPlayerIsPlayingAction(setTo));
  };

  const setAudioPlayerCurrentTime = (setTo) => {
    audioPlayerDispatch(setAudioPlayerCurrentTimeAction(setTo));
  };

  const setAudioPlayerSelected = (setTo) => {
    audioPlayerDispatch(setAudioPlayerSelectedAction(setTo));
  };

  //Don't need setDuration can probably get rid of. If it ain't broke....
  const [duration, setDuration] = useState(2172.892);

  //seekbar shows the time elapsed in the song
  const seekBarRef = useRef();

  useEffect(() => {
    if (audioPlayerRef && isPlaying !== wasPlaying) {
      if (!isPlaying && audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      } else if (isPlaying && !wasPlaying && audioPlayerRef.current) {
        audioPlayerRef.current.play();
      }
    }
  }, [isPlaying, audioPlayerRef]);

  useEffect(() => {
    if (audioPlayerRef && podcasts[selected].title != prevTrack.title) {
      let track = podcasts[selected] ? podcasts[selected].link : null;
      if (track && audioPlayerRef.current) {
        if (audioPlayerRef.current.src !== track) {
          audioPlayerRef.current.src = track;
          audioPlayerRef.current.play();
          setAudioPlayerIsPlaying(true);
        }
      }
    }
  }, [audioPlayerRef, podcasts[selected]]);

  useEffect(() => {
    if (audioPlayerRef && audioPlayerRef.current) {
      audioPlayerRef.current.addEventListener("timeupdate", (e) => {
        setAudioPlayerCurrentTime(e.target.currentTime);
      });
    }
  }, [audioPlayerRef]);

  const handleSliderChange = (e) => {
    const time = duration * (e.target.value / 100);
    audioPlayerRef.current.currentTime = time;
    setAudioPlayerCurrentTime(time);
  };

  const rewindPodcasts = () => {
    if (selected === podcasts.length - 1) {
      setAudioPlayerSelected(0);
    } else {
      setAudioPlayerSelected(selected + 1);
    }
  };

  const forwardPodcasts = () => {
    if (selected === 0) {
      setAudioPlayerSelected(podcasts.length - 1);
    } else {
      setAudioPlayerSelected(selected - 1);
    }
  };

  //Useful custom hook which stores the previous value of a
  //variable
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
          src={podcasts[selected].image}
          loading="lazy"
        />
      </div>
      <div className={styles["player"]}>
        <div className={styles["minimized"]}>
          {!props.isActive && (
            <div id={styles["bars"]}>
              {/*Animation similar to old windows media player/}
          {/which is displayed when podcast is playing and/}
        {/player is maximized*/}

              <div
                className={isPlaying ? styles["bar"] : styles["bar-paused"]}
              ></div>
              <div
                className={isPlaying ? styles["bar"] : styles["bar-paused"]}
              ></div>
              <div
                className={
                  isPlaying === "playing" ? styles["bar"] : styles["bar-paused"]
                }
              ></div>

              <div
                className={isPlaying ? styles["bar"] : styles["bar-paused"]}
              ></div>
              <div
                className={isPlaying ? styles["bar"] : styles["bar-paused"]}
              ></div>
              <div
                className={isPlaying ? styles["bar"] : styles["bar-paused"]}
              ></div>
              <div
                className={isPlaying ? styles["bar"] : styles["bar-paused"]}
              ></div>
              <div
                className={isPlaying ? styles["bar"] : styles["bar-paused"]}
              ></div>
              <div
                className={isPlaying ? styles["bar"] : styles["bar-paused"]}
              ></div>
              <div
                className={isPlaying ? styles["bar"] : styles["bar-paused"]}
              ></div>
              <div
                className={isPlaying ? styles["bar"] : styles["bar-paused"]}
              ></div>
              <div
                className={isPlaying ? styles["bar"] : styles["bar-paused"]}
              ></div>
              <div
                className={isPlaying ? styles["bar"] : styles["bar-paused"]}
              ></div>
            </div>
          )}

          <div
            className={styles["title-container"]}
            onClick={() => props.setActive(!props.isActive)}
          >
            {podcasts[selected].title.toUpperCase()}
          </div>
          {/*isActive refers to whether audioplayer is minimized/}
          {/While minimized only playing animation and title appears*/}
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
              onClick={() => rewindPodcasts()}
              className={`${styles["backward-button"]} ${styles["fas"]} ${styles["fa-step-backward"]} fas fa-step-backward`}
            ></i>
            {audioPlayerRef && !isPlaying && (
              <i
                onClick={() => {
                  audioPlayerRef.current.play();
                  setAudioPlayerIsPlaying(true);
                }}
                className={`${styles["play-button"]} ${styles["far"]} ${styles["fa-play-circle"]} far fa-play-circle`}
              ></i>
            )}
            {audioPlayerRef && isPlaying && (
              <i
                //Use effect automatically handles changes in redux
                //state hook to pause the audio player
                onClick={() => setAudioPlayerIsPlaying(false)}
                className={`${styles["pause-button"]} ${styles["far"]} ${styles["fa-pause-circle"]} far fa-pause-circle`}
              ></i>
            )}
            <i
              //On ios devices apparently users must explicitly press
              //play and audio player can't play through callbacks hence this
              onClick={() => {
                audioPlayerRef.current.play();
                forwardPodcasts();
              }}
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
    </div>
  );
});

export default AudioPlayer;
