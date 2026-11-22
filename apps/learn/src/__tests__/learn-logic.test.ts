import { describe, expect, it } from "vitest";

import {
  ProgressReporter,
  resumePosition,
} from "../features/player/progress-reporter";
import { clampPercent, formatDuration, lectureMeta } from "../lib/format";
import { passwordProblems } from "../lib/password-rules";

describe("ProgressReporter", () => {
  it("sends an opening heartbeat on the first update, then waits for the interval", () => {
    const r = new ProgressReporter(0, 15_000);
    expect(r.update(0.2, 1_000)).toBe(true);
    r.markSent(1_000);
    expect(r.update(10, 10_000)).toBe(false);
    expect(r.update(16, 16_000)).toBe(true);
  });

  it("does not send when the position hasn't moved", () => {
    const r = new ProgressReporter(120, 15_000);
    r.update(120, 0);
    r.markSent(0);
    expect(r.update(120.4, 20_000)).toBe(false);
  });

  it("sends again only after another full interval", () => {
    const r = new ProgressReporter(0, 15_000);
    r.update(0, 0);
    r.markSent(0);
    expect(r.update(15, 15_000)).toBe(true);
    expect(r.markSent(15_000)).toBe(15);
    expect(r.update(20, 20_000)).toBe(false);
    expect(r.update(30, 30_000)).toBe(true);
  });

  it("ignores bad positions", () => {
    const r = new ProgressReporter(0);
    expect(r.update(Number.NaN, 99_999)).toBe(false);
    expect(r.update(-3, 99_999)).toBe(false);
  });
});

describe("resumePosition", () => {
  it("resumes where the student stopped", () =>
    expect(resumePosition(754.6, 1500)).toBe(754));
  it("starts from zero for tiny offsets", () =>
    expect(resumePosition(3, 1500)).toBe(0));
  it("starts from zero near the end", () =>
    expect(resumePosition(1495, 1500)).toBe(0));
  it("resumes when the duration is unknown", () =>
    expect(resumePosition(60, 0)).toBe(60));
});

describe("format helpers", () => {
  it("formats durations", () => {
    expect(formatDuration(754)).toBe("12:34");
    expect(formatDuration(4000)).toBe("1:06:40");
    expect(formatDuration(0)).toBe("00:00");
  });
  it("labels lectures", () => {
    expect(lectureMeta("text", 0)).toBe("Reading");
    expect(lectureMeta("video", 0)).toBe("Video");
    expect(lectureMeta("video", 65)).toBe("01:05");
  });
  it("clamps percents", () => {
    expect(clampPercent(140)).toBe(100);
    expect(clampPercent(-1)).toBe(0);
    expect(clampPercent(Number.NaN)).toBe(0);
  });
});

describe("passwordProblems", () => {
  it("accepts a valid password", () =>
    expect(passwordProblems("Passw0rdOK")).toEqual([]));
  it("lists every missing rule", () => {
    expect(passwordProblems("abc")).toEqual([
      "At least 8 characters",
      "At least one number",
    ]);
    expect(passwordProblems("12345678")).toEqual(["At least one letter"]);
  });
  it("rejects more than 72 bytes", () =>
    expect(passwordProblems(`a1${"x".repeat(80)}`)).toContain(
      "At most 72 characters",
    ));
});
