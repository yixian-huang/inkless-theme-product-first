import type { ThemePlugin, ThemeTokens } from "@inkless/theme-host";
import ProductHeader from "./chrome/ProductHeader";
import ProductFooter from "./chrome/ProductFooter";

/** Theme id — keep in sync with host `BUILTIN_THEME_IDS.PRODUCT_FIRST`. */
export const PRODUCT_FIRST_THEME_ID = "product-first";

/**
 * Host contract this package targets.
 * Keep in lockstep with host THEME_CONTRACT_VERSION and inkless.theme.json.
 */
export const PRODUCT_FIRST_CONTRACT_VERSION = "1";

/** Product layout: wide profile + 72rem max width (see design-product-first-theme.md). */
export const PRODUCT_DEFAULT_LAYOUT = {
  type: "default" as const,
  contentProfile: "wide" as const,
  header: { style: "sticky" as const },
  footer: { style: "minimal" as const },
};

/**
 * Neutral product defaults — zinc floor + indigo signal.
 * Override accent/primary in host tokens to match any product UI.
 */
export const productFirstTokens: ThemeTokens = {
  colors: {
    primary: "#18181b",
    primaryDark: "#09090b",
    accent: "#4f46e5",
    accentHover: "#4338ca",
    surface: "#ffffff",
    surfaceAlt: "#fafafa",
    onPrimary: "#fafafa",
    onSurface: "#18181b",
    onSurfaceMuted: "#71717a",
    border: "#e4e4e7",
  },
  fonts: {
    sans: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
    heading: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
    mono: 'ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace',
  },
  fontSources: {
    sansPresetId: "system-ui",
    headingPresetId: "system-ui",
    monoPresetId: "system-mono",
  },
  layout: {
    maxWidth: "72rem",
    borderRadius: "0.5rem",
    contentPadding: "1.5rem",
    sectionSpacing: "5rem",
    contentGap: "2rem",
  },
};

