/**
 * Ambient types for standalone theme development / CI.
 * Runtime: host provides window.InklessThemeHost / @inkless/theme-host.
 */
declare module "@inkless/theme-host" {
  import type { ComponentType, ReactNode } from "react";

  export const THEME_CONTRACT_VERSION: string;
  export const THEME_CONTRACT_SUPPORTED: readonly string[];
  export const BLOG_DEFAULT_LAYOUT: {
    type: string;
    contentProfile?: string;
    header?: { style?: string };
    footer?: { style?: string };
  };
  export const PRODUCT_BRAND: {
    name: string;
    fullName: string;
    domain: string;
    origin: string;
    description: string;
  };
  export const SITE_CONFIG_GLOBAL_DEFAULT: Record<string, unknown>;

  export type HeaderBrandMode = "text" | "logo" | "avatar" | "none";
  export type BrandingView = {
    siteName: string;
    tagline: string;
    logo: { light: string; dark?: string };
    favicon: string;
    primaryColor: string;
    author: {
      name: string;
      avatar?: string;
      bio: string;
      socials: Array<{ kind: string; url: string; label?: string }>;
    };
    footer: { copyright: string; icp?: string; extraLinks?: unknown[] };
    localeMode: string;
    defaultLocale: string;
    currentLocale: string;
  };

  export type ThemeTokens = Record<string, unknown>;
  export type ThemePlugin = {
    manifest: Record<string, unknown>;
    contractVersion?: string;
    defaultTokens: ThemeTokens;
    pages: unknown[];
    [key: string]: unknown;
  };
  export type HeaderChromeProps = { config?: { style?: string; [key: string]: unknown } };
  export type FooterChromeProps = { config?: { style?: string; copyright?: string; [key: string]: unknown } };

  export function useBranding(): BrandingView;
  export function useContentMaxWidth(): string;
  export function useIsReadingLayout(): boolean;
  export function useIsThemeHomePath(): boolean;
  export function useHeaderSettings(): {
    brandMode: HeaderBrandMode;
    showRssLink: boolean;
    showSocials: boolean;
    [key: string]: unknown;
  };
  export function useThemeSettings(): Record<string, unknown>;
  export function useGlobalConfig(): { config: any; features?: any; locale?: string };
  export function useSEODefaults(): {
    defaultTitle: string;
    defaultDescription: string;
    defaultOgImage: string;
    buildTitle: (t: string) => string;
  };
  export function useLocaleMode(): {
    localeMode: any;
    defaultLocale: any;
    currentLocale: any;
  };
  export function pickLocaleValue(input: any): string;
  export function getPublicArticles(
    page?: number,
    pageSize?: number,
  ): Promise<{ items: any[]; total: number }>;

  export const BaseSiteHeader: ComponentType<any>;
  export const BrandMark: ComponentType<any>;
  export const HeaderUtilities: ComponentType<any>;
  export const SeoHead: ComponentType<any>;
  export const BlogPageShell: ComponentType<{ children?: ReactNode; className?: string }>;
  export const ArticleList: ComponentType<any>;
  export const ProductPoweredBy: ComponentType<{ className?: string }>;
}
