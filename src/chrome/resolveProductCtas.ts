export type ProductCtaSettings = {
  docsUrl?: string;
  githubUrl?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

const DEFAULTS = {
  docsUrl: "",
  githubUrl: "https://github.com/yixian-huang/inkless",
  primaryCtaLabel: "Get started",
  primaryCtaHref: "#install",
  secondaryCtaLabel: "GitHub",
  secondaryCtaHref: "https://github.com/yixian-huang/inkless",
};

/**
 * Resolve CTA / external links from theme settings with safe defaults.
 * Site-specific copy should come from settings or home content — not hard-coded marketing.
 */
export function resolveProductCtas(
  settings?: Record<string, unknown> | null,
): Required<ProductCtaSettings> {
  const s = settings ?? {};
  const str = (key: keyof typeof DEFAULTS) => {
    const v = s[key];
    return typeof v === "string" && v.trim() ? v.trim() : DEFAULTS[key];
  };
  return {
    docsUrl: str("docsUrl"),
    githubUrl: str("githubUrl"),
    primaryCtaLabel: str("primaryCtaLabel"),
    primaryCtaHref: str("primaryCtaHref"),
    secondaryCtaLabel: str("secondaryCtaLabel"),
    secondaryCtaHref: str("secondaryCtaHref"),
  };
}
