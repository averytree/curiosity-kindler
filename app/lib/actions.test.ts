import { formulateMessage, queryAPI } from "./actions";
import { Option, introBlurb } from "./definitions";

// Mock global fetch
global.fetch = jest.fn();

describe("formulateMessage", () => {
  const toneOptions: Option[] = [
    { name: "Playful", isSelected: true },
    { name: "Formal", isSelected: false },
  ];
  const intensityOptions: Option[] = [
    { name: "Moderate", isSelected: true },
    { name: "Challenging", isSelected: true },
  ];

  it("should include introBlurb, selected tone, intensity, and query", () => {
    const query = "What is curiosity?";
    const message = formulateMessage(toneOptions, intensityOptions, query);

    expect(message).toContain(introBlurb);
    expect(message).toContain("Tone: Playful");
    expect(message).toContain("Intensities: Moderate, Challenging");
    expect(message).toContain("The text input is: What is curiosity?");
  });

  it("should handle when no options are selected", () => {
    const message = formulateMessage([], [], "Empty case");
    expect(message).toContain("Tone: ."); // empty but still formatted
    expect(message).toContain("Intensities: .");
    expect(message).toContain("The text input is: Empty case.");
  });
});

describe("queryAPI", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should return reply when API call succeeds", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reply: "Hello World" }),
    });

    const result = await queryAPI("test input");
    expect(fetch).toHaveBeenCalledWith("/api/chat", expect.any(Object));
    expect(result).toBe("Hello World");
  });

  it("should throw an error if API response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Bad Request" }),
    });

    await expect(queryAPI("bad input")).rejects.toThrow("Bad Request");
  });

  it("should throw a generic error if no error message is provided", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    await expect(queryAPI("bad input")).rejects.toThrow("Unknown error");
  });
});
