import { describe, expect, it } from "vitest";
import { isSameHref, normalizeHref, resolveProductCtas } from "./resolveProductCtas";

describe("resolveProductCtas", () => {
  it("uses package defaults when settings empty", () => {
    const c = resolveProductCtas({});
    expect(c.githubUrl).toContain("github.com");
    expect(c.primaryCtaHref).toBe("/get-started");
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

  it("reads nested header config from installed theme", () => {
    const c = resolveProductCtas({
      header: {
        docsUrl: "https://docs.from-header",
        githubUrl: "https://github.com/x",
      },
    });
    expect(c.docsUrl).toBe("https://docs.from-header");
    expect(c.githubUrl).toBe("https://github.com/x");
  });
});

describe("isSameHref", () => {
  it("treats trailing slash and case as equal", () => {
    expect(isSameHref("https://GitHub.com/x/", "https://github.com/x")).toBe(true);
    expect(normalizeHref("https://github.com/x/")).toBe("https://github.com/x");
  });

  it("distinguishes different destinations", () => {
    expect(isSameHref("#install", "https://github.com/x")).toBe(false);
    expect(isSameHref("", "https://github.com/x")).toBe(false);
  });
});

