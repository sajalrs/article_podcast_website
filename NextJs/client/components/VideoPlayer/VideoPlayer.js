import React, { useEffect, useContext } from "react";
import styles from "./VideoPlayer.module.css";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { VideoPlayerContext } from "../../contexts/reducers/videoPlayerContext";
import { closeVideoAction } from "../../contexts/actions";
const VideoPlayer = (props) => {
  const [videoPlayerState, videoPlayerDispatch] = useContext(
    VideoPlayerContext
  );
  const isPlaying = videoPlayerState.isPlaying;
  const closeVideo = () => videoPlayerDispatch(closeVideoAction);
  useEffect(() => {
    if (isPlaying) {
      disableBodyScroll(props.scrollLockRef.current);
    } else {
      enableBodyScroll(props.scrollLockRef.current);
    }
  }, [isPlaying, props.scrollLockRef.current]);

  const selected = videoPlayerState.selected;
  return isPlaying ? (
    <div
      className={styles["youtube-video-container"]}
      id="youtube-video-container"
    >
      <div className={styles["closeable"]}>
        <div className={styles["close-button"]}>
          <i
            className={`${styles["fas"]} ${styles["fa-times"]} fas fa-times`}
            onClick={() => {
              closeVideo();
            }}
          ></i>
          <label className={styles["close-btn-label"]}>Close</label>
        </div>
        <div className={styles["video"]}>
          <iframe
            src={selected}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="true"
          ></iframe>
        </div>
      </div>
    </div>
  ) : null;
};
export default VideoPlayer;
