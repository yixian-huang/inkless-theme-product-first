/**
 * Surface: /use-cases (class C theme page)
 * Mode: Persuade
 *
 * THESIS: Match the visitor to a product scene—featured scenario + supporting map,
 * not equal generic CMS cards.
 * OWN-WORLD: product-first tokens; soft cards; accent mark wells; surface band rhythm.
 * STORY: Visitor recognizes their path and continues to Get started or Features.
 * FIRST VIEWPORT: Compact hero + featured lead scenario at full measure.
 * FORM: Scenario map inside the established product-first world (extension).
 */
import { Link } from "react-router-dom";
import {
  SeoHead,
  SITE_CONFIG_GLOBAL_DEFAULT,
  useGlobalConfig,
  useSEODefaults,
  useThemeSettings,
} from "@inkless/theme-host";
import {
  type Localized,
  usePickLocale,
  useProductPageContent,
} from "../chrome/useProductPageContent";
import { isSameHref, resolveProductCtas } from "../chrome/resolveProductCtas";
import { scrubVisitorCopy } from "../chrome/visitorCopy";
import ProductPageShell from "../shell/ProductPageShell";
import ActionLink from "../ui/ActionLink";
import BottomCtaBand from "../ui/BottomCtaBand";
import PageHero from "../ui/PageHero";
import {
  btnGhost,
  btnOnPrimary,
  btnOnPrimaryGhost,
  btnPrimary,
  btnSecondary,
  card,
  sectionLabel,
  sectionLead,
  sectionTitle,
  textAccentSignal,
} from "../ui/classes";

type Cta = { label?: Localized; href?: string };

type Scenario = {
  mark?: string;
  title?: Localized;
  description?: Localized;
  audience?: Localized;
  href?: string;
};

type UseCasesConfig = {
  hero?: {
    eyebrow?: Localized;
    title?: Localized;
    subtitle?: Localized;
    primaryCta?: Cta;
    secondaryCta?: Cta;
  };
  scenarios?: {
    title?: Localized;
    lead?: Localized;
    items?: Scenario[];
  };
  bottomCta?: {
    title?: Localized;
    subtitle?: Localized;
    primaryCta?: Cta;
  };
};

const SCENARIO_MARKS = ["◇", "▣", "◎", "◈", "⚡"];

/** Neutral scenario placeholders — override via /public/content/use-cases. */
const PLACEHOLDER_SCENARIOS: Scenario[] = [
  {
    mark: "◇",
    title: { zh: "软件产品介绍站", en: "Software product site" },
    audience: { zh: "开源 / SaaS 运营", en: "OSS / SaaS ops" },
    description: {
      zh: "主题拥有首页与能力叙事，CTA 与文档外链可配置，适合持续运营的产品站。",
      en: "Theme-owned home and capability narrative, configurable CTAs and docs—for ongoing product sites.",
    },
    href: "/get-started",
  },
  {
    mark: "▣",
    title: { zh: "个人与团队博客", en: "Personal & team blog" },
    audience: { zh: "作者 / 团队", en: "Authors / teams" },
    description: {
      zh: "文章流、分类标签、双语 SEO 与阅读向主题，适合内容为主的站点。",
      en: "Article stream, categories/tags, bilingual SEO, and reading themes for content-first sites.",
    },
  },
  {
    mark: "◎",
    title: { zh: "内容团队协作", en: "Content team" },
    audience: { zh: "运营 / 编辑", en: "Ops / editors" },
    description: {
      zh: "草稿、版本、发布与回滚统一管理，可配合 SEO 检查与批量维护。",
      en: "Drafts, versions, publish, and rollback—with SEO checks and batch maintenance.",
    },
  },
  {
    mark: "◈",
    title: { zh: "企业与机构页", en: "Corporate & firm pages" },
    audience: { zh: "官网 / 机构", en: "Firm / org sites" },
    description: {
      zh: "可组合动态页与企业向主题，扩展政策、活动与自定义落地页。",
      en: "Composable dynamic pages and firm themes for policies, campaigns, and custom landings.",
    },
  },
  {
    mark: "⚡",
    title: { zh: "多站与 Agent 运维", en: "Multi-site & agents" },
    audience: { zh: "运维 / Agent", en: "Ops / agents" },
    description: {
      zh: "一站一实例隔离；本机 fleet 与 API Key 最小权限，支持 CLI 与 MCP。",
      en: "One instance per site; local fleet and least-privilege API keys via CLI and MCP.",
    },
    href: "/agents",
  },
];

