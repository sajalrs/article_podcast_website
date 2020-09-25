//Navbar Actions
export const setNavbarClicked = (setTo) => {
    return{
        type: 'SET_NAVBAR_CLICKED',
        payload: setTo
    }
}


//Sidebar Actions
export const setSidebarClicked = (setTo) => {
    return{
        type: 'SET_SIDEBAR_CLICKED',
        payload: setTo
    }
}


export const setSidebarFixed = (setTo) => {
    return{
        type: 'SET_SIDEBAR_FIXED',
        payload: setTo
    }
}

export const setTopOffset = (setTo) => {
    return{
        type: 'SET_TOP_OFFSET',
        payload: setTo
    }
}

//AudioPlayer Actions
export const setAudioPlayerPlayer = (setTo) => {
    return {
        type: 'SET_AUDIOPLAYER_PLAYER',
        payload: setTo
    }
}

export const setAudioPlayerCurrentTime = (setTo) => {
    return {
        type: 'SET_AUDIOPLAYER_CURRENTTIME',
        payload: setTo
    }
}

export const setAudioPlayerPodcasts = (setTo) => {
    return {
        type: 'SET_AUDIOPLAYER_PODCASTS',
        payload: setTo
    }
}

//VideoPlayer Actions

export const setVideoPlayerSelected = (setTo) => {
    return {
        type: 'SET_VIDEOPLAYER_SELECTED',
        payload: setTo
    }
}

export const setVideoPlayerIsPlaying = (setTo) => {
    return {
        type: 'SET_VIDEOPLAYER_IS_PLAYING',
        payload: setTo
    }
}

export const setVideoPlayerYoutubeVideos = (setTo) => {
    return {
        type: 'SET_VIDEOPLAYER_YOUTUBE_VIDEOS',
        payload: setTo
    }
}