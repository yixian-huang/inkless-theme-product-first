/**
 * Surface: /agents (class C theme page, v1.1 product guide)
 * Mode: Read + persuade
 *
 * THESIS: Agent collaboration as product principles + craft CLI—not a pasted doc dump.
 * OWN-WORLD: product-first tokens; principle cards; terminal craft; inverted close.
 * STORY: Visitor knows the non-negotiables (API only, least privilege, dry-run) and next docs.
 * FIRST VIEWPORT: Compact hero with dual CTAs into CLI and external docs.
 * FORM: Principle grid + terminal inside established product-first world.
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

type AgentsConfig = {
  hero?: {
    eyebrow?: Localized;
    title?: Localized;
    subtitle?: Localized;
    primaryCta?: Cta;
    secondaryCta?: Cta;
  };
  principles?: {
    title?: Localized;
    items?: Array<{ title?: Localized; description?: Localized; mark?: string }>;
  };
  cli?: {
    title?: Localized;
    code?: string;
    caption?: Localized;
  };
  bottomCta?: {
    title?: Localized;
    subtitle?: Localized;
    primaryCta?: Cta;
  };
};

const DEFAULT_CLI = [
  "export INKLESS_BASE_URL=https://your-site.example",
  "export INKLESS_API_KEY=ink_…",
  "inkless site whoami",
  "inkless articles list --missing-seo",
].join("\n");

const PLACEHOLDER_PRINCIPLES = [
  {
    mark: "01",
    title: { zh: "只走 Admin API", en: "Admin API only" },
    description: {
      zh: "禁止直连生产数据库；所有读写经公开 Admin / API Key 面。",
      en: "Never open the production DB—all reads and writes go through Admin / API keys.",
    },
  },
  {
    mark: "02",
    title: { zh: "最小权限密钥", en: "Least-privilege keys" },
    description: {
      zh: "长期密钥 ink_…；有效权限 = 用户 RBAC ∩ Key scope。",
      en: "Long-lived ink_… keys; effective auth = user RBAC ∩ key scopes.",
    },
  },
  {
    mark: "03",
    title: { zh: "多站 Fleet", en: "Multi-site fleet" },
    description: {
      zh: "一站一把 key；写操作前 whoami 校验 baseUrl。",
      en: "One key per site; whoami against baseUrl before writes.",
    },
  },
  {
    mark: "04",
    title: { zh: "默认 dry-run", en: "Dry-run by default" },
    description: {
      zh: "变更先演练；发布受策略约束，避免误操作上线。",
      en: "Rehearse changes first; publish stays policy-gated.",
    },
  },
];

export default function ProductFirstAgentsPage() {
  const { config } = useGlobalConfig();
  const { defaultDescription, defaultOgImage, buildTitle } = useSEODefaults();
  const themeSettings = useThemeSettings() as Record<string, unknown>;
  const ctas = resolveProductCtas(themeSettings);
  const pick = usePickLocale();
  const pageCfg = useProductPageContent<AgentsConfig>("agents");
  const siteConfig = (config as any)?.siteConfig ?? SITE_CONFIG_GLOBAL_DEFAULT;

  const siteName = pick(siteConfig?.identity?.name, "Inkless");
  const pageLabel = pick({ zh: "面向 Agent", en: "For agents" });
  const title = buildTitle ? buildTitle(pageLabel) : `${pageLabel} · ${siteName}`;

  const heroEyebrow = pick(pageCfg.hero?.eyebrow, pick({ zh: "Agent", en: "Agents" }));
  const heroTitle = pick(
    pageCfg.hero?.title,
    pick({ zh: "面向 Agent 的内容运维", en: "Content ops for agents" }),
  );
  const heroLead = scrubVisitorCopy(
    pick(
      pageCfg.hero?.subtitle,
      pick({
        zh: "API Key · CLI · MCP——不写库，可协作维护多站内容。",
        en: "API keys · CLI · MCP—no direct DB, multi-site content collaboration.",
      }),
    ),
  );

  const primaryLabel = pick(
    pageCfg.hero?.primaryCta?.label,
    pick({ zh: "查看 CLI 示例", en: "View CLI example" }),
  );
  const primaryHref = pageCfg.hero?.primaryCta?.href?.trim() || "#cli";
  const secondaryLabel = pick(
    pageCfg.hero?.secondaryCta?.label,
    ctas.docsUrl
      ? pick({ zh: "完整文档 ↗", en: "Full docs ↗" })
      : pick({ zh: "快速开始", en: "Get started" }),
  );
  const secondaryHref =
    pageCfg.hero?.secondaryCta?.href?.trim() ||
    (ctas.docsUrl ? ctas.docsUrl : "/get-started");

  const principlesTitle = pick(
    pageCfg.principles?.title,
    pick({ zh: "原则", en: "Principles" }),
  );
  const principles =
    pageCfg.principles?.items && pageCfg.principles.items.length > 0
      ? pageCfg.principles.items
      : PLACEHOLDER_PRINCIPLES;

  const cliTitle = pick(
    pageCfg.cli?.title,
    pick({ zh: "CLI 示例", en: "CLI example" }),
  );
  const cliCaption = scrubVisitorCopy(
    pick(
      pageCfg.cli?.caption,
      pick({
        zh: "先 whoami，再列表与预览变更。生产密钥与 fleet 放在本机配置，勿写入主题包。",
        en: "whoami first, then list and preview changes. Keep keys and fleet config local—never in the theme package.",
      }),
    ),
  );
  const cliCode = (pageCfg.cli?.code?.trim() || DEFAULT_CLI).trim();

  const bottomTitle = pick(
    pageCfg.bottomCta?.title,
    pick({ zh: "从上手路径开始", en: "Start with the human path" }),
  );
  const bottomSubtitle = scrubVisitorCopy(
    pick(
      pageCfg.bottomCta?.subtitle,
      pick({
        zh: "Agent 协作建立在已部署、可访问的实例之上。",
        en: "Agent collaboration assumes a deployed, reachable instance.",
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
          titleId="agents-title"
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
              {secondaryHref && !isSameHref(primaryHref, secondaryHref) ? (
                <ActionLink
                  href={secondaryHref}
                  className={`${btnSecondary} w-full sm:w-auto justify-center`}
                >
                  {secondaryLabel}
                </ActionLink>
              ) : null}
              <Link
                to="/use-cases"
                className={`${btnGhost} px-2 py-2.5 min-h-11 justify-center sm:justify-start sm:min-h-0`}
              >
                {pick({ zh: "适用场景", en: "Use cases" })}
                <span aria-hidden>→</span>
              </Link>
            </>
          }
        />

        <section
          className="border-b border-border bg-surface"
          aria-labelledby="agents-principles-title"
        >
          <ProductPageShell className="py-16 md:py-20">
            <p className={sectionLabel}>{pick({ zh: "约束", en: "Rules" })}</p>
            <h2 id="agents-principles-title" className={sectionTitle}>
              {principlesTitle}
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {principles.map((item, i) => {
                const t = pick(item.title, `Principle ${i + 1}`);
                const body = scrubVisitorCopy(pick(item.description));
                const mark = item.mark || String(i + 1).padStart(2, "0");
                return (
                  <article key={`${t}-${i}`} className={card}>
                    <div className="flex items-start gap-4">
                      <span
                        className={
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " +
                          `bg-accent/10 text-xs font-bold tracking-wide ${textAccentSignal}`
                        }
                        aria-hidden
                      >
                        {mark}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold tracking-tight text-on-surface">
                          {t}
                        </h3>
                        {body ? (
                          <p className="mt-2 text-sm text-on-surface-muted leading-relaxed">
                            {body}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </ProductPageShell>
        </section>

        <section
          id="cli"
          className="border-b border-border bg-surface-alt/40 scroll-mt-24"
          aria-labelledby="agents-cli-title"
        >
          <ProductPageShell className="py-16 md:py-20">
            <div className="md:grid md:grid-cols-12 md:gap-10 md:items-start">
              <div className="md:col-span-4">
                <p className={sectionLabel}>{pick({ zh: "工具", en: "Tools" })}</p>
                <h2 id="agents-cli-title" className={sectionTitle}>
                  {cliTitle}
                </h2>
                {cliCaption ? <p className={sectionLead}>{cliCaption}</p> : null}
                {ctas.docsUrl ? (
                  <a
                    href={ctas.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${btnGhost} mt-6 py-2.5 min-h-11 inline-flex`}
                  >
                    {pick({ zh: "完整文档 ↗", en: "Full docs ↗" })}
                  </a>
                ) : null}
              </div>
              <div className="md:col-span-8 mt-8 md:mt-0">
                <InstallTerminal
                  code={cliCode}
                  label={pick({ zh: "CLI", en: "cli" })}
                />
              </div>
            </div>
          </ProductPageShell>
        </section>

        <BottomCtaBand title={bottomTitle} subtitle={bottomSubtitle} titleId="agents-bottom">
          <ActionLink href={bottomPrimaryHref} className={`${btnOnPrimary} w-full sm:w-auto`}>
            {bottomPrimaryLabel}
            <span aria-hidden className="ml-1 opacity-80">
              →
            </span>
          </ActionLink>
          {ctas.githubUrl && !isSameHref(bottomPrimaryHref, ctas.githubUrl) ? (
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
