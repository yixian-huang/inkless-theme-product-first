import { Link } from "react-router-dom";
import {
  SeoHead,
  SITE_CONFIG_GLOBAL_DEFAULT,
  pickLocaleValue,
  useGlobalConfig,
  useLocaleMode,
  useSEODefaults,
  useThemeSettings,
} from "@inkless/theme-host";
import ProductPageShell from "../shell/ProductPageShell";
import { resolveProductCtas } from "../chrome/resolveProductCtas";
import {
  btnPrimary,
  btnSecondary,
  card,
  sectionLabel,
  sectionLead,
  sectionTitle,
} from "../ui/classes";

type Localized = { zh?: string; en?: string };

type FeatureItem = {
  mark: string;
  title: Localized;
  body: Localized;
};

type FeatureGroup = {
  id: string;
  label: Localized;
  items: FeatureItem[];
};

/** Capability catalog for product ops — grounded in shipped core (roadmap / README). */
const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: "themes",
    label: { zh: "呈现与主题", en: "Presentation & themes" },
    items: [
      {
        mark: "◇",
        title: { zh: "主题驱动", en: "Theme-driven sites" },
        body: {
          zh: "product-first、blog-first、corporate-classic 等主题决定首页信息架构、Chrome 与布局，而不是写死一套模板。",
          en: "Themes like product-first, blog-first, and corporate-classic own home IA, chrome, and layout—not a hard-coded shell.",
        },
      },
      {
        mark: "▣",
        title: { zh: "主题契约", en: "Theme contract" },
        body: {
          zh: "稳定的 @inkless/theme-host 与 contractVersion，支持内置注册与 UMD 外置主题包。",
          en: "Stable @inkless/theme-host and contractVersion for built-in and remote UMD theme packages.",
        },
      },
      {
        mark: "◎",
        title: { zh: "设计令牌", en: "Design tokens" },
        body: {
          zh: "颜色、字体、布局宽度可在后台覆盖，并与主题默认合并。",
          en: "Colors, fonts, and layout width override in admin and merge with theme defaults.",
        },
      },
    ],
  },
  {
    id: "content",
    label: { zh: "内容与发布", en: "Content & publishing" },
    items: [
      {
        mark: "◈",
        title: { zh: "统一页面", en: "Unified pages" },
        body: {
          zh: "草稿、版本、发布、slug 与 SEO 元数据统一管理，支持发布、下线与回滚。",
          en: "Drafts, versions, publish, slugs, and SEO in one model—with publish, unpublish, and rollback.",
        },
      },
      {
        mark: "✎",
        title: { zh: "文章与编辑器", en: "Articles & editor" },
        body: {
          zh: "分类、标签、Markdown/Tiptap 编辑、公开归档与详情页。",
          en: "Categories, tags, Markdown/Tiptap editing, public archive and post pages.",
        },
      },
      {
        mark: "◷",
        title: { zh: "定时发布", en: "Scheduled publish" },
        body: {
          zh: "文章与页面共用调度队列：排期、改期、取消与失败重试。",
          en: "Shared schedule queue for articles and pages—schedule, reschedule, cancel, and retry.",
        },
      },
      {
        mark: "⧉",
        title: { zh: "媒体库", en: "Media library" },
        body: {
          zh: "上传、裁剪、目录管理；可接本地或 S3/OSS 存储。",
          en: "Upload, crop, folders—local or S3/OSS storage providers.",
        },
      },
    ],
  },
  {
    id: "i18n",
    label: { zh: "双语与 SEO", en: "Bilingual & SEO" },
    items: [
      {
        mark: "文",
        title: { zh: "中英双语", en: "zh / en by default" },
        body: {
          zh: "内容与站点配置原生支持中英字段，运行时 locale 感知渲染。",
          en: "Native zh/en fields on content and site config with locale-aware rendering.",
        },
      },
      {
        mark: "⌘",
        title: { zh: "SEO 与 Sitemap", en: "SEO & sitemap" },
        body: {
          zh: "服务端注入 meta、OG、canonical；Sitemap 与 RSS 可开。",
          en: "Server-side meta, OG, canonical—plus optional sitemap and RSS.",
        },
      },
    ],
  },
  {
    id: "ops",
    label: { zh: "后台与安全", en: "Admin & security" },
    items: [
      {
        mark: "⚑",
        title: { zh: "RBAC 权限", en: "RBAC" },
        body: {
          zh: "JWT + 细粒度权限：读/写/发布/管理等收口后台 API。",
          en: "JWT plus fine-grained read/write/publish/manage scopes on admin APIs.",
        },
      },
      {
        mark: "◎",
        title: { zh: "审计日志", en: "Audit log" },
        body: {
          zh: "登录与后台写操作落库，发布与回滚可追溯。",
          en: "Login and admin mutations recorded—publish and rollback are traceable.",
        },
      },
      {
        mark: "▣",
        title: { zh: "系统状态", en: "System status" },
        body: {
          zh: "版本、运行时、数据库与存储健康、内容统计一览。",
          en: "Version, runtime, DB/storage health, and content stats at a glance.",
        },
      },
    ],
  },
  {
    id: "extend",
    label: { zh: "扩展与迁移", en: "Extensibility & migration" },
    items: [
      {
        mark: "⚡",
        title: { zh: "插件运行时", en: "Plugin runtime" },
        body: {
          zh: "Go SDK/proto 外部插件：安装、启停、provider 注册（默认关闭，管理员显式启用）。",
          en: "Go SDK/proto external plugins—install, start/stop, providers (off by default; admin opt-in).",
        },
      },
      {
        mark: "⇪",
        title: { zh: "内容迁移", en: "Content migration" },
        body: {
          zh: "支持 WordPress、Halo、Markdown 导入与进度跟踪。",
          en: "Import from WordPress, Halo, or Markdown with progress tracking.",
        },
      },
      {
        mark: "◇",
        title: { zh: "AI 辅助", en: "AI assist" },
        body: {
          zh: "可配置 AI provider：建站向导计划、文章翻译预览（需密钥）。",
          en: "Optional AI providers for site-wizard plans and article translation previews.",
        },
      },
    ],
  },
  {
    id: "deploy",
    label: { zh: "部署", en: "Deploy" },
    items: [
      {
        mark: "⚙",
        title: { zh: "自托管", en: "Self-hosted" },
        body: {
          zh: "单实例单逻辑站点；SQLite 或 PostgreSQL；Docker / artifact / systemd。",
          en: "One instance, one logical site—SQLite or PostgreSQL; Docker, artifact, or systemd.",
        },
      },
      {
        mark: "↗",
        title: { zh: "开放源码", en: "Open source" },
        body: {
          zh: "MIT 许可，源码与 issue 在 GitHub 公开。",
          en: "MIT licensed—source and issues on GitHub.",
        },
      },
    ],
  },
];

