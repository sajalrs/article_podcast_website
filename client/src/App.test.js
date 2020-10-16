import React from "react";
import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithRedux, defaultStore } from "./testUtils";

global.scrollTo = jest.fn();

describe("App", () => {
  test("App Component Renders", () => {
    renderWithRedux(<App />, {
      initialState: defaultStore
    });
  });

});
