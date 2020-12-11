import React, { useReducer, createContext } from "react";

export const SocketContext = createContext();

const initialState = {socket: null}

const reducer = (state, action) => {
  switch(action.type){
    case 'SET_SOCKET':
        return {...state, socket: action.payload}
    default:
        return state
}

};

export const SocketContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SocketContext.Provider value={[state, dispatch]}>
      {props.children}
    </SocketContext.Provider>
  );
};
