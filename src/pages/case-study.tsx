import { m } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { GradientDivider, GlowOrb } from "@/components/decorative-elements"
import { CaseSummary, type CaseSummaryContent } from "@/components/case-summary"
import { CaseVideo } from "@/components/case-video"
import { ArrowLeft, ArrowRight, Bot, Check, ChevronDown, FolderTree, Lightbulb, X } from "lucide-react"
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

/* ─── data ─── */
const techStack = [
  "React", "TypeScript", "Vite", "Material-UI", "Express",
  "Claude Code", "npm Workspaces", "React Native", "i18n", "YAML",
]

// The cases that came out of the Hub. Title and outcome reuse the home card copy.
const outcomeCases = [
  { key: "ai_usage", to: "/proyectos/consumo-ia", label: "built_label", src: "/images/cases/crops/thumb-ai-balance.webp", position: "0% 0%" },
  { key: "routes", to: "/proyectos/optimizador-rutas", label: "built_label", src: "/images/cases/crops/thumb-routes-gantt.webp", position: "0% 0%" },
  { key: "design_system", to: "/proyectos/design-system", label: "base_label", src: "/images/cases/ds-library-states.webp", position: "100% 45%" },
] as const

type CycleStep = { title: string; text: string; ai: boolean }
type SynthReport = {
  label: string; mission: string; verdictTitle: string; findingsTitle: string; note: string
  verdict: { layer: string; value: string }[]
  findings: { severity: string; text: string; principle: string }[]
}
type Clip = { title: string; video: string; poster: string; caption: string }

const h2 = "text-2xl md:text-3xl font-bold tracking-tight"
const h3 = "text-xl font-semibold tracking-tight"

