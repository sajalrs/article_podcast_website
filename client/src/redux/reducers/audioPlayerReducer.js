const audioPlayerReducer = (state ={player: "paused", currentTime: 0}, actions) => {
    switch(actions.type){
        case 'SET_AUDIOPLAYER_PLAYER':
            return {...state, player: actions.payload}
        case 'SET_AUDIOPLAYER_CURRENTTIME':
            return {...state, currentTime: actions.payload}
        default: 
            return state;
    }
}

export default audioPlayerReducer;