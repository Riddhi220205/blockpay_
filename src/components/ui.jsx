import { motion } from "framer-motion";

/**
 * Shared, small UI primitives so every page doesn't reinvent its own
 * heading, stat tile, empty state, and spinner markup.
 */

export function PageHeader({ eyebrow, title, subtitle, action, accent = "teal" }) {
  const accentClass = accent === "violet" ? "text-violet-300" : "text-teal-300";
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className={`mb-2 text-sm font-medium ${accentClass}`}>{eyebrow}</p>
        )}
        <h1 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-2 max-w-xl text-paper-muted">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function StatBlock({ label, value, hint, accent = "teal" }) {
  const accentClass = accent === "violet" ? "text-violet-300" : "text-teal-300";
  return (
    <div>
      <p className="text-sm text-paper-muted">{label}</p>
      <p className={`mt-2 font-display text-3xl font-semibold data-text ${accentClass}`}>
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-paper-faint">{hint}</p>}
    </div>
  );
}

export function StatRow({ children }) {
  return (
    <div className="panel grid grid-cols-2 gap-6 p-6 sm:grid-cols-4 sm:gap-8 sm:p-8">
      {children}
    </div>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="panel flex flex-col items-center gap-3 px-8 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface-2">
        <span className="h-2 w-2 rounded-full bg-teal-400" />
      </div>
      <h3 className="font-display text-lg font-semibold text-paper">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-paper-muted">{description}</p>
      )}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export function Spinner({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-paper-muted">
      <span className="relative flex h-8 w-8">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400/40" />
        <span className="relative inline-flex h-8 w-8 rounded-full border-2 border-teal-400/30 border-t-teal-400" />
      </span>
      <p className="text-sm">{label}…</p>
    </div>
  );
}

export function RoleBadge({ role }) {
  const isProvider = role === "provider";
  return (
    <span
      className={`chip ${
        isProvider
          ? "border-violet-400/30 text-violet-300"
          : "border-teal-400/30 text-teal-300"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isProvider ? "bg-violet-400" : "bg-teal-400"
        }`}
      />
      {isProvider ? "Service provider" : "Subscriber"}
    </span>
  );
}

export function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
