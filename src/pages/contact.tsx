import {
  SeoHead,
  SITE_CONFIG_GLOBAL_DEFAULT,
  pickLocaleValue,
  useBranding,
  useGlobalConfig,
  useLocaleMode,
  useSEODefaults,
} from "@inkless/theme-host";
import ProductPageShell from "../shell/ProductPageShell";
import { resolveProductCtas } from "../chrome/resolveProductCtas";
import { useHeaderSettings } from "@inkless/theme-host";

/**
 * Lightweight product contact — email / GitHub / community, not corporate sales form.
 */
export default function ProductFirstContactPage() {
  const { config } = useGlobalConfig();
  const branding = useBranding();
  const { defaultDescription, defaultOgImage, buildTitle } = useSEODefaults();
  const { localeMode, defaultLocale, currentLocale } = useLocaleMode();
  const settings = useHeaderSettings() as Record<string, unknown>;
  const ctas = resolveProductCtas(settings);
  const siteConfig = (config as any)?.siteConfig ?? SITE_CONFIG_GLOBAL_DEFAULT;

  const pick = (value: any, fallback = "") =>
    pickLocaleValue({
      value,
      mode: localeMode,
      defaultLocale,
      currentLocale,
    }) || fallback;

  const siteName = pick(siteConfig?.identity?.name, branding.siteName);
  const title = buildTitle
    ? buildTitle(pick({ zh: "联系", en: "Contact" }))
    : `${pick({ zh: "联系", en: "Contact" })} · ${siteName}`;

  const email =
    branding.author.socials.find((s) => s.kind === "email")?.url?.replace(/^mailto:/, "") ||
    "";

  return (
    <>
      <SeoHead title={title} description={defaultDescription} ogImage={defaultOgImage} />
      <ProductPageShell className="py-14 md:py-20 font-sans max-w-xl">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-on-surface">
          {pick({ zh: "联系与社区", en: "Contact & community" })}
        </h1>
        <p className="mt-4 text-on-surface-muted leading-relaxed">
          {pick({
            zh: "产品问题请通过下列渠道联系；文档由独立文档服务提供。",
            en: "Reach us through the channels below. Docs are hosted by a separate docs service.",
          })}
        </p>
        <ul className="mt-10 space-y-4 text-sm">
          {email ? (
            <li>
              <span className="text-on-surface-muted">Email · </span>
              <a className="font-medium text-on-surface hover:underline" href={`mailto:${email}`}>
                {email}
              </a>
            </li>
          ) : null}
          {ctas.githubUrl ? (
            <li>
              <span className="text-on-surface-muted">GitHub · </span>
              <a
                className="font-medium text-on-surface hover:underline"
                href={ctas.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ctas.githubUrl.replace(/^https?:\/\//, "")}
              </a>
            </li>
          ) : null}
          {ctas.docsUrl ? (
            <li>
              <span className="text-on-surface-muted">Docs · </span>
              <a
                className="font-medium text-on-surface hover:underline"
                href={ctas.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ctas.docsUrl.replace(/^https?:\/\//, "")}
              </a>
            </li>
          ) : null}
        </ul>
      </ProductPageShell>
    </>
  );
}
