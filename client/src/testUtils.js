import React from 'react'
import { render } from "@testing-library/react";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

export const renderWithRedux =(component, {initialState} = {}) => {

    const mockStore = configureStore([]);
    const store = mockStore(initialState);

    const utils = {
        dispatch(action){
            return store.dispatch(action);
        },
        
        getDispatchedActions(){
            return store.getActions();
        },
        getState(){
            return store.getState();
        },
    };

    return {
        ...render(<Provider store={store}>{component}</Provider>),
        ...utils
    }

}

export const defaultStore = 
    {
        audioPlayer: { 
          selected: 0,
          isPlaying: false,
          currentTime: 0,
          podcasts:  [
                  {
                    title: "False Nine Podcast #17 Champions League RO16 first leg review",
                    by: "Ishan Sharma, Susajjan Dhungana and Ojash Dangal",
                    link:
                      "https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a",
                    date: "Sat, 12 Sep 2020 08:42:34 GMT",
                    image: "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/8497059/8497059-1599895849523-cbb8b2f53d641.jpg"
                  },
                ],
          audioPlayerRef: null
      },
        blog: {articles: []},
        device:  { isMobile: false},
        login: {isLoggedIn: false, user: null},
        videoPlayer: {
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
        },
      }
