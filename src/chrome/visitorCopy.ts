/**
 * Visitor-facing copy helpers for the product landing.
 * Strip operator jargon and keep install blocks executable without ops dialect.
 */

/** Honest default install path when host content is empty or comment-only. */
export const DEFAULT_INSTALL_CODE =
  "git clone https://github.com/yixian-huang/inkless.git\ncd inkless\nmake dev-up";

/** Operator / admin jargon that must not appear on the visitor landing. */
export function isOperatorJargon(text: string): boolean {
  return (
    /\bdocsUrl\b|theme settings|settingSchema|header\.\w+|npc\s+deploy|独立文档服务提供/i.test(
      text,
    ) || /配置\s*docsUrl/i.test(text)
  );
}

/**
 * Soft-scrub host marketing copy that leaks internal package or ops terms.
 * Keeps meaning; does not invent product claims.
 */
export function scrubVisitorCopy(text: string): string {
  if (!text) return text;
  // Prefer zh replacements when the surrounding sentence is Chinese-heavy.
  const zhHeavy = /[\u4e00-\u9fff]/.test(text);
  return text
    .replace(/\bnpc\s+deploy\b/gi, "deploy")
    .replace(/自托管\s*artifact\s*\/\s*compose\s*部署/gi, "自托管部署（安装包或 Docker）")
    .replace(/\bartifact\s*\/\s*compose\b/gi, zhHeavy ? "安装包或 Docker" : "package or Docker")
    .replace(
      /\bproduct-first\s*\/\s*blog-first\s*\/\s*corporate(?:-classic)?\b/gi,
      zhHeavy ? "产品 / 博客 / 企业主题" : "product, blog, or corporate themes",
    )
    .replace(/激活\s*product-first\s*作为产品运营站/gi, "选择产品站主题并开始运营")
    .replace(/\bproduct-first\b/gi, zhHeavy ? "产品站主题" : "product theme")
    .replace(/配置\s*docsUrl[。.）)\s]*/gi, "")
    .replace(/[（(]\s*[）)]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Keep only real shell command lines from host install blocks.
 * If host only shipped a bare clone (or comments + clone), prefer the full default path.
 */
export function resolveVisitorInstallCode(
  hostCode: string,
  fallback: string = DEFAULT_INSTALL_CODE,
): string {
  const actionable = hostCode
    .split("\n")
    .map((l) => l.trim())
    .filter(
      (l) =>
        Boolean(l) &&
        !l.startsWith("#") &&
        /^(git|cd|make|npm|pnpm|yarn|docker|curl|wget)\b/i.test(l),
    );

  if (actionable.length === 0) return fallback;

  const hasClone = actionable.some((l) => /^git\s+clone\b/i.test(l));
  const hasBoot = actionable.some((l) => /^(make|npm|pnpm|yarn|docker)\b/i.test(l));
  if (hasClone && !hasBoot) return fallback;

  return actionable.join("\n");
}
