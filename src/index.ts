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

export const productFirstTokens: ThemeTokens = {
  colors: {
    // Align with Inkless mark (#2563eb) + ink neutrals — product, not consulting teal
    primary: "#0f172a",
    primaryDark: "#020617",
    accent: "#2563eb",
    accentHover: "#1d4ed8",
    surface: "#ffffff",
    surfaceAlt: "#f8fafc",
    onPrimary: "#f8fafc",
    onSurface: "#0f172a",
    onSurfaceMuted: "#64748b",
    border: "#e2e8f0",
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
    borderRadius: "0.75rem",
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
    description: "Software product landing: hero, features, install CTA, optional changelog",
    descriptionZh: "软件产品介绍站：主视觉、能力、安装引导、可选更新日志",
    author: "Inkless CMS",
    version: "0.1.4",
    type: "theme",
    preview: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
    tags: ["product", "landing", "oss"],
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
          defaultValue: "https://github.com/yixian-huang/inkless",
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
          defaultValue: "#install",
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
      ],
    },
  ],
  tokenPresets: [
    {
      id: "default",
      name: "Ink Product",
      nameZh: "墨色产品",
      preview: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
      tokens: productFirstTokens,
    },
    {
      id: "midnight",
      name: "Midnight",
      nameZh: "午夜",
      preview: "linear-gradient(135deg, #020617 0%, #3b82f6 100%)",
      tokens: {
        ...productFirstTokens,
        colors: {
          primary: "#e2e8f0",
          primaryDark: "#f8fafc",
          accent: "#60a5fa",
          accentHover: "#93c5fd",
          surface: "#0b1220",
          surfaceAlt: "#111827",
          onPrimary: "#0f172a",
          onSurface: "#e2e8f0",
          onSurfaceMuted: "#94a3b8",
          border: "#1e293b",
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

export { resolveProductCtas } from "./chrome/resolveProductCtas";
export { default as ProductFirstHomePage } from "./pages/home";
export { default as ProductFirstFeaturesPage } from "./pages/features";
export { default as ProductFirstContactPage } from "./pages/contact";
export { default as ProductHeader } from "./chrome/ProductHeader";
export { default as ProductFooter } from "./chrome/ProductFooter";
export { default as ProductPageShell } from "./shell/ProductPageShell";
export { default as MediaFrame } from "./ui/MediaFrame";
export { default as ProductShot } from "./ui/ProductShot";
export { default as ShowcaseStrip } from "./ui/ShowcaseStrip";
