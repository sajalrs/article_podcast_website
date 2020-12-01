import { createContext } from "react";

export const AudioPlayerContext = createContext();

const initialState = {
  selected: 0,
  isPlaying: false,
  currentTime: 0,
  podcasts: [
    {
      title: "False Nine Podcast #17 Champions League RO16 first leg review",
      by: "Ishan Sharma, Susajjan Dhungana and Ojash Dangal",
      link:
        "https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a",
      date: "Sat, 12 Sep 2020 08:42:34 GMT",
      image:
        "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/8497059/8497059-1599895849523-cbb8b2f53d641.jpg",
    },
  ],
  audioPlayerRef: null,
};

const reducer = (state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export const AudioPlayerContextProvider = props => {
    const [state, dispatch] =  useReducer(reducer, initialState);

    return(
        <AudioPlayerContext.Provider value={[state, dispatch]}>
            {props.children}
        </AudioPlayerContext.Provider>
    )
}
