import { cn } from "@/lib/utils"

/**
 * Floating glow orb — decorative gradient blob.
 * Position it with absolute positioning from the parent.
 */
export function GlowOrb({
  color = "indigo",
  size = "md",
  className,
}: {
  color?: "indigo" | "violet" | "teal" | "amber"
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const colorMap = {
    indigo: "var(--accent-indigo)",
    violet: "var(--accent-violet)",
    teal: "var(--accent-teal)",
    amber: "var(--accent-amber)",
  }

  const sizeMap = {
    sm: "h-32 w-32",
    md: "h-64 w-64",
    lg: "h-96 w-96",
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-[80px] opacity-20 dark:opacity-15",
        sizeMap[size],
        className
      )}
      style={{
        background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  )
}

/**
 * Gradient divider — replaces flat <Separator> with a gradient line.
 */
export function GradientDivider({ className }: { className?: string }) {
  return (
    <div className={cn("my-16 w-full", className)} aria-hidden="true">
      <div
        className="mx-auto h-px w-full max-w-3xl"
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            var(--accent-indigo),
            var(--accent-violet),
            var(--accent-teal),
            transparent
          )`,
          opacity: 0.3,
        }}
      />
    </div>
  )
}

/**
 * Grid pattern background — CSS-based subtle grid for sections.
 */
export function GridPattern({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}

/**
 * Noise texture overlay for subtle grain effect.
 */
export function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.015] dark:opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
      aria-hidden="true"
    />
  )
}
