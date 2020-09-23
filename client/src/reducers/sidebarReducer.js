const sidebarReducer = (state = {clicked: false, fixed: false}, action) => {
    switch(action.type){
        case 'SET_SIDEBAR_CLICKED':
            return {...state, clicked: action.payload};
        case 'SET_SIDEBAR_FIXED':
                return {...state, fixed: action.payload};
        default:
            return state;
    }
}

export default sidebarReducer;