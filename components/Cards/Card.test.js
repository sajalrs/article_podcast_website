import React from "react";
import { screen } from "@testing-library/react";
import { CardComponent, Card } from "./Card";
import { renderWithReduxAndRouter, defaultStore } from "../../testUtils";
import styles from"./LargeCard/LargeCard.module.css" 

global.scrollTo = jest.fn();
const sampleData = {
    title: 'Preview of the 2020/21 La Liga season',
    author: ' Nithanth Ravindran',
    date: '2020-09-15T09:43:50.086Z',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/92/LaLiga_Santander.svg',
    contentType: Card.ContentType["article-internal"],
    link: 'articles/id=5f608cd6bc43fe0017277139'
}

describe("Card", () => {
  test("Card Component Renders Without CSS", () => {
    renderWithReduxAndRouter(<CardComponent />, {
      initialState: defaultStore,
    });
  });

  test("Card Component Renders With CSS", () => {
    renderWithReduxAndRouter(<CardComponent styles={styles} />, {
      initialState: defaultStore,
    });
  });

  test("Card Component Displays Title When Passed", () => {
    renderWithReduxAndRouter(<CardComponent styles={styles} title={"Test 1"}/>, {
      initialState: defaultStore,
    });
    expect(screen.getByText(/Test 1/)).toBeInTheDocument();
  });

  test("Card Component Displays Author When Passed", () => {
    renderWithReduxAndRouter(<CardComponent styles={styles} author={"Author Test 1"}/>, {
      initialState: defaultStore,
    });
    expect(screen.getByText(/Author Test 1/)).toBeInTheDocument();
  });


//   test("Play Button Not Displayed Usually", () => {
//     renderWithReduxAndRouter(
//       <CardComponent styles={styles} />,
//       {
//         initialState: defaultStore,
//       }
//     );

//   });
});
