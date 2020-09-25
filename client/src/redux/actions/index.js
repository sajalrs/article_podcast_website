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
export const setAudioPlayerIsPlaying = (setTo) => {
    return {
        type: 'SET_AUDIOPLAYER_IS_PLAYING',
        payload: setTo
    }
}

export const setAudioPlayerCurrentTime = (setTo) => {
    return {
        type: 'SET_AUDIOPLAYER_CURRENT_TIME',
        payload: setTo
    }
}

export const setAudioPlayerPodcasts = (setTo) => {
    return {
        type: 'SET_AUDIOPLAYER_PODCASTS',
        payload: setTo
    }
}

export const setAudioPlayerSelected = (setTo) => {
    return {
        type: 'SET_AUDIOPLAYER_SELECTED',
        payload: setTo
    }
}

export const setAudioPLayerRef = (setTo) => {
    return {
        type: 'SET_AUDIOPLAYER_REF',
        payload: setTo
    }
}

export const pauseAudio =() =>{
    return{
        type: 'SET_AUDIOPLAYER_IS_PLAYING',
        payload: false
    }
}

export const playAudio = (setTo) => {
    if(setTo === undefined){
        return {
            type: 'SET_AUDIOPLAYER_IS_PLAYING',
            payload: true
        }
    } else{
        return {
            type: 'PLAY_AUDIO',
            payload: setTo
        }
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

export const playVideo = (setTo) => {
    if(setTo === undefined){
        return {
            type: 'SET_VIDEOPLAYER_IS_PLAYING',
            payload: true
        }
    } else{
        return {
            type: 'PLAY_VIDEO',
            payload: setTo
        }
    }
}

export const pauseVideo = () => {
    return {
        type: 'SET_VIDEOPLAYER_IS_PLAYING',
        payload: false
    }
}

