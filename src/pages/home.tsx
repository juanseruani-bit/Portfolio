import { m } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlowOrb, GridPattern } from "@/components/decorative-elements"
import { ContactSection } from "@/components/contact-section"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { ArrowRight, Bot } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useDocumentTitle } from "@/lib/use-document-title"

type ProjectCover = { src: string; position: string; zoom?: number; gradient: string }

const projects: { key: string; to: string; year?: string; badgeClass: string; tags: string[]; cover: ProjectCover; featured?: boolean }[] = [
  {
    key: "discovery_hub",
    to: "/proyectos/discovery-hub",
    featured: true,
    year: "2025",
    badgeClass: "bg-violet-700",
    tags: ["React", "Claude Code", "UX Engineering"],
    cover: { src: "/images/cases/hub-playground.webp", position: "0% 0%", gradient: "from-violet-500/25 via-indigo-500/15 to-transparent" },
  },
  {
    key: "ai_usage",
    to: "/proyectos/consumo-ia",
    year: "2026",
    badgeClass: "bg-indigo-600",
    tags: ["Product Strategy", "AI", "B2B SaaS"],
    cover: { src: "/images/cases/ai-consumption.webp", position: "center", gradient: "from-indigo-500/25 via-violet-500/15 to-transparent" },
  },
  {
    key: "routes",
    to: "/proyectos/optimizador-rutas",
    year: "2026",
    badgeClass: "bg-teal-700",
    tags: ["Automation", "Operations", "Data Viz"],
    cover: { src: "/images/cases/routes-agenda.webp", position: "0% 62%", zoom: 1.8, gradient: "from-teal-500/25 via-sky-500/15 to-transparent" },
  },
  {
    key: "design_system",
    to: "/proyectos/design-system",
    featured: true,
    badgeClass: "bg-fuchsia-700",
    tags: ["Design Tokens", "MUI", "React Native"],
    cover: { src: "/images/cases/ds-library-states.webp", position: "100% 45%", gradient: "from-fuchsia-500/25 via-violet-500/15 to-transparent" },
  },
]

const experience = ["hmm", "avature", "dinocloud"] as const

type SynthReport = {
  mission: string
  verdict: { layer: string; value: string }[]
  findings: { severity: string; text: string; principle: string }[]
}

function HeroVisual() {
  const { t } = useTranslation()
  const report = t("case_study.synthetic.report", { returnObjects: true }) as SynthReport
  // The tab-count finding points at the "Abiertas (9)" tab visible in the screenshot
  const finding = report.findings[2]

  return (
    <m.div
      className="relative hidden lg:block"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link to="/proyectos/discovery-hub" aria-labelledby="hero-visual-caption" className="group block rounded-xl">
        <div className="relative pb-10 pl-10">
          <div className="rounded-xl border border-border/60 bg-card shadow-2xl overflow-hidden transition-transform duration-500 ease-out group-hover:-translate-y-1">
            <div className="flex items-center gap-1.5 h-9 px-4 border-b border-border bg-muted" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span className="ml-3 text-xs font-mono text-muted-foreground truncate">discovery-hub / alertas</span>
            </div>
            <div className="aspect-[4/3] bg-white overflow-hidden">
              {/* Desktop-only visual: below lg the <source> doesn't match, so phones get the 1px placeholder instead of downloading the screenshot */}
              <picture>
                <source media="(min-width: 1024px)" srcSet="/images/cases/hub-alerts-inbox.webp" />
                <img
                  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  alt=""
                  width={2768}
                  height={2360}
                  className="w-full h-full object-cover object-top"
                />
              </picture>
            </div>
          </div>

          <div
            className="absolute left-0 bottom-0 w-[min(320px,80%)] rounded-xl border border-border bg-card p-4 shadow-2xl space-y-3 transition-transform duration-500 ease-out group-hover:translate-y-1"
            aria-hidden="true"
          >
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-primary">
              <Bot className="h-4 w-4" />
              synth-run
            </div>
            <p className="text-xs text-muted-foreground leading-snug">{report.mission}</p>
            <p className="text-sm">
              <span className="font-medium">{report.verdict[0].layer}:</span>{" "}
              <span className="text-muted-foreground">{report.verdict[0].value}</span>
            </p>
            <div className="text-sm border-t border-border/60 pt-3">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="border-amber-500/50 text-amber-700 dark:text-amber-400">{finding.severity}</Badge>
                <span className="text-xs text-muted-foreground">{finding.principle}</span>
              </div>
              <p className="leading-snug">{finding.text}</p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          <span id="hero-visual-caption">
            {t("home.hero.visual_caption")}{" "}
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">{t("home.hero.visual_cta")}</span>
          </span>
          <ArrowRight className="inline ml-1 h-3.5 w-3.5 align-[-2px] text-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
        </p>
      </Link>
    </m.div>
  )
}

