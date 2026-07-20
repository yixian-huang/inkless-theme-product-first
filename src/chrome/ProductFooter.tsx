import {
  ProductPoweredBy,
  useBranding,
  useContentMaxWidth,
  type FooterChromeProps,
} from "@inkless/theme-host";
import { resolveProductCtas } from "./resolveProductCtas";
import { useHeaderSettings } from "@inkless/theme-host";

export default function ProductFooter({ config }: FooterChromeProps) {
  const branding = useBranding();
  const maxWidth = useContentMaxWidth();
  const settings = useHeaderSettings() as Record<string, unknown>;
  const ctas = resolveProductCtas(settings);
  const copyright = config?.copyright ?? branding.footer.copyright;
  const style = config?.style ?? "minimal";

  if (style === "none") {
    return null;
  }

  return (
    <footer className="mt-auto border-t border-border bg-surface-alt font-sans">
      <div className="mx-auto px-4 md:px-content py-10 w-full" style={{ maxWidth }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
          <div className="space-y-2">
            <p className="font-semibold text-on-surface">{branding.siteName}</p>
            {branding.tagline ? (
              <p className="text-on-surface-muted leading-relaxed">{branding.tagline}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-on-surface">Product</p>
            <ul className="space-y-1.5 text-on-surface-muted">
              <li>
                <a href="/" className="hover:text-on-surface">
                  Home
                </a>
              </li>
              <li>
                <a href="/features" className="hover:text-on-surface">
                  Features
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-on-surface">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-on-surface">Resources</p>
            <ul className="space-y-1.5 text-on-surface-muted">
              {ctas.docsUrl ? (
                <li>
                  <a
                    href={ctas.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-on-surface"
                  >
                    Docs
                  </a>
                </li>
              ) : null}
              {ctas.githubUrl ? (
                <li>
                  <a
                    href={ctas.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-on-surface"
                  >
                    GitHub
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-on-surface-muted">{copyright}</p>
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
