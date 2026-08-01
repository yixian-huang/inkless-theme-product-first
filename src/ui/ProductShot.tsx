import { useState } from "react";
import { pickLocaleValue, useLocaleMode } from "@inkless/theme-host";
import MediaFrame from "./MediaFrame";
import { resolveMediaText } from "./resolveMediaText";

/**
 * Media reference for product screenshots.
 * Leaves (url / alt / caption) are **plain strings** — never Localized bags.
 * Runtime still coerces accidental { zh, en } so DOM never receives objects.
 */
export type MediaRef = {
  url?: string;
  alt?: string;
  caption?: string;
};

/** CSS mock layouts for empty / failed media slots. */
export type ProductMockVariant = "admin" | "editor" | "themes" | "publish";

type Props = {
  media?: MediaRef | null;
  placeholderTitle?: string;
  /** When true, hide developer-facing slot hints and in-frame title overlay */
  polishedPlaceholder?: boolean;
  className?: string;
  elevated?: boolean;
  /** Silhouette layout when no real image */
  mockVariant?: ProductMockVariant;
  /** Browser chrome address label (site name / identity) */
  chromeLabel?: string;
};

/**
 * Product screenshot slot: real image when url is set, otherwise a dense UI mock.
 * Failed loads fall back to mock without layout collapse.
 * Polished mocks never paint a bottom title bar (avoids text occlusion / wireframe look).
 */
export default function ProductShot({
  media,
  placeholderTitle = "Product",
  polishedPlaceholder = true,
  className = "",
  elevated = true,
  mockVariant = "admin",
  chromeLabel,
}: Props) {
  const { localeMode, defaultLocale, currentLocale } = useLocaleMode();
  const pickLeaf = (value: unknown, fallback = "") =>
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

  const url = typeof media?.url === "string" ? media.url.trim() : "";
  const alt = pickLeaf(media?.alt, placeholderTitle);
  const caption = pickLeaf(media?.caption, "");
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(url) && !failed;

  return (
    <MediaFrame
      className={className}
      caption={caption}
      chromeLabel={chromeLabel}
      elevated={elevated}
    >
      {showImage ? (
        <img
          src={url}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-top"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <ProductUiMock
          title={placeholderTitle}
          showHint={!polishedPlaceholder}
          variant={mockVariant}
        />
      )}
    </MediaFrame>
  );
}

/**
 * Dense product UI silhouette — higher ink contrast so empty slots still read as “app”,
 * not washed wireframes. Labels stay geometric (no fake marketing strings in-frame).
 */
function ProductUiMock({
  title,
  showHint,
  variant,
}: {
  title: string;
  showHint?: boolean;
  variant: ProductMockVariant;
}) {
  return (
    <div className="absolute inset-0 flex bg-surface">
      {variant === "themes" ? (
        <ThemesMock />
      ) : variant === "publish" ? (
        <PublishMock />
      ) : variant === "editor" ? (
        <EditorMock />
      ) : (
        <AdminMock />
      )}
      {/* Dev-only slot hint — never used in polished visitor mode */}
      {showHint ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-border/60 bg-surface/95 px-3 py-2 text-center">
          <p className="text-xs font-medium text-on-surface">{title}</p>
          <p className="mt-0.5 text-[11px] text-on-surface-muted">hero.media.url</p>
        </div>
      ) : null}
    </div>
  );
}

function Mark() {
  return (
    <div
      className="mb-2 h-6 w-6 rounded-md bg-gradient-to-br from-accent to-accent/75 shadow-sm"
      aria-hidden
    />
  );
}

function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`h-1.5 rounded-sm bg-on-surface/[0.12] ${className}`.trim()} />;
}

