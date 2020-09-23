const navbarReducer = (state = {clicked: false}, action) => {
    switch(action.type){
        case 'SET_NAVBAR_CLICKED':
            return {...state, clicked: action.payload};
        default:
            return state;
    }
}

export default navbarReducer;