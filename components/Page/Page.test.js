import React from "react";
import { screen } from "@testing-library/react";
import Page from "./Page";
import { renderWithReduxAndRouter, defaultStore } from "../../testUtils";

global.scrollTo = jest.fn();

describe("Page", () => {
  test("Page Component Renders", () => {
    renderWithReduxAndRouter(<Page />, {
      initialState: defaultStore,
    });
  });

});
