import { describe, expect, it } from "vitest";
import {
  isSameHref,
  isStockGetStartedLabel,
  normalizeHref,
  resolveProductCtas,
  resolveUnifiedPrimaryCta,
} from "./resolveProductCtas";

describe("resolveProductCtas", () => {
  it("uses package defaults when settings empty", () => {
    const c = resolveProductCtas({});
    expect(c.githubUrl).toBe("");
    expect(c.primaryCtaHref).toBe("/get-started");
    expect(c.docsUrl).toBe("");
    expect(c.secondaryCtaHref).toBe("");
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

  it("rewrites primaryCtaHref #install to /get-started", () => {
    const c = resolveProductCtas({ primaryCtaHref: "#install" });
    expect(c.primaryCtaHref).toBe("/get-started");
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

describe("resolveUnifiedPrimaryCta", () => {
  it("keeps Get started / 快速开始 off #install", () => {
    const a = resolveUnifiedPrimaryCta({
      contentLabel: "快速开始",
      contentHref: "#install",
      settingsLabel: "Get started",
      settingsHref: "/get-started",
    });
    expect(a.href).toBe("/get-started");
    expect(a.label).toBe("快速开始");

    const b = resolveUnifiedPrimaryCta({
      contentLabel: "Get started",
      contentHref: "#install",
      settingsLabel: "Get started",
      settingsHref: "/get-started",
    });
    expect(b.href).toBe("/get-started");
  });

  it("allows non-stock labels to keep #install", () => {
    const c = resolveUnifiedPrimaryCta({
      contentLabel: "查看安装",
      contentHref: "#install",
      settingsLabel: "Get started",
      settingsHref: "/get-started",
    });
    expect(c.href).toBe("#install");
    expect(c.label).toBe("查看安装");
  });

  it("isStockGetStartedLabel covers zh/en stock words", () => {
    expect(isStockGetStartedLabel("快速开始")).toBe(true);
    expect(isStockGetStartedLabel("Get started")).toBe(true);
    expect(isStockGetStartedLabel("查看安装")).toBe(false);
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

