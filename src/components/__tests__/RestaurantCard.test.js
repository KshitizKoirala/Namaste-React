import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import RestaurantCard, { withPromotedLabel } from "../RestraurantCard";
import MOCK_DATA from "../mocks/restaurantCardMock.json";

it("Should render RestaurantCard Component with props data", () => {
  render(<RestaurantCard resData={MOCK_DATA} />);
  const name = screen.getByText("Qureshi Kitchen");
  expect(name).toBeInTheDocument();
});

it("Should render RestaurantCard Component with Promoted Label", () => {
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  render(<RestaurantCardPromoted resData={MOCK_DATA} />);

  const name = screen.getByText("Promoted");
  expect(name).toBeInTheDocument();
});
