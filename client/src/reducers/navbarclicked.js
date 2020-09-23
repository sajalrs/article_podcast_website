const navbarClickedReducer = (state = false, action) => {
    switch(action.type){
        case 'SET':
            return action.payload;
        default:
            return state;
    }
}

export default navbarClickedReducer;