import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = () => {
  const [selectedTrack, setSelectedTrack] = useState({
    title: "False Nine Podcast #17 Champions League RO16 first leg review",
    by: "Ishan Sharma, Susajjan Dhungana and Ojash Dangal",
    link:
      "https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a",
    duration: "35143625",
    date: "Sat, 12 Sep 2020 08:42:34 GMT",
  });
  const [player, setPlayer] = useState("paused");
  const audioRef = useRef();
  const prevTrack = usePrevious(selectedTrack);
  const prevPlayer = usePrevious(player);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const seekBarRef = useRef()
  useEffect(() => {
      console.log("Ran")
    if (selectedTrack !== prevTrack) {
      let track;
      track = selectedTrack? selectedTrack.link : null;
      if (track) {
        audioRef.current.src = track;
        audioRef.current.play();
        setPlayer("playing");
      }
    }
  }, [selectedTrack]);

  useEffect(() => {
      console.log("Ran this")
    if (player !== prevPlayer) {
      if (player === "paused") {
        audioRef.current.pause();
      } else if (player === "playing" && prevPlayer === "paused") {
        audioRef.current.play();
      }
    }
  },[player]);

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", e => {
        setCurrentTime(e.target.currentTime)
        setDuration(e.target.duration)
    })
      return () => {
        audioRef.current.removeEventListener("timeupdate", () => {});
      }
  }, [])

  // useEffect(() => {
  //   seekBarRef.current.addEventListener("change", e => {
  //       const time = duration * (e.target.value / 100);
  //       audioRef.current.currentTime = time;
  //       setCurrentTime(time);
  //   })
  //     return () => {
  //       seekBarRef.current.removeEventListener("change", () => {});
  //     }
  // }, [])

  const handleSliderChange = (e) => {
    const time = duration * (e.target.value / 100);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  
  function getTime(time) {
    if(!isNaN(time)) {
      return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    }
  }
  const progressDuration = getTime(duration);
  const progressTime = getTime(currentTime);
  const progress = (100/ duration) * currentTime
  return (
    <div>
      <div>
        {player === "paused" && (
          <button onClick={() => setPlayer("playing")}>Play</button>
        )}
        {player === "playing" && (
          <button onClick={() => setPlayer("paused")}>Pause</button>
        )}
      {player === "playing" || player === "paused" ? (
          <div>
            {progressTime} / {progressDuration}
            <input ref={seekBarRef} type="range" onChange={handleSliderChange} value={progress}/>
          </div>
        ) : (
          ""
        )}
            
      </div>

      <audio ref={audioRef} />
      {/*https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a  */}
    </div>
  );
};

export default AudioPlayer;