function AdminMock() {
  return (
    <>
      <aside className="hidden w-[23%] min-w-[5.75rem] flex-col border-r border-border bg-on-surface/[0.04] p-3 sm:flex">
        <Mark />
        <div className="mb-3 space-y-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={
                "flex items-center gap-2 rounded-md px-1.5 py-1.5 " +
                (i === 1 ? "bg-accent/15" : "")
              }
            >
              <span
                className={
                  "h-1.5 w-1.5 shrink-0 rounded-sm " +
                  (i === 1 ? "bg-accent" : "bg-on-surface/20")
                }
              />
              <span
                className={
                  "h-1.5 rounded-sm " +
                  (i === 1 ? "w-[72%] bg-accent/50" : "w-[58%] bg-on-surface/15")
                }
              />
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-md border border-border bg-surface p-2">
          <SkeletonLine className="mb-1.5 w-2/3" />
          <SkeletonLine className="w-1/2 bg-on-surface/[0.08]" />
        </div>
      </aside>
      <div className="relative flex min-w-0 flex-1 flex-col bg-surface-alt/40">
        <div className="flex items-center justify-between gap-2 border-b border-border bg-surface px-3 py-2.5 sm:px-4">
          <SkeletonLine className="w-36 bg-on-surface/20" />
          <div className="flex items-center gap-1.5">
            <div className="h-7 rounded-md bg-accent px-3 text-[10px] font-semibold leading-7 text-white">
              ···
            </div>
            <div className="h-7 w-7 rounded-md border border-border bg-surface-alt" />
          </div>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-2.5 p-3 sm:gap-3 sm:p-4">
          <div className="col-span-2 flex flex-col rounded-md border border-border bg-surface p-3 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <SkeletonLine className="w-24 bg-on-surface/20" />
              <SkeletonLine className="w-12 bg-on-surface/10" />
            </div>
            <div className="space-y-2">
              <SkeletonLine className="w-full" />
              <SkeletonLine className="w-[94%]" />
              <SkeletonLine className="w-[88%]" />
              <SkeletonLine className="w-3/4" />
            </div>
            <div className="mt-4 min-h-[5.5rem] flex-1 rounded-md border border-border/80 bg-gradient-to-br from-on-surface/[0.06] via-surface-alt to-accent/[0.08] p-2.5">
              <div className="mb-2 flex gap-1.5">
                <span className="h-5 w-14 rounded-sm bg-on-surface/10" />
                <span className="h-5 w-10 rounded-sm bg-on-surface/10" />
                <span className="h-5 w-12 rounded-sm bg-accent/20" />
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-sm border border-border/70 bg-surface"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex-1 rounded-md border border-border bg-surface p-2.5 shadow-sm">
              <SkeletonLine className="mb-2 w-10 bg-on-surface/20" />
              <div className="space-y-1.5">
                <div className="h-8 rounded-md bg-accent/12" />
                <div className="h-8 rounded-md bg-on-surface/[0.05]" />
              </div>
            </div>
            <div className="flex-1 rounded-md border border-border bg-surface p-2.5 shadow-sm">
              <SkeletonLine className="mb-2 w-12 bg-on-surface/20" />
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="h-4 w-4 shrink-0 rounded-sm bg-on-surface/10" />
                    <SkeletonLine className={i === 1 ? "w-full" : "w-4/5"} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/** Editor / upload canvas + toolbar. */
function EditorMock() {
  return (
    <div className="relative flex min-w-0 w-full flex-1 flex-col bg-surface-alt/30">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2 sm:px-4">
        <SkeletonLine className="w-12" />
        <SkeletonLine className="w-10" />
        <SkeletonLine className="w-14 bg-accent/40" />
        <div className="ml-auto flex h-7 items-center rounded-md bg-accent px-2.5 text-[10px] font-semibold text-white">
          ···
        </div>
      </div>
      <div className="flex min-h-0 flex-1 gap-0">
        <div className="hidden w-14 flex-col items-center gap-2 border-r border-border bg-surface py-3 sm:flex">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={
                "h-7 w-7 rounded-md " + (i === 2 ? "bg-accent/20" : "bg-on-surface/[0.06]")
              }
            />
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
          <div className="flex-1 rounded-md border border-border bg-surface p-4 shadow-sm">
            <SkeletonLine className="mb-3 w-2/5 bg-on-surface/25" />
            <div className="space-y-2.5">
              <SkeletonLine className="w-full" />
              <SkeletonLine className="w-[93%]" />
              <SkeletonLine className="w-[90%]" />
              <SkeletonLine className="w-4/5" />
            </div>
            <div className="mt-5 flex min-h-[4.5rem] flex-col items-center justify-center rounded-md border border-dashed border-accent/30 bg-accent/[0.05]">
              <div className="mb-2 h-8 w-8 rounded-md border border-accent/25 bg-accent/10" />
              <SkeletonLine className="w-24 bg-accent/25" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Themes / multi-panel preview tiles. */
function ThemesMock() {
  return (
    <div className="relative flex min-w-0 w-full flex-1 flex-col bg-surface-alt/40 p-3 sm:p-4">
      <div className="mb-3 flex items-center gap-2">
        <Mark />
        <SkeletonLine className="w-28 bg-on-surface/20" />
        <div className="ml-auto h-7 w-20 rounded-md border border-border bg-surface" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-2 sm:gap-2.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={
              "flex flex-col overflow-hidden rounded-md border bg-surface shadow-sm " +
              (i === 1 ? "border-accent/60 ring-1 ring-accent/25" : "border-border")
            }
          >
            <div
              className={
                "h-14 sm:h-[4.5rem] " +
                (i === 0
                  ? "bg-gradient-to-br from-on-surface to-on-surface/70"
                  : i === 1
                    ? "bg-gradient-to-br from-accent to-accent/55"
                    : "bg-gradient-to-br from-surface-alt via-border to-on-surface/20")
              }
            />
            <div className="space-y-1.5 p-2">
              <SkeletonLine className="w-3/4 bg-on-surface/15" />
              <SkeletonLine className="w-1/2 bg-on-surface/10" />
              <div className="flex gap-1 pt-1">
                <span className="h-4 flex-1 rounded-sm bg-on-surface/[0.06]" />
                <span className="h-4 flex-1 rounded-sm bg-on-surface/[0.06]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Publish / integrate: checklist + status. */
function PublishMock() {
  return (
    <div className="relative flex min-w-0 w-full flex-1 flex-col bg-surface-alt/30 p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2 rounded-md border border-border bg-surface px-3 py-2">
        <SkeletonLine className="w-28 bg-on-surface/20" />
        <div className="flex h-7 items-center rounded-md bg-accent px-2.5 text-[10px] font-semibold text-white">
          ✓
        </div>
      </div>
      <div className="flex-1 space-y-0 rounded-md border border-border bg-surface shadow-sm">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={
              "flex items-center gap-3 border-b border-border/70 px-3 py-2.5 last:border-b-0 " +
              (i === 1 ? "bg-accent/[0.04]" : "")
            }
          >
            <div
              className={
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border " +
                (i < 4 ? "border-accent bg-accent text-[10px] text-white" : "border-border")
              }
            >
              {i < 4 ? "✓" : ""}
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <SkeletonLine className={i === 1 ? "w-2/3 bg-on-surface/20" : "w-1/2"} />
              <SkeletonLine className="w-2/5 bg-on-surface/[0.08]" />
            </div>
            <span
              className={
                "h-5 w-12 shrink-0 rounded-sm " +
                (i < 3 ? "bg-accent/15" : "bg-on-surface/[0.06]")
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
