const videoPlayerReducer = (
  state = {
    selected: 0,
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
  },
  actions
) => {
  switch (actions.type) {
    case "SET_VIDEOPLAYER_SELECTED":
      return { ...state, selected: actions.payload };
    case "SET_VIDEOPLAYER_IS_PLAYING":
      return { ...state, isPlaying: actions.payload };
    case "SET_VIDEOPLAYER_YOUTUBE_VIDEOS":
      return { ...state, youtubeVideos: actions.payload };
    default:
      return state;
  }
};

export default videoPlayerReducer;
