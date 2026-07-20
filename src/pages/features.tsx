import {
  SeoHead,
  SITE_CONFIG_GLOBAL_DEFAULT,
  pickLocaleValue,
  useGlobalConfig,
  useLocaleMode,
  useSEODefaults,
} from "@inkless/theme-host";
import ProductPageShell from "../shell/ProductPageShell";

/**
 * Product features page — capability detail (not corporate "advantages").
 */
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
      title: { zh: "主题系统", en: "Themes" },
      body: {
        zh: "product-first / blog-first / corporate 等主题决定站点形态。",
        en: "Themes such as product-first, blog-first, and corporate own site shape.",
      },
    },
    {
      title: { zh: "内容与发布", en: "Content & publish" },
      body: {
        zh: "页面与文章草稿/发布，适配产品运营节奏。",
        en: "Draft/publish for pages and articles that match product ops cadence.",
      },
    },
    {
      title: { zh: "自托管", en: "Self-hosted" },
      body: {
        zh: "数据与部署在你自己的基础设施上。",
        en: "Data and deploy stay on your infrastructure.",
      },
    },
  ];

  return (
    <>
      <SeoHead title={title} description={defaultDescription} ogImage={defaultOgImage} />
      <ProductPageShell className="py-14 md:py-20 font-sans">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-on-surface">
          {pick({ zh: "产品能力", en: "Product capabilities" })}
        </h1>
        <p className="mt-4 text-on-surface-muted max-w-2xl leading-relaxed">
          {defaultDescription ||
            pick({
              zh: "面向软件产品介绍站的能力说明。",
              en: "Capabilities for a software product introduction site.",
            })}
        </p>
        <div className="mt-12 space-y-8">
          {items.map((item, i) => (
            <article key={i} className="border-b border-border pb-8 last:border-0">
              <h2 className="text-xl font-semibold text-on-surface">{pick(item.title)}</h2>
              <p className="mt-2 text-on-surface-muted leading-relaxed">{pick(item.body)}</p>
            </article>
          ))}
        </div>
      </ProductPageShell>
    </>
  );
}
