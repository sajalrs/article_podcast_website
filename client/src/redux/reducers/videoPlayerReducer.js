const videoPlayerReducer = (
    state = {
        selected: "https://www.youtube.com/embed/jbG9LJs_Npg?rel=0&autoplay=1",
        isPlaying: false,
        youtubeVideos: []
    },
    actions
  ) => {
    switch (actions.type) {
      case "SET_VIDEOPLAYER_SELECTED":
        return { ...state, selected: actions.payload };
      case "SET_VIDEOPLAYER_IS_PLAYING":
        return { ...state, isPlaying: actions.payload };
      case "SET_VIDEOPLAYER_YOUTUBE_VIDEOS":
          return {...state, youtubeVideos: actions.payload};
      default:
        return state;
    }
  };
  
  export default videoPlayerReducer;
  