import { render, screen, fireEvent } from "@testing-library/react";
import Intensity from "./intensity";

// Mock AppContext
const mockSetIntensities = jest.fn();

jest.mock("../lib/AppContext", () => ({
  useAppContext: () => ({
    intensities: [
      { name: "Light", isSelected: false },
      { name: "Moderate", isSelected: true },
      { name: "Challenging", isSelected: false },
    ],
    setIntensities: mockSetIntensities,
  }),
}));

describe("Intensity component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the heading", () => {
    render(<Intensity />);
    expect(screen.getByText("Question Depth:")).toBeInTheDocument();
  });

  it("renders all intensities as buttons", () => {
    render(<Intensity />);
    expect(screen.getByRole("button", { name: "Light" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Moderate" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Challenging" })).toBeInTheDocument();
  });

  it("applies selected styles when isSelected = true", () => {
    render(<Intensity />);
    const moderateButton = screen.getByRole("button", { name: "Moderate" });
    expect(moderateButton.className).toMatch(/bg-amber-700/);
  });

  it("applies unselected styles when isSelected = false", () => {
    render(<Intensity />);
    const lightButton = screen.getByRole("button", { name: "Light" });
    expect(lightButton.className).toMatch(/bg-gray-200/);
  });

  it("calls setIntensities with only the clicked button selected", () => {
    render(<Intensity />);
    const lightButton = screen.getByRole("button", { name: "Light" });
    fireEvent.click(lightButton);

    expect(mockSetIntensities).toHaveBeenCalledTimes(1);
    const updated = mockSetIntensities.mock.calls[0][0];

    expect(updated).toEqual([
      { name: "Light", isSelected: true },
      { name: "Moderate", isSelected: false },
      { name: "Challenging", isSelected: false },
    ]);
  });

  it("ensures only the last clicked button remains selected in sequence", () => {
    render(<Intensity />);
    const lightButton = screen.getByRole("button", { name: "Light" });
    const challengingButton = screen.getByRole("button", { name: "Challenging" });

    // First click Light
    fireEvent.click(lightButton);
    let updated = mockSetIntensities.mock.calls[0][0];
    expect(updated).toEqual([
      { name: "Light", isSelected: true },
      { name: "Moderate", isSelected: false },
      { name: "Challenging", isSelected: false },
    ]);

    // Then click Challenging
    fireEvent.click(challengingButton);
    updated = mockSetIntensities.mock.calls[1][0];
    expect(updated).toEqual([
      { name: "Light", isSelected: false },
      { name: "Moderate", isSelected: false },
      { name: "Challenging", isSelected: true },
    ]);
  });
});
