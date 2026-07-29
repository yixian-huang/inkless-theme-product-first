import ProductShot, { type MediaRef, type ProductMockVariant } from "./ProductShot";

type Props = {
  title?: string;
  items?: MediaRef[];
};

const PLACEHOLDER_VARIANTS: ProductMockVariant[] = ["editor", "themes", "publish"];

function resolveMockVariant(item: MediaRef, index: number): ProductMockVariant {
  if (item.url?.trim()) return "admin";
  const key = (item.alt || "").toLowerCase();
  if (/editor|编辑/.test(key)) return "editor";
  if (/theme|主题/.test(key)) return "themes";
  if (/publish|发布/.test(key)) return "publish";
  return PLACEHOLDER_VARIANTS[index] ?? "admin";
}

/**
 * Horizontal product screenshot strip (1–3 shots).
 * Empty items still show differentiated polished mock frames.
 * Mobile: horizontal snap scroll to avoid a tall stack of identical frames.
 */
export default function ShowcaseStrip({ title, items }: Props) {
  const shots: MediaRef[] =
    items && items.length > 0
      ? items.slice(0, 3)
      : [{ alt: "Editor" }, { alt: "Themes" }, { alt: "Publish" }];

  const card = (item: MediaRef, i: number) => (
    <ProductShot
      media={item}
      elevated={i === 1}
      polishedPlaceholder
      mockVariant={resolveMockVariant(item, i)}
      placeholderTitle={item.alt || `Inkless · ${i + 1}`}
    />
  );

  return (
    <div>
      {title ? (
        <h2 className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-muted">
          {title}
        </h2>
      ) : null}

      {/* Mobile: snap strip — one primary frame visible, scroll for more */}
      <div
        className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-thin"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {shots.map((item, i) => (
          <div
            key={item.url || item.alt || `shot-m-${i}`}
            className="snap-center shrink-0 w-[min(100%,20rem)] max-w-[85vw]"
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
