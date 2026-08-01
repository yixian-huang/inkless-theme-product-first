/**
 * Surface: /get-started (class C theme page)
 * Mode: Persuade + onboard
 *
 * THESIS: First-success path as product craft—ordered steps, install terminal,
 * checklist—not a CMS rich-text dump.
 * OWN-WORLD: product-first ink neutrals, accent signals, terminal craft, step badges, surface bands.
 * STORY: Visitor sees how to go from zero to a published product site and leaves with one next action.
 * FIRST VIEWPORT: Compact hero (eyebrow, H1, lead, dual CTAs + path chips); no product-shot stage.
 * FORM: Guided launch path inside the established product-first world (extension; no redesign).
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
import {
  DEFAULT_INSTALL_CODE,
  resolveVisitorInstallCode,
  scrubVisitorCopy,
} from "../chrome/visitorCopy";
import ProductPageShell from "../shell/ProductPageShell";
import ActionLink from "../ui/ActionLink";
import BottomCtaBand from "../ui/BottomCtaBand";
import InstallTerminal from "../ui/InstallTerminal";
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

type GetStartedConfig = {
  hero?: {
    eyebrow?: Localized;
    title?: Localized;
    subtitle?: Localized;
    primaryCta?: Cta;
    secondaryCta?: Cta;
  };
  steps?: {
    title?: Localized;
    items?: Array<{ title?: Localized; description?: Localized }>;
  };
  install?: {
    title?: Localized;
    code?: string;
    caption?: Localized;
  };
  checklist?: {
    title?: Localized;
    groups?: Array<{ title?: Localized; items?: Array<string | Localized> }>;
  };
  next?: {
    title?: Localized;
    links?: Array<{ title?: Localized; description?: Localized; href?: string }>;
  };
  bottomCta?: {
    title?: Localized;
    subtitle?: Localized;
    primaryCta?: Cta;
  };
};

/** Neutral placeholders — instance content overrides via /public/content/get-started. */
const PLACEHOLDER_STEPS = [
  {
    title: { zh: "部署实例", en: "Deploy" },
    description: {
      zh: "克隆仓库并完成本地或自托管启动。",
      en: "Clone the repo and boot locally or self-hosted.",
    },
  },
  {
    title: { zh: "选择主题", en: "Choose a theme" },
    description: {
      zh: "在管理端安装并激活产品站或博客主题，填写品牌与 CTA。",
      en: "Install and activate a product or blog theme; set brand and CTAs.",
    },
  },
  {
    title: { zh: "发布第一站", en: "Publish" },
    description: {
      zh: "编辑首页与页面内容，对外发布产品站。",
      en: "Edit home and pages, then publish your product site.",
    },
  },
];

const PLACEHOLDER_CHECKLIST = [
  {
    title: { zh: "上线前", en: "Before go-live" },
    items: [
      { zh: "环境与 BASE_URL 已确认", en: "Environment and BASE_URL confirmed" },
      { zh: "主题已激活，品牌与主 CTA 已填", en: "Theme active; brand and primary CTA set" },
      { zh: "公开页可访问，SEO 元数据已检查", en: "Public pages load; SEO metadata checked" },
    ],
  },
];

const PLACEHOLDER_NEXT = [
  {
    title: { zh: "适用场景", en: "Use cases" },
    description: {
      zh: "产品站、博客、内容团队与多站运维。",
      en: "Product sites, blogs, content teams, multi-site ops.",
    },
    href: "/use-cases",
  },
  {
    title: { zh: "产品能力", en: "Features" },
    description: {
      zh: "主题、内容、发布与扩展能力一览。",
      en: "Themes, content, publishing, and extension capabilities.",
    },
    href: "/features",
  },
  {
    title: { zh: "面向 Agent", en: "For agents" },
    description: {
      zh: "API Key、CLI 与 MCP 协作原则。",
      en: "API keys, CLI, and MCP collaboration principles.",
    },
    href: "/agents",
  },
];

