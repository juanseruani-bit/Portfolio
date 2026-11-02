import { motion } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GradientDivider, GlowOrb, GridPattern } from "@/components/decorative-elements"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { ArrowRight, Coins, Route, type LucideIcon } from "lucide-react"
import { useTranslation } from "react-i18next"

type ProjectCover =
  | { kind: "image" }
  | { kind: "stat"; icon: LucideIcon; gradient: string }

const projects: { key: string; to: string; year: string; badgeClass: string; tags: string[]; cover: ProjectCover }[] = [
  {
    key: "discovery_hub",
    to: "/proyectos/discovery-hub",
    year: "2025",
    badgeClass: "bg-[var(--accent-violet)]",
    tags: ["React", "Claude Code", "UX Engineering"],
    cover: { kind: "image" },
  },
  {
    key: "ai_usage",
    to: "/proyectos/consumo-ia",
    year: "2026",
    badgeClass: "bg-[var(--accent-indigo)]",
    tags: ["Product Strategy", "AI", "B2B SaaS"],
    cover: { kind: "stat", icon: Coins, gradient: "from-indigo-500/15 via-violet-500/10 to-transparent" },
  },
  {
    key: "routes",
    to: "/proyectos/optimizador-rutas",
    year: "2026",
    badgeClass: "bg-teal-600",
    tags: ["Automation", "Operations", "Data Viz"],
    cover: { kind: "stat", icon: Route, gradient: "from-teal-500/15 via-sky-500/10 to-transparent" },
  },
  {
    key: "b2b_app",
    to: "/proyectos/b2b-app-buyers",
    year: "2020",
    badgeClass: "bg-green-600",
    tags: ["UX/UI Design", "User Research", "Mobile"],
    cover: { kind: "image" },
  },
]

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

            {/* Hero headline with gradient text */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t('home.hero.title_prefix')}{" "}
              <span className="gradient-text">{t('home.hero.title_ux')}</span> {t('home.hero.title_and')}{" "}
              <span className="gradient-text">{t('home.hero.title_strategy')}</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-[620px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              {t('home.hero.subtitle')}
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

      <GradientDivider />

      {/* ═══════════════ PROJECTS ═══════════════ */}
      <GridPattern>
        <section id="proyectos" className="container mx-auto px-4 md:px-8 py-4 scroll-mt-20">
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
              <motion.div key={project.key} variants={item}>
                <Link to={project.to} className="block h-full">
                  <Card className="h-full flex flex-col glow-card group cursor-pointer border-border/50 hover:border-primary/40 transition-all duration-400">
                    <div className="h-64 bg-muted rounded-t-xl flex items-center justify-center border-b relative overflow-hidden">
                      {project.cover.kind === "image" ? (
                        <img
                          src={t(`home.projects.${project.key}.image`)}
                          alt={t(`home.projects.${project.key}.title`)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className={cn("w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br group-hover:scale-105 transition-transform duration-500 ease-out", project.cover.gradient)}>
                          <project.cover.icon className="h-12 w-12 text-primary" aria-hidden="true" />
                          <span className="text-2xl md:text-3xl font-bold tracking-tight">{t(`home.projects.${project.key}.stat`)}</span>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={cn("text-white border-0", project.badgeClass)}>{t(`home.projects.${project.key}.badge`)}</Badge>
                        <span className="text-sm text-muted-foreground font-mono">{project.year}</span>
                      </div>
                      <CardTitle className="text-2xl">{t(`home.projects.${project.key}.title`)}</CardTitle>
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
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </GridPattern>

      <GradientDivider />

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
          {/* HMM */}
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group"
          >
            <div className="p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:bg-card/50">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="text-xl font-semibold">{t('home.about.hmm.role')}</h3>
                <span className="text-muted-foreground text-sm font-mono">{t('home.about.hmm.date')}</span>
              </div>
              <p className="text-lg font-medium text-primary mb-2">{t('home.about.hmm.company')}</p>
              <p className="text-muted-foreground leading-relaxed">
                {t('home.about.hmm.description')}
              </p>
            </div>
          </motion.div>

          {/* Avature */}
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group"
          >
            <div className="p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:bg-card/50">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="text-xl font-semibold">{t('home.about.avature.role')}</h3>
                <span className="text-muted-foreground text-sm font-mono">{t('home.about.avature.date')}</span>
              </div>
              <p className="text-lg font-medium text-primary mb-2">{t('home.about.avature.company')}</p>
              <p className="text-muted-foreground leading-relaxed">
                {t('home.about.avature.description')}
              </p>
            </div>
          </motion.div>

          {/* DinoCloud */}
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group"
          >
            <div className="p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:bg-card/50">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="text-xl font-semibold">{t('home.about.dinocloud.role')}</h3>
                <span className="text-muted-foreground text-sm font-mono">{t('home.about.dinocloud.date')}</span>
              </div>
              <p className="text-lg font-medium text-primary mb-2">{t('home.about.dinocloud.company')}</p>
              <p className="text-muted-foreground leading-relaxed">
                {t('home.about.dinocloud.description')}
              </p>
            </div>
          </motion.div>

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

      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  )
}
