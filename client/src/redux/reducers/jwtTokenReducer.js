const jwtTokenReducer = (state={jwtToken: ""}, action) => {
    switch(action.type){
        case "SET_JWT_TOKEN":
            return {...state, jwtToken: action.payload};
        default: 
            return state;
    }

}

export default jwtTokenReducer;