export function Home() {
  const { t } = useTranslation()
  useDocumentTitle()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden">
        {/* Decorative orbs behind hero */}
        <GlowOrb color="indigo" size="lg" className="-top-20 right-1/4" />
        <GlowOrb color="violet" size="md" className="top-1/3 -left-20" />
        <GlowOrb color="teal" size="sm" className="bottom-0 right-10" />

        <div className="container mx-auto px-4 md:px-8 pt-8 pb-10 md:pt-16 md:pb-16 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
          <m.div
            className="max-w-[850px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >

            <m.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <img
                src="/images/juan-ruani.webp"
                alt={t('home.hero.photo_alt')}
                width={64}
                height={64}
                className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover ring-2 ring-background shadow-md"
              />
              <div className="leading-tight">
                <p className="font-semibold text-base md:text-lg">Juan Sebastián Ruani</p>
                <p className="text-sm text-muted-foreground">{t('home.hero.location')}</p>
              </div>
            </m.div>

            {/* Hero headline with gradient text */}
            <m.h1
              className="text-4xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-tight mb-8 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t('home.hero.title_prefix')}{" "}
              <span className="gradient-text">{t('home.hero.title_highlight_a')}</span> {t('home.hero.title_join')}{" "}
              <span className="gradient-text">{t('home.hero.title_highlight_b')}</span>
            </m.h1>

            <m.p
              className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-[620px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              {t('home.hero.subtitle')}
            </m.p>

            <m.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <a
                href="mailto:juanseruani@gmail.com"
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto group relative overflow-hidden")}
              >
                  {t('home.hero.contact_button')}
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
            </m.div>
          </m.div>

          {/* Work above the fold: a Hub prototype screen plus the synthetic-user report about that same screen */}
          <HeroVisual />
        </div>
      </section>

      {/* ═══════════════ PROJECTS ═══════════════ */}
      <GridPattern className="bg-[var(--surface)] border-y border-border/60 mb-16 md:mb-24">
        <section id="proyectos" className="container mx-auto px-4 md:px-8 py-16 md:py-20 scroll-mt-16">
          <div className="mb-12">
            <m.h2
              className="text-2xl md:text-3xl font-bold tracking-tight mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('home.projects.title')}
            </m.h2>
            <m.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('home.projects.subtitle')}
            </m.p>
          </div>

          <m.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((project) => (
              <m.div key={project.key} variants={item} className={cn(project.featured && "md:col-span-2")}>
                {/* Named by title + call to action and described by the outcome, so the whole card isn't read as one long link */}
                <Link to={project.to} className="block h-full rounded-xl" aria-labelledby={`${project.key}-title ${project.key}-cta`} aria-describedby={`${project.key}-outcome`}>
                  <Card className={cn("h-full flex flex-col glow-card group cursor-pointer border-border/50 hover:border-primary/40 transition-all duration-400", project.featured && "md:flex-row")}>
                    <div className={cn("h-64 bg-muted rounded-t-xl flex items-center justify-center border-b relative overflow-hidden", project.featured && "md:h-auto md:min-h-80 md:w-1/2 md:shrink-0 md:rounded-tr-none md:rounded-l-xl md:border-b-0 md:border-r")}>
                      <div className={cn("w-full h-full bg-gradient-to-br", project.cover.gradient)}>
                        <div className="absolute inset-x-8 top-8 -bottom-4 rounded-lg overflow-hidden border border-border/60 bg-white shadow-xl group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                          <img
                            src={project.cover.src}
                            alt=""
                            loading="lazy"
                            className="w-full h-full object-cover"
                            style={{ objectPosition: project.cover.position, transform: `scale(${project.cover.zoom ?? 1})`, transformOrigin: "0% 50%" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={cn("flex flex-col flex-1", project.featured && "md:justify-center")}>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={cn("text-white border-0", project.badgeClass)}>{t(`home.projects.${project.key}.badge`)}</Badge>
                        {project.year && <span className="text-sm text-muted-foreground font-mono">{project.year}</span>}
                      </div>
                      <CardTitle id={`${project.key}-title`} className="text-2xl">{t(`home.projects.${project.key}.title`)}</CardTitle>
                      <p id={`${project.key}-outcome`} className="text-sm font-semibold text-primary mt-2">{t(`home.projects.${project.key}.outcome`)}</p>
                      <CardDescription className="text-base mt-2">
                        {t(`home.projects.${project.key}.description`)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}
                      </div>
                    </CardContent>
                    <CardFooter>
                      {/* Looks like a button but is part of the card link: a real <button> inside <a> is invalid and adds a tab stop */}
                      <span id={`${project.key}-cta`} className={cn(buttonVariants({ variant: "secondary" }), "w-full group/btn")}>
                        {t(`home.projects.${project.key}.button`)}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </CardFooter>
                    </div>
                  </Card>
                </Link>
              </m.div>
            ))}
          </m.div>
        </section>
      </GridPattern>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section className="container mx-auto px-4 md:px-8 py-4 relative">
        <GlowOrb color="violet" size="md" className="-right-32 top-20" />

        <div className="mb-12">
          <m.h2
            className="text-2xl md:text-3xl font-bold tracking-tight mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('home.about.title')}
          </m.h2>
          <m.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('home.about.subtitle')}
          </m.p>
        </div>

        <div className="space-y-8 max-w-[800px]">
          {experience.map((job) => (
            <m.div
              key={job}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="group"
            >
              <div className="p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:bg-card/50">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                  <h3 className="text-xl font-semibold">{t(`home.about.${job}.role`)}</h3>
                  <span className="text-muted-foreground text-sm font-mono">{t(`home.about.${job}.date`)}</span>
                </div>
                <p className="text-lg font-medium text-primary mb-3">{t(`home.about.${job}.company`)}</p>
                <ul className="list-disc marker:text-primary pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
                  {(t(`home.about.${job}.bullets`, { returnObjects: true }) as string[]).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </m.div>
          ))}

          {/* Educación */}
          <m.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-semibold mb-4">{t('home.about.education.title')}</h3>
              <ul className="space-y-4">
                <li>
                  <p className="font-medium">{t('home.about.education.degree1')}</p>
                  <p className="text-muted-foreground text-sm">{t('home.about.education.school1')}</p>
                </li>
                <li>
                  <p className="font-medium">{t('home.about.education.degree2')}</p>
                  <p className="text-muted-foreground text-sm">{t('home.about.education.school2')}</p>
                </li>
              </ul>
            </div>
          </m.div>
        </div>
      </section>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <div className="mt-16 md:mt-24">
        <ContactSection />
      </div>

      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  )
}
