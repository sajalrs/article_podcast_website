import React, { useReducer, createContext } from "react";

export const VideoPlayerContext = createContext();

const initialState = {
  selected:
    "https://www.youtube.com/embed/vpWIvnnWxaY?rel=0&start=0&autoplay=1",
  isPlaying: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VIDEOPLAYER_SELECTED":
      return { ...state, selected: action.payload };
    case "SET_VIDEOPLAYER_IS_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "PLAY_VIDEO":
      return { ...state, selected: action.payload, isPlaying: true };
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
