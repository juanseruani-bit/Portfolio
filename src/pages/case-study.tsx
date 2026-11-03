import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { GradientDivider, GlowOrb } from "@/components/decorative-elements"
import {
  ArrowLeft, Layers, Bot, TestTube, FileCheck, Code, Users,
  FolderTree, ArrowRight, Check, X,
} from "lucide-react"
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

/* ─── data ─── */
const techStack = [
  "React", "TypeScript", "Vite", "Material-UI", "Express",
  "Claude Code", "npm Workspaces", "React Native", "i18n", "YAML",
]

export const _discoveryTree = [
  { name: "README.md", desc: "Cómo funciona de punta a punta", icon: "📄" },
  { name: "DISEÑO.md", desc: "El porqué de cada decisión", icon: "🎨" },
  { name: "DECISIONES.md", desc: "Bitácora cronológica (D-001…D-076)", icon: "📋" },
  { name: "ESTADO.md", desc: "Qué está construido, qué falta", icon: "🏗️" },
  { name: "VALIDACION.md", desc: "Cómo recorrerlo con datos mock", icon: "✅" },
  { name: "notas/", desc: "Material crudo de reuniones, sin editar", icon: "📁" },
]

export const _skillPipeline = [
  {
    name: "discovery-start",
    input: "Notas de reunión + pedidos del negocio",
    outputs: [
      "Carpeta docs/<discovery>/ con 5 archivos narrativos",
      "Bitácora de decisiones arrancada",
      "Plan de trabajo por fases",
      "Material crudo guardado sin editar",
    ],
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
  },
  {
    name: "synth-run",
    input: "Persona YAML + Discovery ID + Misión",
    outputs: [
      "Reporte de fricción en 3 capas",
      "Hallazgos de usabilidad con severidad",
      "Limitaciones detectadas del prototipo",
    ],
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
  },
  {
    name: "handoff",
    input: "Discovery cerrada + Documentación narrativa",
    outputs: [
      "HANDOFF.md — Punto de entrada para el equipo",
      "ESPECIFICACION.md — Requisitos con IDs",
      "CASOS-DE-PRUEBA.md — Cobertura completa",
    ],
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
  },
]

