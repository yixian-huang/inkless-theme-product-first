export type ProductCtaSettings = {
  docsUrl?: string;
  githubUrl?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

/** Empty external links by default — operators set product-specific URLs. */
const DEFAULTS = {
  docsUrl: "",
  githubUrl: "",
  primaryCtaLabel: "Get started",
  primaryCtaHref: "/get-started",
  secondaryCtaLabel: "GitHub",
  secondaryCtaHref: "",
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

/** Normalize href for equality checks (trim, strip trailing slash, casefold). */
export function normalizeHref(href: string): string {
  return href.trim().replace(/\/+$/, "").toLowerCase();
}

/** True when two hrefs point at the same destination for CTA dedupe. */
export function isSameHref(a: string, b: string): boolean {
  const left = a?.trim() ?? "";
  const right = b?.trim() ?? "";
  if (!left || !right) return false;
  return normalizeHref(left) === normalizeHref(right);
}

/**
 * Resolve CTA / external links from theme settings with safe defaults.
 * Accepts flat keys, `header.*` keys, or nested `{ header: { docsUrl } }` config.
 */
export function resolveProductCtas(
  settings?: Record<string, unknown> | null,
): Required<ProductCtaSettings> {
  const s = settings ?? {};
  let primaryCtaHref = pickSetting(s, "primaryCtaHref");
  // Theme contract: primary is the first-success path, not the home install anchor.
  if (isSameHref(primaryCtaHref, "#install") || primaryCtaHref === "#") {
    primaryCtaHref = DEFAULTS.primaryCtaHref;
  }
  return {
    docsUrl: pickSetting(s, "docsUrl"),
    githubUrl: pickSetting(s, "githubUrl"),
    primaryCtaLabel: pickSetting(s, "primaryCtaLabel"),
    primaryCtaHref,
    secondaryCtaLabel: pickSetting(s, "secondaryCtaLabel"),
    secondaryCtaHref: pickSetting(s, "secondaryCtaHref"),
  };
}

/** Labels that mean the stock primary CTA (localized). */
export function isStockGetStartedLabel(label: string): boolean {
  return /^(get started|快速开始|上手)$/i.test(label.trim());
}

/**
 * Resolve hero/bottom primary CTA so “Get started / 快速开始” always shares
 * one destination with header (default `/get-started`), never `#install`.
 */
export function resolveUnifiedPrimaryCta(input: {
  contentLabel?: string;
  contentHref?: string;
  settingsLabel: string;
  settingsHref: string;
}): { label: string; href: string } {
  const settingsHref =
    !input.settingsHref.trim() || isSameHref(input.settingsHref, "#install")
      ? DEFAULTS.primaryCtaHref
      : input.settingsHref.trim();
  const settingsLabel = input.settingsLabel.trim() || DEFAULTS.primaryCtaLabel;

  let label = (input.contentLabel ?? "").trim() || settingsLabel;
  let href = (input.contentHref ?? "").trim() || settingsHref;

  if (isStockGetStartedLabel(label) && (isSameHref(href, "#install") || !href)) {
    href = settingsHref;
  }
  if (isSameHref(href, "#install") && !input.contentLabel) {
    href = settingsHref;
    label = settingsLabel;
  }

  return { label, href };
}
