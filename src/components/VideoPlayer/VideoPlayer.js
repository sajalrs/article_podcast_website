import React from 'react'
import styles from './VideoPlayer.module.css'
const VideoPlayer = (props) => {
    return (
            <div className={styles["youtube-video-container"]} id="youtube-video-container">
              <div className={styles["closeable"]}>
                <div className={styles["close-button"]}>
                  <i className={`${styles["fas"]} ${styles["fa-times"]} fas fa-times`} onClick={() => {props.closeVideo()}}></i>
                  <label className={styles["close-btn-label"]}>Close</label>
                </div>
                <div className={styles["video"]}>
                  <iframe
                    width="886"
                    height="498"
                    src={props.src}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen="true"
                  ></iframe>
                </div>
              </div>
            </div>
        
    )
}
export default VideoPlayer