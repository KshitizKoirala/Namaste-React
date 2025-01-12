import "@testing-library/jest-dom";
import { act } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import Header from "../Header";
import appStore from "../../utils/appStore";
import RestaurantMenu from "../RestaurantMenu";
import UserContext from "../../utils/UserContext";
import MOCK_DATA from "../mocks/mockRestaurantMenu.json";
import Cart from "../CartPage";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  });
});

beforeEach(async () => {
  await act(async () => {
    render(
      <Provider store={appStore}>
        <UserContext.Provider value={"Elon"}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </UserContext.Provider>
        <RestaurantMenu />
        <Cart />
      </Provider>
    );
  });
});

afterEach(() => {
  jest.resetModules();
});

describe("Items are added to the Cart", () => {
  it("should load the header component", () => {
    expect(screen.getByText("Cart 0 items")).toBeInTheDocument();
  });

  it("should load and expand RestaurantMenuComponent", async () => {
    const accordionHeader = screen.getByText("Biryani (16)");
    fireEvent.click(accordionHeader);

    const menuItem = screen.getAllByTestId("foodItems");
    expect(menuItem.length).toBe(16);
  });

  it("should check if Cart and Cart Page has 2 items", async () => {
    const accordionHeader = screen.getByText("Biryani (16)");
    fireEvent.click(accordionHeader);

    const menuItem = screen.getAllByTestId("foodItems");
    expect(menuItem.length).toBe(16);

    const addBtns = screen.getAllByRole("button", { name: "Add +" });
    fireEvent.click(addBtns[0]);
    fireEvent.click(addBtns[1]);

    expect(screen.getByText("Cart 2 items")).toBeInTheDocument();

    const cartItems = screen.getAllByTestId("foodItems");
    expect(cartItems.length).toBe(18); // 16 items from RestaurantMenu and 2 from Cart Page

    const clearCartButton = screen.getByRole("button", { name: "Clear Cart" });
    fireEvent.click(clearCartButton);

    const cartItemsAfterClear = screen.getAllByTestId("foodItems");
    expect(cartItemsAfterClear.length).toBe(16); // 16 items from RestaurantMenu and 0 from Cart Page
  });
});
