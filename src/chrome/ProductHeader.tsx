import {
  BaseSiteHeader,
  BrandMark,
  pickLocaleValue,
  useBranding,
  useContentMaxWidth,
  useHeaderSettings,
  useLocaleMode,
  useThemeSettings,
  type HeaderChromeProps,
} from "@inkless/theme-host";
import { isSameHref, resolveProductCtas } from "./resolveProductCtas";
import { btnHeaderCta, linkQuiet } from "../ui/classes";

function ProductHeaderCtas() {
  const settings = useThemeSettings() as Record<string, unknown>;
  const ctas = resolveProductCtas(settings);
  const { localeMode, defaultLocale, currentLocale } = useLocaleMode();

  const pick = (value: { zh?: string; en?: string } | string, fallback = "") => {
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

  /** Localize stock English default so zh pages don't show "Get started" in chrome. */
  const primaryLabel =
    ctas.primaryCtaLabel === "Get started"
      ? pick({ zh: "快速开始", en: "Get started" })
      : ctas.primaryCtaLabel;

  const docsLabel = pick({ zh: "文档", en: "Docs" });
  const showGithub =
    Boolean(ctas.githubUrl) && !isSameHref(ctas.primaryCtaHref, ctas.githubUrl);
  const showDocs =
    Boolean(ctas.docsUrl) && !isSameHref(ctas.primaryCtaHref, ctas.docsUrl);

  const primary = (
    <a href={ctas.primaryCtaHref} className={btnHeaderCta}>
      {primaryLabel}
    </a>
  );

  return (
    <>
      {/* Mobile: always-visible conversion rail (adapt) */}
      <div className="flex md:hidden items-center gap-1 shrink-0">
        {showGithub ? (
          <a
            href={ctas.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkQuiet} px-2 py-1.5 rounded-md hover:bg-surface-alt`}
          >
            GitHub
          </a>
        ) : null}
        <span className="ml-0.5">{primary}</span>
      </div>

      {/* Desktop utilities */}
      <div className="hidden md:flex items-center gap-1 shrink-0">
        {showDocs ? (
          <a
            href={ctas.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkQuiet} px-2.5 py-1.5 rounded-md hover:bg-surface-alt`}
          >
            {docsLabel}
          </a>
        ) : null}
        {showGithub ? (
          <a
            href={ctas.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkQuiet} px-2.5 py-1.5 rounded-md hover:bg-surface-alt`}
          >
            GitHub
          </a>
        ) : null}
        <span className="ml-1.5">{primary}</span>
      </div>
    </>
  );
}

export default function ProductHeader({ config }: HeaderChromeProps) {
  const { brandMode } = useHeaderSettings();
  const branding = useBranding();
  const maxWidth = useContentMaxWidth();
  const mode =
    brandMode === "avatar" || brandMode === "none"
      ? brandMode
      : branding.logo?.light
        ? "logo"
        : "text";

  return (
    <BaseSiteHeader
      config={config}
      variant="blog"
      languagePlacement="inline"
      headerClassName="bg-white/85 backdrop-blur-xl border-b border-border/70 font-sans supports-[backdrop-filter]:bg-white/75"
      navPaddingClassName="py-3.5"
      containerClassName="mx-auto px-4 md:px-content w-full"
      containerStyle={{ maxWidth }}
      brand={
        <BrandMark
          brandMode={mode}
          hideDefaultLogo
          showLabel
          textClassName="text-sm font-sans font-semibold tracking-tight text-on-surface"
          logoClassName="h-7 w-auto"
        />
      }
      utilities={<ProductHeaderCtas />}
    />
  );
}
