const jwtTokenReducer = (state={token: ""}, action) => {
    switch(action.type){
        case "SET_JWT_TOKEN":
            return {...state, token: action.payload};
        default: 
            return state;
    }

}

export default jwtTokenReducer;