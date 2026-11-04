import { m } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { GradientDivider, GlowOrb } from "@/components/decorative-elements"
import { CaseSummary, type CaseSummaryContent } from "@/components/case-summary"
import { ArrowLeft, ArrowRight, Check, Lightbulb, Undo2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useDocumentTitle } from "@/lib/use-document-title"

/* ─── animation helpers ─── */
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}
const inView = { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-100px" }, variants: stagger } as const

/* ─── content shape (lives in i18n under product_cases.<caseKey>) ─── */
interface Metric { value: string; label: string }
interface ProductCase {
  badges: string[]
  title: string
  subtitle: string
  role_val: string
  company_val: string
  duration_val: string
  status_val: string
  summary: CaseSummaryContent
  highlights?: Metric[]
  cover?: { src: string; alt: string }
  gallery?: { title: string; desc: string; items: { src: string; caption: string }[] }
  problem: { title: string; intro: string; items: string[] }
  insight: { title: string; body: string }
  snippet?: { title: string; desc: string; before_label: string; before: string; after_label: string; after: string; note: string }
  flow: { title: string; desc: string; steps: { actor: string; text: string }[] }
  decisions: { title: string; desc: string; items: { title: string; body: string }[] }
  pivots: { title: string; desc: string; items: { before: string; after: string; why: string }[] }
  results: { title: string; desc: string; metrics?: Metric[]; items: string[] }
  learnings: { title: string; items: { title: string; body: string }[] }
  related?: { label: string; text: string }
}

export type ProductCaseKey = "ai_usage" | "routes" | "design_system"

export function ProductCaseStudyPage({ caseKey }: { caseKey: ProductCaseKey }) {
  const { t } = useTranslation()
  const c = t(`product_cases.${caseKey}`, { returnObjects: true }) as ProductCase
  useDocumentTitle(c.title)

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 relative">
      <GlowOrb color="indigo" size="lg" className="-top-40 right-0" />
      <GlowOrb color="teal" size="md" className="top-[600px] -left-40" />

      {/* Back */}
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link to="/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8")}>
          <ArrowLeft className="mr-2 h-4 w-4" />{t('product_cases.common.back')}
        </Link>
      </m.div>

      {/* ═══════════════ HERO ═══════════════ */}
      <m.section className="mb-16" initial="hidden" animate="show" variants={stagger}>
        <m.div variants={fadeIn} className="flex flex-wrap gap-3 mb-6">
          {c.badges.map((badge, i) => (
            <Badge key={badge} variant={i === 0 ? 'default' : 'outline'}>{badge}</Badge>
          ))}
        </m.div>

        <m.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-[900px]">
          {c.title}
        </m.h1>

        <m.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-[700px]">
          {c.subtitle}
        </m.p>

        <m.div variants={fadeIn} className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div><span className="font-semibold text-foreground">{t('product_cases.common.role_label')}</span> {c.role_val}</div>
          <div><span className="font-semibold text-foreground">{t('product_cases.common.company_label')}</span> {c.company_val}</div>
          <div><span className="font-semibold text-foreground">{t('product_cases.common.duration_label')}</span> {c.duration_val}</div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{t('product_cases.common.status_label')}</span>
            <span className="inline-flex items-center gap-1.5 text-primary font-medium">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />{c.status_val}
            </span>
          </div>
        </m.div>

        <m.div variants={fadeIn} className="mt-10">
          <CaseSummary summary={c.summary} />
        </m.div>

        {c.highlights && (
          <m.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {c.highlights.map(({ value, label }) => (
              <m.div key={label} variants={fadeIn}>
                <Card className="h-full glow-card border-border/50">
                  <CardContent className="p-6">
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </m.div>
        )}

        {c.cover && (
          <m.div variants={fadeIn} className="mt-10">
            <img src={c.cover.src} alt={c.cover.alt} className="w-full rounded-lg border" />
          </m.div>
        )}
      </m.section>

      <GradientDivider />

      {/* ═══════════════ PROBLEM ═══════════════ */}
      <m.section className="mb-20 max-w-[800px]" {...inView}>
        <m.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{c.problem.title}</m.h2>
        <m.div variants={fadeIn} className="space-y-4 text-lg text-muted-foreground leading-relaxed">
          <p>{c.problem.intro}</p>
          <ul className="space-y-3 pl-6 list-disc">
            {c.problem.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </m.div>
      </m.section>

      {/* ═══════════════ KEY INSIGHT ═══════════════ */}
      <m.section className="mb-20 max-w-[800px]" {...inView}>
        <m.div variants={fadeIn}>
          <Card className="border-primary/40 bg-primary/5">
            <CardContent className="p-6 md:p-8 flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3">{c.insight.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{c.insight.body}</p>
              </div>
            </CardContent>
          </Card>
        </m.div>
      </m.section>

      {/* ═══════════════ CODE BEFORE / AFTER ═══════════════ */}
      {c.snippet && (
        <m.section className="mb-20" {...inView}>
          <m.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{c.snippet.title}</m.h2>
          <m.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{c.snippet.desc}</m.p>

          <m.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px]">
            {[
              { label: c.snippet.before_label, code: c.snippet.before, Icon: Undo2, tone: "border-border/60 bg-muted/40", iconClass: "text-muted-foreground" },
              { label: c.snippet.after_label, code: c.snippet.after, Icon: Check, tone: "border-primary/30 bg-primary/5", iconClass: "text-primary" },
            ].map(({ label, code, Icon, tone, iconClass }) => (
              <Card key={label} className={tone}>
                <CardContent className="p-5">
                  <p className="flex items-center gap-2 text-sm font-medium mb-3">
                    <Icon className={cn("h-4 w-4 shrink-0", iconClass)} aria-hidden="true" />{label}
                  </p>
                  <pre className="text-xs md:text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre"><code>{code}</code></pre>
                </CardContent>
              </Card>
            ))}
          </m.div>
          <m.p variants={fadeIn} className="text-muted-foreground mt-6 max-w-[800px] leading-relaxed">{c.snippet.note}</m.p>
        </m.section>
      )}

      <GradientDivider />

      {/* ═══════════════ FLOW ═══════════════ */}
      <m.section className="mb-20" {...inView}>
        <m.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{c.flow.title}</m.h2>
        <m.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{c.flow.desc}</m.p>

        <m.ol className="space-y-4 max-w-[800px]" variants={stagger}>
          {c.flow.steps.map((step, i) => (
            <m.li key={step.text} variants={fadeIn} className="flex gap-4">
              <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div className="pt-1">
                <p className="text-xs font-mono uppercase tracking-wider text-primary mb-1">{step.actor}</p>
                <p className="text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            </m.li>
          ))}
        </m.ol>
      </m.section>

      <GradientDivider />

      {/* ═══════════════ GALLERY ═══════════════ */}
      {c.gallery && (
        <>
          <m.section className="mb-20" {...inView}>
            <m.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{c.gallery.title}</m.h2>
            <m.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{c.gallery.desc}</m.p>

            <m.div className="space-y-12" variants={stagger}>
              {c.gallery.items.map((shot) => (
                <m.figure key={shot.src} variants={fadeIn}>
                  <img src={shot.src} alt={shot.caption} loading="lazy" className="w-full rounded-lg border" />
                  <figcaption className="text-sm text-muted-foreground mt-3">{shot.caption}</figcaption>
                </m.figure>
              ))}
            </m.div>
          </m.section>

          <GradientDivider />
        </>
      )}

      {/* ═══════════════ DECISIONS ═══════════════ */}
      <m.section className="mb-20" {...inView}>
        <m.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{c.decisions.title}</m.h2>
        <m.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{c.decisions.desc}</m.p>

        <m.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={stagger}>
          {c.decisions.items.map((d) => (
            <m.div key={d.title} variants={fadeIn}>
              <Card className="h-full glow-card border-border/50 hover:border-primary/40 transition-all duration-400">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{d.body}</p>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </m.div>
      </m.section>

      {/* ═══════════════ PIVOTS ═══════════════ */}
      <m.section className="mb-20" {...inView}>
        <m.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{c.pivots.title}</m.h2>
        <m.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{c.pivots.desc}</m.p>

        <m.div className="space-y-6" variants={stagger}>
          {c.pivots.items.map((p) => (
            <m.div key={p.before} variants={fadeIn}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                <Card className="border-border/60 bg-muted/40">
                  <CardContent className="p-5 flex items-start gap-3">
                    <Undo2 className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground line-through decoration-muted-foreground/40"><span className="sr-only">{t('a11y.before')} </span>{p.before}</p>
                  </CardContent>
                </Card>
                <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="p-5 flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground font-medium"><span className="sr-only">{t('a11y.after')} </span>{p.after}</p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-muted-foreground mt-3 md:pl-5">{p.why}</p>
            </m.div>
          ))}
        </m.div>
      </m.section>

      <GradientDivider />

      {/* ═══════════════ RESULTS ═══════════════ */}
      <m.section className="mb-20" {...inView}>
        <m.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{c.results.title}</m.h2>
        <m.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{c.results.desc}</m.p>

        {c.results.metrics && (
          <m.div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10" variants={stagger}>
            {c.results.metrics.map(({ value, label }) => (
              <m.div key={label} variants={fadeIn}>
                <Card className="h-full text-center glow-card border-border/50 hover:border-primary/40 transition-all duration-400">
                  <CardContent className="p-6">
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </m.div>
        )}

        <m.ul variants={fadeIn} className="space-y-3 max-w-[800px]">
          {c.results.items.map((item) => (
            <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
              <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />{item}
            </li>
          ))}
        </m.ul>
      </m.section>

      {/* ═══════════════ LEARNINGS ═══════════════ */}
      <m.section className="mb-20 max-w-[800px]" {...inView}>
        <m.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{c.learnings.title}</m.h2>
        <m.div variants={fadeIn} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          {c.learnings.items.map((l) => (
            <div key={l.title} className="border-l-2 border-primary pl-6">
              <p className="font-medium text-foreground mb-1">{l.title}</p>
              <p className="text-base">{l.body}</p>
            </div>
          ))}
        </m.div>
      </m.section>

      {/* ═══════════════ BUILT WITH THE HUB ═══════════════ */}
      <m.section className="mb-12 max-w-[800px]" {...inView}>
        <m.div variants={fadeIn}>
          <Link to="/proyectos/discovery-hub" className="block group">
            <Card className="glow-card border-border/50 group-hover:border-primary/40 transition-all duration-400">
              <CardContent className="p-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-primary mb-1">{c.related?.label ?? t('product_cases.common.built_with_label')}</p>
                  <p className="text-muted-foreground">{c.related?.text ?? t('product_cases.common.built_with_text')}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
              </CardContent>
            </Card>
          </Link>
        </m.div>
      </m.section>

      {/* ═══════════════ CTA ═══════════════ */}
      <m.section className="text-center py-12" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}>
        <p className="text-muted-foreground mb-6">{t('product_cases.common.cta_text')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:juanseruani@gmail.com" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>{t('product_cases.common.cta_contact')}</a>
          <Link to="/#proyectos" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto")}>{t('product_cases.common.cta_more')}</Link>
        </div>
      </m.section>
    </div>
  )
}
