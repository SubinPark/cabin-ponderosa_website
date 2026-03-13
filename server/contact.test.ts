import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("contact.submitInquiry", () => {
  it("successfully submits a contact inquiry with all fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submitInquiry({
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 123-4567",
      subject: "booking",
      message: "I'd like to book the cabin for next month.",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("Thank you");
  });

  it("successfully submits a contact inquiry with minimal fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submitInquiry({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "",
      subject: "",
      message: "What's the cancellation policy?",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("Thank you");
  });

  it("rejects inquiry with missing name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submitInquiry({
        name: "",
        email: "test@example.com",
        phone: "",
        subject: "",
        message: "Test message",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("rejects inquiry with missing email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submitInquiry({
        name: "Test User",
        email: "",
        phone: "",
        subject: "",
        message: "Test message",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("rejects inquiry with missing message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submitInquiry({
        name: "Test User",
        email: "test@example.com",
        phone: "",
        subject: "",
        message: "",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
