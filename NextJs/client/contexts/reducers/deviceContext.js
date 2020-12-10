import React, { useReducer, createContext } from "react";

export const DeviceContext = createContext();

const initialState = {
  screen: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SCREEN":
      return { ...state, screen: action.payload };
    default:
      return state;
  }
};

export const DeviceContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DeviceContext.Provider value={[state, dispatch]}>
      {props.children}
    </DeviceContext.Provider>
  );
};
