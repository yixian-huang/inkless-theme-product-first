import { useEffect, useState } from "react";
import { pickLocaleValue, useLocaleMode } from "@inkless/theme-host";

export type Localized = { zh?: string; en?: string; [k: string]: string | undefined };

/**
 * Load optional hardcoded-page config from host public content API.
 * Empty / failed fetch → `{}` so pages can degrade to placeholders.
 */
export function useProductPageContent<T extends object>(contentKey: string): T {
  const [cfg, setCfg] = useState<T>({} as T);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/public/content/${contentKey}`);
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
