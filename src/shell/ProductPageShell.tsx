import type { CSSProperties, ReactNode } from "react";
import { useContentMaxWidth } from "@inkless/theme-host";

type Props = {
  children?: ReactNode;
  className?: string;
  /** When true, no max-width constraint (hero full-bleed inner still can re-constrain). */
  fullBleed?: boolean;
};

/**
 * Theme-local content shell (v1 — not host contract).
 * Mirrors BlogPageShell role: consistent horizontal padding + product max width.
 */
export default function ProductPageShell({ children, className = "", fullBleed = false }: Props) {
  const maxWidth = useContentMaxWidth();
  const style: CSSProperties | undefined = fullBleed ? undefined : { maxWidth };

  return (
    <div
      className={`w-full mx-auto px-4 md:px-content ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
