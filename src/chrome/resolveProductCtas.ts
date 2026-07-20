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

function pickSetting(settings: Record<string, unknown>, key: keyof typeof DEFAULTS): string {
  const header = settings.header;
  const candidates = [
    settings[key],
    settings[`header.${key}`],
    header && typeof header === "object" ? (header as Record<string, unknown>)[key] : undefined,
  ];
  for (const v of candidates) {
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return DEFAULTS[key];
}

/**
 * Resolve CTA / external links from theme settings with safe defaults.
 * Accepts flat keys, `header.*` keys, or nested `{ header: { docsUrl } }` config.
 */
export function resolveProductCtas(
  settings?: Record<string, unknown> | null,
): Required<ProductCtaSettings> {
  const s = settings ?? {};
  return {
    docsUrl: pickSetting(s, "docsUrl"),
    githubUrl: pickSetting(s, "githubUrl"),
    primaryCtaLabel: pickSetting(s, "primaryCtaLabel"),
    primaryCtaHref: pickSetting(s, "primaryCtaHref"),
    secondaryCtaLabel: pickSetting(s, "secondaryCtaLabel"),
    secondaryCtaHref: pickSetting(s, "secondaryCtaHref"),
  };
}
