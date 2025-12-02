import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<Button>Primary</Button>);
    const el = screen.getByRole("button", { name: /primary/i });
    expect(el.className).toMatch(/bg-brand-500/);
  });

  it("applies secondary variant when specified", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const el = screen.getByRole("button", { name: /secondary/i });
    expect(el.className).toMatch(/bg-neutral-100/);
  });
});
