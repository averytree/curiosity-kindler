import { render, screen, fireEvent } from "@testing-library/react";
import Tones from "./tones";
import { useAppContext } from "../lib/AppContext";

jest.mock("../lib/AppContext");

const mockUseAppContext = useAppContext as jest.Mock;

describe("Tones", () => {
  const setTones = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppContext.mockReturnValue({
      tones: [
        { name: "Playful", isSelected: false },
        { name: "Formal", isSelected: true },
      ],
      setTones,
    });
  });

  it("renders all tones from context", () => {
    render(<Tones />);
    expect(screen.getByText("Playful")).toBeInTheDocument();
    expect(screen.getByText("Formal")).toBeInTheDocument();
  });

  it("applies selected styles when tone is selected", () => {
    render(<Tones />);
    const formalBtn = screen.getByText("Formal");
    expect(formalBtn.className).toMatch(/bg-amber-700/);
  });

  it("applies unselected styles when tone is not selected", () => {
    render(<Tones />);
    const playfulBtn = screen.getByText("Playful");
    expect(playfulBtn.className).toMatch(/bg-gray-200/);
  });

  it("toggles tone selection on click", () => {
    render(<Tones />);
    const playfulBtn = screen.getByText("Playful");
    fireEvent.click(playfulBtn);

    expect(setTones).toHaveBeenCalledWith([
      { name: "Playful", isSelected: true },
      { name: "Formal", isSelected: true },
    ]);
  });

  it("deselects a selected tone on click", () => {
    render(<Tones />);
    const formalBtn = screen.getByText("Formal");
    fireEvent.click(formalBtn);

    expect(setTones).toHaveBeenCalledWith([
      { name: "Playful", isSelected: false },
      { name: "Formal", isSelected: false },
    ]);
  });
});
