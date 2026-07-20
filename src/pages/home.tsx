import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PRODUCT_BRAND,
  SeoHead,
  SITE_CONFIG_GLOBAL_DEFAULT,
  pickLocaleValue,
  useGlobalConfig,
  useLocaleMode,
  useSEODefaults,
} from "@inkless/theme-host";
import ProductPageShell from "../shell/ProductPageShell";
import { resolveProductCtas } from "../chrome/resolveProductCtas";
import { useHeaderSettings } from "@inkless/theme-host";

type Localized = { zh?: string; en?: string; [k: string]: string | undefined };

type ProductHomeConfig = {
  hero?: {
    eyebrow?: Localized;
    title?: Localized;
    subtitle?: Localized;
    primaryCta?: { label?: Localized; href?: string };
    secondaryCta?: { label?: Localized; href?: string };
    badge?: Localized;
  };
  features?: {
    title?: Localized;
    items?: Array<{ title?: Localized; description?: Localized; icon?: string }>;
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

/**
 * product-first home — software product landing (not corporate service blocks).
 */
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
  // Load product home schema from host public content (content_documents.home).
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
        /* keep placeholder / bootstrap config */
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

  const primaryLabel = pick(homeCfg.hero?.primaryCta?.label, ctas.primaryCtaLabel);
  const primaryHref = homeCfg.hero?.primaryCta?.href?.trim() || ctas.primaryCtaHref;
  const secondaryLabel = pick(homeCfg.hero?.secondaryCta?.label, ctas.secondaryCtaLabel);
  const secondaryHref = homeCfg.hero?.secondaryCta?.href?.trim() || ctas.secondaryCtaHref;

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
        ogImage={defaultOgImage}
      />

      {/* Hero — full-bleed band, content constrained */}
      <section className="border-b border-border bg-surface font-sans">
        <ProductPageShell className="py-16 md:py-24">
          <div className="max-w-3xl">
            {heroEyebrow ? (
              <p className="text-sm font-medium tracking-wide text-accent mb-3">{heroEyebrow}</p>
            ) : null}
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-on-surface leading-tight">
              {heroTitle}
            </h1>
            {heroSubtitle ? (
              <p className="mt-5 text-lg text-on-surface-muted leading-relaxed">{heroSubtitle}</p>
            ) : null}
            {heroBadge ? (
              <p className="mt-3 inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-surface-alt border border-border text-on-surface-muted">
                {heroBadge}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-md bg-primary text-on-primary px-5 py-2.5 text-sm font-semibold hover:opacity-90"
              >
                {primaryLabel}
              </a>
              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-on-surface hover:bg-surface-alt"
              >
                {secondaryLabel}
              </a>
              <Link
                to="/features"
                className="text-sm font-medium text-on-surface-muted hover:text-on-surface px-2"
              >
                Features →
              </Link>
            </div>
          </div>
        </ProductPageShell>
      </section>

      {/* Features grid */}
      <section className="bg-surface font-sans">
        <ProductPageShell className="py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-on-surface">
            {featuresTitle}
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureItems.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-surface-alt/60 p-6 space-y-2"
              >
                <h3 className="text-base font-semibold text-on-surface">
                  {pick(item.title, `Feature ${i + 1}`)}
                </h3>
                <p className="text-sm text-on-surface-muted leading-relaxed">
                  {pick(item.description)}
                </p>
              </div>
            ))}
          </div>
        </ProductPageShell>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-surface font-sans">
        <ProductPageShell className="py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-on-surface">
            {howTitle}
          </h2>
          <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <li key={i} className="space-y-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary text-sm font-semibold">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-on-surface">
                  {pick(step.title, `Step ${i + 1}`)}
                </h3>
                <p className="text-sm text-on-surface-muted leading-relaxed">
                  {pick(step.description)}
                </p>
              </li>
            ))}
          </ol>
        </ProductPageShell>
      </section>

      {/* Install */}
      <section id="install" className="border-t border-border bg-surface-alt font-sans">
        <ProductPageShell className="py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-on-surface">
            {installTitle}
          </h2>
          {installCaption ? (
            <p className="mt-3 text-on-surface-muted text-sm">{installCaption}</p>
          ) : null}
          <pre className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm text-on-surface font-mono leading-relaxed">
            <code>{installCode}</code>
          </pre>
          {ctas.docsUrl ? (
            <p className="mt-4 text-sm text-on-surface-muted">
              Full install guide:{" "}
              <a
                href={ctas.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-medium hover:underline"
              >
                Docs
              </a>
            </p>
          ) : null}
        </ProductPageShell>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border bg-surface font-sans">
        <ProductPageShell className="py-16 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-on-surface">
            {bottomTitle}
          </h2>
          {bottomSubtitle ? (
            <p className="mt-3 text-on-surface-muted max-w-xl mx-auto">{bottomSubtitle}</p>
          ) : null}
          <div className="mt-8 flex justify-center">
            <a
              href={bottomCtaHref}
              className="inline-flex items-center justify-center rounded-md bg-primary text-on-primary px-6 py-2.5 text-sm font-semibold hover:opacity-90"
            >
              {bottomCtaLabel}
            </a>
          </div>
        </ProductPageShell>
      </section>
    </>
  );
}
