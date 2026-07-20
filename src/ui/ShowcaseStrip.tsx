import ProductShot, { type MediaRef } from "./ProductShot";

type Props = {
  title?: string;
  items?: MediaRef[];
  emptyHint?: string;
};

/**
 * Horizontal product screenshot strip (1–3 shots). Empty items still show mock frames.
 */
export default function ShowcaseStrip({
  title,
  items,
  emptyHint = "Add screenshots via home.showcase.items[].url",
}: Props) {
  const shots =
    items && items.length > 0
      ? items.slice(0, 3)
      : [{}, {}, {}] as MediaRef[];

  return (
    <div>
      {title ? (
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-muted">
          {title}
        </p>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {shots.map((item, i) => (
          <div
            key={i}
            className={
              i === 0
                ? "md:col-span-1 md:translate-y-0"
                : i === 1
                  ? "md:-translate-y-3"
                  : "md:translate-y-2"
            }
          >
            <ProductShot
              media={item}
              elevated={i === 1}
              placeholderTitle={item.alt || `Screenshot ${i + 1}`}
              placeholderHint={emptyHint}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
