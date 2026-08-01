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
 * Compact secondary-page hero — quiet product floor, no product-shot stage.
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
    <section className="relative overflow-hidden border-b border-border bg-surface font-sans">
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 90% at 0% 0%, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 55%), " +
            "radial-gradient(ellipse 50% 60% at 100% 20%, color-mix(in srgb, var(--color-primary) 4%, transparent), transparent 50%)",
        }}
      />
      <ProductPageShell className="relative py-14 md:py-20">
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
