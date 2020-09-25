const articlesReducer = (state={articles: []}, actions) => {
    switch(actions.type){
        case 'SET_ARTICLEs':
            return {...state, articles: actions.payload}
        default:
            return state
    }
}

export default articlesReducer