export default function ProductFirstUseCasesPage() {
  const { config } = useGlobalConfig();
  const { defaultDescription, defaultOgImage, buildTitle } = useSEODefaults();
  const themeSettings = useThemeSettings() as Record<string, unknown>;
  const ctas = resolveProductCtas(themeSettings);
  const pick = usePickLocale();
  const pageCfg = useProductPageContent<UseCasesConfig>("use-cases");
  const siteConfig = (config as any)?.siteConfig ?? SITE_CONFIG_GLOBAL_DEFAULT;

  const siteName = pick(siteConfig?.identity?.name, "Inkless");
  const pageLabel = pick({ zh: "适用场景", en: "Use cases" });
  const title = buildTitle ? buildTitle(pageLabel) : `${pageLabel} · ${siteName}`;

  const heroEyebrow = pick(pageCfg.hero?.eyebrow, pick({ zh: "场景", en: "Scenarios" }));
  const heroTitle = pick(
    pageCfg.hero?.title,
    pick({ zh: "适用场景", en: "Where it fits" }),
  );
  const heroLead = scrubVisitorCopy(
    pick(
      pageCfg.hero?.subtitle,
      pick({
        zh: "产品站、博客、内容团队与多站运维——同一能力面，不同站点形状。",
        en: "Product sites, blogs, content teams, multi-site ops—one capability surface, different site shapes.",
      }),
    ),
  );

  const primaryLabel = pick(
    pageCfg.hero?.primaryCta?.label,
    pick({ zh: "快速开始", en: "Get started" }),
  );
  const primaryHref = pageCfg.hero?.primaryCta?.href?.trim() || "/get-started";
  const secondaryLabel = pick(
    pageCfg.hero?.secondaryCta?.label,
    pick({ zh: "产品能力", en: "Features" }),
  );
  const secondaryHref = pageCfg.hero?.secondaryCta?.href?.trim() || "/features";

  const scenariosTitle = pick(
    pageCfg.scenarios?.title,
    pick({ zh: "典型场景", en: "Typical scenarios" }),
  );
  const scenariosLead = scrubVisitorCopy(pick(pageCfg.scenarios?.lead, ""));
  const scenarios =
    pageCfg.scenarios?.items && pageCfg.scenarios.items.length > 0
      ? pageCfg.scenarios.items
      : PLACEHOLDER_SCENARIOS;

  const [featured, ...rest] = scenarios;

  const bottomTitle = pick(
    pageCfg.bottomCta?.title,
    pick({ zh: "选好场景，开始上手", en: "Pick a path and start" }),
  );
  const bottomSubtitle = scrubVisitorCopy(
    pick(
      pageCfg.bottomCta?.subtitle,
      pick({
        zh: "从部署到发布，按产品站路径走通第一站。",
        en: "From deploy to publish along the product-site path.",
      }),
    ),
  );
  const bottomPrimaryLabel = pick(
    pageCfg.bottomCta?.primaryCta?.label,
    pick({ zh: "快速开始", en: "Get started" }),
  );
  const bottomPrimaryHref =
    pageCfg.bottomCta?.primaryCta?.href?.trim() || "/get-started";

  return (
    <>
      <SeoHead title={title} description={defaultDescription || heroLead} ogImage={defaultOgImage} />
      <div className="font-sans">
        <PageHero
          eyebrow={heroEyebrow}
          title={heroTitle}
          lead={heroLead}
          titleId="use-cases-title"
          actions={
            <>
              <ActionLink
                href={primaryHref}
                className={`${btnPrimary} w-full sm:w-auto justify-center`}
              >
                {primaryLabel}
                <span aria-hidden className="opacity-80">
                  →
                </span>
              </ActionLink>
              {!isSameHref(primaryHref, secondaryHref) ? (
                <ActionLink
                  href={secondaryHref}
                  className={`${btnSecondary} w-full sm:w-auto justify-center`}
                >
                  {secondaryLabel}
                </ActionLink>
              ) : null}
              <Link
                to="/"
                className={`${btnGhost} px-2 py-2.5 min-h-11 justify-center sm:justify-start sm:min-h-0`}
              >
                {pick({ zh: "首页", en: "Home" })}
                <span aria-hidden>→</span>
              </Link>
            </>
          }
        />

        <section
          className="border-b border-border bg-surface"
          aria-labelledby="use-cases-scenarios-title"
        >
          <ProductPageShell className="py-16 md:py-20">
            <p className={sectionLabel}>{pick({ zh: "地图", en: "Map" })}</p>
            <h2 id="use-cases-scenarios-title" className={sectionTitle}>
              {scenariosTitle}
            </h2>
            {scenariosLead ? <p className={sectionLead}>{scenariosLead}</p> : null}

            {featured ? (
              <FeaturedScenario
                scenario={featured}
                mark={featured.mark || SCENARIO_MARKS[0]}
                pick={pick}
              />
            ) : null}

            {rest.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {rest.map((item, i) => {
                  const t = pick(item.title, `Scenario ${i + 2}`);
                  const body = scrubVisitorCopy(pick(item.description));
                  const audience = pick(item.audience, "");
                  const mark = item.mark || SCENARIO_MARKS[(i + 1) % SCENARIO_MARKS.length];
                  const href = item.href?.trim();
                  const inner = (
                    <>
                      <div className="flex items-start gap-4">
                        <div
                          className={
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " +
                            `bg-accent/10 text-base font-semibold ${textAccentSignal}`
                          }
                        >
                          <span aria-hidden>{mark}</span>
                        </div>
                        <div className="min-w-0">
                          {audience ? (
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-muted">
                              {audience}
                            </p>
                          ) : null}
                          <h3
                            className={
                              "text-base font-semibold tracking-tight text-on-surface " +
                              (audience ? "mt-1" : "") +
                              (href ? " group-hover:text-accent transition-colors" : "")
                            }
                          >
                            {t}
                            {href ? (
                              <span aria-hidden className="ml-1 opacity-60">
                                →
                              </span>
                            ) : null}
                          </h3>
                          {body ? (
                            <p className="mt-2 text-sm text-on-surface-muted leading-relaxed">
                              {body}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </>
                  );
                  if (href) {
                    return (
                      <ActionLink key={`${t}-${i}`} href={href} className={`${card} block`}>
                        {inner}
                      </ActionLink>
                    );
                  }
                  return (
                    <article key={`${t}-${i}`} className={card}>
                      {inner}
                    </article>
                  );
                })}
              </div>
            ) : null}
          </ProductPageShell>
        </section>

        <BottomCtaBand title={bottomTitle} subtitle={bottomSubtitle} titleId="use-cases-bottom">
          <ActionLink href={bottomPrimaryHref} className={`${btnOnPrimary} w-full sm:w-auto`}>
            {bottomPrimaryLabel}
            <span aria-hidden className="ml-1 opacity-80">
              →
            </span>
          </ActionLink>
          {ctas.docsUrl && !isSameHref(bottomPrimaryHref, ctas.docsUrl) ? (
            <a
              href={ctas.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnOnPrimaryGhost} w-full sm:w-auto`}
            >
              {pick({ zh: "完整文档 ↗", en: "Full docs ↗" })}
            </a>
          ) : ctas.githubUrl && !isSameHref(bottomPrimaryHref, ctas.githubUrl) ? (
            <a
              href={ctas.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnOnPrimaryGhost} w-full sm:w-auto`}
            >
              GitHub
            </a>
          ) : null}
        </BottomCtaBand>
      </div>
    </>
  );
}

