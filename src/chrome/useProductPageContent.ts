import { useEffect, useState } from "react";
import { pickLocaleValue, useLocaleMode } from "@inkless/theme-host";

export type Localized = { zh?: string; en?: string; [k: string]: string | undefined };

/**
 * Load optional hardcoded-page config for product-first theme pages.
 *
 * Prefer theme-as-templates Page data (GET /public/pages/:slug) when present;
 * fall back to legacy content_documents (GET /public/content/:pageKey).
 * Empty / failed fetch → `{}` so pages can degrade to placeholders.
 */
export function useProductPageContent<T extends object>(contentKey: string): T {
  const [cfg, setCfg] = useState<T>({} as T);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const slug = contentKey || "home";
      try {
        // T2: Page-first
        const pageRes = await fetch(`/public/pages/${encodeURIComponent(slug)}`);
        if (pageRes.ok) {
          const data = await pageRes.json();
          const fromPage = (data?.publishedConfig ?? data?.config ?? data) as T;
          if (
            !cancelled &&
            fromPage &&
            typeof fromPage === "object" &&
            Object.keys(fromPage as object).length > 0
          ) {
            // Ignore pure seed marker objects
            const keys = Object.keys(fromPage as object).filter((k) => !k.startsWith("_"));
            if (keys.length > 0) {
              setCfg(fromPage);
              return;
            }
          }
        }
      } catch {
        /* try legacy */
      }

      try {
        const res = await fetch(`/public/content/${encodeURIComponent(slug)}`);
        if (!res.ok) return;
        const data = await res.json();
        const next = (data?.config ?? data) as T;
        if (!cancelled && next && typeof next === "object") {
          setCfg(next);
        }
      } catch {
        /* keep empty — placeholders render */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [contentKey]);

  return cfg;
}

/** Locale-aware picker bound to host locale mode. */
export function usePickLocale() {
  const { localeMode, defaultLocale, currentLocale } = useLocaleMode();

  return (value: Localized | string | undefined, fallback = "") => {
    if (typeof value === "string") return value;
    return (
      pickLocaleValue({
        value,
        mode: localeMode,
        defaultLocale,
        currentLocale,
      }) || fallback
    );
  };
}
