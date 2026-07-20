import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PRODUCT_BRAND,
  SeoHead,
  SITE_CONFIG_GLOBAL_DEFAULT,
  pickLocaleValue,
  useGlobalConfig,
  useHeaderSettings,
  useLocaleMode,
  useSEODefaults,
} from "@inkless/theme-host";
import ProductPageShell from "../shell/ProductPageShell";
import { resolveProductCtas } from "../chrome/resolveProductCtas";
import ProductShot, { type MediaRef } from "../ui/ProductShot";
import ShowcaseStrip from "../ui/ShowcaseStrip";
import {
  btnPrimary,
  btnSecondary,
  btnGhost,
  card,
  codeBlock,
  sectionLabel,
  sectionTitle,
  sectionLead,
} from "../ui/classes";

type Localized = { zh?: string; en?: string; [k: string]: string | undefined };

type ProductHomeConfig = {
  hero?: {
    eyebrow?: Localized;
    title?: Localized;
    subtitle?: Localized;
    primaryCta?: { label?: Localized; href?: string };
    secondaryCta?: { label?: Localized; href?: string };
    badge?: Localized;
    /** Primary product screenshot / illustration beside hero copy */
    media?: MediaRef;
  };
  /** Optional multi-shot product gallery */
  showcase?: {
    title?: Localized;
    items?: MediaRef[];
  };
  features?: {
    title?: Localized;
    items?: Array<{
      title?: Localized;
      description?: Localized;
      icon?: string;
      media?: MediaRef;
    }>;
  };
  howItWorks?: {
    title?: Localized;
    steps?: Array<{ title?: Localized; description?: Localized }>;
  };
  install?: {
    title?: Localized;
    code?: string;
    caption?: Localized;
  };
  bottomCta?: {
    title?: Localized;
    subtitle?: Localized;
    primaryCta?: { label?: Localized; href?: string };
  };
};

const PLACEHOLDER_FEATURES = [
  {
    title: { zh: "主题驱动", en: "Theme-driven" },
    description: {
      zh: "产品站 / 博客 / 企业站由主题决定呈现，而不是写死一套页面。",
      en: "Product, blog, or corporate presentation is owned by themes—not hard-coded shells.",
    },
  },
  {
    title: { zh: "内容运营", en: "Content ops" },
    description: {
      zh: "页面、文章、媒体与发布版本，适合持续运营的软件站点。",
      en: "Pages, articles, media, and publish versions for ongoing product sites.",
    },
  },
  {
    title: { zh: "可扩展", en: "Extensible" },
    description: {
      zh: "插件与主题契约，把定制留在扩展层。",
      en: "Plugins and a theme contract keep customization out of the core.",
    },
  },
];

const PLACEHOLDER_STEPS = [
  {
    title: { zh: "安装", en: "Install" },
    description: { zh: "部署实例并完成初始化。", en: "Deploy an instance and finish setup." },
  },
  {
    title: { zh: "配置品牌", en: "Brand" },
    description: {
      zh: "在站点配置中设置名称、Logo 与主题。",
      en: "Set name, logo, and theme in site config.",
    },
  },
  {
    title: { zh: "发布", en: "Publish" },
    description: {
      zh: "编辑页面与内容，对外发布产品站。",
      en: "Edit pages and content, then publish.",
    },
  },
];

const FEATURE_MARKS = ["◇", "▣", "◎"];

