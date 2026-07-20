import type { CSSProperties, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  /** Optional caption under the frame */
  caption?: string;
  /** Soft floating shadow depth */
  elevated?: boolean;
  style?: CSSProperties;
};

/**
 * Browser / app chrome around product screenshots or illustrations.
 */
export default function MediaFrame({
  children,
  className = "",
  caption,
  elevated = true,
  style,
}: Props) {
  return (
    <figure className={`m-0 ${className}`.trim()} style={style}>
      <div
        className={
          "overflow-hidden rounded-2xl border border-border/80 bg-surface " +
          (elevated
            ? "shadow-2xl shadow-on-surface/10 ring-1 ring-black/[0.04]"
            : "shadow-md shadow-on-surface/5")
        }
      >
        <div className="flex items-center gap-2 border-b border-border/80 bg-surface-alt/90 px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden />
          <div className="ml-2 flex-1 min-w-0">
            <div className="mx-auto max-w-[14rem] truncate rounded-md bg-surface border border-border/70 px-2.5 py-1 text-center text-[10px] text-on-surface-muted font-medium tracking-wide">
              app.inkless.run
            </div>
          </div>
          <span className="w-10" aria-hidden />
        </div>
        <div className="relative bg-surface-alt/40 aspect-[16/10] overflow-hidden">{children}</div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-xs text-on-surface-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
