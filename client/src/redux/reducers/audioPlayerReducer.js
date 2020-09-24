const audioPlayerReducer = (
  state = { player: "paused", currentTime: 0,
    podcasts: {
        items: [
            {
              title: "False Nine Podcast #17 Champions League RO16 first leg review",
              by: "Ishan Sharma, Susajjan Dhungana and Ojash Dangal",
              link:
                "https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a",
              date: "Sat, 12 Sep 2020 08:42:34 GMT",
              image: "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/8497059/8497059-1599895849523-cbb8b2f53d641.jpg"
            },
          ],
          currentlyPlaying: 0,
    }
},
  actions
) => {
  switch (actions.type) {
    case "SET_AUDIOPLAYER_PLAYER":
      return { ...state, player: actions.payload };
    case "SET_AUDIOPLAYER_CURRENTTIME":
      return { ...state, currentTime: actions.payload };
    case "SET_AUDIOPLAYER_PODCASTS":
        return {...state, podcasts: actions.payload};
    default:
      return state;
  }
};

export default audioPlayerReducer;
