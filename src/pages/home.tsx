import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  PRODUCT_BRAND,
  SeoHead,
  SITE_CONFIG_GLOBAL_DEFAULT,
  pickLocaleValue,
  useGlobalConfig,
  useLocaleMode,
  useSEODefaults,
  useThemeSettings,
} from "@inkless/theme-host";
import ProductPageShell from "../shell/ProductPageShell";
import { useProductPageContent } from "../chrome/useProductPageContent";
import {
  isSameHref,
  isStockGetStartedLabel,
  resolveProductCtas,
  resolveUnifiedPrimaryCta,
} from "../chrome/resolveProductCtas";
import {
  DEFAULT_INSTALL_CODE,
  isOperatorJargon,
  resolveVisitorInstallCode,
  scrubVisitorCopy,
} from "../chrome/visitorCopy";
import ProductShot, { type MediaRef } from "../ui/ProductShot";
import ShowcaseStrip from "../ui/ShowcaseStrip";
import { resolveMediaText } from "../ui/resolveMediaText";
import {
  btnPrimary,
  btnSecondary,
  btnGhost,
  btnOnPrimary,
  btnOnPrimaryGhost,
  card,
  codeBlock,
  sectionLabel,
  sectionTitle,
  sectionLead,
  textAccentSignal,
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
    media?: MediaRef;
  };
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
      /** Optional in-app or external link for the card */
      href?: string;
    }>;
  };
  howItWorks?: {
    title?: Localized;
    steps?: Array<{ title?: Localized; description?: Localized }>;
  };
  /**
   * Optional narrow facts strip (version · license · single binary).
   * Empty / missing → not rendered.
   */
  factBar?: {
    items?: Array<Localized | string>;
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

/**
 * Neutral software-product placeholders — visitor-safe, not tied to a vendor.
 * Final marketing copy should come from host content documents.
 */
const PLACEHOLDER_FEATURES = [
  {
    title: { zh: "上手简单", en: "Quick to start" },
    description: {
      zh: "清晰的安装与引导路径，访客能马上理解下一步。",
      en: "A clear install and onboarding path so visitors know the next step.",
    },
  },
  {
    title: { zh: "能力清晰", en: "Clear capabilities" },
    description: {
      zh: "用几条可验证的能力说明产品边界，而不是空泛口号。",
      en: "A few verifiable capabilities—not vague slogans.",
    },
  },
  {
    title: { zh: "可扩展", en: "Extensible" },
    description: {
      zh: "稳定接口与扩展点，把定制留在外围。",
      en: "Stable interfaces keep customization outside the core.",
    },
  },
];

const PLACEHOLDER_STEPS = [
  {
    title: { zh: "安装", en: "Install" },
    description: {
      zh: "按文档完成安装或部署。",
      en: "Install or deploy using the docs.",
    },
  },
  {
    title: { zh: "配置", en: "Configure" },
    description: {
      zh: "设置品牌、域名与关键选项。",
      en: "Set brand, domain, and key options.",
    },
  },
  {
    title: { zh: "上线", en: "Ship" },
    description: {
      zh: "发布内容并对外提供服务。",
      en: "Publish content and go live.",
    },
  },
];

const FEATURE_MARKS = ["01", "02", "03"];

function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href.trim());
}

function isInAppPath(href: string): boolean {
  const h = href.trim();
  return h.startsWith("/") && !h.startsWith("//");
}

type ActionLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
};