export const productFirstTheme: ThemePlugin = {
  manifest: {
    id: PRODUCT_FIRST_THEME_ID,
    name: "Product First",
    nameZh: "产品优先",
    description: "Software product landing: hero, features, get-started, use cases, agents guide",
    descriptionZh: "软件产品介绍站：主视觉、能力、上手、用例、Agent 导览",
    author: "Inkless CMS",
    version: "0.1.9",
    type: "theme",
    preview: "linear-gradient(135deg, #18181b 0%, #4f46e5 100%)",
    tags: ["product", "landing", "oss", "saas"],
  },
  contractVersion: PRODUCT_FIRST_CONTRACT_VERSION,
  defaultTokens: productFirstTokens,
  settingSchema: [
    {
      group: "header",
      label: "Header & CTAs",
      labelZh: "页眉与 CTA",
      fields: [
        {
          name: "brandMode",
          type: "select",
          label: "Brand mark",
          labelZh: "品牌区",
          defaultValue: "logo",
          options: [
            { label: "Logo image", value: "logo" },
            { label: "Site name", value: "text" },
            { label: "Hidden", value: "none" },
          ],
        },
        {
          name: "docsUrl",
          type: "text",
          label: "Docs URL (external)",
          labelZh: "文档外链",
          defaultValue: "",
        },
        {
          name: "githubUrl",
          type: "text",
          label: "GitHub URL",
          labelZh: "GitHub 链接",
          defaultValue: "",
        },
        {
          name: "primaryCtaLabel",
          type: "text",
          label: "Primary CTA label",
          labelZh: "主 CTA 文案",
          defaultValue: "Get started",
        },
        {
          name: "primaryCtaHref",
          type: "text",
          label: "Primary CTA href",
          labelZh: "主 CTA 链接",
          defaultValue: "/get-started",
        },
        {
          name: "showRssLink",
          type: "boolean",
          label: "Show RSS (usually off for product sites)",
          labelZh: "显示 RSS（产品站通常关闭）",
          defaultValue: false,
        },
        {
          name: "showSocials",
          type: "boolean",
          label: "Show socials in header utilities",
          labelZh: "页眉显示社交链接",
          defaultValue: false,
        },
        {
          name: "factBar",
          type: "text",
          label: "Home fact bar (· separated, e.g. v1.0 · AGPL · Single binary)",
          labelZh: "首页事实条（用 · 分隔，如 v1.0 · AGPL · 单二进制）",
          defaultValue: "",
        },
      ],
    },
  ],
  tokenPresets: [
    {
      id: "default",
      name: "Neutral Product",
      nameZh: "中性产品",
      preview: "linear-gradient(135deg, #18181b 0%, #4f46e5 100%)",
      tokens: productFirstTokens,
    },
    {
      id: "ocean",
      name: "Ocean",
      nameZh: "海洋",
      preview: "linear-gradient(135deg, #0f172a 0%, #0ea5e9 100%)",
      tokens: {
        ...productFirstTokens,
        colors: {
          primary: "#0f172a",
          primaryDark: "#020617",
          accent: "#0284c7",
          accentHover: "#0369a1",
          surface: "#ffffff",
          surfaceAlt: "#f8fafc",
          onPrimary: "#f8fafc",
          onSurface: "#0f172a",
          onSurfaceMuted: "#64748b",
          border: "#e2e8f0",
        },
      },
    },
    {
      id: "midnight",
      name: "Midnight",
      nameZh: "午夜",
      preview: "linear-gradient(135deg, #09090b 0%, #818cf8 100%)",
      tokens: {
        ...productFirstTokens,
        colors: {
          primary: "#f4f4f5",
          primaryDark: "#fafafa",
          accent: "#818cf8",
          accentHover: "#a5b4fc",
          surface: "#09090b",
          surfaceAlt: "#18181b",
          onPrimary: "#18181b",
          onSurface: "#f4f4f5",
          onSurfaceMuted: "#a1a1aa",
          border: "#27272a",
        },
      },
    },
  ],

  pages: [
    {
      slug: "home",
      renderMode: "hardcoded",
      lazyComponent: () => import("./pages/home"),
      contentKey: "home",
      nav: {
        label: "Home",
        labelZh: "首页",
        order: 0,
        showInHeader: true,
        showInFooter: true,
      },
    },
    {
      slug: "features",
      renderMode: "hardcoded",
      lazyComponent: () => import("./pages/features"),
      contentKey: "features",
      nav: {
        label: "Features",
        labelZh: "能力",
        order: 1,
        showInHeader: true,
        showInFooter: true,
      },
    },
    {
      slug: "get-started",
      renderMode: "hardcoded",
      lazyComponent: () => import("./pages/get-started"),
      contentKey: "get-started",
      nav: {
        label: "Get started",
        labelZh: "上手",
        order: 2,
        showInHeader: true,
        showInFooter: true,
      },
    },
    {
      slug: "use-cases",
      renderMode: "hardcoded",
      lazyComponent: () => import("./pages/use-cases"),
      contentKey: "use-cases",
      nav: {
        label: "Use cases",
        labelZh: "用例",
        order: 3,
        showInHeader: true,
        showInFooter: true,
      },
    },
    {
      slug: "agents",
      renderMode: "hardcoded",
      lazyComponent: () => import("./pages/agents"),
      contentKey: "agents",
      nav: {
        label: "For agents",
        labelZh: "面向 Agent",
        order: 4,
        showInHeader: true,
        showInFooter: true,
      },
    },
    {
      slug: "contact",
      renderMode: "hardcoded",
      lazyComponent: () => import("./pages/contact"),
      contentKey: "contact",
      nav: {
        label: "Contact",
        labelZh: "联系",
        order: 10,
        showInHeader: true,
        showInFooter: true,
      },
    },
  ],
  defaultLayout: PRODUCT_DEFAULT_LAYOUT,
  layoutChrome: {
    Header: ProductHeader,
    Footer: ProductFooter,
  },
};

export {
  resolveProductCtas,
  resolveUnifiedPrimaryCta,
  isStockGetStartedLabel,
} from "./chrome/resolveProductCtas";
export { default as ProductFirstHomePage } from "./pages/home";
export { default as ProductFirstFeaturesPage } from "./pages/features";
export { default as ProductFirstGetStartedPage } from "./pages/get-started";
export { default as ProductFirstUseCasesPage } from "./pages/use-cases";
export { default as ProductFirstAgentsPage } from "./pages/agents";
export { default as ProductFirstContactPage } from "./pages/contact";
export { default as ProductHeader } from "./chrome/ProductHeader";
export { default as ProductFooter } from "./chrome/ProductFooter";
export { default as ProductPageShell } from "./shell/ProductPageShell";
export { default as MediaFrame } from "./ui/MediaFrame";
export { default as ProductShot } from "./ui/ProductShot";
export { default as ShowcaseStrip } from "./ui/ShowcaseStrip";
export { default as PageHero } from "./ui/PageHero";
export { default as BottomCtaBand } from "./ui/BottomCtaBand";
export { default as InstallTerminal } from "./ui/InstallTerminal";
export { default as ActionLink } from "./ui/ActionLink";
export { resolveMediaText, resolveMediaRef } from "./ui/resolveMediaText";
export type { MediaRef } from "./ui/ProductShot";
