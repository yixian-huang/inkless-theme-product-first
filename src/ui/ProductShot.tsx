import { useState } from "react";
import MediaFrame from "./MediaFrame";

export type MediaRef = {
  url?: string;
  alt?: string;
  caption?: string;
};

type Props = {
  media?: MediaRef | null;
  /** Decorative fallback label when no image */
  placeholderTitle?: string;
  placeholderHint?: string;
  className?: string;
  elevated?: boolean;
};

/**
 * Product screenshot slot: real image when url is set, otherwise a crafted UI mock.
 */
export default function ProductShot({
  media,
  placeholderTitle = "Product UI",
  placeholderHint = "Upload a screenshot in site content · hero.media.url",
  className = "",
  elevated = true,
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
          onError={() => setFailed(true)}
        />
      ) : (
        <ProductUiMock title={placeholderTitle} hint={placeholderHint} />
      )}
    </MediaFrame>
  );
}

/** CSS-only product UI silhouette — no external asset required. */
function ProductUiMock({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="absolute inset-0 flex bg-gradient-to-br from-surface via-surface-alt to-surface">
      {/* Sidebar */}
      <aside className="hidden sm:flex w-[22%] min-w-[5.5rem] flex-col gap-2 border-r border-border/70 bg-surface/90 p-3">
        <div className="mb-2 h-6 w-6 rounded-lg bg-accent/80" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full ${i === 1 ? "w-4/5 bg-accent/50" : "w-3/5 bg-border"}`}
          />
        ))}
        <div className="mt-auto h-8 rounded-lg bg-surface-alt border border-border/60" />
      </aside>
      {/* Main canvas */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 gap-3 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="h-3 w-28 rounded-full bg-on-surface/15" />
          <div className="flex gap-1.5">
            <div className="h-7 w-16 rounded-md bg-accent/20" />
            <div className="h-7 w-7 rounded-md bg-border" />
          </div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2 sm:gap-3 min-h-0">
          <div className="col-span-2 rounded-xl border border-border/70 bg-surface p-3 shadow-sm">
            <div className="mb-3 h-2.5 w-24 rounded-full bg-on-surface/12" />
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-border" />
              <div className="h-2 w-11/12 rounded-full bg-border" />
              <div className="h-2 w-4/5 rounded-full bg-border" />
              <div className="mt-4 h-20 rounded-lg bg-gradient-to-br from-accent/15 via-accent/5 to-transparent border border-accent/10" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex-1 rounded-xl border border-border/70 bg-surface p-2.5 shadow-sm">
              <div className="h-2 w-12 rounded-full bg-on-surface/12 mb-2" />
              <div className="h-8 rounded-md bg-accent/15" />
            </div>
            <div className="flex-1 rounded-xl border border-border/70 bg-surface p-2.5 shadow-sm">
              <div className="h-2 w-10 rounded-full bg-on-surface/12 mb-2" />
              <div className="space-y-1.5">
                <div className="h-1.5 w-full rounded-full bg-border" />
                <div className="h-1.5 w-5/6 rounded-full bg-border" />
              </div>
            </div>
          </div>
        </div>
        {/* Slot label overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface via-surface/90 to-transparent px-4 pb-4 pt-10 text-center">
          <p className="text-xs font-semibold tracking-tight text-on-surface/80">{title}</p>
          <p className="mt-0.5 text-[10px] text-on-surface-muted">{hint}</p>
        </div>
      </div>
    </div>
  );
}
