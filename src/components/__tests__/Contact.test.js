import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Contact from "../Contact";

describe("Contact Us Page Test Case", () => {
  // beforeAll(() => {
  //   console.log("Before All");
  // });

  // beforeEach(() => {
  //   console.log("Before Each");
  // });

  // afterAll(() => {
  //   console.log("Before All");
  // });

  // afterEach(() => {
  //   console.log("Before Each");
  // });

  test("Should load contact us component", () => {
    // test or it is the same thing
    render(<Contact />);

    const heading = screen.getByRole("heading");
    // Assertion
    expect(heading).toBeInTheDocument();
  });

  it("Should load button inside Contact Component", () => {
    render(<Contact />);

    // const button = screen.getByRole("button")
    const button = screen.getByText("Submit");
    // Assertion
    expect(button).toBeInTheDocument();
  });

  describe("Input Box Test Cases", () => {
    it("Should load input name inside Contact Component", () => {
      render(<Contact />);

      const inputName = screen.getByPlaceholderText("Name");
      // Assertion
      expect(inputName).toBeInTheDocument();
    });

    it("Should load two input boxes inside Contact Component", () => {
      render(<Contact />);

      // Querying
      const inputBoxes = screen.getAllByRole("textbox");
      // console.log(inputBoxes);  // Returns a JS object, i.e. React Element

      // Assertion
      expect(inputBoxes).toHaveLength(2);
      expect(inputBoxes.length).not.toBe(1);
    });
  });
});
