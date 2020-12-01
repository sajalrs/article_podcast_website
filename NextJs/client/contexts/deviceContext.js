import React, { useReducer, createContext } from "react";

export const DeviceContext = createContext();

const initialState = {
  screen: "desktop",
  // window.innerWidth <= 550
  //   ? "mobile"
  //   : window.innerWidth > 550 && window.innerWidth <= 1350
  //   ? "tablet"
  //   : "desktop",
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
