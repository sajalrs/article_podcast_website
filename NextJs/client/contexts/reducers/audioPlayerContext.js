import React, { useReducer, createContext } from "react";

export const AudioPlayerContext = createContext();

const reducer = (state, action) => {
  switch(action.type){
    case "SET_AUDIOPLAYER_IS_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_AUDIOPLAYER_CURRENT_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_AUDIOPLAYER_PODCASTS":
      return { ...state, podcasts: action.payload };
    case "SET_AUDIOPLAYER_SELECTED":
      return { ...state, selected: action.payload };
    case "SET_AUDIOPLAYER_REF":
      return { ...state, audioPlayerRef: action.payload };
    case "PLAY_AUDIO":
      return { ...state, selected: action.payload, isPlaying: true };

  }

};

export const AudioPlayerContextProvider = (props) => {
  console.log(props);
  const [state, dispatch] = useReducer(reducer, props.initialState);

  return (
    <AudioPlayerContext.Provider value={[state, dispatch]}>
      {props.children}
    </AudioPlayerContext.Provider>
  );
};
