import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";



const makeStore = (preloadState, options) => {
  const mainReducer = (state = preloadState, action) => action.type === HYDRATE ? action.payload : reducers(state, action);
  const createStoreWithThunkMiddleware = applyMiddleware(thunkMiddleware)(createStore)
  
  return createStoreWithThunkMiddleware(mainReducer, options);
};



export const wrapper = createWrapper(makeStore, { debug: true });
