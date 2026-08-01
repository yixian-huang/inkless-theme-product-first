import {
  ProductPoweredBy,
  useBranding,
  useContentMaxWidth,
  useThemeSettings,
  type FooterChromeProps,
} from "@inkless/theme-host";
import { resolveProductCtas } from "./resolveProductCtas";
import { linkQuiet } from "../ui/classes";

export default function ProductFooter({ config }: FooterChromeProps) {
  const branding = useBranding();
  const maxWidth = useContentMaxWidth();
  const settings = useThemeSettings() as Record<string, unknown>;
  const ctas = resolveProductCtas(settings);
  const copyright = config?.copyright ?? branding.footer.copyright;
  const style = config?.style ?? "minimal";

  if (style === "none") {
    return null;
  }

  const colTitle = "text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-muted";
  const link = `${linkQuiet} block py-1`;

  return (
    <footer className="mt-auto border-t border-border/80 bg-surface-alt/60 font-sans">
      <div className="mx-auto w-full px-4 py-12 md:px-content md:py-14" style={{ maxWidth }}>
        <div className="grid grid-cols-1 gap-10 text-sm sm:grid-cols-3">
          <div className="max-w-xs space-y-3">
            <p className="text-base font-semibold tracking-tight text-on-surface">
              {branding.siteName}
            </p>
            {branding.tagline ? (
              <p className="text-sm leading-relaxed text-on-surface-muted">{branding.tagline}</p>
            ) : null}
          </div>
          <div className="space-y-3">
            <p className={colTitle}>Product</p>
            <ul className="space-y-0.5">
              <li>
                <a href="/" className={link}>
                  Home
                </a>
              </li>
              <li>
                <a href="/features" className={link}>
                  Features
                </a>
              </li>
              <li>
                <a href="/get-started" className={link}>
                  Get started
                </a>
              </li>
              <li>
                <a href="/use-cases" className={link}>
                  Use cases
                </a>
              </li>
              <li>
                <a href="/agents" className={link}>
                  For agents
                </a>
              </li>
              <li>
                <a href="/contact" className={link}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className={colTitle}>Resources</p>
            <ul className="space-y-0.5">
              {ctas.docsUrl ? (
                <li>
                  <a
                    href={ctas.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link}
                  >
                    Docs ↗
                  </a>
                </li>
              ) : null}
              {ctas.githubUrl ? (
                <li>
                  <a
                    href={ctas.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link}
                  >
                    GitHub ↗
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-on-surface-muted">{copyright}</p>
          <ProductPoweredBy />
        </div>
        {branding.footer.icp ? (
          <p className="text-xs text-on-surface-muted mt-3 text-center sm:text-left">
            {branding.footer.icp}
          </p>
        ) : null}
      </div>
    </footer>
  );
}