function FeaturedScenario({
  scenario,
  mark,
  pick,
}: {
  scenario: Scenario;
  mark: string;
  pick: (value: Localized | string | undefined, fallback?: string) => string;
}) {
  const t = pick(scenario.title, pick({ zh: "主场景", en: "Lead scenario" }));
  const body = scrubVisitorCopy(pick(scenario.description));
  const audience = pick(scenario.audience, "");
  const href = scenario.href?.trim();

  const content = (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      <div className="lg:col-span-4">
        <div
          className={
            "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-on-primary " +
            "text-xl font-semibold shadow-md shadow-primary/20"
          }
        >
          <span aria-hidden>{mark}</span>
        </div>
        {audience ? (
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-muted">
            {audience}
          </p>
        ) : null}
        <h3
          className={
            "text-xl md:text-2xl font-semibold tracking-tight text-on-surface " +
            (audience ? "mt-2" : "mt-5")
          }
        >
          {t}
        </h3>
      </div>
      <div className="lg:col-span-8">
        {body ? (
          <p className="text-base md:text-lg text-on-surface-muted leading-relaxed text-pretty max-w-2xl">
            {body}
          </p>
        ) : null}
        {href ? (
          <p className="mt-6">
            <span
              className={
                "inline-flex items-center text-sm font-semibold " + textAccentSignal
              }
            >
              {pick({ zh: "继续这条路径", en: "Continue this path" })}
              <span aria-hidden className="ml-1">
                →
              </span>
            </span>
          </p>
        ) : null}
      </div>
    </div>
  );

  const shellClass =
    "mt-10 rounded-2xl border border-border/80 bg-surface-alt/50 p-6 md:p-8 " +
    "shadow-sm shadow-on-surface/[0.03]";

  if (href) {
    return (
      <ActionLink
        href={href}
        className={
          shellClass +
          " block group transition-[border-color,box-shadow] duration-300 " +
          "hover:border-accent/35 hover:shadow-lg hover:shadow-accent/10 " +
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        }
      >
        {content}
      </ActionLink>
    );
  }

  return <div className={shellClass}>{content}</div>;
}
