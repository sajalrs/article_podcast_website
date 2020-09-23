const sidebarClickedReducer = (state = false, action) => {
    switch(action.type){
        case 'SET_SIDEBAR_CLICKED':
            return action.payload;
        default:
            return state;
    }
}

export default sidebarClickedReducer;