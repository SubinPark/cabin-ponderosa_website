import { describe, expect, it } from "vitest";

describe("Google Maps API Key", () => {
  it("should have VITE_GOOGLE_MAPS_API_KEY environment variable set", () => {
    // Check that the API key is available in the environment
    // Note: In the browser, this will be injected via Vite's environment variable replacement
    const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY;
    
    // The test passes if the key exists and is a non-empty string
    expect(apiKey).toBeDefined();
    expect(typeof apiKey).toBe("string");
    expect(apiKey?.length).toBeGreaterThan(0);
  });

  it("should have a valid Google Maps API key format", () => {
    const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY;
    
    // Google Maps API keys typically start with "AIza" and are at least 39 characters
    expect(apiKey).toMatch(/^AIza[A-Za-z0-9_-]+$/);
  });
});
