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

export const setAudioPlayerRef = (setTo) => {
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

export const closeVideo = () => {
    return {
        type: 'SET_VIDEOPLAYER_IS_PLAYING',
        payload: false
    }
}

//Articles Actions
export const setBlogArticles = (setTo) => {
    return{
        type: 'SET_ARTICLES',
        payload: setTo
    }
}

//Header Actions
export const setHeaderBoxRef = (setTo) => {
    return{
        type: 'SET_HEADER_BOX_REF',
        payload: setTo
    }
}

//Login Actions
export const setIsLoggedIn = (setTo) => {
    return {
        type: 'SET_IS_LOGGED_IN',
        payload: setTo
    }
}

export const setUser = (setTo) => {
    return{
        type: 'SET_USER',
        payload: setTo
    }
}

//Device Actions
export const setIsMobile = (setTo) => {
    return{
        type: 'SET_IS_MOBILE',
        payload: setTo
    }
}

export const setIsTablet = (setTo) => {
    return{
        type: 'SET_IS_TABLET',
        payload: setTo
    }
}


export const setIsDesktop = (setTo) => {
    return{
        type: 'SET_IS_DESKTOP',
        payload: setTo
    }
}

//Socket Actions
export const setSocket = (setTo) => {
    return{
        type: 'SET_SOCKET',
        payload: setTo
    }
}