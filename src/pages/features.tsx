import {
  SeoHead,
  SITE_CONFIG_GLOBAL_DEFAULT,
  pickLocaleValue,
  useGlobalConfig,
  useLocaleMode,
  useSEODefaults,
} from "@inkless/theme-host";
import ProductPageShell from "../shell/ProductPageShell";
import { card, sectionLabel, sectionLead, sectionTitle } from "../ui/classes";

export default function ProductFirstFeaturesPage() {
  const { config } = useGlobalConfig();
  const { defaultTitle, defaultDescription, defaultOgImage, buildTitle } = useSEODefaults();
  const { localeMode, defaultLocale, currentLocale } = useLocaleMode();
  const siteConfig = (config as any)?.siteConfig ?? SITE_CONFIG_GLOBAL_DEFAULT;

  const pick = (value: any, fallback = "") =>
    pickLocaleValue({
      value,
      mode: localeMode,
      defaultLocale,
      currentLocale,
    }) || fallback;

  const siteName = pick(siteConfig?.identity?.name, "Product");
  const title = buildTitle
    ? buildTitle(pick({ zh: "能力", en: "Features" }))
    : `${pick({ zh: "能力", en: "Features" })} · ${siteName}`;

  const items = [
    {
      mark: "◇",
      title: { zh: "主题系统", en: "Themes" },
      body: {
        zh: "product-first / blog-first / corporate 等主题决定站点形态，运营站与内容站各得其所。",
        en: "Themes such as product-first, blog-first, and corporate own site shape.",
      },
    },
    {
      mark: "▣",
      title: { zh: "内容与发布", en: "Content & publish" },
      body: {
        zh: "页面与文章草稿/发布，适配产品运营节奏与版本回溯。",
        en: "Draft/publish for pages and articles that match product ops cadence.",
      },
    },
    {
      mark: "◎",
      title: { zh: "自托管", en: "Self-hosted" },
      body: {
        zh: "数据与部署在你自己的基础设施上，密钥与流量可控。",
        en: "Data and deploy stay on your infrastructure.",
      },
    },
  ];

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
              {defaultDescription ||
                pick({
                  zh: "面向软件产品介绍站的能力说明。",
                  en: "Capabilities for a software product introduction site.",
                })}
            </p>
          </ProductPageShell>
        </section>
        <ProductPageShell className="py-14 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {items.map((item, i) => (
              <article key={i} className={card}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent text-lg">
                  <span aria-hidden>{item.mark}</span>
                </div>
                <h2 className="text-lg font-semibold tracking-tight text-on-surface">
                  {pick(item.title)}
                </h2>
                <p className="mt-2 text-sm text-on-surface-muted leading-relaxed">
                  {pick(item.body)}
                </p>
              </article>
            ))}
          </div>
        </ProductPageShell>
      </div>
    </>
  );
}
