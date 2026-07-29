import { useState } from "react";
import MediaFrame from "./MediaFrame";

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
  /** When true, hide developer-facing slot hints */
  polishedPlaceholder?: boolean;
  className?: string;
  elevated?: boolean;
  /** Silhouette layout when no real image */
  mockVariant?: ProductMockVariant;
};

/**
 * Product screenshot slot: real image when url is set, otherwise a crafted UI mock.
 */
export default function ProductShot({
  media,
  placeholderTitle = "Inkless",
  polishedPlaceholder = true,
  className = "",
  elevated = true,
  mockVariant = "admin",
}: Props) {
  const url = media?.url?.trim() || "";
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(url) && !failed;

  return (
    <MediaFrame className={className} caption={media?.caption} elevated={elevated}>
      {showImage ? (
        <img
          src={url}
          alt={media?.alt || placeholderTitle}
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

/** CSS-only product UI silhouette — follows host accent token (not hard-coded brand blue). */
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
    <div className="absolute inset-0 flex bg-gradient-to-br from-surface-alt via-surface to-accent/[0.08]">
      {variant === "themes" ? (
        <ThemesMock />
      ) : variant === "publish" ? (
        <PublishMock />
      ) : variant === "editor" ? (
        <EditorMock />
      ) : (
        <AdminMock />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface via-surface/90 to-transparent px-4 pb-3 pt-10 text-center">
        <p className="text-xs font-semibold tracking-tight text-on-surface">{title}</p>
        {showHint ? (
          <p className="mt-0.5 text-xs text-on-surface-muted">hero.media.url</p>
        ) : null}
      </div>
    </div>
  );
}

function Mark() {
  return (
    <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white shadow-sm">
      I
    </div>
  );
}

function AdminMock() {
  return (
    <>
      <aside className="hidden sm:flex w-[22%] min-w-[5.5rem] flex-col gap-2.5 border-r border-border/90 bg-surface/95 p-3">
        <Mark />
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full ${i === 1 ? "w-[85%] bg-accent/50" : "w-[60%] bg-border"}`}
          />
        ))}
        <div className="mt-auto h-8 rounded-lg border border-border bg-surface-alt" />
      </aside>
      <div className="relative flex flex-1 flex-col gap-3 p-3 sm:p-4 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="h-3 w-32 rounded-full bg-on-surface-muted/30" />
          <div className="flex gap-1.5">
            <div className="h-7 w-16 rounded-md bg-accent/15" />
            <div className="h-7 w-7 rounded-md bg-border" />
          </div>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-2 sm:gap-3">
          <div className="col-span-2 rounded-xl border border-border/90 bg-surface p-3 shadow-sm">
            <div className="mb-3 h-2.5 w-24 rounded-full bg-on-surface-muted/30" />
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-surface-alt" />
              <div className="h-2 w-11/12 rounded-full bg-surface-alt" />
              <div className="h-2 w-4/5 rounded-full bg-surface-alt" />
              <div className="mt-4 h-24 rounded-lg border border-accent/15 bg-gradient-to-br from-accent/12 via-accent/5 to-transparent" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex-1 rounded-xl border border-border/90 bg-surface p-2.5 shadow-sm">
              <div className="mb-2 h-2 w-12 rounded-full bg-on-surface-muted/30" />
              <div className="h-10 rounded-md bg-accent/12" />
            </div>
            <div className="flex-1 rounded-xl border border-border/90 bg-surface p-2.5 shadow-sm">
              <div className="mb-2 h-2 w-10 rounded-full bg-on-surface-muted/30" />
              <div className="space-y-1.5">
                <div className="h-1.5 w-full rounded-full bg-surface-alt" />
                <div className="h-1.5 w-5/6 rounded-full bg-surface-alt" />
                <div className="h-1.5 w-2/3 rounded-full bg-surface-alt" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/** Editor: wide canvas + toolbar, no left nav. */
function EditorMock() {
  return (
    <div className="relative flex flex-1 flex-col gap-2 p-3 sm:p-4 min-w-0 w-full">
      <div className="flex items-center gap-2 border-b border-border/80 pb-2">
        <div className="h-2.5 w-14 rounded-full bg-border" />
        <div className="h-2.5 w-10 rounded-full bg-border" />
        <div className="h-2.5 w-12 rounded-full bg-accent/40" />
        <div className="ml-auto h-7 w-20 rounded-md bg-accent text-xs font-semibold text-white flex items-center justify-center">
          ···
        </div>
      </div>
      <div className="flex-1 rounded-xl border border-border/90 bg-surface p-4 shadow-sm">
        <div className="mb-3 h-3 w-2/5 rounded-full bg-on-surface-muted/35" />
        <div className="space-y-2.5">
          <div className="h-2 w-full rounded-full bg-surface-alt" />
          <div className="h-2 w-[92%] rounded-full bg-surface-alt" />
          <div className="h-2 w-[88%] rounded-full bg-surface-alt" />
          <div className="h-2 w-3/4 rounded-full bg-surface-alt" />
          <div className="mt-4 h-20 rounded-lg border border-dashed border-accent/25 bg-accent/[0.06]" />
        </div>
      </div>
    </div>
  );
}

/** Themes: three theme preview tiles. */
function ThemesMock() {
  return (
    <div className="relative flex flex-1 flex-col gap-3 p-3 sm:p-4 min-w-0 w-full">
      <div className="flex items-center gap-2">
        <Mark />
        <div className="h-2.5 w-28 rounded-full bg-on-surface-muted/30" />
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2 sm:gap-3 min-h-0">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={
              "rounded-xl border bg-surface p-2 shadow-sm flex flex-col gap-2 " +
              (i === 1 ? "border-accent/50 ring-1 ring-accent/20" : "border-border/90")
            }
          >
            <div
              className={
                "h-12 sm:h-16 rounded-lg " +
                (i === 0
                  ? "bg-gradient-to-br from-on-surface/90 to-on-surface/60"
                  : i === 1
                    ? "bg-gradient-to-br from-accent to-accent/60"
                    : "bg-gradient-to-br from-surface-alt to-border")
              }
            />
            <div className="h-1.5 w-3/4 rounded-full bg-on-surface-muted/25" />
            <div className="h-1.5 w-1/2 rounded-full bg-border" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Publish: checklist + status. */
function PublishMock() {
  return (
    <div className="relative flex flex-1 flex-col gap-3 p-3 sm:p-4 min-w-0 w-full">
      <div className="flex items-center justify-between gap-2">
        <div className="h-3 w-28 rounded-full bg-on-surface-muted/30" />
        <div className="h-7 px-3 rounded-md bg-accent text-xs font-semibold text-white flex items-center">
          ✓
        </div>
      </div>
      <div className="flex-1 rounded-xl border border-border/90 bg-surface p-3 sm:p-4 shadow-sm space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={
                "h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center " +
                (i < 3 ? "border-accent bg-accent/15" : "border-border")
              }
            >
              {i < 3 ? <span className="h-2 w-2 rounded-full bg-accent" /> : null}
            </div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="h-2 w-2/3 rounded-full bg-on-surface-muted/30" />
              <div className="h-1.5 w-1/2 rounded-full bg-border" />
            </div>
          </div>
        ))}
        <div className="mt-2 h-14 rounded-lg border border-accent/20 bg-gradient-to-r from-accent/10 to-transparent" />
      </div>
    </div>
  );
}
