import { render, screen, act } from "@testing-library/react";
import Responses from "./responses";
import { useAppContext } from "../lib/AppContext";

// Mock context
jest.mock("../lib/AppContext", () => ({
  useAppContext: jest.fn(),
}));

const mockUseAppContext = useAppContext as jest.Mock;

// Speed up timers for typewriter tests
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});

describe("Responses component", () => {
  it("renders empty container when status is 'empty'", () => {
    mockUseAppContext.mockReturnValue({
      responses: "",
      responseStatus: "empty",
    });

    render(<Responses />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.queryByText(/Sorry, something went wrong/i)).not.toBeInTheDocument();
  });

  it("renders error message when status is 'error'", () => {
    mockUseAppContext.mockReturnValue({
      responses: "",
      responseStatus: "error",
    });

    render(<Responses />);
    expect(screen.getByText(/Sorry, something went wrong/i)).toBeInTheDocument();
  });

  it("renders question heading when successful", () => {
    mockUseAppContext.mockReturnValue({
      responses: "First response*Second response",
      responseStatus: "What is your question?",
    });

    render(<Responses />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("What is your question?");
  });

  it("renders responses with typewriter effect", () => {
    mockUseAppContext.mockReturnValue({
      responses: "First response*Second response",
      responseStatus: "Some question",
    });

    render(<Responses />);

    // Initially nothing typed yet
    expect(screen.queryByText("First response")).not.toBeInTheDocument();

    // Advance timers enough to complete typing
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText("First response")).toBeInTheDocument();
  });

  it("resets when responses change", () => {
    const { rerender } = render(<Responses />);
    mockUseAppContext.mockReturnValue({
      responses: "Old response",
      responseStatus: "Old question",
    });
    rerender(<Responses />);
    expect(screen.getByRole("heading")).toHaveTextContent("Old question");

    // Change responses
    mockUseAppContext.mockReturnValue({
      responses: "New response",
      responseStatus: "New question",
    });
    rerender(<Responses />);
    expect(screen.getByRole("heading")).toHaveTextContent("New question");
  });
});
