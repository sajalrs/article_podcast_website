const navbarClickedReducer = (state = false, action) => {
    switch(action.type){
        case 'SET_NAVBAR_CLICKED':
            return action.payload;
        default:
            return state;
    }
}

export default navbarClickedReducer;