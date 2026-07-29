import { codeBlock } from "./classes";

type InstallTerminalProps = {
  code: string;
  label?: string;
};

/** Shared terminal craft used on home install + get-started. */
export default function InstallTerminal({
  code,
  label = "terminal",
}: InstallTerminalProps) {
  return (
    <div
      className="rounded-2xl border border-border overflow-hidden shadow-xl shadow-on-surface/5"
      role="region"
      aria-label={label}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 bg-[#0a0f1a] border-b border-white/10"
        aria-hidden
      >
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-xs font-medium tracking-wide text-slate-400">{label}</span>
      </div>
      <pre className={`${codeBlock} mt-0 rounded-none border-0 shadow-none`}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
