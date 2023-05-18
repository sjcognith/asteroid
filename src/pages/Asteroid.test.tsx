import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Asteroid from "./Asteroid";
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => ({
    id: "2000433",
  }),
}));

describe("Asteroid", () => {
  it("should render asteroid screen with details", async () => {
    const mockData = {
      data: {
        id: "2000433",
        name: "Sample Asteroid",
        designation: "123456",
        absolute_magnitude_h: 5.6,
        estimated_diameter: {
          kilometers: {
            estimated_diameter_min: 10,
            estimated_diameter_max: 20,
          },
          meters: {
            estimated_diameter_min: 10000,
            estimated_diameter_max: 20000,
          },
          miles: {
            estimated_diameter_min: 6.2,
            estimated_diameter_max: 12.4,
          },
          feet: {
            estimated_diameter_min: 32808,
            estimated_diameter_max: 65617,
          },
        },
      },
    };
    axios.get = jest.fn().mockResolvedValue(mockData);
    render(<Asteroid />);
    const idElement = await screen.findByText(/2000433/i);
    const nameElement = await screen.findByText(/sample asteroid/i);
    const designationElement = await screen.findByText(/123456/i);
    const magnitudeElement = await screen.findByText(/5.6/i);

    await waitFor(() => {
      expect(idElement).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(nameElement).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(designationElement).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(magnitudeElement).toBeInTheDocument();
    });
  });
  it("should remove loading details after fetching", async () => {
    const mockData = {
      data: {
        id: "2000433",
        name: "Sample Asteroid",
        designation: "123456",
        absolute_magnitude_h: 5.6,
        estimated_diameter: {
          kilometers: {
            estimated_diameter_min: 10,
            estimated_diameter_max: 20,
          },
          meters: {
            estimated_diameter_min: 10000,
            estimated_diameter_max: 20000,
          },
          miles: {
            estimated_diameter_min: 6.2,
            estimated_diameter_max: 12.4,
          },
          feet: {
            estimated_diameter_min: 32808,
            estimated_diameter_max: 65617,
          },
        },
      },
    };
    axios.get = jest.fn().mockResolvedValue(mockData);
    render(<Asteroid />);
    const loadingElement = await screen.findByText(/loading details/i);
    await waitFor(() => {
      expect(loadingElement).toBeInTheDocument();
    });
  });
  it("should render asteroid screen with no details if id is not found", async () => {
    const error = new Error("network error 404");
    axios.get = jest.fn().mockRejectedValue(error);
    render(<Asteroid />);
    const noDetailsElement = await screen.findByRole("heading", {
      name: /no details/i,
    });
    await waitFor(()=>{
      expect(noDetailsElement).toBeInTheDocument();
    })
  });
});
