const headerReducer = (state={headerBoxRef: null}, action) => {
    switch(action.type){
        case 'SET_HEADER_BOX_REF':
            return {...state, headerBoxRef: action.payload}
        default:
            return state
    }
}

export default headerReducer