import React,{useEffect} from 'react'
import styles from './VideoPlayer.module.css'
import {
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";
import {useSelector, useDispatch} from 'react-redux'
import {closeVideo} from '../../redux/actions'
const VideoPlayer = (props) => {
    
    const isPlaying = useSelector(state => state.videoPlayer.isPlaying)
  

    useEffect(() => {
      if(isPlaying){
        disableBodyScroll(props.scrollLockRef.current)
      } else{
        enableBodyScroll(props.scrollLockRef.current)
      }

    },[isPlaying, props.scrollLockRef.current])

    const selected = useSelector(state=> state.videoPlayer.selected)
    const dispatch = useDispatch();
    return (
        isPlaying? 
            (<div className={styles["youtube-video-container"]} id="youtube-video-container">
            
              <div className={styles["closeable"]}>
                <div className={styles["close-button"]}>
                  <i className={`${styles["fas"]} ${styles["fa-times"]} fas fa-times`} onClick={() => {dispatch(closeVideo())}}></i>
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
            </div>)
            : null        
    )
};
export default VideoPlayer