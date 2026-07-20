import {
  BaseSiteHeader,
  BrandMark,
  useBranding,
  useContentMaxWidth,
  useHeaderSettings,
  type HeaderChromeProps,
} from "@inkless/theme-host";
import { resolveProductCtas } from "./resolveProductCtas";

function ProductHeaderCtas() {
  // Theme setting defaults are applied by host when present; resolve with package defaults.
  const settings = useHeaderSettings() as Record<string, unknown>;
  const ctas = resolveProductCtas(settings);

  return (
    <div className="hidden md:flex items-center gap-2 shrink-0">
      {ctas.docsUrl ? (
        <a
          href={ctas.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-on-surface-muted hover:text-on-surface transition-colors px-2 py-1.5"
        >
          Docs
        </a>
      ) : null}
      {ctas.githubUrl ? (
        <a
          href={ctas.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-on-surface-muted hover:text-on-surface transition-colors px-2 py-1.5"
        >
          GitHub
        </a>
      ) : null}
      <a
        href={ctas.primaryCtaHref}
        className="text-sm font-semibold rounded-md px-3 py-1.5 bg-primary text-on-primary hover:opacity-90 transition-opacity"
      >
        {ctas.primaryCtaLabel}
      </a>
    </div>
  );
}

export default function ProductHeader({ config }: HeaderChromeProps) {
  const { brandMode } = useHeaderSettings();
  const branding = useBranding();
  const maxWidth = useContentMaxWidth();
  // Prefer logo for product sites; fall back to text if no logo asset.
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
      headerClassName="bg-surface/95 backdrop-blur-sm border-b border-border font-sans"
      navPaddingClassName="py-3"
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