export default function ProductFirstFeaturesPage() {
  const { config } = useGlobalConfig();
  const { defaultDescription, defaultOgImage, buildTitle } = useSEODefaults();
  const { localeMode, defaultLocale, currentLocale } = useLocaleMode();
  const themeSettings = useThemeSettings() as Record<string, unknown>;
  const ctas = resolveProductCtas(themeSettings);
  const siteConfig = (config as any)?.siteConfig ?? SITE_CONFIG_GLOBAL_DEFAULT;

  const pick = (value: any, fallback = "") =>
    pickLocaleValue({
      value,
      mode: localeMode,
      defaultLocale,
      currentLocale,
    }) || fallback;

  const siteName = pick(siteConfig?.identity?.name, "Inkless");
  const title = buildTitle
    ? buildTitle(pick({ zh: "能力", en: "Features" }))
    : `${pick({ zh: "能力", en: "Features" })} · ${siteName}`;

  return (
    <>
      <SeoHead title={title} description={defaultDescription} ogImage={defaultOgImage} />
      <div className="font-sans">
        <section className="border-b border-border bg-surface-alt/30">
          <ProductPageShell className="py-16 md:py-20">
            <p className={sectionLabel}>{pick({ zh: "产品", en: "Product" })}</p>
            <h1 className={sectionTitle}>
              {pick({ zh: "产品能力", en: "Product capabilities" })}
            </h1>
            <p className={sectionLead}>
              {pick({
                zh: "面向运营与开发的核心能力一览——与仓库已交付能力对齐，而非路线图愿景。",
                en: "Core capabilities for operators and developers—aligned with shipped product, not roadmap vapor.",
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#install" className={btnPrimary}>
                {pick({ zh: "快速开始", en: "Get started" })}
              </a>
              {ctas.docsUrl ? (
                <a
                  href={ctas.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnSecondary}
                >
                  Docs ↗
                </a>
              ) : null}
              <Link to="/" className={btnSecondary}>
                {pick({ zh: "返回首页", en: "Back home" })}
              </Link>
            </div>
          </ProductPageShell>
        </section>

        {FEATURE_GROUPS.map((group) => (
          <section
            key={group.id}
            id={group.id}
            className="border-b border-border last:border-b-0 scroll-mt-24"
          >
            <ProductPageShell className="py-14 md:py-16">
              <p className={sectionLabel}>{pick(group.label)}</p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((item, i) => (
                  <article key={i} className={card}>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent text-base font-semibold">
                      <span aria-hidden>{item.mark}</span>
                    </div>
                    <h2 className="text-base font-semibold tracking-tight text-on-surface">
                      {pick(item.title)}
                    </h2>
                    <p className="mt-2 text-sm text-on-surface-muted leading-relaxed">
                      {pick(item.body)}
                    </p>
                  </article>
                ))}
              </div>
            </ProductPageShell>
          </section>
        ))}

        <section id="install" className="bg-primary scroll-mt-24">
          <ProductPageShell className="py-16 md:py-20 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-on-primary">
              {pick({ zh: "准备好试用了吗？", en: "Ready to try it?" })}
            </h2>
            <p className="mt-3 text-on-primary/75 max-w-xl mx-auto">
              {pick({
                zh: "克隆仓库，make dev-up，几分钟内跑起本地实例。",
                en: "Clone the repo, run make dev-up, and have a local instance in minutes.",
              })}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/yixian-huang/inkless"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-surface text-on-surface px-6 py-2.5 text-sm font-semibold shadow-lg"
              >
                GitHub
              </a>
              {ctas.docsUrl ? (
                <a
                  href={ctas.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-on-primary/25 text-on-primary px-6 py-2.5 text-sm font-semibold"
                >
                  Docs ↗
                </a>
              ) : null}
            </div>
          </ProductPageShell>
        </section>
      </div>
    </>
  );
}
