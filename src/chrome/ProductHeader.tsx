import {
  BaseSiteHeader,
  BrandMark,
  useBranding,
  useContentMaxWidth,
  useHeaderSettings,
  type HeaderChromeProps,
} from "@inkless/theme-host";
import { resolveProductCtas } from "./resolveProductCtas";
import { btnHeaderCta, linkQuiet } from "../ui/classes";

function ProductHeaderCtas() {
  const settings = useHeaderSettings() as Record<string, unknown>;
  const ctas = resolveProductCtas(settings);

  return (
    <div className="hidden md:flex items-center gap-1 shrink-0">
      {ctas.docsUrl ? (
        <a
          href={ctas.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkQuiet} px-2.5 py-1.5 rounded-md hover:bg-surface-alt`}
        >
          Docs
        </a>
      ) : null}
      {ctas.githubUrl ? (
        <a
          href={ctas.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkQuiet} px-2.5 py-1.5 rounded-md hover:bg-surface-alt`}
        >
          GitHub
        </a>
      ) : null}
      <a href={ctas.primaryCtaHref} className={`${btnHeaderCta} ml-1.5`}>
        {ctas.primaryCtaLabel}
      </a>
    </div>
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
          textClassName="text-[15px] font-sans font-semibold tracking-tight text-on-surface"
          logoClassName="h-7 w-auto"
        />
      }
      utilities={<ProductHeaderCtas />}
    />
  );
}
