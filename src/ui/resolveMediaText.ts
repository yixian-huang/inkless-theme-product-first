/**
 * MediaRef leaf coercion — alt / caption must be DOM-safe strings.
 *
 * Content contract: MediaRef = { url?: string; alt?: string; caption?: string }.
 * Copy fields elsewhere may be Localized { zh?, en? }; MediaRef leaves must not.
 * Runtime still defends against accidental bilingual bags (React #31 white screen).
 */

export type LocaleBag = { zh?: string; en?: string; [k: string]: string | undefined };

export type ResolveMediaTextOptions = {
  /** Used when value is empty / unusable */
  fallback?: string;
  /**
   * Optional host-aware picker for bilingual bags.
   * When omitted, falls back to zh → en → first string value.
   */
  pickLocale?: (bag: LocaleBag) => string;
};

/**
 * Coerce a MediaRef alt/caption (or any unknown) to a plain string safe for DOM text/attrs.
 *
 * - string → as-is
 * - { zh?, en?, … } → pickLocale if provided, else zh → en → first string
 * - null / undefined / other → fallback (default "")
 */
export function resolveMediaText(
  value: unknown,
  options: ResolveMediaTextOptions = {},
): string {
  const fallback = options.fallback ?? "";

  if (value == null) return fallback;
  if (typeof value === "string") return value;
  // Numbers/booleans are not part of the MediaRef contract — treat as empty.
  if (typeof value !== "object" || Array.isArray(value)) return fallback;

  const bag = value as Record<string, unknown>;
  const stringBag: LocaleBag = {};
  let hasString = false;
  for (const [k, v] of Object.entries(bag)) {
    if (typeof v === "string") {
      stringBag[k] = v;
      hasString = true;
    }
  }
  if (!hasString) return fallback;

  if (options.pickLocale) {
    try {
      const picked = options.pickLocale(stringBag);
      if (typeof picked === "string" && picked) return picked;
    } catch {
      /* fall through to deterministic bag pick */
    }
  }

  if (stringBag.zh) return stringBag.zh;
  if (stringBag.en) return stringBag.en;
  for (const v of Object.values(stringBag)) {
    if (v) return v;
  }
  return fallback;
}

/**
 * Normalize a MediaRef-like object so url/alt/caption are always plain strings.
 * Does not invent URLs; empty url stays "".
 */
export function resolveMediaRef(
  media: unknown,
  options: ResolveMediaTextOptions = {},
): { url: string; alt: string; caption: string } {
  if (!media || typeof media !== "object" || Array.isArray(media)) {
    return { url: "", alt: options.fallback ?? "", caption: "" };
  }
  const m = media as Record<string, unknown>;
  const url = typeof m.url === "string" ? m.url : "";
  return {
    url,
    alt: resolveMediaText(m.alt, options),
    caption: resolveMediaText(m.caption, { ...options, fallback: "" }),
  };
}
