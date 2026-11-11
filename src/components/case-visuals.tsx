import { ArrowRight, Pin, TriangleAlert } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

/* Visual aids for the product cases: a screenshot with numbered markers, and wireframe sketches
   for the course corrections. Sketches are decorative (aria-hidden): the card text around them
   already says what changed. They are labeled "Sketch" so nobody reads them as real UI.
   Colors use solid tokens only, since opacity modifiers on var() colors render transparent here. */

/* ─── Screenshot with numbered markers ─── */

export interface Marker { x: number; y: number; text: string }

export function AnnotatedImage({ src, alt, markers, width, height }: { src: string; alt: string; markers: Marker[]; width?: number; height?: number }) {
  const { t } = useTranslation()
  return (
    <figure>
      <div className="relative">
        <img src={src} alt={alt} width={width} height={height} className="w-full h-auto rounded-lg border" />
        {markers.map((mk, i) => (
          <span
            key={mk.text}
            aria-hidden="true"
            className="absolute flex h-5 w-5 sm:h-7 sm:w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-[10px] sm:text-xs font-bold text-primary-foreground shadow-lg ring-2 ring-background"
            style={{ left: `${mk.x}%`, top: `${mk.y}%` }}
          >
            {i + 1}
          </span>
        ))}
      </div>
      <figcaption className="mt-4">
        <p className="sr-only">{t("product_cases.common.markers_title")}</p>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground">
          {markers.map((mk, i) => (
            <li key={mk.text} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground" aria-hidden="true">
                {i + 1}
              </span>
              {mk.text}
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  )
}

/* ─── Sketch building blocks ─── */

function SketchFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  const { t } = useTranslation()
  return (
    <div aria-hidden="true" className={cn("relative mt-4 rounded-md border border-dashed border-border bg-background p-3 pt-6 text-[11px] leading-tight", className)}>
      <span className="absolute right-2 top-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{t("product_cases.common.sketch_label")}</span>
      {children}
    </div>
  )
}

/** A wireframe control: a bordered pill with a label. `on` marks the highlighted (new) element. */
function Chip({ children, on, className }: { children: React.ReactNode; on?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded border px-1.5 py-1 whitespace-nowrap", on ? "border-primary text-primary font-semibold" : "border-border text-muted-foreground", className)}>
      {children}
    </span>
  )
}

function Bar({ w = "w-10" }: { w?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-muted", w)} />
}

function Arrow() {
  return <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
}

type Side = "before" | "after"
type Labels = Record<string, string>

/* ─── Sketches, one per course correction ─── */

/** AI spend · copying a billing console vs. an analysis period that never changes the balance */
function AiPeriod({ side, l }: { side: Side; l: Labels }) {
  if (side === "before") {
    return (
      <SketchFrame>
        <p className="mb-2 text-muted-foreground">{l.console}</p>
        <div className="flex flex-wrap gap-1">
          {["w-8", "w-12", "w-6", "w-10", "w-8", "w-14", "w-6", "w-10"].map((w, i) => (
            <span key={i} className="rounded border border-border p-1"><Bar w={w} /></span>
          ))}
        </div>
      </SketchFrame>
    )
  }
  return (
    <SketchFrame className="space-y-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <Chip on>{l.period} ▾</Chip>
        <Arrow />
        <Chip>{l.charts}</Chip>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Chip>{l.balance}</Chip>
        <span className="text-muted-foreground">{l.balance_note}</span>
      </div>
    </SketchFrame>
  )
}

/** AI spend · soft or hard limits vs. one limit that always blocks, with warnings before it */
function AiLimits({ side, l }: { side: Side; l: Labels }) {
  if (side === "before") {
    return (
      <SketchFrame className="space-y-1.5">
        <p className="flex items-center gap-1.5 text-muted-foreground"><span className="h-2.5 w-2.5 rounded-full border border-muted-foreground" />{l.soft}</p>
        <p className="flex items-center gap-1.5 text-muted-foreground"><span className="h-2.5 w-2.5 rounded-full border border-muted-foreground" />{l.hard}</p>
      </SketchFrame>
    )
  }
  return (
    <SketchFrame>
      <div className="relative h-2.5 rounded-full bg-muted">
        <div className="h-2.5 w-[70%] rounded-full bg-primary" />
        <span className="absolute -top-1 left-[60%] h-[18px] w-0.5 bg-amber-500" />
        <span className="absolute -top-1 left-[78%] h-[18px] w-0.5 bg-amber-500" />
        <span className="absolute -top-1 right-0 h-[18px] w-1 rounded bg-foreground" />
      </div>
      <div className="mt-2 flex justify-between gap-2">
        <span className="text-amber-700 dark:text-amber-400">{l.warn}</span>
        <span className="font-semibold text-foreground">{l.limit}</span>
      </div>
    </SketchFrame>
  )
}

/** AI spend · everything expires at month end vs. each package lasts 30 days */
function AiExpiry({ side, l }: { side: Side; l: Labels }) {
  // A purchase on day 25 of a 31-day month: 6 usable days before, 30 after
  const before = side === "before"
  return (
    <SketchFrame>
      <div className="relative h-6">
        <div className="absolute inset-x-0 top-2.5 h-px bg-border" />
        <div className={cn("absolute top-1.5 h-2 rounded-full", before ? "left-[77%] w-[19%] bg-muted-foreground" : "left-[40%] w-[56%] bg-primary")} />
        <span className={cn("absolute top-0 h-5 w-0.5 bg-foreground", before ? "left-[77%]" : "left-[40%]")} />
        <span className="absolute top-0 right-[4%] h-5 w-0.5 bg-foreground" />
      </div>
      <div className="flex justify-between gap-2 text-muted-foreground">
        <span>{l.bought}</span>
        <span>{l.expires}</span>
      </div>
      <p className={cn("mt-1.5 font-semibold", before ? "text-muted-foreground" : "text-primary")}>{l.span}</p>
    </SketchFrame>
  )
}

/** Routes · pin, then press "re-optimize" in a separate bar vs. pinning re-optimizes at once */
function RoutesPin({ side, l }: { side: Side; l: Labels }) {
  return (
    <SketchFrame>
      <div className="flex flex-wrap items-center gap-1.5">
        <Chip on={side === "after"}><Pin className="h-3 w-3" />{l.pin}</Chip>
        <Arrow />
        {side === "before" && (
          <>
            <Chip>{l.bar}</Chip>
            <Arrow />
          </>
        )}
        <Chip on={side === "after"}>{side === "before" ? l.result : l.result_now}</Chip>
      </div>
    </SketchFrame>
  )
}

/** Routes · controls spread over several rows (toggle inside the map) vs. one context bar */
function RoutesToolbar({ side, l }: { side: Side; l: Labels }) {
  if (side === "before") {
    return (
      <SketchFrame className="space-y-1.5">
        <div className="flex gap-1.5"><Chip>{l.date}</Chip></div>
        <div className="flex gap-1.5"><Chip>{l.metrics}</Chip><Chip>{l.try}</Chip></div>
        <div className="rounded border border-border p-1.5">
          <p className="mb-1 text-muted-foreground">{l.map}</p>
          <Chip>{l.toggle}</Chip>
        </div>
      </SketchFrame>
    )
  }
  return (
    <SketchFrame>
      <div className="flex flex-wrap gap-1 rounded border border-primary p-1.5">
        <Chip>{l.date}</Chip>
        <Chip>{l.range}</Chip>
        <Chip on>{l.toggle}</Chip>
        <Chip>{l.metrics}</Chip>
        <Chip>{l.try}</Chip>
      </div>
    </SketchFrame>
  )
}

const sketches = {
  "ai-period": AiPeriod,
  "ai-limits": AiLimits,
  "ai-expiry": AiExpiry,
  "routes-pin": RoutesPin,
  "routes-toolbar": RoutesToolbar,
} as const

export type SketchId = keyof typeof sketches
export interface PivotSketchContent { id: SketchId; before: Labels; after: Labels }

export function PivotSketch({ sketch, side }: { sketch: PivotSketchContent; side: Side }) {
  const Sketch = sketches[sketch.id]
  return <Sketch side={side} l={sketch[side]} />
}

/* ─── Routes · how schedules were built before (no captures of the old system exist) ─── */

export interface BeforeFlowContent { title: string; note: string; screen: string; field_a: string; field_b: string; confirm: string; warning: string; steps: string[] }

export function BeforeFlowSketch({ c }: { c: BeforeFlowContent }) {
  const { t } = useTranslation()
  return (
    <figure className="rounded-xl border border-border bg-card p-5 md:p-6">
      <figcaption className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-semibold">{c.title}</span>
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{t("product_cases.common.sketch_label")}</span>
      </figcaption>
      <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {c.steps.map((step, i) => (
          <li key={step} className="relative">
            {/* The mini screens are decorative: the step text carries the meaning */}
            <div aria-hidden="true" className="flex h-32 flex-col rounded-md border border-dashed border-border bg-background p-3 text-[11px]">
              {i === 0 && (
                <>
                  <p className="mb-2 font-semibold text-foreground">{c.screen}</p>
                  <p className="text-muted-foreground">{c.field_a}</p>
                  <span className="mb-2 mt-1 block h-4 rounded border border-border" />
                  <p className="text-muted-foreground">{c.field_b}</p>
                  <span className="mt-1 block h-4 rounded border border-border" />
                </>
              )}
              {i === 1 && (
                <div className="flex flex-1 flex-col justify-end gap-2">
                  <Bar w="w-24" />
                  <Bar w="w-16" />
                  <span className="mt-auto self-end rounded bg-primary px-2.5 py-1 font-semibold text-primary-foreground">{c.confirm}</span>
                </div>
              )}
              {i === 2 && (
                <div className="flex flex-1 items-center">
                  <p className="flex items-start gap-2 rounded border border-amber-500 p-2 text-amber-800 dark:text-amber-300">
                    <TriangleAlert className="h-4 w-4 shrink-0" />{c.warning}
                  </p>
                </div>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{step}</p>
            {i < c.steps.length - 1 && (
              <ArrowRight className="absolute top-16 -right-7 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground md:block" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
      <p className="mt-5 text-xs text-muted-foreground">{c.note}</p>
    </figure>
  )
}
