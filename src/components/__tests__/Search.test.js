import { act } from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import Body from "../Body";
import MOCK_DATA from "../mocks/mockRestuarantListData.json";
import { BrowserRouter } from "react-router-dom";
import UserContext from "../../utils/UserContext";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should Search Res List for shah text input", async () => {
  await act(async () =>
    render(
      <UserContext.Provider value={"Elon"}>
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      </UserContext.Provider>
    )
  );

  const cardsBeforeSearch = screen.getAllByTestId("resCard");
  expect(cardsBeforeSearch.length).toBe(51);

  const searchButton = screen.getByRole("button", { name: "Search" });

  const searchInput = screen.getByTestId("searchInput");

  fireEvent.change(searchInput, { target: { value: "shah" } });

  fireEvent.click(searchButton);

  // Assertion
  // RestaurantCard must be 1 card after searching
  const cardsAfterSearch = screen.getAllByTestId("resCard");

  expect(cardsAfterSearch.length).toBe(1);

  expect(searchButton).toBeInTheDocument();
});

it("Should Filter Top Rated Restaurant", async () => {
  await act(async () => {
    render(
      <UserContext.Provider value={"Elon"}>
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      </UserContext.Provider>
    );
  });

  const cardsBeforeFilter = screen.getAllByTestId("resCard");
  expect(cardsBeforeFilter.length).toBe(51);

  const filterTopRatedRestaurantButton = screen.getByRole("button", {
    name: "Top Rated Restaurants",
  });

  fireEvent.click(filterTopRatedRestaurantButton);

  const cardsAfterFilter = screen.getAllByTestId("resCard");
  expect(cardsAfterFilter.length).toBe(28);
});
