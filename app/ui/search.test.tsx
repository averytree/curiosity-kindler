import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import SearchBar from "./search";
import { useAppContext } from "../lib/AppContext";
import { formulateMessage, queryAPI } from "../lib/actions";

jest.mock("../lib/AppContext");
jest.mock("../lib/actions");

const mockUseAppContext = useAppContext as jest.Mock;
const mockFormulateMessage = formulateMessage as jest.Mock;
const mockQueryAPI = queryAPI as jest.Mock;

describe("SearchBar", () => {
  const setQuery = jest.fn();
  const setResponses = jest.fn();
  const setResponseStatus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppContext.mockReturnValue({
      query: "",
      setQuery,
      tones: [{ name: "Playful", isSelected: true }],
      intensities: [{ name: "Light", isSelected: true }],
      setResponses,
      setResponseStatus,
    });
  });

  it("renders input and button", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Type a topic...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ignite/i })).toBeInTheDocument();
  });

  it("updates query on typing", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Type a topic...");
    fireEvent.change(input, { target: { value: "Curiosity" } });
    expect(setQuery).toHaveBeenCalledWith("Curiosity");
  });

  it("does nothing if submitted with empty query", () => {
    render(<SearchBar />);
    const form = screen.getByTestId("search-form");
    fireEvent.submit(form);
    expect(mockFormulateMessage).not.toHaveBeenCalled();
    expect(mockQueryAPI).not.toHaveBeenCalled();
  });

  it("submits query, calls API, and updates state on success", async () => {
    mockUseAppContext.mockReturnValue({
      query: "Curiosity",
      setQuery,
      tones: [{ name: "Playful", isSelected: true }],
      intensities: [{ name: "Light", isSelected: true }],
      setResponses,
      setResponseStatus,
    });
    mockFormulateMessage.mockReturnValue("mock-message");
    mockQueryAPI.mockResolvedValue("mock-reply");

    render(<SearchBar />);
    fireEvent.click(screen.getByRole("button", { name: /ignite/i }));

    await waitFor(() => {
      expect(mockFormulateMessage).toHaveBeenCalled();
      expect(mockQueryAPI).toHaveBeenCalledWith("mock-message");
      expect(setResponses).toHaveBeenCalledWith("mock-reply");
      expect(setResponseStatus).toHaveBeenCalledWith("Curiosity");
      expect(setQuery).toHaveBeenCalledWith("");
    });
  });

  it("resets input field after successful submission", async () => {
    const queryValue = "ResetTest";
    mockUseAppContext.mockReturnValue({
      query: queryValue,
      setQuery,
      tones: [{ name: "Playful", isSelected: true }],
      intensities: [{ name: "Light", isSelected: true }],
      setResponses,
      setResponseStatus,
    });
    mockFormulateMessage.mockReturnValue("mock-message");
    mockQueryAPI.mockResolvedValue("mock-reply");

    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Type a topic...");
    fireEvent.change(input, { target: { value: queryValue } });
    fireEvent.click(screen.getByRole("button", { name: /ignite/i }));

    await waitFor(() => {
      expect(setQuery).toHaveBeenCalledWith("");
    });
  });

  it("sets error status when API fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // silence error log

    mockUseAppContext.mockReturnValue({
      query: "FailureTest",
      setQuery,
      tones: [],
      intensities: [],
      setResponses,
      setResponseStatus,
    });
    mockFormulateMessage.mockReturnValue("mock-message");
    mockQueryAPI.mockRejectedValue(new Error("API error"));

    render(<SearchBar />);
    fireEvent.click(screen.getByRole("button", { name: /ignite/i }));

    await waitFor(() => {
      expect(setResponseStatus).toHaveBeenCalledWith("error");
    });

    (console.error as jest.Mock).mockRestore();
  });

  it("shows loading spinner during API call", async () => {
    mockUseAppContext.mockReturnValue({
      query: "LoadingTest",
      setQuery,
      tones: [],
      intensities: [],
      setResponses,
      setResponseStatus,
    });
    mockFormulateMessage.mockReturnValue("mock-message");

    let resolver: (val: string) => void;
    mockQueryAPI.mockReturnValue(new Promise((res) => (resolver = res)));

    render(<SearchBar />);
    fireEvent.click(screen.getByRole("button", { name: /ignite/i }));

    expect(await screen.findByAltText(/loading gif/i)).toBeInTheDocument();

    act(() => {
      resolver!("done");
    });
  });
});
