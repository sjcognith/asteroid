import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./Home";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: {
        near_earth_objects: [
          {
            id: "2000433",
          },
        ],
      },
    }),
  },
}));

describe("HomeScreen", () => {
  it("should render form in home screen", () => {
    render(<Home />);
    const formElement = screen.getByTestId("form");
    expect(formElement).toBeInTheDocument();
  });
  describe("Input", () => {
    it("is empty on initial render", () => {
      render(<Home />);
      const inputElement: any = screen.getByRole("textbox");
      expect(inputElement.value).toBe("");
    });
  });
  describe("View Asteroid Button", () => {
    it("is disabled on initial render", () => {
      render(<Home />);
      const buttonElement: any = screen.getByRole("button", {
        name: /view asteroid/i,
      });
      expect(buttonElement).toBeDisabled();
    });
    it("is disabled when input value is empty", () => {
      render(<Home />);
      const buttonElement: any = screen.getByRole("button", {
        name: /view asteroid/i,
      });
      const inputElement: any = screen.getByRole("textbox");
      fireEvent.change(inputElement, { target: { value: "" } });
      expect(buttonElement).toBeDisabled();
    });
    it("is enabled when input has value", () => {
      render(<Home />);
      const buttonElement: any = screen.getByRole("button", {
        name: /view asteroid/i,
      });
      const inputElement: any = screen.getByRole("textbox");
      fireEvent.change(inputElement, { target: { value: "2000433" } });
      expect(buttonElement).toBeEnabled();
    });
  });
  describe("Random Asteroid Button", () => {
    it("should populate the input with random id when clicked", async () => {
      render(<Home />);
      const buttonElement = screen.getByRole("button", {
        name: /random asteroid/i,
      });
      fireEvent.click(buttonElement);
      const inputElement: any = await screen.findByDisplayValue(/2000433/i);
      expect(inputElement).toBeInTheDocument();
    });
  });
});
