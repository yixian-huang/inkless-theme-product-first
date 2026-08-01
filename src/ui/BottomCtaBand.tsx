import type { ReactNode } from "react";
import ProductPageShell from "../shell/ProductPageShell";

type BottomCtaBandProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  titleId?: string;
};

/** Closing conversion band — refined ink floor with soft accent bloom. */
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
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 80% at 85% 40%, color-mix(in srgb, var(--color-accent) 55%, transparent), transparent 70%), " +
            "radial-gradient(ellipse 40% 50% at 10% 90%, color-mix(in srgb, var(--color-accent) 20%, transparent), transparent 60%)",
        }}
      />
      <ProductPageShell className="relative py-16 text-center md:py-20">
        <h2
          id={titleId}
          className="text-balance text-2xl font-semibold tracking-[-0.03em] text-on-primary md:text-3xl"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="mx-auto mt-3 max-w-lg text-pretty text-base text-on-primary/70 md:text-lg">
            {subtitle}
          </p>
        ) : null}
        <div className="mt-9 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
          {children}
        </div>
      </ProductPageShell>
    </section>
  );
}
