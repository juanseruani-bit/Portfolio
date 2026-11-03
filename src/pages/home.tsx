import { motion } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlowOrb, GridPattern } from "@/components/decorative-elements"
import { ContactSection } from "@/components/contact-section"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"

type ProjectCover = { src: string; position: string; zoom?: number; gradient: string }

const projects: { key: string; to: string; year: string; badgeClass: string; tags: string[]; cover: ProjectCover; featured?: boolean }[] = [
  {
    key: "discovery_hub",
    to: "/proyectos/discovery-hub",
    featured: true,
    year: "2025",
    badgeClass: "bg-[var(--accent-violet)]",
    tags: ["React", "Claude Code", "UX Engineering"],
    cover: { src: "/images/cases/hub-playground.webp", position: "0% 0%", gradient: "from-violet-500/25 via-indigo-500/15 to-transparent" },
  },
  {
    key: "ai_usage",
    to: "/proyectos/consumo-ia",
    year: "2026",
    badgeClass: "bg-[var(--accent-indigo)]",
    tags: ["Product Strategy", "AI", "B2B SaaS"],
    cover: { src: "/images/cases/ai-consumption.webp", position: "center", gradient: "from-indigo-500/25 via-violet-500/15 to-transparent" },
  },
  {
    key: "routes",
    to: "/proyectos/optimizador-rutas",
    year: "2026",
    badgeClass: "bg-teal-600",
    tags: ["Automation", "Operations", "Data Viz"],
    cover: { src: "/images/cases/routes-agenda.webp", position: "0% 62%", zoom: 1.8, gradient: "from-teal-500/25 via-sky-500/15 to-transparent" },
  },
]

const experience = ["hmm", "avature", "dinocloud"] as const

export function Home() {
  const { t } = useTranslation()

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

        <div className="container mx-auto px-4 md:px-8 pt-8 pb-10 md:pt-16 md:pb-16">
          <motion.div
            className="max-w-[850px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >

            <motion.div
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
            </motion.div>

            {/* Hero headline with gradient text */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t('home.hero.title_prefix')}{" "}
              <span className="gradient-text">{t('home.hero.title_highlight_a')}</span> {t('home.hero.title_join')}{" "}
              <span className="gradient-text">{t('home.hero.title_highlight_b')}</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed max-w-[620px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              {t('home.hero.subtitle')}
            </motion.p>

            <motion.p
              className="flex items-start gap-2.5 text-sm md:text-base font-medium mb-10 max-w-[620px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" aria-hidden="true" />
              {t('home.hero.proof')}
            </motion.p>

            <motion.div
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PROJECTS ═══════════════ */}
      <GridPattern className="bg-[var(--surface)] border-y border-border/60 mb-16 md:mb-24">
        <section id="proyectos" className="container mx-auto px-4 md:px-8 py-16 md:py-20 scroll-mt-16">
          <div className="mb-12">
            <motion.h2
              className="text-2xl md:text-3xl font-bold tracking-tight mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('home.projects.title')}
            </motion.h2>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('home.projects.subtitle')}
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((project) => (
              <motion.div key={project.key} variants={item} className={cn(project.featured && "md:col-span-2")}>
                <Link to={project.to} className="block h-full">
                  <Card className={cn("h-full flex flex-col glow-card group cursor-pointer border-border/50 hover:border-primary/40 transition-all duration-400", project.featured && "md:flex-row")}>
                    <div className={cn("h-64 bg-muted rounded-t-xl flex items-center justify-center border-b relative overflow-hidden", project.featured && "md:h-auto md:min-h-80 md:w-1/2 md:shrink-0 md:rounded-tr-none md:rounded-l-xl md:border-b-0 md:border-r")}>
                      <div className={cn("w-full h-full bg-gradient-to-br", project.cover.gradient)}>
                        <div className="absolute inset-x-8 top-8 -bottom-4 rounded-lg overflow-hidden border border-border/60 bg-white shadow-xl group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                          <img
                            src={project.cover.src}
                            alt={t(`home.projects.${project.key}.title`)}
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
                        <span className="text-sm text-muted-foreground font-mono">{project.year}</span>
                      </div>
                      <CardTitle className="text-2xl">{t(`home.projects.${project.key}.title`)}</CardTitle>
                      <p className="text-sm font-semibold text-primary mt-2">{t(`home.projects.${project.key}.outcome`)}</p>
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
                      <Button variant="secondary" className="w-full group/btn">
                        {t(`home.projects.${project.key}.button`)}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </GridPattern>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section className="container mx-auto px-4 md:px-8 py-4 relative">
        <GlowOrb color="violet" size="md" className="-right-32 top-20" />

        <div className="mb-12">
          <motion.h2
            className="text-2xl md:text-3xl font-bold tracking-tight mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('home.about.title')}
          </motion.h2>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('home.about.subtitle')}
          </motion.p>
        </div>

        <div className="space-y-8 max-w-[800px]">
          {experience.map((job) => (
            <motion.div
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
            </motion.div>
          ))}

          {/* Educación */}
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
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
          </motion.div>
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
