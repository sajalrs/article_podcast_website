//AudioPlayer Actions
export const setAudioPlayerIsPlayingAction = (setTo) => {
    return {
        type: 'SET_AUDIOPLAYER_IS_PLAYING',
        payload: setTo
    }
}

export const setAudioPlayerCurrentTimeAction = (setTo) => {
    return {
        type: 'SET_AUDIOPLAYER_CURRENT_TIME',
        payload: setTo
    }
}

export const setAudioPlayerPodcastsAction = (setTo) => {
    return {
        type: 'SET_AUDIOPLAYER_PODCASTS',
        payload: setTo
    }
}

export const setAudioPlayerSelectedAction = (setTo) => {
    return {
        type: 'SET_AUDIOPLAYER_SELECTED',
        payload: setTo
    }
}

export const setAudioPlayerRefAction = (setTo) => {
    return {
        type: 'SET_AUDIOPLAYER_REF',
        payload: setTo
    }
}

export const pauseAudioAction =() =>{
    return{
        type: 'SET_AUDIOPLAYER_IS_PLAYING',
        payload: false
    }
}

export const playAudioAction = (setTo) => {
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

export const setVideoPlayerSelectedAction = (setTo) => {
    return {
        type: 'SET_VIDEOPLAYER_SELECTED',
        payload: setTo
    }
}

export const setVideoPlayerIsPlayingAction = (setTo) => {
    return {
        type: 'SET_VIDEOPLAYER_IS_PLAYING',
        payload: setTo
    }
}

export const setVideoPlayerYoutubeVideosAction = (setTo) => {
    return {
        type: 'SET_VIDEOPLAYER_YOUTUBE_VIDEOS',
        payload: setTo
    }
}

export const playVideoAction = (setTo) => {
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

export const closeVideoAction = () => {
    return {
        type: 'SET_VIDEOPLAYER_IS_PLAYING',
        payload: false
    }
}

//Articles Actions
export const setBlogArticlesAction = (setTo) => {
    return{
        type: 'SET_ARTICLES',
        payload: setTo
    }
}

//Header Actions
export const setHeaderBoxRefAction = (setTo) => {
    return{
        type: 'SET_HEADER_BOX_REF',
        payload: setTo
    }
}

//Login Actions
export const setIsLoggedInAction = (setTo) => {
    return {
        type: 'SET_IS_LOGGED_IN',
        payload: setTo
    }
}

export const setUserAction = (setTo) => {
    return{
        type: 'SET_USER',
        payload: setTo
    }
}

//Device Actions
export const setScreenAction = (setTo) => {
    return{
        type: 'SET_SCREEN',
        payload: setTo
    }
}

//Socket Actions
export const setSocketAction = (setTo) => {
    return{
        type: 'SET_SOCKET',
        payload: setTo
    }
}