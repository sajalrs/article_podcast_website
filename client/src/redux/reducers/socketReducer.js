const socketReducer = (state={socket: {}}, action) => {
    switch(action.type){
        case 'SET_SOCKET':
            return {...state, socket: action.payload}
        default:
            return state
    }
}

export default blogReducer