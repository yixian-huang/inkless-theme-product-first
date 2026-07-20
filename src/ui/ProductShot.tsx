import { useState } from "react";
import MediaFrame from "./MediaFrame";

export type MediaRef = {
  url?: string;
  alt?: string;
  caption?: string;
};

type Props = {
  media?: MediaRef | null;
  placeholderTitle?: string;
  /** When true, hide developer-facing slot hints */
  polishedPlaceholder?: boolean;
  className?: string;
  elevated?: boolean;
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
        <ProductUiMock
          title={placeholderTitle}
          showHint={!polishedPlaceholder}
        />
      )}
    </MediaFrame>
  );
}

/** CSS-only product UI silhouette — Inkless-toned (ink + brand blue). */
function ProductUiMock({ title, showHint }: { title: string; showHint?: boolean }) {
  return (
    <div className="absolute inset-0 flex bg-gradient-to-br from-slate-50 via-white to-blue-50/40">
      <aside className="hidden sm:flex w-[22%] min-w-[5.5rem] flex-col gap-2.5 border-r border-slate-200/90 bg-white/95 p-3">
        <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-lg bg-[#2563eb] text-[10px] font-bold text-white shadow-sm">
          I
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full ${i === 1 ? "w-[85%] bg-[#2563eb]/50" : "w-[60%] bg-slate-200"}`}
          />
        ))}
        <div className="mt-auto h-8 rounded-lg border border-slate-200 bg-slate-50" />
      </aside>
      <div className="relative flex flex-1 flex-col gap-3 p-3 sm:p-4 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="h-3 w-32 rounded-full bg-slate-300/80" />
          <div className="flex gap-1.5">
            <div className="h-7 w-16 rounded-md bg-[#2563eb]/15" />
            <div className="h-7 w-7 rounded-md bg-slate-200" />
          </div>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-2 sm:gap-3">
          <div className="col-span-2 rounded-xl border border-slate-200/90 bg-white p-3 shadow-sm">
            <div className="mb-3 h-2.5 w-24 rounded-full bg-slate-300/80" />
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-slate-100" />
              <div className="h-2 w-11/12 rounded-full bg-slate-100" />
              <div className="h-2 w-4/5 rounded-full bg-slate-100" />
              <div className="mt-4 h-24 rounded-lg border border-[#2563eb]/15 bg-gradient-to-br from-[#2563eb]/12 via-[#2563eb]/5 to-transparent" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex-1 rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-sm">
              <div className="mb-2 h-2 w-12 rounded-full bg-slate-300/80" />
              <div className="h-10 rounded-md bg-[#2563eb]/12" />
            </div>
            <div className="flex-1 rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-sm">
              <div className="mb-2 h-2 w-10 rounded-full bg-slate-300/80" />
              <div className="space-y-1.5">
                <div className="h-1.5 w-full rounded-full bg-slate-100" />
                <div className="h-1.5 w-5/6 rounded-full bg-slate-100" />
                <div className="h-1.5 w-2/3 rounded-full bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent px-4 pb-3 pt-10 text-center">
          <p className="text-xs font-semibold tracking-tight text-slate-700">{title}</p>
          {showHint ? (
            <p className="mt-0.5 text-[10px] text-slate-400">hero.media.url</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
