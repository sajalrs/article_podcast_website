const socketReducer = (state={socket: null}, action) => {
    switch(action.type){
        case 'SET_SOCKET':
            return {...state, socket: action.payload}
        default:
            return state
    }
}

export default socketReducer;