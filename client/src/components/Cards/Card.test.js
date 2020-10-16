import React from "react";
import { screen } from "@testing-library/react";
import {CardComponent, Card} from "./Card";
import { renderWithReduxAndRouter, defaultStore } from "../../testUtils";

global.scrollTo = jest.fn();

describe("Card", () => {
  test("Card Component Renders", () => {
    renderWithReduxAndRouter(<CardComponent />, {
      initialState: defaultStore,
    });

    screen.debug();
  });

});
