import {
  SeoHead,
  SITE_CONFIG_GLOBAL_DEFAULT,
  pickLocaleValue,
  useBranding,
  useGlobalConfig,
  useLocaleMode,
  useSEODefaults,
  useThemeSettings,
} from "@inkless/theme-host";
import ProductPageShell from "../shell/ProductPageShell";
import { resolveProductCtas } from "../chrome/resolveProductCtas";
import { sectionLabel, sectionLead, sectionTitle } from "../ui/classes";

export default function ProductFirstContactPage() {
  const { config } = useGlobalConfig();
  const branding = useBranding();
  const { defaultDescription, defaultOgImage, buildTitle } = useSEODefaults();
  const { localeMode, defaultLocale, currentLocale } = useLocaleMode();
  const settings = useThemeSettings() as Record<string, unknown>;
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

  const channels = [
    email
      ? {
          label: "Email",
          href: `mailto:${email}`,
          display: email,
        }
      : null,
    ctas.githubUrl
      ? {
          label: "GitHub",
          href: ctas.githubUrl,
          display: ctas.githubUrl.replace(/^https?:\/\//, ""),
          external: true,
        }
      : null,
    ctas.docsUrl
      ? {
          label: "Docs",
          href: ctas.docsUrl,
          display: ctas.docsUrl.replace(/^https?:\/\//, ""),
          external: true,
        }
      : null,
  ].filter(Boolean) as Array<{
    label: string;
    href: string;
    display: string;
    external?: boolean;
  }>;

  return (
    <>
      <SeoHead title={title} description={defaultDescription} ogImage={defaultOgImage} />
      <div className="font-sans">
        <section className="border-b border-border bg-surface-alt/30">
          <ProductPageShell className="py-16 md:py-20 max-w-2xl">
            <p className={sectionLabel}>{pick({ zh: "联系", en: "Contact" })}</p>
            <h1 className={sectionTitle}>
              {pick({ zh: "联系与社区", en: "Contact & community" })}
            </h1>
            <p className={sectionLead}>
              {pick({
                zh: "产品问题请通过下列渠道联系；文档由独立文档服务提供。",
                en: "Reach us through the channels below. Docs are hosted by a separate docs service.",
              })}
            </p>
          </ProductPageShell>
        </section>
        <ProductPageShell className="py-12 md:py-16 max-w-2xl">
          <ul className="space-y-3">
            {channels.map((ch) => (
              <li key={ch.label}>
                <a
                  href={ch.href}
                  {...(ch.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-5 py-4 shadow-sm transition-all duration-200 hover:border-accent/40 hover:shadow-md hover:shadow-accent/5"
                >
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-muted">
                      {ch.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-on-surface group-hover:text-accent transition-colors">
                      {ch.display}
                    </p>
                  </div>
                  <span
                    className="text-on-surface-muted group-hover:text-accent transition-colors"
                    aria-hidden
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
            {channels.length === 0 ? (
              <li className="text-sm text-on-surface-muted">
                {pick({
                  zh: "暂无公开联系渠道，请在站点配置中补充 GitHub 或邮箱。",
                  en: "No public channels yet — add GitHub or email in site config.",
                })}
              </li>
            ) : null}
          </ul>
        </ProductPageShell>
      </div>
    </>
  );
}
