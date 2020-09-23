const sidebarReducer = (state = {clicked: false, fixed: false, topOffset: 100}, action) => {
    switch(action.type){
        case 'SET_SIDEBAR_CLICKED':
            return {...state, clicked: action.payload};
        case 'SET_SIDEBAR_FIXED':
                return {...state, fixed: action.payload};
        case 'SET_TOP_OFFSET':
            return {...state, topOffset: action.payload};
        default:
            return state;
    }
}

export default sidebarReducer;