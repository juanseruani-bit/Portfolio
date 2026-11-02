import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { GradientDivider, GlowOrb } from "@/components/decorative-elements"
import { ArrowLeft, ArrowRight, Check, Lightbulb, Undo2 } from "lucide-react"
import { useTranslation } from "react-i18next"

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
  highlights?: Metric[]
  cover?: { src: string; alt: string }
  gallery?: { title: string; desc: string; items: { src: string; caption: string }[] }
  problem: { title: string; intro: string; items: string[] }
  insight: { title: string; body: string }
  flow: { title: string; desc: string; steps: { actor: string; text: string }[] }
  decisions: { title: string; desc: string; items: { title: string; body: string }[] }
  pivots: { title: string; desc: string; items: { before: string; after: string; why: string }[] }
  results: { title: string; desc: string; metrics?: Metric[]; items: string[] }
  learnings: { title: string; items: { title: string; body: string }[] }
}

export type ProductCaseKey = "ai_usage" | "routes"

export function ProductCaseStudyPage({ caseKey }: { caseKey: ProductCaseKey }) {
  const { t } = useTranslation()
  const c = t(`product_cases.${caseKey}`, { returnObjects: true }) as ProductCase

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 relative">
      <GlowOrb color="indigo" size="lg" className="-top-40 right-0" />
      <GlowOrb color="teal" size="md" className="top-[600px] -left-40" />

      {/* Back */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link to="/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8")}>
          <ArrowLeft className="mr-2 h-4 w-4" />{t('product_cases.common.back')}
        </Link>
      </motion.div>

      {/* ═══════════════ HERO ═══════════════ */}
      <motion.section className="mb-16" initial="hidden" animate="show" variants={stagger}>
        <motion.div variants={fadeIn} className="flex flex-wrap gap-3 mb-6">
          {c.badges.map((badge, i) => (
            <Badge key={badge} variant={i === 0 ? 'default' : 'outline'}>{badge}</Badge>
          ))}
        </motion.div>

        <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-[900px]">
          {c.title}
        </motion.h1>

        <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-[700px]">
          {c.subtitle}
        </motion.p>

        <motion.div variants={fadeIn} className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div><span className="font-semibold text-foreground">{t('product_cases.common.role_label')}</span> {c.role_val}</div>
          <div><span className="font-semibold text-foreground">{t('product_cases.common.company_label')}</span> {c.company_val}</div>
          <div><span className="font-semibold text-foreground">{t('product_cases.common.duration_label')}</span> {c.duration_val}</div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{t('product_cases.common.status_label')}</span>
            <span className="inline-flex items-center gap-1.5 text-primary font-medium">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />{c.status_val}
            </span>
          </div>
        </motion.div>

        {c.highlights && (
          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {c.highlights.map(({ value, label }) => (
              <motion.div key={label} variants={fadeIn}>
                <Card className="h-full glow-card border-border/50">
                  <CardContent className="p-6">
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {c.cover && (
          <motion.div variants={fadeIn} className="mt-10">
            <img src={c.cover.src} alt={c.cover.alt} className="w-full rounded-lg border" />
          </motion.div>
        )}
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ PROBLEM ═══════════════ */}
      <motion.section className="mb-20 max-w-[800px]" {...inView}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{c.problem.title}</motion.h2>
        <motion.div variants={fadeIn} className="space-y-4 text-lg text-muted-foreground leading-relaxed">
          <p>{c.problem.intro}</p>
          <ul className="space-y-3 pl-6 list-disc">
            {c.problem.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </motion.div>
      </motion.section>

      {/* ═══════════════ KEY INSIGHT ═══════════════ */}
      <motion.section className="mb-20 max-w-[800px]" {...inView}>
        <motion.div variants={fadeIn}>
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
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ FLOW ═══════════════ */}
      <motion.section className="mb-20" {...inView}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{c.flow.title}</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{c.flow.desc}</motion.p>

        <motion.ol className="space-y-4 max-w-[800px]" variants={stagger}>
          {c.flow.steps.map((step, i) => (
            <motion.li key={step.text} variants={fadeIn} className="flex gap-4">
              <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div className="pt-1">
                <p className="text-xs font-mono uppercase tracking-wider text-primary mb-1">{step.actor}</p>
                <p className="text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ GALLERY ═══════════════ */}
      {c.gallery && (
        <>
          <motion.section className="mb-20" {...inView}>
            <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{c.gallery.title}</motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{c.gallery.desc}</motion.p>

            <motion.div className="space-y-12" variants={stagger}>
              {c.gallery.items.map((shot) => (
                <motion.figure key={shot.src} variants={fadeIn}>
                  <img src={shot.src} alt={shot.caption} loading="lazy" className="w-full rounded-lg border" />
                  <figcaption className="text-sm text-muted-foreground mt-3">{shot.caption}</figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </motion.section>

          <GradientDivider />
        </>
      )}

      {/* ═══════════════ DECISIONS ═══════════════ */}
      <motion.section className="mb-20" {...inView}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{c.decisions.title}</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{c.decisions.desc}</motion.p>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={stagger}>
          {c.decisions.items.map((d) => (
            <motion.div key={d.title} variants={fadeIn}>
              <Card className="h-full glow-card border-border/50 hover:border-primary/40 transition-all duration-400">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{d.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ═══════════════ PIVOTS ═══════════════ */}
      <motion.section className="mb-20" {...inView}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{c.pivots.title}</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{c.pivots.desc}</motion.p>

        <motion.div className="space-y-6" variants={stagger}>
          {c.pivots.items.map((p) => (
            <motion.div key={p.before} variants={fadeIn}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                <Card className="border-border/60 bg-muted/40">
                  <CardContent className="p-5 flex items-start gap-3">
                    <Undo2 className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground line-through decoration-muted-foreground/40">{p.before}</p>
                  </CardContent>
                </Card>
                <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="p-5 flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground font-medium">{p.after}</p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-muted-foreground mt-3 md:pl-5">{p.why}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ RESULTS ═══════════════ */}
      <motion.section className="mb-20" {...inView}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{c.results.title}</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">{c.results.desc}</motion.p>

        {c.results.metrics && (
          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10" variants={stagger}>
            {c.results.metrics.map(({ value, label }) => (
              <motion.div key={label} variants={fadeIn}>
                <Card className="h-full text-center glow-card border-border/50 hover:border-primary/40 transition-all duration-400">
                  <CardContent className="p-6">
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.ul variants={fadeIn} className="space-y-3 max-w-[800px]">
          {c.results.items.map((item) => (
            <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
              <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />{item}
            </li>
          ))}
        </motion.ul>
      </motion.section>

      {/* ═══════════════ LEARNINGS ═══════════════ */}
      <motion.section className="mb-20 max-w-[800px]" {...inView}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{c.learnings.title}</motion.h2>
        <motion.div variants={fadeIn} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          {c.learnings.items.map((l) => (
            <div key={l.title} className="border-l-2 border-primary pl-6">
              <p className="font-medium text-foreground mb-1">{l.title}</p>
              <p className="text-base">{l.body}</p>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* ═══════════════ BUILT WITH THE HUB ═══════════════ */}
      <motion.section className="mb-12 max-w-[800px]" {...inView}>
        <motion.div variants={fadeIn}>
          <Link to="/proyectos/discovery-hub" className="block group">
            <Card className="glow-card border-border/50 group-hover:border-primary/40 transition-all duration-400">
              <CardContent className="p-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-primary mb-1">{t('product_cases.common.built_with_label')}</p>
                  <p className="text-muted-foreground">{t('product_cases.common.built_with_text')}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </motion.section>

      {/* ═══════════════ CTA ═══════════════ */}
      <motion.section className="text-center py-12" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}>
        <p className="text-muted-foreground mb-6">{t('product_cases.common.cta_text')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:juanseruani@gmail.com" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>{t('product_cases.common.cta_contact')}</a>
          <a href="/#proyectos" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto")}>{t('product_cases.common.cta_more')}</a>
        </div>
      </motion.section>
    </div>
  )
}