function ActionLink({ href, className, children }: ActionLinkProps) {
  if (isInAppPath(href)) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  const external = isExternalHref(href);
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

type FeatureItem = NonNullable<NonNullable<ProductHomeConfig["features"]>["items"]>[number];

function FeatureCard({
  item,
  index,
  pick,
}: {
  item: FeatureItem;
  index: number;
  pick: (value: Localized | string | undefined, fallback?: string) => string;
}) {
  const title = pick(item.title, `Feature ${index + 1}`);
  const body = scrubVisitorCopy(pick(item.description));
  const href = typeof item.href === "string" ? item.href.trim() : "";
  const mediaUrl = typeof item.media?.url === "string" ? item.media.url.trim() : "";
  const mediaAlt = resolveMediaText(item.media?.alt, {
    fallback: title,
    pickLocale: (bag) => pick(bag, ""),
  });

  const cardInner = (
    <>
      {mediaUrl ? (
        <div className="mb-4 -mx-0.5 aspect-[16/10] overflow-hidden rounded-md border border-border/70 bg-surface-alt">
          <img
            src={mediaUrl}
            alt={mediaAlt}
            className="h-full w-full object-cover object-top"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div
          className={
            "mb-4 flex h-9 w-9 items-center justify-center rounded-md border border-border/70 bg-surface-alt text-[11px] font-semibold tabular-nums " +
            textAccentSignal
          }
        >
          <span aria-hidden>{item.icon || FEATURE_MARKS[index % FEATURE_MARKS.length]}</span>
        </div>
      )}
      <h3 className="text-[0.9375rem] font-semibold tracking-tight text-on-surface transition-colors group-hover/card:text-accent">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-on-surface-muted">{body}</p>
      {href ? (
        <p className={`mt-4 text-sm font-medium ${textAccentSignal}`}>
          {pick({ zh: "了解更多 →", en: "Learn more →" })}
        </p>
      ) : null}
    </>
  );

  const cardClass = href
    ? `${card} group/card cursor-pointer focus-within:ring-2 focus-within:ring-accent/40`
    : card;

  if (href) {
    return (
      <ActionLink href={href} className={cardClass}>
        {cardInner}
      </ActionLink>
    );
  }
  return <article className={cardClass}>{cardInner}</article>;
}

export default function ProductFirstHomePage() {
  const { config } = useGlobalConfig();
  const { defaultTitle, defaultDescription, defaultOgImage } = useSEODefaults();
  const { localeMode, defaultLocale, currentLocale } = useLocaleMode();
  const settings = useThemeSettings() as Record<string, unknown>;
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
  // Thin shell (T5): operational home data from Page dual-read helper, not theme-owned copy.
  const homeCfg = useProductPageContent<ProductHomeConfig>("home");

  const siteName = pick(siteConfig?.identity?.name, PRODUCT_BRAND.name);
  const tagline = pick(siteConfig?.identity?.tagline, PRODUCT_BRAND.description);

  const heroTitle = pick(homeCfg.hero?.title, siteName);
  const heroSubtitle = scrubVisitorCopy(
    pick(homeCfg.hero?.subtitle, tagline || PRODUCT_BRAND.description),
  );
  const heroEyebrow = pick(homeCfg.hero?.eyebrow, PRODUCT_BRAND.fullName);
  const heroBadge = pick(homeCfg.hero?.badge, "");
  const heroMedia = homeCfg.hero?.media;

  /**
   * P0 CTA contract: “快速开始 / Get started” always matches header → /get-started.
   * Host content that points stock label at #install is rewritten (not silent dual-path).
   */
  const unifiedPrimary = resolveUnifiedPrimaryCta({
    contentLabel: pick(homeCfg.hero?.primaryCta?.label, ""),
    contentHref: homeCfg.hero?.primaryCta?.href?.trim() || "",
    settingsLabel: ctas.primaryCtaLabel,
    settingsHref: ctas.primaryCtaHref,
  });
  const primaryLabel =
    unifiedPrimary.label === "Get started"
      ? pick({ zh: "快速开始", en: "Get started" })
      : unifiedPrimary.label;
  const primaryHref = unifiedPrimary.href;

  const installNavLabel = pick({ zh: "查看安装", en: "View install" });
  let secondaryLabel = pick(homeCfg.hero?.secondaryCta?.label, "");
  let secondaryHref = homeCfg.hero?.secondaryCta?.href?.trim() || "";
  if (!secondaryHref) {
    if (ctas.githubUrl && !isSameHref(primaryHref, ctas.githubUrl)) {
      secondaryHref = ctas.githubUrl;
      secondaryLabel = secondaryLabel || "GitHub";
    } else if (!isSameHref(primaryHref, "#install")) {
      secondaryHref = "#install";
      secondaryLabel = secondaryLabel || installNavLabel;
    } else if (ctas.secondaryCtaHref && !isSameHref(primaryHref, ctas.secondaryCtaHref)) {
      secondaryHref = ctas.secondaryCtaHref;
      secondaryLabel = secondaryLabel || ctas.secondaryCtaLabel || "GitHub";
    }
  } else if (!secondaryLabel) {
    secondaryLabel = isSameHref(secondaryHref, "#install")
      ? installNavLabel
      : isSameHref(secondaryHref, ctas.githubUrl)
        ? "GitHub"
        : ctas.secondaryCtaLabel || pick({ zh: "了解更多", en: "Learn more" });
  }
  const showHeroSecondary = Boolean(secondaryHref) && !isSameHref(primaryHref, secondaryHref);

  const showcaseTitle = pick(
    homeCfg.showcase?.title,
    pick({ zh: "产品界面", en: "Product interface" }),
  );
  /** ≤3 narrative beats: upload / manage / integrate (not a 5-up gallery). */
  const showcaseItems: MediaRef[] | undefined =
    homeCfg.showcase?.items && homeCfg.showcase.items.length > 0
      ? homeCfg.showcase.items.slice(0, 3)
      : [
          { alt: pick({ zh: "上传", en: "Upload" }) },
          { alt: pick({ zh: "管理", en: "Manage" }) },
          { alt: pick({ zh: "对接", en: "Integrate" }) },
        ];

  const featuresTitle = pick(homeCfg.features?.title, pick({ zh: "核心能力", en: "Capabilities" }));
  const featureItems =
    homeCfg.features?.items && homeCfg.features.items.length > 0
      ? homeCfg.features.items
      : PLACEHOLDER_FEATURES;
  /** Mobile priority: at most 3 capability cards; rest via /features. */
  const featureItemsMobile = featureItems.slice(0, 3);
  const hasMoreFeatures = featureItems.length > 3;

  /** Fact bar: content `factBar.items` or theme setting `factBar` ( · -separated). */
  const factBarFromContent = (homeCfg.factBar?.items ?? [])
    .map((item) => (typeof item === "string" ? item.trim() : pick(item, "").trim()))
    .filter(Boolean);
  const factBarSetting =
    typeof settings.factBar === "string"
      ? settings.factBar
      : typeof (settings as { header?: { factBar?: string } }).header?.factBar === "string"
        ? (settings as { header: { factBar: string } }).header.factBar
        : "";
  const factBarFromSettings = factBarSetting
    .split(/[·|]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const factBarItems =
    factBarFromContent.length > 0 ? factBarFromContent : factBarFromSettings;

  const howTitle = pick(homeCfg.howItWorks?.title, pick({ zh: "如何开始", en: "How it works" }));
  const steps =
    homeCfg.howItWorks?.steps && homeCfg.howItWorks.steps.length > 0
      ? homeCfg.howItWorks.steps
      : PLACEHOLDER_STEPS;

  /** Install band title — never share “快速开始” with the primary CTA. */
  const installTitleRaw = pick(homeCfg.install?.title, "");
  const installTitle =
    !installTitleRaw || isStockGetStartedLabel(installTitleRaw)
      ? pick({ zh: "安装", en: "Install" })
      : installTitleRaw;
  const hasDocs = Boolean(ctas.docsUrl);
  const resolvedInstallCode = resolveVisitorInstallCode(
    homeCfg.install?.code?.trim() || "",
    DEFAULT_INSTALL_CODE,
  );

  const defaultInstallCaption = hasDocs
    ? pick({
        zh: "克隆仓库，按文档完成安装与初始化。",
        en: "Clone the repo, then follow the docs to finish setup.",
      })
    : pick({
        zh: "克隆仓库并在本地启动。完整安装说明见仓库 README。",
        en: "Clone the repo and boot locally. Full setup steps are in the repository README.",
      });
  const hostCaptionRaw = pick(homeCfg.install?.caption, "");
  const hostCaption = scrubVisitorCopy(hostCaptionRaw);
  const installCaption =
    hostCaption &&
    !isOperatorJargon(hostCaptionRaw) &&
    !isOperatorJargon(hostCaption) &&
    hostCaption.length >= 8
      ? hostCaption
      : defaultInstallCaption;

  const bottomTitle = pick(
    homeCfg.bottomCta?.title,
    pick({ zh: "准备好开始了吗？", en: "Ready to get started?" }),
  );
  const bottomSubtitle = scrubVisitorCopy(pick(homeCfg.bottomCta?.subtitle, tagline));

  /**
   * Distill peak-end: bottom primary always matches hero primary
   * (visitor job: same next step, not a second “view source” path).
   */
  const bottomCtaLabel = primaryLabel;
  const bottomCtaHref = primaryHref;

  type BottomSecondary = { href: string; label: string; external: boolean };
  let bottomSecondary: BottomSecondary | null = null;
  if (hasDocs && !isSameHref(bottomCtaHref, ctas.docsUrl)) {
    bottomSecondary = {
      href: ctas.docsUrl,
      label: pick({ zh: "完整文档 ↗", en: "Full docs ↗" }),
      external: true,
    };
  } else if (ctas.githubUrl && !isSameHref(bottomCtaHref, ctas.githubUrl)) {
    bottomSecondary = {
      href: ctas.githubUrl,
      label: "GitHub",
      external: true,
    };
  }

  const pageTitle = defaultTitle || siteName;
  const docsLabel = pick({ zh: "完整文档 ↗", en: "Full docs ↗" });
  const readmeLabel = pick({ zh: "查看 README ↗", en: "View README ↗" });

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={defaultDescription || heroSubtitle}
        ogImage={defaultOgImage || heroMedia?.url}
      />

      <section
        className="relative overflow-hidden border-b border-border font-sans"
        aria-labelledby="home-hero-title"
      >
        <div className="pointer-events-none absolute inset-0 bg-surface" aria-hidden />
        {/* Soft dual bloom — product-agnostic atmosphere, not a dense tech grid */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 15% 10%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 55%), " +
              "radial-gradient(ellipse 50% 60% at 90% 20%, color-mix(in srgb, var(--color-primary) 5%, transparent), transparent 50%), " +
              "radial-gradient(ellipse 40% 40% at 60% 100%, color-mix(in srgb, var(--color-accent) 6%, transparent), transparent 55%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.28]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in srgb, var(--color-border) 55%, transparent) 1px, transparent 1px), " +
              "linear-gradient(to bottom, color-mix(in srgb, var(--color-border) 55%, transparent) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 75% 65% at 50% -10%, black 10%, transparent 70%)",
          }}
        />

        <ProductPageShell className="relative py-16 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 max-w-xl lg:col-span-5">
              {(heroEyebrow || heroBadge) && (
                <div className="mb-6 flex flex-wrap items-center gap-2.5">
                  {heroEyebrow ? (
                    <span
                      className={
                        "inline-flex items-center whitespace-nowrap rounded-md border border-accent/20 " +
                        `bg-accent/[0.07] px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${textAccentSignal}`
                      }
                    >
                      {heroEyebrow}
                    </span>
                  ) : null}
                  {heroBadge ? (
                    <span className="inline-flex rounded-md border border-border/80 bg-surface/90 px-2.5 py-0.5 text-[11px] font-medium text-on-surface-muted">
                      {heroBadge}
                    </span>
                  ) : null}
                </div>
              )}

              <h1
                id="home-hero-title"
                className="break-words text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.035em] text-on-surface sm:text-5xl md:text-[3.15rem]"
              >
                {heroTitle}
              </h1>
              {heroSubtitle ? (
                <p className="mt-5 max-w-md break-words text-pretty text-[0.975rem] leading-relaxed text-on-surface-muted md:text-lg">
                  {heroSubtitle}
                </p>
              ) : null}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ActionLink
                  href={primaryHref}
                  className={`${btnPrimary} min-h-12 w-full justify-center sm:w-auto`}
                >
                  {primaryLabel}
                  <span aria-hidden className="opacity-90">
                    →
                  </span>
                </ActionLink>
                {showHeroSecondary ? (
                  <ActionLink
                    href={secondaryHref}
                    className={`${btnSecondary} min-h-12 w-full justify-center sm:w-auto`}
                  >
                    {secondaryLabel}
                  </ActionLink>
                ) : null}
                <Link
                  to="/features"
                  className={`${btnGhost} min-h-11 justify-center px-2 py-2.5 sm:min-h-0 sm:justify-start`}
                >
                  {pick({ zh: "能力", en: "Features" })}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="min-w-0 w-full lg:col-span-7 lg:pl-2">
              <div className="relative w-full">
                <div
                  className="pointer-events-none absolute -inset-6 rounded-lg opacity-70 blur-3xl"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(ellipse at 55% 45%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 68%)",
                  }}
                />
                <ProductShot
                  media={heroMedia}
                  className="relative w-full"
                  polishedPlaceholder
                  mockVariant="admin"
                  chromeLabel={siteName}
                  placeholderTitle={pick({ zh: "产品界面", en: "Product" })}
                />
              </div>
            </div>
          </div>
        </ProductPageShell>
      </section>

      <section
        className="border-b border-border bg-surface-alt/50 font-sans"
        aria-label={showcaseTitle}
      >
        <ProductPageShell className="py-14 md:py-16 lg:py-20">
          <ShowcaseStrip
            title={showcaseTitle}
            items={showcaseItems}
            chromeLabel={siteName}
          />
        </ProductPageShell>
      </section>

      <section className="bg-surface font-sans" aria-labelledby="home-features-title">
        <ProductPageShell className="py-16 md:py-24">
          <p className={sectionLabel}>{pick({ zh: "能力", en: "Capabilities" })}</p>
          <h2 id="home-features-title" className={sectionTitle}>
            {featuresTitle}
          </h2>
          {/* Mobile: ≤3 cards; desktop: full list */}
          <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:hidden md:gap-6">
            {featureItemsMobile.map((item, i) => (
              <FeatureCard
                key={`m-${pick(item.title, `f-${i}`)}-${i}`}
                item={item}
                index={i}
                pick={pick}
              />
            ))}
            {hasMoreFeatures ? (
              <div className="pt-1">
                <Link to="/features" className={`${btnGhost} min-h-11`}>
                  {pick({ zh: "查看全部能力 →", en: "All capabilities →" })}
                </Link>
              </div>
            ) : null}
          </div>
          <div className="mt-12 hidden grid-cols-1 gap-5 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {featureItems.map((item, i) => (
              <FeatureCard
                key={`d-${pick(item.title, `f-${i}`)}-${i}`}
                item={item}
                index={i}
                pick={pick}
              />
            ))}
          </div>
        </ProductPageShell>
      </section>

      <section
        className="border-t border-border bg-surface-alt/50 font-sans"
        aria-labelledby="home-how-title"
      >
        <ProductPageShell className="py-16 md:py-24">
          <p className={sectionLabel}>{pick({ zh: "流程", en: "How it works" })}</p>
          <h2 id="home-how-title" className={sectionTitle}>
            {howTitle}
          </h2>
          <ol className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => {
              const stepTitle = pick(step.title, `Step ${i + 1}`);
              const stepBody = scrubVisitorCopy(pick(step.description));
              return (
                <li key={`${stepTitle}-${i}`} className="relative">
                  <div className="flex items-start gap-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold tabular-nums text-on-primary"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 pt-1">
                      <h3 className="text-[0.9375rem] font-semibold tracking-tight text-on-surface">
                        <span className="sr-only">{`${i + 1}. `}</span>
                        {stepTitle}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-on-surface-muted">{stepBody}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </ProductPageShell>
      </section>

      {factBarItems.length > 0 ? (
        <section
          className="border-t border-border bg-surface-alt/50 font-sans"
          aria-label={pick({ zh: "产品要点", en: "At a glance" })}
        >
          <ProductPageShell className="py-3.5 md:py-4">
            <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-center text-xs font-medium tracking-wide text-on-surface-muted sm:text-sm">
              {factBarItems.map((label, i) => (
                <li key={`${label}-${i}`} className="inline-flex items-center">
                  {i > 0 ? (
                    <span className="mx-2.5 select-none text-border" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </ProductPageShell>
        </section>
      ) : null}

      <section
        id="install"
        className="border-t border-border bg-surface font-sans scroll-mt-24"
        aria-labelledby="home-install-title"
      >
        <ProductPageShell className="py-20 md:py-24">
          <div className="md:grid md:grid-cols-12 md:gap-10 md:items-start">
            <div className="md:col-span-4">
              <p className={sectionLabel}>{pick({ zh: "上手", en: "Install" })}</p>
              <h2 id="home-install-title" className={sectionTitle}>
                {installTitle}
              </h2>
              {installCaption ? <p className={sectionLead}>{installCaption}</p> : null}
              <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                {hasDocs ? (
                  <a
                    href={ctas.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${btnGhost} py-2.5 min-h-11`}
                  >
                    {docsLabel}
                  </a>
                ) : ctas.githubUrl ? (
                  <a
                    href={ctas.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${btnGhost} py-2.5 min-h-11`}
                  >
                    {readmeLabel}
                  </a>
                ) : null}
              </div>
            </div>
            <div className="mt-8 md:col-span-8 md:mt-0">
              <div
                className="overflow-hidden rounded-lg border border-border/80 shadow-[0_12px_32px_-16px_rgb(0_0_0/0.28)]"
                role="region"
                aria-label={pick({ zh: "安装命令", en: "Install commands" })}
              >
                <div
                  className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0c0f14] px-4 py-3"
                  aria-hidden
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 text-[11px] font-medium tracking-wide text-zinc-500">
                    terminal
                  </span>
                </div>
                <pre className={`${codeBlock} mt-0 rounded-none border-0 shadow-none`}>
                  <code>{resolvedInstallCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </ProductPageShell>
      </section>

      <section
        className="relative overflow-hidden border-t border-border font-sans"
        aria-labelledby="home-bottom-title"
      >
        <div className="absolute inset-0 bg-primary" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 55% 80% at 85% 40%, color-mix(in srgb, var(--color-accent) 50%, transparent), transparent 70%), " +
              "radial-gradient(ellipse 40% 50% at 10% 90%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 60%)",
          }}
        />
        <ProductPageShell className="relative py-16 text-center md:py-24">
          <h2
            id="home-bottom-title"
            className="text-balance text-2xl font-semibold tracking-[-0.03em] text-on-primary md:text-3xl lg:text-4xl"
          >
            {bottomTitle}
          </h2>
          {bottomSubtitle ? (
            <p className="mx-auto mt-4 max-w-lg text-pretty text-base text-on-primary/70 md:text-lg">
              {bottomSubtitle}
            </p>
          ) : null}
          <div className="mt-9 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
            <ActionLink href={bottomCtaHref} className={`${btnOnPrimary} w-full sm:w-auto`}>
              {bottomCtaLabel}
              <span aria-hidden className="ml-1 opacity-80">
                →
              </span>
            </ActionLink>
            {bottomSecondary ? (
              <a
                href={bottomSecondary.href}
                {...(bottomSecondary.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`${btnOnPrimaryGhost} w-full sm:w-auto`}
              >
                {bottomSecondary.label}
              </a>
            ) : null}
          </div>
        </ProductPageShell>
      </section>
    </>
  );
}