export default function ProductFirstHomePage() {
  const { config } = useGlobalConfig();
  const { defaultTitle, defaultDescription, defaultOgImage } = useSEODefaults();
  const { localeMode, defaultLocale, currentLocale } = useLocaleMode();
  const settings = useHeaderSettings() as Record<string, unknown>;
  const ctas = resolveProductCtas(settings);

  const pick = (value: Localized | string | undefined, fallback = "") => {
    if (typeof value === "string") return value;
    return (
      pickLocaleValue({
        value,
        mode: localeMode,
        defaultLocale,
        currentLocale,
      }) || fallback
    );
  };

  const siteConfig = (config as any)?.siteConfig ?? SITE_CONFIG_GLOBAL_DEFAULT;
  const [homeCfg, setHomeCfg] = useState<ProductHomeConfig>(
    () =>
      ((config as any)?.home ??
        (config as any)?.productHome ??
        (config as any)?.pageConfig ??
        {}) as ProductHomeConfig,
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/public/content/home");
        if (!res.ok) return;
        const data = await res.json();
        const cfg = (data?.config ?? data) as ProductHomeConfig;
        if (!cancelled && cfg && typeof cfg === "object") {
          setHomeCfg(cfg);
        }
      } catch {
        /* keep placeholder */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const siteName = pick(siteConfig?.identity?.name, PRODUCT_BRAND.name);
  const tagline = pick(siteConfig?.identity?.tagline, PRODUCT_BRAND.description);

  const heroTitle = pick(homeCfg.hero?.title, siteName);
  const heroSubtitle = pick(homeCfg.hero?.subtitle, tagline || PRODUCT_BRAND.description);
  const heroEyebrow = pick(homeCfg.hero?.eyebrow, PRODUCT_BRAND.fullName);
  const heroBadge = pick(homeCfg.hero?.badge, "");
  const heroMedia = homeCfg.hero?.media;

  const primaryLabel = pick(homeCfg.hero?.primaryCta?.label, ctas.primaryCtaLabel);
  const primaryHref = homeCfg.hero?.primaryCta?.href?.trim() || ctas.primaryCtaHref;
  const secondaryLabel = pick(homeCfg.hero?.secondaryCta?.label, ctas.secondaryCtaLabel);
  const secondaryHref = homeCfg.hero?.secondaryCta?.href?.trim() || ctas.secondaryCtaHref;

  const showcaseTitle = pick(
    homeCfg.showcase?.title,
    pick({ zh: "产品界面", en: "Product interface" }),
  );
  const showcaseItems = homeCfg.showcase?.items;

  const featuresTitle = pick(homeCfg.features?.title, pick({ zh: "核心能力", en: "Capabilities" }));
  const featureItems =
    homeCfg.features?.items && homeCfg.features.items.length > 0
      ? homeCfg.features.items
      : PLACEHOLDER_FEATURES;

  const howTitle = pick(homeCfg.howItWorks?.title, pick({ zh: "如何开始", en: "How it works" }));
  const steps =
    homeCfg.howItWorks?.steps && homeCfg.howItWorks.steps.length > 0
      ? homeCfg.howItWorks.steps
      : PLACEHOLDER_STEPS;

  const installTitle = pick(homeCfg.install?.title, pick({ zh: "快速开始", en: "Quick start" }));
  const installCode =
    homeCfg.install?.code?.trim() ||
    "# See project docs for install\n# docs and packages live outside this marketing site";
  const installCaption = pick(homeCfg.install?.caption, "");

  const bottomTitle = pick(
    homeCfg.bottomCta?.title,
    pick({ zh: "开始构建你的产品站", en: "Build your product site" }),
  );
  const bottomSubtitle = pick(homeCfg.bottomCta?.subtitle, tagline);
  const bottomCtaLabel = pick(homeCfg.bottomCta?.primaryCta?.label, primaryLabel);
  const bottomCtaHref = homeCfg.bottomCta?.primaryCta?.href?.trim() || primaryHref;

  const pageTitle = defaultTitle || siteName;

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={defaultDescription || heroSubtitle}
        ogImage={defaultOgImage || heroMedia?.url}
      />

      {/* Hero: copy + product shot */}
      <section className="relative overflow-hidden border-b border-border font-sans">
        <div className="pointer-events-none absolute inset-0 bg-surface" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in srgb, var(--color-border) 70%, transparent) 1px, transparent 1px), " +
              "linear-gradient(to bottom, color-mix(in srgb, var(--color-border) 70%, transparent) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 20%, transparent 75%)",
          }}
        />
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          aria-hidden
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 35%, transparent), transparent)",
          }}
        />

        <ProductPageShell className="relative py-16 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            <div className="lg:col-span-5 max-w-xl min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {heroEyebrow ? (
                  <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent whitespace-nowrap">
                    {heroEyebrow}
                  </span>
                ) : null}
                {heroBadge ? (
                  <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-surface-alt border border-border text-on-surface-muted">
                    {heroBadge}
                  </span>
                ) : null}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-[3.1rem] font-semibold tracking-tight text-on-surface leading-[1.15] break-words">
                {heroTitle}
              </h1>
              {heroSubtitle ? (
                <p className="mt-6 text-lg md:text-xl text-on-surface-muted leading-relaxed break-words">
                  {heroSubtitle}
                </p>
              ) : null}

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href={primaryHref} className={btnPrimary}>
                  {primaryLabel}
                  <span aria-hidden className="opacity-80">
                    →
                  </span>
                </a>
                <a href={secondaryHref} className={btnSecondary}>
                  {secondaryLabel}
                </a>
                <Link to="/features" className={`${btnGhost} px-2 py-2`}>
                  {pick({ zh: "能力", en: "Features" })}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-4 min-w-0 w-full">
              <div className="relative w-full">
                <div
                  className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-70 blur-2xl"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(ellipse at 60% 40%, color-mix(in srgb, var(--color-accent) 32%, transparent), transparent 70%)",
                  }}
                />
                <ProductShot
                  media={heroMedia}
                  className="relative w-full"
                  polishedPlaceholder
                  placeholderTitle={pick({ zh: "Inkless 管理界面", en: "Inkless admin" })}
                />
              </div>
            </div>
          </div>
        </ProductPageShell>
      </section>

      {/* Showcase strip */}
      <section className="border-b border-border bg-surface-alt/40 font-sans">
        <ProductPageShell className="py-16 md:py-20">
          <ShowcaseStrip title={showcaseTitle} items={showcaseItems} />
        </ProductPageShell>
      </section>

      {/* Features */}
      <section className="bg-surface font-sans">
        <ProductPageShell className="py-20 md:py-24">
          <p className={sectionLabel}>{pick({ zh: "能力", en: "Product" })}</p>
          <h2 className={sectionTitle}>{featuresTitle}</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {featureItems.map((item, i) => (
              <div key={i} className={card}>
                <div
                  className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
                  }}
                  aria-hidden
                />
                {item.media?.url ? (
                  <div className="mb-4 -mx-1 overflow-hidden rounded-xl border border-border/70 aspect-[16/10] bg-surface-alt">
                    <img
                      src={item.media.url}
                      alt={item.media.alt || pick(item.title, `Feature ${i + 1}`)}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent text-lg">
                    <span aria-hidden>{item.icon || FEATURE_MARKS[i % FEATURE_MARKS.length]}</span>
                  </div>
                )}
                <h3 className="text-base font-semibold tracking-tight text-on-surface">
                  {pick(item.title, `Feature ${i + 1}`)}
                </h3>
                <p className="mt-2 text-sm text-on-surface-muted leading-relaxed">
                  {pick(item.description)}
                </p>
              </div>
            ))}
          </div>
        </ProductPageShell>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-surface-alt/40 font-sans">
        <ProductPageShell className="py-20 md:py-24">
          <p className={sectionLabel}>{pick({ zh: "流程", en: "Workflow" })}</p>
          <h2 className={sectionTitle}>{howTitle}</h2>
          <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
            {steps.map((step, i) => (
              <li key={i} className="relative">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-on-primary text-sm font-bold shadow-md shadow-primary/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1 min-w-0">
                    <h3 className="text-base font-semibold tracking-tight text-on-surface">
                      {pick(step.title, `Step ${i + 1}`)}
                    </h3>
                    <p className="mt-2 text-sm text-on-surface-muted leading-relaxed">
                      {pick(step.description)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </ProductPageShell>
      </section>

      {/* Install */}
      <section id="install" className="border-t border-border bg-surface font-sans scroll-mt-24">
        <ProductPageShell className="py-20 md:py-24">
          <div className="md:grid md:grid-cols-12 md:gap-10 md:items-start">
            <div className="md:col-span-4">
              <p className={sectionLabel}>{pick({ zh: "上手", en: "Install" })}</p>
              <h2 className={sectionTitle}>{installTitle}</h2>
              {installCaption ? <p className={sectionLead}>{installCaption}</p> : null}
              {ctas.docsUrl ? (
                <p className="mt-6">
                  <a
                    href={ctas.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btnGhost}
                  >
                    Full docs ↗
                  </a>
                </p>
              ) : null}
            </div>
            <div className="md:col-span-8 mt-8 md:mt-0">
              <div className="rounded-2xl border border-border overflow-hidden shadow-xl shadow-on-surface/5">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0f1a] border-b border-white/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 text-[11px] font-medium tracking-wide text-slate-400">
                    terminal
                  </span>
                </div>
                <pre className={`${codeBlock} mt-0 rounded-none border-0 shadow-none`}>
                  <code>{installCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </ProductPageShell>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden border-t border-border font-sans">
        <div className="absolute inset-0 bg-primary" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, var(--color-accent), transparent)",
          }}
        />
        <ProductPageShell className="relative py-20 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-on-primary text-balance">
            {bottomTitle}
          </h2>
          {bottomSubtitle ? (
            <p className="mt-4 text-base md:text-lg text-on-primary/75 max-w-xl mx-auto text-pretty">
              {bottomSubtitle}
            </p>
          ) : null}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={bottomCtaHref}
              className="inline-flex items-center justify-center rounded-lg bg-surface text-on-surface px-6 py-2.5 text-sm font-semibold shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {bottomCtaLabel}
            </a>
            {ctas.githubUrl ? (
              <a
                href={ctas.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-on-primary/25 bg-transparent text-on-primary px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-on-primary/10"
              >
                GitHub
              </a>
            ) : null}
          </div>
        </ProductPageShell>
      </section>
    </>
  );
}
