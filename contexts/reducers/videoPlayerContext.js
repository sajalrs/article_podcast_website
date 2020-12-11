import React, { useReducer, createContext } from "react";

export const VideoPlayerContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VIDEOPLAYER_SELECTED":
      return { ...state, selected: action.payload };
    case "SET_VIDEOPLAYER_IS_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_VIDEOPLAYER_YOUTUBE_VIDEOS":
      return { ...state, youtubeVideos: action.payload };
    case "PLAY_VIDEO":
      return { ...state, selected: action.payload, isPlaying: true };
    default:
      return state;
  }
};

export const VideoPlayerContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, props.initialState);

  return (
    <VideoPlayerContext.Provider value={[state, dispatch]}>
      {props.children}
    </VideoPlayerContext.Provider>
  );
};