/* ─── component ─── */
export function CaseStudyPage() {
  const { t } = useTranslation()
  useDocumentTitle(t('case_study.title'))

  const steps = t('case_study.cycle.steps', { returnObjects: true }) as CycleStep[]
  const report = t('case_study.synthetic.report', { returnObjects: true }) as SynthReport
  const clip = t('case_study.synthetic.clip', { returnObjects: true }) as Clip

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 relative">
      {/* Decorative orbs */}
      <GlowOrb color="indigo" size="lg" className="-top-40 right-0" />
      <GlowOrb color="violet" size="md" className="top-[600px] -left-40" />

      {/* Back */}
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link to="/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8")}>
          <ArrowLeft className="mr-2 h-4 w-4" />{t('case_study.back')}
        </Link>
      </m.div>

      {/* ═══════════════ HERO ═══════════════ */}
      <m.section className="mb-16" initial="hidden" animate="show" variants={stagger}>
        <m.div variants={fadeIn} className="flex flex-wrap gap-3 mb-6">
          {(t('case_study.badges', { returnObjects: true }) as string[]).map(badge => (
            <Badge key={badge} variant={badge === 'DesignOps' ? 'default' : 'outline'}>{badge}</Badge>
          ))}
        </m.div>

        <m.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-[900px]">
          {t('case_study.title')}
        </m.h1>

        <m.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-[700px]">
          {t('case_study.subtitle')}
        </m.p>

        <m.div variants={fadeIn} className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-10">
          <div><span className="font-semibold text-foreground">{t('case_study.role_label')}</span> {t('case_study.role_val')}</div>
          <div><span className="font-semibold text-foreground">{t('case_study.company_label')}</span> {t('case_study.company_val')}</div>
          <div><span className="font-semibold text-foreground">{t('case_study.duration_label')}</span> {t('case_study.duration_val')}</div>
        </m.div>

        <m.div variants={fadeIn} className="mb-10">
          <CaseSummary summary={t('case_study.summary', { returnObjects: true }) as CaseSummaryContent} />
        </m.div>

        <m.div variants={fadeIn}>
          <img src={t('case_study.image')} alt={t('case_study.image_alt')} className="w-full rounded-lg border" />
        </m.div>
      </m.section>

      <GradientDivider />

      {/* ═══════════════ THE PROBLEM ═══════════════ */}
      <m.section className="mb-20 max-w-[800px]" {...inView}>
        <m.h2 variants={fadeIn} className={cn(h2, "mb-6")}>{t('case_study.problem.title')}</m.h2>
        <m.div variants={fadeIn} className="space-y-4 text-lg text-muted-foreground leading-relaxed">
          <p>{t('case_study.problem.intro')}</p>
          <ul className="space-y-3 pl-6 list-disc">
            {(t('case_study.problem.items', { returnObjects: true }) as string[]).map((item) => <li key={item}>{item}</li>)}
          </ul>
        </m.div>
      </m.section>

      {/* ═══════════════ THE SHIFT ═══════════════ */}
      <m.section className="mb-20 max-w-[800px]" {...inView}>
        <m.div variants={fadeIn}>
          <Card className="border-primary/40 bg-primary/5">
            <CardContent className="p-6 md:p-8 flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3">{t('case_study.insight.title')}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t('case_study.insight.body')}</p>
              </div>
            </CardContent>
          </Card>
        </m.div>
      </m.section>

      <GradientDivider />

      {/* ═══════════════ HOW IT WORKS: THE CYCLE ═══════════════ */}
      <m.section className="mb-20" {...inView}>
        <m.h2 variants={fadeIn} className={cn(h2, "mb-4")}>{t('case_study.cycle.title')}</m.h2>
        <m.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{t('case_study.cycle.desc')}</m.p>

        {/* 5 columns only from xl: below that the cards get too narrow for the AI tag */}
        <m.ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 xl:gap-6" variants={stagger}>
          {steps.map((step, i) => (
            <m.li key={step.title} variants={fadeIn} className={cn("relative", i === steps.length - 1 && "md:col-span-2 xl:col-span-1")}>
              <Card className={cn("h-full border-border/50", step.ai && "border-primary/30")}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {step.ai && (
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        <Bot className="h-3.5 w-3.5" aria-hidden="true" />{t('case_study.cycle.ai_label')}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </CardContent>
              </Card>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden xl:block absolute top-1/2 -right-5 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              )}
            </m.li>
          ))}
        </m.ol>
      </m.section>

      <GradientDivider />

      {/* ═══════════════ SYNTHETIC USERS IN ACTION ═══════════════ */}
      <m.section className="mb-20" {...inView}>
        <m.h2 variants={fadeIn} className={cn(h2, "mb-4")}>{t('case_study.synthetic.title')}</m.h2>
        <m.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{t('case_study.synthetic.desc')}</m.p>

        <m.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-start">
          <Card>
            <CardContent className="p-6 space-y-5">
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{report.label}</p>
                <p className="text-sm text-muted-foreground">{report.mission}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">{report.verdictTitle}</h3>
                <dl className="space-y-1.5 text-sm">
                  {report.verdict.map((v) => (
                    <div key={v.layer} className="flex gap-2">
                      <dt className="font-medium shrink-0">{v.layer}:</dt>
                      <dd className="text-muted-foreground">{v.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">{report.findingsTitle}</h3>
                <ul className="space-y-3">
                  {report.findings.map((f) => (
                    <li key={f.text} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="border-amber-500/50 text-amber-700 dark:text-amber-400">{f.severity}</Badge>
                        <span className="text-xs text-muted-foreground">{f.principle}</span>
                      </div>
                      <p className="text-muted-foreground">{f.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-muted-foreground border-t pt-4">{report.note}</p>
            </CardContent>
          </Card>

          {/* The report's findings, as they look in the prototype */}
          <figure>
            <h3 className="font-semibold mb-3">{clip.title}</h3>
            <CaseVideo src={clip.video} poster={clip.poster} label={clip.caption} width={1920} height={1440} />
            <figcaption className="text-sm text-muted-foreground mt-3">{clip.caption}</figcaption>
          </figure>
        </m.div>
      </m.section>

      <GradientDivider />

      {/* ═══════════════ BEFORE & AFTER ═══════════════ */}
      <m.section className="mb-20" {...inView}>
        <m.h2 variants={fadeIn} className={cn(h2, "mb-4")}>{t('case_study.beforeAfter.title')}</m.h2>
        <m.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{t('case_study.beforeAfter.desc')}</m.p>

        <m.div className="space-y-4" variants={stagger}>
          {(t('case_study.beforeAfter.items', { returnObjects: true }) as { before: string; after: string }[]).map((row) => (
            <m.div key={row.before} variants={fadeIn} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
              <Card className="border-destructive/30 bg-destructive/5">
                <CardContent className="p-5 flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground"><span className="sr-only">{t('a11y.before')} </span>{row.before}</p>
                </CardContent>
              </Card>
              <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-5 flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground font-medium"><span className="sr-only">{t('a11y.after')} </span>{row.after}</p>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </m.div>
      </m.section>

      <GradientDivider />

      {/* ═══════════════ WHAT CAME OUT OF THE HUB ═══════════════ */}
      <m.section className="mb-20" {...inView}>
        <m.h2 variants={fadeIn} className={cn(h2, "mb-4")}>{t('case_study.outcomes.title')}</m.h2>
        <m.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{t('case_study.outcomes.desc')}</m.p>

        <m.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" variants={stagger}>
          {outcomeCases.map((c) => (
            <m.div key={c.key} variants={fadeIn}>
              <Link to={c.to} className="block h-full rounded-xl group" aria-labelledby={`outcome-${c.key}-title`} aria-describedby={`outcome-${c.key}-text`}>
                <Card className="h-full overflow-hidden glow-card border-border/50 group-hover:border-primary/40 transition-all duration-400">
                  <div className="h-40 bg-muted border-b relative overflow-hidden">
                    <div className="absolute inset-x-6 top-6 -bottom-3 rounded-md overflow-hidden border border-border/60 bg-white shadow-lg group-hover:-translate-y-1 transition-transform duration-500 ease-out">
                      <img
                        src={c.src}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: c.position }}
                      />
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <p className="text-xs font-mono uppercase tracking-wider text-primary mb-2">{t(`case_study.outcomes.${c.label}`)}</p>
                    <h3 id={`outcome-${c.key}-title`} className="font-semibold mb-2 flex items-center justify-between gap-2">
                      {t(`home.projects.${c.key}.title`)}
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </h3>
                    <p id={`outcome-${c.key}-text`} className="text-sm text-muted-foreground">{t(`home.projects.${c.key}.outcome`)}</p>
                  </CardContent>
                </Card>
              </Link>
            </m.div>
          ))}
        </m.div>

        <m.h3 variants={fadeIn} className={cn(h3, "mb-2")}>{t('case_study.outcomes.metrics_title')}</m.h3>
        <m.p variants={fadeIn} className="text-muted-foreground mb-8">{t('case_study.outcomes.metrics_desc')}</m.p>
        <m.div className="grid grid-cols-2 md:grid-cols-3 gap-6" variants={stagger}>
          {(t('case_study.metrics', { returnObjects: true }) as { value: string; label: string }[]).map(({ value, label }) => (
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
      </m.section>

      {/* ═══════════════ LEARNINGS ═══════════════ */}
      <m.section className="mb-20 max-w-[800px]" {...inView}>
        <m.h2 variants={fadeIn} className={cn(h2, "mb-6")}>{t('case_study.learnings.title')}</m.h2>
        <m.div variants={fadeIn} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          {(t('case_study.learnings.items', { returnObjects: true }) as { title: string; body: string }[]).map((l) => (
            <div key={l.title} className="border-l-2 border-primary pl-6">
              <p className="font-medium text-foreground mb-1">{l.title}</p>
              <p className="text-base">{l.body}</p>
            </div>
          ))}
        </m.div>
      </m.section>

      {/* ═══════════════ TECHNICAL DETAIL (collapsed) ═══════════════ */}
      {/* Native <details>: keyboard and screen-reader support for free, and find-in-page opens it */}
      <details className="group mb-20 rounded-xl border border-border/60 bg-card">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl p-5 md:p-6 [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <div>
            <h2 className={h2}>{t('case_study.technical.title')}</h2>
            <p className="text-muted-foreground mt-2">{t('case_study.technical.hint')}</p>
          </div>
          <ChevronDown className="h-6 w-6 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
        </summary>

        <div className="space-y-16 border-t px-4 py-10 md:px-6">
          {/* Architecture */}
          <div>
            <h3 className={cn(h3, "mb-3")}>{t('case_study.architecture.title')}</h3>
            <p className="text-muted-foreground mb-8 max-w-[700px]">{t('case_study.architecture.desc')}</p>

            <div className="max-w-[900px]">
              <div className="text-center mb-6">
                <span className="inline-block bg-primary/10 border border-primary/30 rounded-lg px-6 py-3 font-mono font-bold text-lg break-all">
                  <span aria-hidden="true">🏗️ </span>discovery-playground/
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {(() => {
                  const pkgs = t('case_study.architecture.packages', { returnObjects: true }) as { name: string; type: string }[]
                  const meta = [
                    { emoji: "🖥️", color: "border-violet-500/40 bg-violet-500/5" },
                    { emoji: "📱", color: "border-teal-500/40 bg-teal-500/5" },
                    { emoji: "📱", color: "border-blue-500/40 bg-blue-500/5" },
                    { emoji: "📱", color: "border-amber-500/40 bg-amber-500/5" },
                  ]
                  return pkgs.map((pkg, idx) => (
                    <Card key={pkg.name} className={`${meta[idx].color} border`}>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl mb-2" aria-hidden="true">{meta[idx].emoji}</p>
                        <p className="font-mono text-sm font-semibold">{pkg.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{pkg.type}</p>
                        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                          <p><span aria-hidden="true">📂</span> playground/</p>
                          <p><span aria-hidden="true">👥</span> synthetic-users/</p>
                          <p><span aria-hidden="true">🧩</span> components/</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                })()}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {(t('case_study.architecture.shared', { returnObjects: true }) as { name: string; desc: string }[]).map((s) => (
                  <Card key={s.name} className="border-dashed">
                    <CardContent className="p-4 text-center">
                      <p className="font-mono text-xs font-semibold">shared/{s.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Anatomy of a discovery */}
          <div>
            <h3 className={cn(h3, "mb-3")}>
              <FolderTree className="inline h-6 w-6 mr-2 align-[-4px]" aria-hidden="true" />
              {t('case_study.anatomy.title')}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-[700px]">
              {t('case_study.anatomy.desc')}<span className="text-foreground font-bold">{t('case_study.anatomy.descBold')}</span>.
            </p>

            <Card className="max-w-[700px]">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl" aria-hidden="true">📁</span>
                  <code className="text-lg font-bold font-mono break-all">docs/feature-financiero/</code>
                </div>
                <div className="space-y-3">
                  {(() => {
                    const items = t('case_study.anatomy.items', { returnObjects: true }) as { name: string; desc: string }[]
                    const icons = ["📄", "🎨", "📋", "🏗️", "✅", "📁"]
                    return items.map((item, idx) => (
                      <div key={item.name} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                        <span className="text-xl" aria-hidden="true">{icons[idx]}</span>
                        <div className="flex-1 min-w-0">
                          <code className="font-mono text-sm font-semibold">{item.name}</code>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))
                  })()}
                </div>
                <GradientDivider className="my-6" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('case_study.anatomy.countLabel')}</span>
                  <span className="text-2xl md:text-3xl font-bold text-primary">76</span>
                </div>
              </CardContent>
            </Card>
            <p className="text-muted-foreground mt-6 max-w-[700px]">{t('case_study.anatomy.spec')}</p>
          </div>

          {/* The 3 AI agents */}
          <div>
            <h3 className={cn(h3, "mb-3")}>{t('case_study.skills.title')}</h3>
            <p className="text-muted-foreground mb-8 max-w-[700px]">{t('case_study.skills.desc')}</p>

            <div className="space-y-6 max-w-[800px]">
              {(() => {
                const skills = t('case_study.skills.items', { returnObjects: true }) as { name: string; input: string; outputs: string[] }[]
                const meta = [
                  { color: "text-violet-600 dark:text-violet-400", bgColor: "bg-violet-500/10", borderColor: "border-violet-500/30" },
                  { color: "text-teal-700 dark:text-teal-400", bgColor: "bg-teal-500/10", borderColor: "border-teal-500/30" },
                  { color: "text-amber-700 dark:text-amber-400", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30" },
                ]
                return skills.map((skill, i) => (
                  <Card key={skill.name} className={`border ${meta[i].borderColor}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${meta[i].bgColor} text-sm font-bold ${meta[i].color}`}>
                          {i + 1}
                        </span>
                        <code className={`font-mono font-bold text-lg ${meta[i].color}`}>/{skill.name}</code>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
                        <div>
                          <p className="text-xs uppercase font-semibold text-muted-foreground mb-2 tracking-wider">{t('case_study.skills.inputLabel')}</p>
                          <p className="text-sm text-foreground">{skill.input}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block mt-6" />
                        <div>
                          <p className="text-xs uppercase font-semibold text-muted-foreground mb-2 tracking-wider">{t('case_study.skills.outputLabel')}</p>
                          <ul className="space-y-1">
                            {skill.outputs.map((o) => (
                              <li key={o} className="text-sm flex items-start gap-2">
                                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                <span>{o}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              })()}
            </div>
          </div>

          {/* A synthetic user profile */}
          <div>
            <h3 className={cn(h3, "mb-8")}>{t('case_study.technical.persona_title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <Card className="border-teal-500/30 min-w-0">
                <CardContent className="p-6">
                  <p className="text-xs uppercase font-semibold text-teal-700 dark:text-teal-400 mb-4 tracking-wider">{t('case_study.synthetic.exampleLabel')}</p>
                  <pre tabIndex={0} className="text-sm font-mono leading-relaxed overflow-x-auto text-foreground">
{`synthetic_user:
  id: ops-coordinador
  environment: web-backoffice

  persona:
    rol: "Coordinador de operaciones"
    tech_savviness: media
    contexto_emocional: >
      Reactivo a solicitudes entrantes,
      coordina bajo presión de tiempo
    metas:
      - "Atender solicitudes a tiempo"
      - "Verificar documentación sin trabas"
    frustraciones:
      - "Solicitudes sin estado claro"
      - "Flujos de verificación largos"
      - "No saber qué falta para avanzar"

  comportamiento:
    lectura: escanea
    paciencia: media
    ante_error: reintenta_1_vez

  foco: >
    Claridad de flujo bajo presión:
    estado, priorización, longitud
    de los flujos.`}</pre>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-semibold">{t('case_study.synthetic.howItWorks')}</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    {(t('case_study.synthetic.steps', { returnObjects: true }) as string[]).map((step, idx) => (
                      <li key={step} className="flex gap-3">
                        <span className="shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{idx + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <h3 className={cn(h3, "mb-6")}>{t('case_study.techStack.title')}</h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tItem) => (
                <Badge key={tItem} variant="secondary" className="text-sm py-1.5 px-4">{tItem}</Badge>
              ))}
            </div>
          </div>
        </div>
      </details>

      {/* ═══════════════ CTA ═══════════════ */}
      <m.section className="text-center py-12" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}>
        <p className="text-muted-foreground mb-6">{t('case_study.cta.text')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:juanseruani@gmail.com" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>{t('case_study.cta.contact')}</a>
          <Link to="/#proyectos" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto")}>{t('case_study.cta.more')}</Link>
        </div>
      </m.section>
    </div>
  )
}
