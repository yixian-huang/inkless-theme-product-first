import ProductShot, { type MediaRef } from "./ProductShot";

type Props = {
  title?: string;
  items?: MediaRef[];
};

/**
 * Horizontal product screenshot strip (1–3 shots). Empty items still show polished mock frames.
 */
export default function ShowcaseStrip({ title, items }: Props) {
  const shots: MediaRef[] =
    items && items.length > 0 ? items.slice(0, 3) : [{ alt: "Editor" }, { alt: "Themes" }, { alt: "Publish" }];

  return (
    <div>
      {title ? (
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-muted">
          {title}
        </p>
      ) : null}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
        {shots.map((item, i) => (
          <div
            key={i}
            className={
              i === 1 ? "md:-translate-y-4 md:scale-[1.02]" : i === 2 ? "md:translate-y-2" : ""
            }
          >
            <ProductShot
              media={item}
              elevated={i === 1}
              polishedPlaceholder
              placeholderTitle={item.alt || `Inkless · ${i + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
