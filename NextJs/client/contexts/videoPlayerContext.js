import React, { useReducer, createContext } from "react";

export const VideoPlayerContext = createContext();

const initialState = {
  selected:
    "https://www.youtube.com/embed/vpWIvnnWxaY?rel=0&start=0&autoplay=1",
  isPlaying: false,
  youtubeVideos: [
    {
      id: "vpWIvnnWxaY",
      title:
        "The False 9 Podcast Live Premier League and Transfer Window Preview",
      image: "https://img.youtube.com/vi/vpWIvnnWxaY/hqdefault.jpg",
      link:
        "https://www.youtube.com/embed/vpWIvnnWxaY?rel=0&start=0&autoplay=1",
      date: "2020-09-11T16:56:50Z",
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VIDEOPLAYER_SELECTED":
      return { ...state, selected: actions.payload };
    case "SET_VIDEOPLAYER_IS_PLAYING":
      return { ...state, isPlaying: actions.payload };
    case "SET_VIDEOPLAYER_YOUTUBE_VIDEOS":
      return { ...state, youtubeVideos: actions.payload };
    case "PLAY_VIDEO":
      return { ...state, selected: actions.payload, isPlaying: true };
    default:
      return state;
  }
};

export const VideoPlayerContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <VideoPlayerContext.Provider value={[state, dispatch]}>
      {props.children}
    </VideoPlayerContext.Provider>
  );
};
