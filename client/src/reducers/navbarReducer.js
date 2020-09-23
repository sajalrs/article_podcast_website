const navbarReducer = (state = {clicked: false, fixed: false}, action) => {
    switch(action.type){
        case 'SET_NAVBAR_CLICKED':
            return {...state, clicked: action.payload};
        case 'SET_NAVBAR_FIXED':
            return {...state, fixed: action.payload};
        default:
            return state;
    }
}

export default navbarReducer;