import React from "react";
import { render, screen} from "@testing-library/react";
import App from "./App";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";

global.scrollTo = jest.fn();
const mockStore = configureStore([]);

describe("App", () => {
  let store;
  beforeEach(() => {
    store = mockStore({

    });
  })

  store.dispatch = jest.fn();

  test("App Component Renders", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test("Audio Player Ref Stored", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

 
});
