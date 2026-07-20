import { describe, expect, it } from "vitest";
import { resolveProductCtas } from "./resolveProductCtas";

describe("resolveProductCtas", () => {
  it("uses package defaults when settings empty", () => {
    const c = resolveProductCtas({});
    expect(c.githubUrl).toContain("github.com");
    expect(c.primaryCtaHref).toBe("#install");
    expect(c.docsUrl).toBe("");
  });

  it("prefers explicit settings", () => {
    const c = resolveProductCtas({
      docsUrl: "https://docs.example.com",
      primaryCtaLabel: "Try it",
      primaryCtaHref: "/signup",
    });
    expect(c.docsUrl).toBe("https://docs.example.com");
    expect(c.primaryCtaLabel).toBe("Try it");
    expect(c.primaryCtaHref).toBe("/signup");
  });
});
