import type { CSSProperties, ReactNode } from "react";
import { resolveMediaText } from "./resolveMediaText";

type Props = {
  children?: ReactNode;
  className?: string;
  /**
   * Optional caption under the frame.
   * Contract: plain string. Runtime also accepts mistaken Localized bags
   * and coerces them so figcaption never receives an object (React #31).
   */
  caption?: unknown;
  /**
   * Browser chrome address-bar label. Prefer site name / product identity.
   * Neutral default for multi-product reuse (do not hardcode a host domain).
   */
  chromeLabel?: string;
  /** Soft floating shadow depth */
  elevated?: boolean;
  style?: CSSProperties;
};

/**
 * Browser / app chrome around product screenshots or illustrations.
 * Tight radius — product window, not soft-marketing blob.
 */
export default function MediaFrame({
  children,
  className = "",
  caption,
  chromeLabel,
  elevated = true,
  style,
}: Props) {
  const safeCaption = resolveMediaText(caption);
  const address =
    typeof chromeLabel === "string" && chromeLabel.trim()
      ? chromeLabel.trim()
      : "app";

  return (
    <figure className={`m-0 ${className}`.trim()} style={style}>
      <div
        className={
          "overflow-hidden rounded-lg border border-border/70 bg-surface " +
          (elevated
            ? "shadow-[0_16px_40px_-16px_rgb(0_0_0/0.2),0_4px_12px_-4px_rgb(0_0_0/0.08)] ring-1 ring-black/[0.03]"
            : "shadow-[0_4px_16px_-6px_rgb(0_0_0/0.1)]")
        }
      >
        <div className="flex items-center gap-2 border-b border-border/60 bg-surface-alt px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/0.95" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/0.95" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/0.95" aria-hidden />
          <div className="ml-2 min-w-0 flex-1">
            <div className="mx-auto max-w-[12rem] truncate rounded-md border border-border/60 bg-surface px-2.5 py-0.5 text-center text-[11px] font-medium tracking-wide text-on-surface-muted">
              {address}
            </div>
          </div>
          <span className="w-8" aria-hidden />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt/50">{children}</div>
      </div>
      {safeCaption ? (
        <figcaption className="mt-2.5 text-center text-xs leading-relaxed text-on-surface-muted">
          {safeCaption}
        </figcaption>
      ) : null}
    </figure>
  );
}
