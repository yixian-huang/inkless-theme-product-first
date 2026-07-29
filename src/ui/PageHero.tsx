import type { ReactNode } from "react";
import ProductPageShell from "../shell/ProductPageShell";
import { sectionLabel, sectionLead, sectionTitle } from "./classes";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Primary actions under the lead (buttons / links). */
  actions?: ReactNode;
  /** Optional path chips or meta row under actions. */
  meta?: ReactNode;
  /** Anchor id for the page H1. */
  titleId?: string;
};

/**
 * Compact secondary-page hero — same tokens/chrome rhythm as features,
 * without the home product-shot stage.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  meta,
  titleId = "page-hero-title",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-alt/30 font-sans">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-border) 70%, transparent) 1px, transparent 1px), " +
            "linear-gradient(to bottom, color-mix(in srgb, var(--color-border) 70%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 80% at 20% 0%, black 15%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -top-24 left-0 h-64 w-[28rem] rounded-full opacity-30 blur-3xl"
        aria-hidden
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 30%, transparent), transparent)",
        }}
      />
      <ProductPageShell className="relative py-16 md:py-20">
        <p className={sectionLabel}>{eyebrow}</p>
        <h1 id={titleId} className={sectionTitle}>
          {title}
        </h1>
        {lead ? <p className={sectionLead}>{lead}</p> : null}
        {actions ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {actions}
          </div>
        ) : null}
        {meta ? <div className="mt-6">{meta}</div> : null}
      </ProductPageShell>
    </section>
  );
}
