// @vitest-environment jsdom
// Tests the contact form end to end in a browser-like DOM: a valid message goes through the real
// EmailJS send (with the network mocked) and the success modal appears, or the failure message
// shows when the send fails.
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { mockFetch } from "@/test/helpers";
import Contact_Form from "./Contact_Form";

afterEach(cleanup);

// Fake EmailJS settings: EmailJS refuses to send without them, before it calls fetch.
beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY", "test-public-key");
  vi.stubEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID", "test-service-id");
  vi.stubEnv("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID", "test-template-id");
});

function fillAndSend() {
  fireEvent.change(screen.getByLabelText("full_name"), {
    target: { value: "Test Visitor" },
  });
  fireEvent.change(screen.getByLabelText("email"), {
    target: { value: "visitor@example.com" },
  });
  fireEvent.change(screen.getByLabelText("additional_information"), {
    target: { value: "Hello there." },
  });
  fireEvent.click(screen.getByLabelText("form_submit_button"));
}

describe("Contact_Form", () => {
  it("shows the success modal after a successful send", async () => {
    mockFetch({ body: {} });
    render(<Contact_Form />);

    fillAndSend();

    expect(await screen.findByText("Message Sent!")).toBeTruthy();
  });

  it("shows the failure message when the send fails", async () => {
    mockFetch({ status: 400, body: {} });
    render(<Contact_Form />);

    fillAndSend();

    expect(
      await screen.findByText("*Message failed to send. Please try again"),
    ).toBeTruthy();
    expect(screen.queryByText("Message Sent!")).toBeNull();
  });
});
