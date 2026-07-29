import type { ReactNode } from "react";
import ProductPageShell from "../shell/ProductPageShell";

type BottomCtaBandProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  titleId?: string;
};

/** Inverted primary band — matches home/features closing conversion strip. */
export default function BottomCtaBand({
  title,
  subtitle,
  children,
  titleId = "bottom-cta-title",
}: BottomCtaBandProps) {
  return (
    <section
      className="relative overflow-hidden border-t border-border font-sans"
      aria-labelledby={titleId}
    >
      <div className="absolute inset-0 bg-primary" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 50%, var(--color-accent), transparent)",
        }}
      />
      <ProductPageShell className="relative py-16 md:py-20 text-center">
        <h2
          id={titleId}
          className="text-2xl md:text-3xl font-semibold tracking-tight text-on-primary text-balance"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 text-base md:text-lg text-on-primary/75 max-w-xl mx-auto text-pretty">
            {subtitle}
          </p>
        ) : null}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          {children}
        </div>
      </ProductPageShell>
    </section>
  );
}
