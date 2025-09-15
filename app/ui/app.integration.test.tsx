/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { AppProvider } from "../lib/AppContext";
import App from "../page";

// Mock actions
jest.mock("../lib/actions", () => ({
  formulateMessage: jest.fn(
    (query: string, tones: any[] = [], intensities: any[] = []) => {
      const safeTones = Array.isArray(tones) ? tones : [];
      const safeIntensities = Array.isArray(intensities) ? intensities : [];

      return `msg: ${query}, tones: ${safeTones
        .map((t) => t.name)
        .join(",")}, intensities: ${safeIntensities
        .map((i) => i.name)
        .join(",")}`;
    }
  ),
  queryAPI: jest.fn(),
}));

// Use import, not require
import { formulateMessage, queryAPI } from "../lib/actions";

describe("Full App Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submitting a query with selected tone and intensity calls formulateMessage correctly and updates Responses", async () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    // Select a tone (playful)
    fireEvent.click(screen.getByText(/playful/i));

    // Select an intensity (light)
    fireEvent.click(screen.getByText(/light/i));

    // Enter a query
    const input = screen.getByPlaceholderText(/type a topic/i);
    fireEvent.change(input, { target: { value: "Curiosity" } });

    // Submit the form
    const form = screen.getByTestId("search-form");
    fireEvent.submit(form);

    // Wait until formulateMessage is called with updated context
    await waitFor(() => {
      expect(formulateMessage).toHaveBeenCalledWith(
        expect.arrayContaining([{ name: "playful", isSelected: true }]),
        expect.arrayContaining([{ name: "light", isSelected: true }]),
        "Curiosity"
      );
    });
  });

  it("shows error message in Responses when API fails", async () => {
    (queryAPI as jest.Mock).mockRejectedValueOnce(new Error("API error"));

    render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    // Enter a query that will fail
    const input = screen.getByPlaceholderText(/type a topic/i);
    fireEvent.change(input, { target: { value: "FailureTest" } });

    // Submit the form
    const form = screen.getByTestId("search-form");
    fireEvent.submit(form);

    // Be flexible in case the error message text changes
    await waitFor(() => {
      expect(
        screen.getByText(/sorry|error|something went wrong/i)
      ).toBeInTheDocument();
    });
  });
});