/* ─── component ─── */
export function CaseStudyPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 relative">
      {/* Decorative orbs */}
      <GlowOrb color="indigo" size="lg" className="-top-40 right-0" />
      <GlowOrb color="violet" size="md" className="top-[600px] -left-40" />

      {/* Back */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link to="/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8")}>
          <ArrowLeft className="mr-2 h-4 w-4" />{t('case_study.back')}
        </Link>
      </motion.div>

      {/* ═══════════════ HERO ═══════════════ */}
      <motion.section className="mb-16" initial="hidden" animate="show" variants={stagger}>
        <motion.div variants={fadeIn} className="flex flex-wrap gap-3 mb-6">
          {(t('case_study.badges', { returnObjects: true }) as string[]).map(badge => (
            <Badge key={badge} variant={badge === 'DesignOps' ? 'default' : 'outline'}>{badge}</Badge>
          ))}
        </motion.div>

        <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-[900px]">
          {t('case_study.title')}
        </motion.h1>

        <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-[700px]">
          {t('case_study.subtitle')}
        </motion.p>

        <motion.div variants={fadeIn} className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-10">
          <div><span className="font-semibold text-foreground">{t('case_study.role_label')}</span> {t('case_study.role_val')}</div>
          <div><span className="font-semibold text-foreground">{t('case_study.company_label')}</span> {t('case_study.company_val')}</div>
          <div><span className="font-semibold text-foreground">{t('case_study.duration_label')}</span> {t('case_study.duration_val')}</div>
        </motion.div>

        <motion.div variants={fadeIn}>
          <img src={t('case_study.image')} alt={t('case_study.image_alt')} className="w-full rounded-lg border" />
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ THE PROBLEM ═══════════════ */}
      <motion.section className="mb-20 max-w-[800px]" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{t('case_study.problem.title')}</motion.h2>
        <motion.div variants={fadeIn} className="space-y-4 text-lg text-muted-foreground leading-relaxed">
          <p>{t('case_study.problem.p1')}</p>
          <ul className="space-y-3 pl-6 list-disc">
            <li>{t('case_study.problem.li1')}</li>
            <li>{t('case_study.problem.li2')}</li>
            <li>{t('case_study.problem.li3')}</li>
            <li>{t('case_study.problem.li4')}</li>
          </ul>
        </motion.div>
      </motion.section>

      {/* ═══════════════ BEFORE & AFTER (Propuesta 4) ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{t('case_study.beforeAfter.title')}</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">
          {t('case_study.beforeAfter.desc')}
        </motion.p>

        <motion.div className="space-y-4" variants={stagger}>
          {(t('case_study.beforeAfter.items', { returnObjects: true }) as any[]).map((row, i) => (
            <motion.div key={i} variants={fadeIn} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
              <Card className="border-destructive/30 bg-destructive/5">
                <CardContent className="p-5 flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">{row.before}</p>
                </CardContent>
              </Card>
              <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-5 flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground font-medium">{row.after}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ THE SOLUTION ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{t('case_study.solution.title')}</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-12 max-w-[700px]">
          {t('case_study.solution.desc')}
        </motion.p>

        {/* Innovation Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={stagger}>
          {(() => {
            const cards = t('case_study.solution.cards', { returnObjects: true }) as any[];
            const icons = [Layers, Code, Bot, TestTube, FileCheck, Users];
            return cards.map((card, idx) => {
              const Icon = icons[idx];
              return (
                <motion.div key={card.title} variants={fadeIn}>
                  <Card className="h-full glow-card border-border/50 hover:border-primary/40 transition-all duration-400">
                    <CardContent className="p-6">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            });
          })()}
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ ARCHITECTURE DIAGRAM (Propuesta 5) ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{t('case_study.architecture.title')}</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">
          {t('case_study.architecture.desc')}
        </motion.p>

        <motion.div variants={fadeIn} className="max-w-[900px] mx-auto">
          {/* Root */}
          <div className="text-center mb-6">
            <span className="inline-block bg-primary/10 border border-primary/30 rounded-lg px-6 py-3 font-mono font-bold text-lg">
              🏗️ discovery-playground/
            </span>
          </div>

          {/* Packages Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {(() => {
              const pkgs = t('case_study.architecture.packages', { returnObjects: true }) as any[];
              const meta = [
                { emoji: "🖥️", color: "border-violet-500/40 bg-violet-500/5" },
                { emoji: "📱", color: "border-teal-500/40 bg-teal-500/5" },
                { emoji: "📱", color: "border-blue-500/40 bg-blue-500/5" },
                { emoji: "📱", color: "border-amber-500/40 bg-amber-500/5" },
              ];
              return pkgs.map((pkg, idx) => (
                <Card key={pkg.name} className={`${meta[idx].color} border`}>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl mb-2">{meta[idx].emoji}</p>
                    <p className="font-mono text-sm font-semibold">{pkg.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{pkg.type}</p>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <p>📂 playground/</p>
                      <p>👥 synthetic-users/</p>
                      <p>🧩 components/</p>
                    </div>
                  </CardContent>
                </Card>
              ));
            })()}
          </div>

          {/* Shared Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(t('case_study.architecture.shared', { returnObjects: true }) as any[]).map((s) => (
              <Card key={s.name} className="border-dashed">
                <CardContent className="p-4 text-center">
                  <p className="font-mono text-xs font-semibold">shared/{s.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ ANATOMY OF A DISCOVERY (Propuesta 1) ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
          <FolderTree className="inline h-8 w-8 mr-3" />
          {t('case_study.anatomy.title')}
        </motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">
          {t('case_study.anatomy.desc')}<span className="text-foreground font-bold">{t('case_study.anatomy.descBold')}</span>.
        </motion.p>

        <motion.div variants={fadeIn} className="max-w-[700px]">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📁</span>
                <code className="text-lg font-bold font-mono">docs/feature-financiero/</code>
              </div>
              <div className="space-y-3">
                {(() => {
                  const items = t('case_study.anatomy.items', { returnObjects: true }) as any[];
                  const icons = ["📄", "🎨", "📋", "🏗️", "✅", "📁"];
                  return items.map((item, idx) => (
                    <div key={item.name} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <span className="text-xl">{icons[idx]}</span>
                      <div className="flex-1 min-w-0">
                        <code className="font-mono text-sm font-semibold">{item.name}</code>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ));
                })()}
              </div>
              <GradientDivider className="my-6" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('case_study.anatomy.countLabel')}</span>
                <span className="text-2xl md:text-3xl font-bold text-primary">76</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ AI SKILLS PIPELINE (Propuesta 3) ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{t('case_study.skills.title')}</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">
          {t('case_study.skills.desc')}
        </motion.p>

        <motion.div className="space-y-6 max-w-[800px]" variants={stagger}>
          {(() => {
            const skills = t('case_study.skills.items', { returnObjects: true }) as any[];
            const meta = [
              { color: "text-violet-600 dark:text-violet-400", bgColor: "bg-violet-500/10", borderColor: "border-violet-500/30" },
              { color: "text-teal-600 dark:text-teal-400", bgColor: "bg-teal-500/10", borderColor: "border-teal-500/30" },
              { color: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30" },
            ];
            return skills.map((skill, i) => (
              <motion.div key={skill.name} variants={fadeIn}>
                <Card className={`border ${meta[i].borderColor}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${meta[i].bgColor} text-sm font-bold ${meta[i].color}`}>
                        {i + 1}
                      </span>
                      <code className={`font-mono font-bold text-lg ${meta[i].color}`}>/{skill.name}</code>
                    </div>
                    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
                      <div>
                        <p className="text-xs uppercase font-semibold text-muted-foreground mb-2 tracking-wider">{t('case_study.skills.inputLabel')}</p>
                        <p className="text-sm text-foreground">{skill.input}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block mt-6" />
                      <div>
                        <p className="text-xs uppercase font-semibold text-muted-foreground mb-2 tracking-wider">{t('case_study.skills.outputLabel')}</p>
                        <ul className="space-y-1">
                          {skill.outputs.map((o: string) => (
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
              </motion.div>
            ));
          })()}
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ SYNTHETIC USERS IN ACTION (Propuesta 2) ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{t('case_study.synthetic.title')}</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">
          {t('case_study.synthetic.desc')}
        </motion.p>

        <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-8 items-start">
          {/* YAML Example */}
          <Card className="border-teal-500/30">
            <CardContent className="p-6">
              <p className="text-xs uppercase font-semibold text-teal-600 dark:text-teal-400 mb-4 tracking-wider">{t('case_study.synthetic.exampleLabel')}</p>
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

          {/* Visual + Context */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold">{t('case_study.synthetic.howItWorks')}</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {(() => {
                    const steps = t('case_study.synthetic.steps', { returnObjects: true }) as string[];
                    return steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{idx + 1}</span>
                        {step}
                      </li>
                    ));
                  })()}
                </ol>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ UI MOCKUPS (Propuesta 6) ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{t('case_study.mockups.title')}</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">
          {t('case_study.mockups.desc')}
        </motion.p>

        {(() => {
          const [main, ...rest] = t('case_study.mockups.items', { returnObjects: true }) as { label: string; src: string }[]
          return (
            <motion.div className="space-y-8" variants={stagger}>
              <motion.div variants={fadeIn}>
                <p className="text-sm font-semibold text-muted-foreground mb-3">{main.label}</p>
                <img src={main.src} alt={main.label} loading="lazy" className="w-full rounded-lg border" />
              </motion.div>
              <div className="grid md:grid-cols-2 gap-8">
                {rest.map((shot) => (
                  <motion.div key={shot.src} variants={fadeIn}>
                    <p className="text-sm font-semibold text-muted-foreground mb-3">{shot.label}</p>
                    <img src={shot.src} alt={shot.label} loading="lazy" className="w-full rounded-lg border bg-white" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })()}
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ METRICS ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{t('case_study.metricsSection.title')}</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-12 max-w-[700px]">{t('case_study.metricsSection.desc')}</motion.p>

        <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-6" variants={stagger}>
          {(t('case_study.metrics', { returnObjects: true }) as { value: string; label: string }[]).map(({ value, label }) => (
            <motion.div key={label} variants={fadeIn}>
              <Card className="text-center glow-card border-border/50 hover:border-primary/40 transition-all duration-400">
                <CardContent className="p-6">
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ TECH STACK ═══════════════ */}
      <motion.section className="mb-20 max-w-[800px]" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-8">{t('case_study.techStack.title')}</motion.h2>
        <motion.div variants={fadeIn} className="flex flex-wrap gap-3">
          {techStack.map((tItem) => (
            <Badge key={tItem} variant="secondary" className="text-sm py-1.5 px-4">{tItem}</Badge>
          ))}
        </motion.div>
      </motion.section>

      {/* ═══════════════ LEARNINGS ═══════════════ */}
      <motion.section className="mb-20 max-w-[800px]" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{t('case_study.learnings.title')}</motion.h2>
        <motion.div variants={fadeIn} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          {(t('case_study.learnings.items', { returnObjects: true }) as any[]).map((l) => (
            <div key={l.title} className="border-l-2 border-primary pl-6">
              <p className="font-medium text-foreground mb-1">{l.title}</p>
              <p className="text-base">{l.body}</p>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* ═══════════════ CTA ═══════════════ */}
      <motion.section className="text-center py-12" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}>
        <p className="text-muted-foreground mb-6">{t('case_study.cta.text')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:juanseruani@gmail.com" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>{t('case_study.cta.contact')}</a>
          <a href="/#proyectos" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto")}>{t('case_study.cta.more')}</a>
        </div>
      </motion.section>
    </div>
  )
}
