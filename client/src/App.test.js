import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

global.scrollTo = jest.fn()

describe("App", () => {
  
  const composeEnhancer = compose;
  const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
  );



  test("renders App component", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
