import React, { useReducer, createContext } from "react";

export const HeaderContext = createContext();

const initialState = {
  headerBoxRef: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_HEADER_BOX_REF":
      return { ...state, headerBoxRef: action.payload };
    default:
      return state;
  }
};

export const HeaderContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HeaderContext.Provider value={[state, dispatch]}>
      {props.children}
    </HeaderContext.Provider>
  );
};
