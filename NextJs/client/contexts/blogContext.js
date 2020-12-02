import React, { useReducer, createContext } from "react";

export const BlogContext = createContext();


const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
            return {...state, articles: action.payload}
        default:
            return state
  }
};

export const BlogContextProvider = props => {
    const [state, dispatch] =  useReducer(reducer, props.initialState);

    return(
        <BlogContext.Provider value={[state, dispatch]}>
            {props.children}
        </BlogContext.Provider>
        
    )
}
