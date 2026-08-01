import { pickLocaleValue, useLocaleMode } from "@inkless/theme-host";
import ProductShot, { type MediaRef, type ProductMockVariant } from "./ProductShot";
import { resolveMediaText } from "./resolveMediaText";

type Props = {
  title?: string;
  items?: MediaRef[];
  /** Browser chrome address label shared across shots */
  chromeLabel?: string;
};

/** Default narrative: upload → manage → integrate (≤3 story beats). */
const PLACEHOLDER_VARIANTS: ProductMockVariant[] = ["editor", "admin", "publish"];

function resolveMockVariant(altKey: string, index: number): ProductMockVariant {
  const key = altKey.toLowerCase();
  if (/upload|上传|editor|编辑/.test(key)) return "editor";
  if (/manage|管理|admin|theme|主题/.test(key)) return "admin";
  if (/integrat|对接|publish|发布|api|hook/.test(key)) return "publish";
  return PLACEHOLDER_VARIANTS[index] ?? "admin";
}

/**
 * Product screenshot strip — recommend ≤3 narrative shots (not a 5-up gallery).
 * Empty items still show differentiated polished mock frames.
 * Mobile: horizontal snap scroll; desktop: staged 3-col grid.
 */
export default function ShowcaseStrip({ title, items, chromeLabel }: Props) {
  const { localeMode, defaultLocale, currentLocale } = useLocaleMode();
  const leaf = (value: unknown, fallback = "") =>
    resolveMediaText(value, {
      fallback,
      pickLocale: (bag) =>
        pickLocaleValue({
          value: bag,
          mode: localeMode,
          defaultLocale,
          currentLocale,
        }) || "",
    });

  const defaultShots: MediaRef[] = [
    { alt: leaf({ zh: "上传", en: "Upload" }, "Upload") },
    { alt: leaf({ zh: "管理", en: "Manage" }, "Manage") },
    { alt: leaf({ zh: "对接", en: "Integrate" }, "Integrate") },
  ];

  const raw = items && items.length > 0 ? items.slice(0, 3) : defaultShots;

  const shots = raw.map((item, i) => {
    const alt = leaf(item?.alt, defaultShots[i]?.alt || `Shot ${i + 1}`);
    const caption = leaf(item?.caption, "");
    const url = typeof item?.url === "string" ? item.url : "";
    return { url, alt, caption } satisfies MediaRef;
  });

  const card = (item: MediaRef, i: number) => (
    <ProductShot
      media={item}
      elevated={i === 1}
      polishedPlaceholder
      mockVariant={resolveMockVariant(item.alt || "", i)}
      placeholderTitle={item.alt || `Product · ${i + 1}`}
      chromeLabel={chromeLabel}
    />
  );

  return (
    <div>
      {title ? (
        <h2 className="mb-9 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-muted">
          {title}
        </h2>
      ) : null}

      {/* Mobile: snap strip — one primary frame visible, scroll for more */}
      <div
        className="scrollbar-thin -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {shots.map((item, i) => (
          <div
            key={item.url || item.alt || `shot-m-${i}`}
            className="w-[min(100%,20rem)] max-w-[85vw] shrink-0 snap-center"
          >
            {card(item, i)}
          </div>
        ))}
      </div>

      {/* Desktop / tablet: staged grid */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-5">
        {shots.map((item, i) => (
          <div
            key={item.url || item.alt || `shot-d-${i}`}
            className={
              i === 1
                ? "md:-translate-y-4 md:scale-[1.02] motion-reduce:md:translate-y-0 motion-reduce:md:scale-100"
                : i === 2
                  ? "md:translate-y-2 motion-reduce:md:translate-y-0"
                  : ""
            }
          >
            {card(item, i)}
          </div>
        ))}
      </div>
    </div>
  );
}
