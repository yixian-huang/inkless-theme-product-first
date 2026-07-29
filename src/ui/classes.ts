/** Shared presentation classes — use CSS vars from theme tokens where possible. */

export const btnPrimary =
  "inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary text-on-primary " +
  "px-5 py-2.5 text-sm font-semibold shadow-sm shadow-primary/15 " +
  "transition-[background-color,box-shadow,transform] duration-200 " +
  "hover:bg-primary-dark hover:shadow-md " +
  "active:scale-[0.98] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "motion-reduce:transition-none motion-reduce:active:scale-100 " +
  "whitespace-nowrap";

export const btnSecondary =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-surface " +
  "px-5 py-2.5 text-sm font-semibold text-on-surface " +
  "transition-[background-color,border-color,transform] duration-200 " +
  "hover:bg-surface-alt hover:border-on-surface-muted/30 " +
  "active:scale-[0.98] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "motion-reduce:transition-none motion-reduce:active:scale-100";

export const btnGhost =
  "inline-flex items-center gap-1 rounded-md text-sm font-medium text-on-surface-muted " +
  "transition-colors duration-200 hover:text-on-surface " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "motion-reduce:transition-none";

export const btnHeaderCta =
  "inline-flex items-center justify-center rounded-lg bg-primary text-on-primary " +
  "px-3.5 py-1.5 text-sm font-semibold shadow-sm " +
  "transition-[background-color,transform] duration-200 hover:bg-primary-dark active:scale-[0.98] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "motion-reduce:transition-none motion-reduce:active:scale-100";

/** Primary action on inverted (primary-filled) bands — surface chip on ink. */
export const btnOnPrimary =
  "inline-flex items-center justify-center rounded-lg bg-surface text-on-surface " +
  "px-6 py-2.5 text-sm font-semibold shadow-lg " +
  "transition-[transform,box-shadow] duration-200 hover:scale-[1.02] active:scale-[0.98] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100";

/** Secondary outline on inverted bands. */
export const btnOnPrimaryGhost =
  "inline-flex items-center justify-center rounded-lg border border-on-primary/25 bg-transparent text-on-primary " +
  "px-6 py-2.5 text-sm font-semibold " +
  "transition-colors duration-200 hover:bg-on-primary/10 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary " +
  "motion-reduce:transition-none";

export const linkQuiet =
  "text-sm font-medium text-on-surface-muted transition-colors hover:text-on-surface " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm " +
  "motion-reduce:transition-none";

/**
 * Section eyebrow — accent signal mixed with on-surface for WCAG-safe contrast
 * when host accent is a mid-chroma teal/cyan (e.g. #14b8a6 on white ≈ 2.5:1 pure).
 */
export const sectionLabel =
  "text-xs font-semibold uppercase tracking-[0.14em] " +
  "text-[color-mix(in_srgb,var(--color-accent)_48%,var(--color-on-surface)_52%)]";

/** Chip / badge text that sits on accent-tinted surfaces — same readable mix. */
export const textAccentSignal =
  "text-[color-mix(in_srgb,var(--color-accent)_48%,var(--color-on-surface)_52%)]";

export const sectionTitle =
  "mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-on-surface text-balance";

export const sectionLead =
  "mt-4 max-w-2xl text-base md:text-lg text-on-surface-muted leading-relaxed text-pretty";

export const card =
  "group relative rounded-2xl border border-border/80 bg-surface p-6 md:p-7 " +
  "shadow-sm shadow-on-surface/[0.03] " +
  "transition-[transform,border-color,box-shadow] duration-300 " +
  "hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-lg hover:shadow-accent/10 " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0";

export const codeBlock =
  "mt-6 overflow-x-auto rounded-xl border border-white/10 bg-[#0c1222] " +
  "p-5 md:p-6 text-[13px] md:text-sm text-slate-100 font-mono leading-relaxed " +
  "shadow-inner shadow-black/40";
