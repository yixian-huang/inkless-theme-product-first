import { describe, expect, it } from "vitest";
import { resolveMediaRef, resolveMediaText } from "./resolveMediaText";

describe("resolveMediaText", () => {
  it("returns strings unchanged", () => {
    expect(resolveMediaText("Dashboard")).toBe("Dashboard");
    expect(resolveMediaText("")).toBe("");
  });

  it("resolves bilingual caption bags to a string (never an object)", () => {
    const bag = { zh: "管理台", en: "Admin console" };
    const withPick = resolveMediaText(bag, {
      pickLocale: (b) => b.en || b.zh || "",
    });
    expect(typeof withPick).toBe("string");
    expect(withPick).toBe("Admin console");

    const withoutPick = resolveMediaText(bag);
    expect(typeof withoutPick).toBe("string");
    expect(withoutPick).toBe("管理台");
  });

  it("never returns an object for bilingual alt (DOM-safe)", () => {
    const alt = { zh: "上传界面", en: "Upload UI" };
    const resolved = resolveMediaText(alt, {
      pickLocale: (b) => b.zh || "",
    });
    // React #31: objects as children crash. Caption/alt must be primitives.
    expect(resolved).toBe("上传界面");
    expect(resolved).not.toEqual(expect.any(Object));
  });

  it("returns fallback for null, arrays, and non-locale objects", () => {
    expect(resolveMediaText(null, { fallback: "x" })).toBe("x");
    expect(resolveMediaText(undefined)).toBe("");
    expect(resolveMediaText([1, 2], { fallback: "f" })).toBe("f");
    expect(resolveMediaText({ nested: { zh: "no" } }, { fallback: "" })).toBe("");
    expect(resolveMediaText(42)).toBe("");
  });

  it("uses fallback when bag has only empty strings", () => {
    expect(resolveMediaText({ zh: "", en: "" }, { fallback: "shot" })).toBe("shot");
  });

  it("survives pickLocale throwing", () => {
    expect(
      resolveMediaText(
        { zh: "安全", en: "safe" },
        {
          pickLocale: () => {
            throw new Error("host offline");
          },
        },
      ),
    ).toBe("安全");
  });
});

describe("resolveMediaRef", () => {
  it("stringifies bilingual caption/alt so DOM never receives objects", () => {
    const ref = resolveMediaRef(
      {
        url: "/shots/upload.png",
        alt: { zh: "上传", en: "Upload" },
        caption: { zh: "拖拽上传", en: "Drag to upload" },
      },
      { pickLocale: (b) => b.en || "" },
    );
    expect(ref.url).toBe("/shots/upload.png");
    expect(ref.alt).toBe("Upload");
    expect(ref.caption).toBe("Drag to upload");
    expect(typeof ref.alt).toBe("string");
    expect(typeof ref.caption).toBe("string");
  });

  it("handles missing media", () => {
    expect(resolveMediaRef(null)).toEqual({ url: "", alt: "", caption: "" });
  });
});
