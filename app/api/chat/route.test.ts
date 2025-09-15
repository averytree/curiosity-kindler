// app/api/chat/route.test.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import { POST } from "./route";

jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContent: jest.fn().mockResolvedValue({ text: "mocked response" }),
    },
  })),
}));

// Mock NextResponse so we don't need real Request/Response
jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, init?: any) => ({
      status: init?.status || 200,
      json: async () => data,
    }),
  },
}));

describe("POST /api/chat", () => {
  it("returns 400 if no message provided", async () => {
    const fakeReq = { json: async () => ({}) } as any;

    const res = await POST(fakeReq);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "No message provided" });
  });

  it("returns reply if message provided", async () => {
    const fakeReq = { json: async () => ({ message: "Hello" }) } as any;

    const res = await POST(fakeReq);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("reply");
    expect(typeof body.reply).toBe("string");
  });

  it("handles AI error gracefully", async () => {
    // simulate throwing inside req.json
    const fakeReq = { json: async () => { throw new Error("bad json"); } } as any;

    const res = await POST(fakeReq);

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Server error" });
  });
});
