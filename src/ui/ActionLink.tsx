import type { ReactNode } from "react";
import { Link } from "react-router-dom";

function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href.trim());
}

function isInAppPath(href: string): boolean {
  const h = href.trim();
  return h.startsWith("/") && !h.startsWith("//");
}

type ActionLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** In-app router Link vs external <a> — same CTA chrome either way. */
export default function ActionLink({ href, className = "", children }: ActionLinkProps) {
  if (isInAppPath(href)) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  const external = isExternalHref(href);
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
