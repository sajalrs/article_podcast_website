import React from "react";
import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithRedux, defaultStore } from "./testUtils";

global.scrollTo = jest.fn();

describe("App", () => {
  test("App Component Renders", () => {
    renderWithRedux(<App />, {
      initialState: defaultStore,
    });
  });

  // test("HTML5 Audio Renders", () => {
  //   renderWithRedux(<App />, {
  //     initialState: defaultStore,
  //   });

  //    expect(screen.getByTestId("html5-audio")).toBeInTheDocument();

  // });

  test("Audio Player Ref Set", () => {
    const { getDispatchedActions } = renderWithRedux(<App />, {
      initialState: defaultStore,
    });
    
   
    expect(
      getDispatchedActions().filter((obj) => {
        return obj.type === "SET_AUDIOPLAYER_REF";
      }).payload
    ).not.toBeNull();
  });
});
