import React from "react";
import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithRedux, defaultStore } from "./testUtils";

global.scrollTo = jest.fn();

describe("App", () => {
  test("App Component Renders", () => {
    const {
      getDispatchedActions,
    } = renderWithRedux(<App />, {
      initialState: defaultStore
    });

    console.log(getDispatchedActions())
  });


  // test("Audio Player Ref Stored", () => {
  //   render(
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   );

  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  // });
});
