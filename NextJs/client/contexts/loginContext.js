import React, { useReducer, createContext } from "react";

export const LoginContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const LoginContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, props.initialState);

  return (
    <LoginContext.Provider value={[state, dispatch]}>
      {props.children}
    </LoginContext.Provider>
  );
};
