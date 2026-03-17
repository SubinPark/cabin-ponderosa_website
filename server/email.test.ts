import { describe, expect, it } from "vitest";
import { Resend } from "resend";

describe("Resend Email Service", () => {
  it("validates that RESEND_API_KEY is configured and working", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    
    expect(apiKey).toBeDefined();
    expect(apiKey).not.toBe("");
    expect(apiKey).not.toBe("undefined");
    
    // Initialize Resend with the API key
    const resend = new Resend(apiKey);
    
    // Test the API key by making a simple request
    // We'll use the emails.send method with a test email
    try {
      const response = await resend.emails.send({
        from: "onboarding@resend.dev", // Resend's test sender
        to: "delivered@resend.dev", // Resend's test recipient
        subject: "Test Email",
        html: "<p>This is a test email to validate the Resend API key.</p>",
      });
      
      // If we get here without an error, the API key is valid
      expect(response).toBeDefined();
      expect(response.data?.id).toBeDefined();
    } catch (error) {
      // If there's an authentication error, the API key is invalid
      throw new Error(`Resend API key validation failed: ${error}`);
    }
  });
});
