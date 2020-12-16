import React, { useReducer, createContext } from "react";

export const AudioPlayerContext = createContext();

const initialState = {
  selected: 0,
  isPlaying: false,
  currentTime: 0,
  audioPlayerRef: null,
}

const reducer = (state, action) => {
  switch(action.type){
    case "SET_AUDIOPLAYER_IS_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_AUDIOPLAYER_CURRENT_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_AUDIOPLAYER_SELECTED":
      return { ...state, selected: action.payload };
    case "SET_AUDIOPLAYER_REF":
      return { ...state, audioPlayerRef: action.payload };
    case "PLAY_AUDIO":
      return { ...state, selected: action.payload, isPlaying: true };
    default:
      return state;
  }

};

export const AudioPlayerContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AudioPlayerContext.Provider value={[state, dispatch]}>
      {props.children}
    </AudioPlayerContext.Provider>
  );
};