export default function ProductFirstGetStartedPage() {
  const { config } = useGlobalConfig();
  const { defaultDescription, defaultOgImage, buildTitle } = useSEODefaults();
  const themeSettings = useThemeSettings() as Record<string, unknown>;
  const ctas = resolveProductCtas(themeSettings);
  const pick = usePickLocale();
  const pageCfg = useProductPageContent<GetStartedConfig>("get-started");
  const siteConfig = (config as any)?.siteConfig ?? SITE_CONFIG_GLOBAL_DEFAULT;

  const siteName = pick(siteConfig?.identity?.name, "Inkless");
  const pageLabel = pick({ zh: "上手", en: "Get started" });
  const title = buildTitle ? buildTitle(pageLabel) : `${pageLabel} · ${siteName}`;

  const heroEyebrow = pick(pageCfg.hero?.eyebrow, pick({ zh: "上手", en: "Start" }));
  const heroTitle = pick(
    pageCfg.hero?.title,
    pick({ zh: "从部署到第一站", en: "From deploy to first site" }),
  );
  const heroLead = scrubVisitorCopy(
    pick(
      pageCfg.hero?.subtitle,
      pick({
        zh: "三步跑通本地或自托管实例，安装官方主题并发布产品站。",
        en: "Three steps: run an instance, install an official theme, publish your product site.",
      }),
    ),
  );

  const primaryLabel = pick(
    pageCfg.hero?.primaryCta?.label,
    pick({ zh: "查看安装命令", en: "View install" }),
  );
  const primaryHref = pageCfg.hero?.primaryCta?.href?.trim() || "#install";
  const secondaryLabel = pick(
    pageCfg.hero?.secondaryCta?.label,
    ctas.docsUrl
      ? pick({ zh: "完整文档 ↗", en: "Full docs ↗" })
      : pick({ zh: "适用场景", en: "Use cases" }),
  );
  const secondaryHref =
    pageCfg.hero?.secondaryCta?.href?.trim() ||
    (ctas.docsUrl ? ctas.docsUrl : "/use-cases");
  const showSecondary = Boolean(secondaryHref) && !isSameHref(primaryHref, secondaryHref);

  const stepsTitle = pick(
    pageCfg.steps?.title,
    pick({ zh: "上手路径", en: "Path" }),
  );
  const steps =
    pageCfg.steps?.items && pageCfg.steps.items.length > 0
      ? pageCfg.steps.items
      : PLACEHOLDER_STEPS;

  const installTitle = pick(
    pageCfg.install?.title,
    pick({ zh: "本地快速启动", en: "Local quick start" }),
  );
  const installCaption = scrubVisitorCopy(
    pick(
      pageCfg.install?.caption,
      pick({
        zh: "克隆仓库并启动开发环境。生产部署见仓库 README 或完整文档。",
        en: "Clone the repo and start the dev environment. Production steps are in the README or full docs.",
      }),
    ),
  );
  const installCode = resolveVisitorInstallCode(
    pageCfg.install?.code?.trim() || "",
    DEFAULT_INSTALL_CODE,
  );

  const checklistTitle = pick(
    pageCfg.checklist?.title,
    pick({ zh: "检查清单", en: "Checklist" }),
  );
  const checklistGroups =
    pageCfg.checklist?.groups && pageCfg.checklist.groups.length > 0
      ? pageCfg.checklist.groups
      : PLACEHOLDER_CHECKLIST;

  const nextTitle = pick(
    pageCfg.next?.title,
    pick({ zh: "接下来", en: "Next" }),
  );
  const nextLinks =
    pageCfg.next?.links && pageCfg.next.links.length > 0
      ? pageCfg.next.links
      : PLACEHOLDER_NEXT;

  const bottomTitle = pick(
    pageCfg.bottomCta?.title,
    pick({ zh: "准备好了？", en: "Ready?" }),
  );
  const bottomSubtitle = scrubVisitorCopy(
    pick(
      pageCfg.bottomCta?.subtitle,
      pick({
        zh: "从仓库开始，几分钟内跑起本地实例。",
        en: "Start from the repository and have a local instance in minutes.",
      }),
    ),
  );
  const bottomPrimaryLabel = pick(
    pageCfg.bottomCta?.primaryCta?.label,
    ctas.githubUrl
      ? "GitHub"
      : pick({ zh: "返回首页", en: "Back home" }),
  );
  const bottomPrimaryHref =
    pageCfg.bottomCta?.primaryCta?.href?.trim() ||
    (ctas.githubUrl || "/");

  return (
    <>
      <SeoHead title={title} description={defaultDescription || heroLead} ogImage={defaultOgImage} />
      <div className="font-sans">
        <PageHero
          eyebrow={heroEyebrow}
          title={heroTitle}
          lead={heroLead}
          titleId="get-started-title"
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
              {showSecondary ? (
                <ActionLink
                  href={secondaryHref}
                  className={`${btnSecondary} w-full sm:w-auto justify-center`}
                >
                  {secondaryLabel}
                </ActionLink>
              ) : null}
              <Link
                to="/features"
                className={`${btnGhost} px-2 py-2.5 min-h-11 justify-center sm:justify-start sm:min-h-0`}
              >
                {pick({ zh: "能力", en: "Features" })}
                <span aria-hidden>→</span>
              </Link>
            </>
          }
          meta={
            <ol className="flex flex-wrap gap-2" aria-label={stepsTitle}>
              {steps.map((step, i) => (
                <li
                  key={i}
                  className={
                    "inline-flex items-center gap-2 rounded-full border border-border bg-surface " +
                    "px-3 py-1.5 text-xs font-medium text-on-surface-muted"
                  }
                >
                  <span
                    className={
                      "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs " +
                      "font-bold text-on-primary leading-none"
                    }
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  {pick(step.title, `Step ${i + 1}`)}
                </li>
              ))}
            </ol>
          }
        />

        <section
          className="border-b border-border bg-surface"
          aria-labelledby="get-started-steps-title"
        >
          <ProductPageShell className="py-16 md:py-20">
            <p className={sectionLabel}>{pick({ zh: "流程", en: "Workflow" })}</p>
            <h2 id="get-started-steps-title" className={sectionTitle}>
              {stepsTitle}
            </h2>
            <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {steps.map((step, i) => {
                const stepTitle = pick(step.title, `Step ${i + 1}`);
                const stepBody = scrubVisitorCopy(pick(step.description));
                return (
                  <li key={`${stepTitle}-${i}`} className="relative">
                    <div className="flex items-start gap-4">
                      <span
                        className={
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg " +
                          "bg-primary text-on-primary text-sm font-bold shadow-md shadow-primary/20"
                        }
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="pt-1 min-w-0">
                        <h3 className="text-base font-semibold tracking-tight text-on-surface">
                          <span className="sr-only">{`${i + 1}. `}</span>
                          {stepTitle}
                        </h3>
                        {stepBody ? (
                          <p className="mt-2 text-sm text-on-surface-muted leading-relaxed">
                            {stepBody}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </ProductPageShell>
        </section>

        <section
          id="install"
          className="border-b border-border bg-surface-alt/40 scroll-mt-24"
          aria-labelledby="get-started-install-title"
        >
          <ProductPageShell className="py-16 md:py-20">
            <div className="md:grid md:grid-cols-12 md:gap-10 md:items-start">
              <div className="md:col-span-4">
                <p className={sectionLabel}>{pick({ zh: "安装", en: "Install" })}</p>
                <h2 id="get-started-install-title" className={sectionTitle}>
                  {installTitle}
                </h2>
                {installCaption ? <p className={sectionLead}>{installCaption}</p> : null}
                <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  {ctas.docsUrl ? (
                    <a
                      href={ctas.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${btnGhost} py-2.5 min-h-11`}
                    >
                      {pick({ zh: "完整文档 ↗", en: "Full docs ↗" })}
                    </a>
                  ) : ctas.githubUrl ? (
                    <a
                      href={ctas.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${btnGhost} py-2.5 min-h-11`}
                    >
                      {pick({ zh: "查看 README ↗", en: "View README ↗" })}
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="md:col-span-8 mt-8 md:mt-0">
                <InstallTerminal
                  code={installCode}
                  label={pick({ zh: "终端", en: "terminal" })}
                />
              </div>
            </div>
          </ProductPageShell>
        </section>

        <section
          className="border-b border-border bg-surface"
          aria-labelledby="get-started-check-title"
        >
          <ProductPageShell className="py-16 md:py-20">
            <p className={sectionLabel}>{pick({ zh: "核对", en: "Verify" })}</p>
            <h2 id="get-started-check-title" className={sectionTitle}>
              {checklistTitle}
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {checklistGroups.map((group, gi) => {
                const gTitle = pick(group.title, pick({ zh: "清单", en: "List" }));
                const items = group.items ?? [];
                return (
                  <article key={`${gTitle}-${gi}`} className={card}>
                    <h3 className="text-base font-semibold tracking-tight text-on-surface">
                      {gTitle}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {items.map((raw, ii) => {
                        const text =
                          typeof raw === "string"
                            ? scrubVisitorCopy(raw)
                            : scrubVisitorCopy(pick(raw as Localized));
                        return (
                          <li key={ii} className="flex items-start gap-3 text-sm text-on-surface-muted">
                            <span
                              className={
                                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md " +
                                `bg-accent/10 text-xs font-semibold ${textAccentSignal}`
                              }
                              aria-hidden
                            >
                              ✓
                            </span>
                            <span className="leading-relaxed">{text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                );
              })}
            </div>
          </ProductPageShell>
        </section>

        <section
          className="border-b border-border bg-surface-alt/40"
          aria-labelledby="get-started-next-title"
        >
          <ProductPageShell className="py-16 md:py-20">
            <p className={sectionLabel}>{pick({ zh: "延伸", en: "Explore" })}</p>
            <h2 id="get-started-next-title" className={sectionTitle}>
              {nextTitle}
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {nextLinks.map((link, i) => {
                const t = pick(link.title, `Link ${i + 1}`);
                const d = scrubVisitorCopy(pick(link.description));
                const href = link.href?.trim() || "/";
                return (
                  <ActionLink key={`${t}-${i}`} href={href} className={`${card} block`}>
                    <h3 className="text-base font-semibold tracking-tight text-on-surface group-hover:text-accent transition-colors">
                      {t}
                      <span aria-hidden className="ml-1 opacity-60">
                        →
                      </span>
                    </h3>
                    {d ? (
                      <p className="mt-2 text-sm text-on-surface-muted leading-relaxed">{d}</p>
                    ) : null}
                  </ActionLink>
                );
              })}
            </div>
          </ProductPageShell>
        </section>

        <BottomCtaBand title={bottomTitle} subtitle={bottomSubtitle} titleId="get-started-bottom">
          <ActionLink href={bottomPrimaryHref} className={`${btnOnPrimary} w-full sm:w-auto`}>
            {bottomPrimaryLabel}
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
          ) : null}
        </BottomCtaBand>
      </div>
    </>
  );
}
