import { describe, expect, it } from "vitest";
import {
  DEFAULT_INSTALL_CODE,
  isOperatorJargon,
  resolveVisitorInstallCode,
  scrubVisitorCopy,
} from "./visitorCopy";

describe("scrubVisitorCopy", () => {
  it("softens ops and theme-id laundry lists", () => {
    expect(scrubVisitorCopy("自托管 artifact / compose 部署")).toContain("Docker");
    expect(scrubVisitorCopy("product-first / blog-first / corporate 一键切换")).toMatch(
      /产品|themes/i,
    );
    expect(scrubVisitorCopy("run npc deploy next")).not.toMatch(/npc/i);
  });
});

describe("resolveVisitorInstallCode", () => {
  it("falls back when only comments", () => {
    expect(
      resolveVisitorInstallCode("# See README\n# npc deploy"),
    ).toBe(DEFAULT_INSTALL_CODE);
  });

  it("falls back when host only has git clone without boot", () => {
    expect(
      resolveVisitorInstallCode(
        "# See repository README\ngit clone https://github.com/yixian-huang/inkless.git\n# deploy with npc deploy",
      ),
    ).toBe(DEFAULT_INSTALL_CODE);
  });

  it("keeps full host command sequences", () => {
    const code = "git clone https://example.com/x.git\ncd x\nnpm install";
    expect(resolveVisitorInstallCode(code)).toBe(code);
  });
});

describe("isOperatorJargon", () => {
  it("flags docsUrl, independent docs service copy, and npc deploy", () => {
    expect(isOperatorJargon("配置 docsUrl")).toBe(true);
    expect(isOperatorJargon("完整安装与文档由独立文档服务提供（配置 docsUrl）。")).toBe(true);
    expect(isOperatorJargon("use npc deploy")).toBe(true);
    expect(isOperatorJargon("克隆仓库并启动")).toBe(false);
  });
});
