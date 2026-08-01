/** Shared presentation classes — CSS vars / semantic tokens only (multi-product safe). */

/**
 * Radius system (tight modern product, not soft-blob SaaS):
 * - controls / buttons: rounded-md (6px)
 * - cards / wells: rounded-lg (8px)
 * - media / terminal shells: rounded-lg
 * Avoid rounded-xl / 2xl on marketing chrome — reads dated / “template AI”.
 */

/** Hero / band primary — solid ink, confident size, crisp corners. */
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-md bg-primary text-on-primary " +
  "px-5 py-2.5 text-sm font-semibold tracking-tight " +
  "shadow-[0_1px_2px_rgb(0_0_0/0.06),0_4px_12px_-4px_color-mix(in_srgb,var(--color-primary)_30%,transparent)] " +
  "transition-[background-color,box-shadow,transform] duration-150 " +
  "hover:bg-primary-dark hover:shadow-[0_1px_2px_rgb(0_0_0/0.08),0_6px_16px_-4px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] " +
  "active:scale-[0.99] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "motion-reduce:transition-none motion-reduce:active:scale-100 " +
  "whitespace-nowrap";

/** Outline secondary — quiet companion to primary. */
export const btnSecondary =
  "inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-surface " +
  "px-5 py-2.5 text-sm font-semibold tracking-tight text-on-surface " +
  "transition-[background-color,border-color,transform] duration-150 " +
  "hover:bg-surface-alt hover:border-on-surface-muted/25 " +
  "active:scale-[0.99] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "motion-reduce:transition-none motion-reduce:active:scale-100";

/** Quiet tertiary — text link. */
export const btnGhost =
  "inline-flex items-center gap-1 rounded-md text-sm font-medium text-on-surface-muted " +
  "transition-colors duration-150 hover:text-on-surface " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "motion-reduce:transition-none";

export const btnHeaderCta =
  "inline-flex items-center justify-center rounded-md bg-primary text-on-primary " +
  "px-3 py-1.5 text-sm font-semibold tracking-tight " +
  "shadow-sm shadow-primary/10 " +
  "transition-[background-color,box-shadow,transform] duration-150 " +
  "hover:bg-primary-dark active:scale-[0.99] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "motion-reduce:transition-none motion-reduce:active:scale-100";

/** Primary action on inverted bands. */
export const btnOnPrimary =
  "inline-flex items-center justify-center rounded-md bg-surface text-on-surface " +
  "px-5 py-2.5 text-sm font-semibold tracking-tight shadow-md shadow-black/10 " +
  "transition-[background-color,box-shadow,transform] duration-150 hover:bg-surface-alt active:scale-[0.99] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "motion-reduce:transition-none motion-reduce:active:scale-100";

/** Ghost outline on inverted bands. */
export const btnOnPrimaryGhost =
  "inline-flex items-center justify-center rounded-md border border-on-primary/20 bg-transparent text-on-primary " +
  "px-5 py-2.5 text-sm font-semibold tracking-tight " +
  "transition-colors duration-150 hover:bg-on-primary/10 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary " +
  "motion-reduce:transition-none";

export const linkQuiet =
  "text-sm font-medium text-on-surface-muted transition-colors hover:text-on-surface " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm " +
  "motion-reduce:transition-none";

/**
 * Section eyebrow — accent mixed with on-surface for WCAG-safe contrast
 * when host accent is mid-chroma.
 */
export const sectionLabel =
  "text-[11px] font-semibold uppercase tracking-[0.14em] " +
  "text-[color-mix(in_srgb,var(--color-accent)_42%,var(--color-on-surface)_58%)]";

export const textAccentSignal =
  "text-[color-mix(in_srgb,var(--color-accent)_42%,var(--color-on-surface)_58%)]";

export const sectionTitle =
  "mt-2.5 text-[1.75rem] leading-tight md:text-[2.25rem] font-semibold tracking-[-0.03em] text-on-surface text-balance";

export const sectionLead =
  "mt-3.5 max-w-xl text-[0.9375rem] md:text-base text-on-surface-muted leading-relaxed text-pretty";

/** Surface card — 8px radius, hairline border, minimal motion. */
export const card =
  "group relative rounded-lg border border-border/80 bg-surface p-5 md:p-6 " +
  "shadow-[0_1px_0_rgb(0_0_0/0.03)] " +
  "transition-[border-color,box-shadow] duration-150 " +
  "hover:border-border hover:shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.08)] " +
  "motion-reduce:transition-none";

export const codeBlock =
  "mt-6 overflow-x-auto rounded-md border border-white/[0.06] bg-[#0c0f14] " +
  "p-5 md:p-6 text-[13px] md:text-sm text-zinc-100 font-mono leading-relaxed " +
  "shadow-inner shadow-black/50";
