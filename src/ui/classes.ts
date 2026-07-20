/** Shared presentation classes — use CSS vars from theme tokens where possible. */

export const btnPrimary =
  "inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary text-on-primary " +
  "px-5 py-2.5 text-sm font-semibold shadow-sm shadow-primary/20 " +
  "transition-all duration-200 hover:bg-primary-dark hover:shadow-md hover:shadow-primary/25 " +
  "active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const btnSecondary =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-surface " +
  "px-5 py-2.5 text-sm font-semibold text-on-surface " +
  "transition-all duration-200 hover:bg-surface-alt hover:border-on-surface-muted/30 " +
  "active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const btnGhost =
  "inline-flex items-center gap-1 text-sm font-medium text-on-surface-muted " +
  "transition-colors duration-200 hover:text-on-surface";

export const btnHeaderCta =
  "inline-flex items-center justify-center rounded-lg bg-primary text-on-primary " +
  "px-3.5 py-1.5 text-sm font-semibold shadow-sm " +
  "transition-all duration-200 hover:bg-primary-dark active:scale-[0.98]";

export const linkQuiet =
  "text-sm font-medium text-on-surface-muted transition-colors hover:text-on-surface";

export const sectionLabel =
  "text-xs font-semibold uppercase tracking-[0.14em] text-accent";

export const sectionTitle =
  "mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-on-surface text-balance";

export const sectionLead =
  "mt-4 max-w-2xl text-base md:text-lg text-on-surface-muted leading-relaxed text-pretty";

export const card =
  "group relative rounded-2xl border border-border/80 bg-surface p-6 md:p-7 " +
  "shadow-sm shadow-on-surface/[0.03] " +
  "transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-lg hover:shadow-accent/10";

export const codeBlock =
  "mt-6 overflow-x-auto rounded-xl border border-white/10 bg-[#0c1222] " +
  "p-5 md:p-6 text-[13px] md:text-sm text-slate-100 font-mono leading-relaxed " +
  "shadow-inner shadow-black/40";
