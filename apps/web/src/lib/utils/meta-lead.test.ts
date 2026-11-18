import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { firePendingLead, queuePendingLead } from "./meta-lead";

describe("lead tracking", () => {
  let gtag: ReturnType<typeof vi.fn>;
  let fbq: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    sessionStorage.clear();
    gtag = vi.fn();
    fbq = vi.fn();
    window.gtag = gtag;
    window.fbq = fbq;
    window.history.replaceState({}, "", "/courses/online/cyber-security");
  });

  afterEach(() => {
    delete window.gtag;
    delete window.fbq;
  });

  it("sends one GA4 generate_lead and one Meta Lead for an accepted submission", () => {
    queuePendingLead("cyber-security");
    firePendingLead();

    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", {
      course: "cyber-security",
      form_page: "/courses/online/cyber-security",
      lead_source: "course_lead_form",
    });
    expect(fbq).toHaveBeenCalledTimes(1);
    expect(fbq.mock.calls[0]?.[1]).toBe("Lead");
  });

  it("sends nothing on a refresh of the success page", () => {
    queuePendingLead("fullstack-development");
    firePendingLead();
    firePendingLead();

    expect(gtag).toHaveBeenCalledTimes(1);
    expect(fbq).toHaveBeenCalledTimes(1);
  });

  it("sends nothing when the success page is reached without an accepted submission", () => {
    firePendingLead();

    expect(gtag).not.toHaveBeenCalled();
    expect(fbq).not.toHaveBeenCalled();
  });

  it("waits for gtag when it has not loaded yet", () => {
    vi.useFakeTimers();
    delete window.gtag;
    queuePendingLead("fullstack-development");
    firePendingLead();

    window.gtag = gtag;
    vi.advanceTimersByTime(400);

    expect(gtag).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
