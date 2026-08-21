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
const metrics = [
  { value: "15+", label: "Discoveries completadas end-to-end" },
  { value: "50%", label: "Reducción en idas y vueltas de handoff" },
  { value: "1 sem", label: "Validación completa con usuarios reales" },
  { value: "30+", label: "Tests de UX con usuarios sintéticos (IA)" },
  { value: "10+", label: "Personas impactadas en el equipo" },
  { value: "2x", label: "Más rápido el desarrollo (de 1 mes a 1-2 sem)" },
]

const techStack = [
  "React", "TypeScript", "Vite", "Material-UI", "Express",
  "Claude Code", "npm Workspaces", "React Native", "i18n", "YAML",
]

const beforeAfter = [
  {
    before: "Diseño en Figma → PDF de specs → El dev interpreta",
    after: "Prototipo en código real → Spec auto-derivada → El dev implementa",
  },
  {
    before: "Testing manual cada 2 semanas con usuarios reales",
    after: "30+ tests automáticos con usuarios sintéticos (IA)",
  },
  {
    before: "Handoff en ~2 semanas de documentación manual",
    after: "Handoff en 1 día (derivación automatizada con skills)",
  },
  {
    before: "Documentación manual que se desactualiza al primer cambio",
    after: "Docs vivos con scripts de verificación automáticos",
  },
  {
    before: "Prototipos que no coinciden con la arquitectura de desarrollo",
    after: "Mismo stack que producción: React, MUI, TypeScript",
  },
]

const discoveryTree = [
  { name: "README.md", desc: "Cómo funciona de punta a punta", icon: "📄" },
  { name: "DISEÑO.md", desc: "El porqué de cada decisión", icon: "🎨" },
  { name: "DECISIONES.md", desc: "Bitácora cronológica (D-001…D-075)", icon: "📋" },
  { name: "ESTADO.md", desc: "Qué está construido, qué falta", icon: "🏗️" },
  { name: "VALIDACION.md", desc: "Cómo recorrerlo con datos mock", icon: "✅" },
  { name: "notas/", desc: "Material crudo de reuniones, sin editar", icon: "📁" },
]

const skillPipeline = [
  {
    name: "discovery-start",
    input: "Notas de reunión + pedidos del negocio",
    outputs: [
      "Carpeta docs/<discovery>/ con 5 archivos narrativos",
      "Bitácora de decisiones arrancada",
      "Plan de trabajo por fases",
      "Material crudo guardado sin editar",
    ],
    color: "text-violet-400",
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
    color: "text-teal-400",
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
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
  },
]

/* ─── component ─── */
export function CaseStudyPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 relative">
      {/* Decorative orbs */}
      <GlowOrb color="indigo" size="lg" className="-top-40 right-0" />
      <GlowOrb color="violet" size="md" className="top-[600px] -left-40" />

      {/* Back */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link to="/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8")}>
          <ArrowLeft className="mr-2 h-4 w-4" />Volver
        </Link>
      </motion.div>

      {/* ═══════════════ HERO ═══════════════ */}
      <motion.section className="mb-16" initial="hidden" animate="show" variants={stagger}>
        <motion.div variants={fadeIn} className="flex flex-wrap gap-3 mb-6">
          <Badge>DesignOps</Badge>
          <Badge variant="outline">IA + Diseño</Badge>
          <Badge variant="outline">2025</Badge>
        </motion.div>

        <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-[900px]">
          Discovery & Prototyping Hub
        </motion.h1>

        <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-[700px]">
          De Figma a código vivo: una plataforma de prototipado que unifica diseño, IA y desarrollo para validar experiencias antes de escribir código productivo.
        </motion.p>

        <motion.div variants={fadeIn} className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-10">
          <div><span className="font-semibold text-foreground">Rol:</span> Product Designer / UX Engineer</div>
          <div><span className="font-semibold text-foreground">Empresa:</span> HealthTech (NDA)</div>
          <div><span className="font-semibold text-foreground">Duración:</span> 2025 — Presente</div>
        </motion.div>

        <motion.div variants={fadeIn}>
          <img src="/images/case-study-hero.jpg" alt="Discovery → Prototype → Handoff" className="w-full rounded-lg border" />
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ THE PROBLEM ═══════════════ */}
      <motion.section className="mb-20 max-w-[800px]" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-6">El Problema</motion.h2>
        <motion.div variants={fadeIn} className="space-y-4 text-lg text-muted-foreground leading-relaxed">
          <p>En productos digitales complejos — especialmente en HealthTech, donde conviven una plataforma web para operadores, apps móviles para profesionales, pacientes y conductores — el flujo clásico de diseño genera fricciones críticas:</p>
          <ul className="space-y-3 pl-6 list-disc">
            <li><span className="text-foreground font-medium">Los prototipos estáticos no reflejan la complejidad real.</span> Un mockup en Figma no puede simular estados de carga, validaciones en tiempo real, ni flujos multi-paso con datos dinámicos.</li>
            <li><span className="text-foreground font-medium">El handoff es un cuello de botella.</span> Los desarrolladores reciben PDFs o links de Figma que no coinciden con la arquitectura de componentes del frontend real.</li>
            <li><span className="text-foreground font-medium">La documentación se desactualiza al primer cambio.</span> Las especificaciones escritas en paralelo al prototipo se reescriben con cada iteración.</li>
            <li><span className="text-foreground font-medium">El testing de UX es caro y lento.</span> Coordinar sesiones con usuarios reales para cada iteración es insostenible en ciclos ágiles.</li>
          </ul>
        </motion.div>
      </motion.section>

      {/* ═══════════════ BEFORE & AFTER (Propuesta 4) ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-4">Antes vs. Después</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">
          El impacto del Discovery Hub comparado con el flujo de diseño tradicional.
        </motion.p>

        <motion.div className="space-y-4" variants={stagger}>
          {beforeAfter.map((row, i) => (
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
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-4">La Solución</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-12 max-w-[700px]">
          Un monorepo de prototipado que replica el stack real de desarrollo, alimentado con datos mock, donde cada feature se diseña, valida y documenta antes de escribir una sola línea de código productivo.
        </motion.p>

        <motion.div variants={fadeIn}><img src="/images/workflow-diagram.jpg" alt="Workflow: Discovery → Prototype → Handoff" className="w-full rounded-lg border mb-12" /></motion.div>

        {/* Innovation Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={stagger}>
          {[
            { icon: Layers, title: "Monorepo Multi-Plataforma", desc: "4 entornos (1 web + 3 mobile) con el mismo stack que producción. Componentes compartidos, datos mock centralizados, y playgrounds independientes por plataforma." },
            { icon: Code, title: "Sistema de Discoveries", desc: "Cada feature es una 'Discovery' — una unidad funcional que agrupa componentes, páginas, hooks, mocks y documentación. 15+ discoveries completadas." },
            { icon: Bot, title: "Skills de IA (Claude Code)", desc: "3 skills que automatizan el ciclo: discovery-start, handoff y synth-run. Desde la investigación inicial hasta la entrega al equipo de desarrollo." },
            { icon: TestTube, title: "Usuarios Sintéticos", desc: "Personas ficticias con perfiles YAML que recorren los prototipos y reportan fricción UX en 3 capas. +30 tests ejecutados automáticamente." },
            { icon: FileCheck, title: "Spec-Driven Development", desc: "Dos familias de docs que nunca se fusionan: la narrativa (el porqué) y la norma (el qué debe cumplir). Scripts de verificación automáticos." },
            { icon: Users, title: "Handoff sin Fricciones", desc: "Los desarrolladores reciben prototipos funcionales en su mismo stack, especificaciones derivadas del código, y casos de prueba." },
          ].map((card) => (
            <motion.div key={card.title} variants={fadeIn}>
              <Card className="h-full glow-card border-border/50 hover:border-primary/40 transition-all duration-400">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <card.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ ARCHITECTURE DIAGRAM (Propuesta 5) ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-4">Arquitectura del Monorepo</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">
          Un único repositorio que contiene los 4 entornos de producto, con recursos compartidos centralizados.
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
            {[
              { name: "web-backoffice", emoji: "🖥️", type: "React + Vite", color: "border-violet-500/40 bg-violet-500/5" },
              { name: "app-patient", emoji: "📱", type: "React Native", color: "border-teal-500/40 bg-teal-500/5" },
              { name: "app-professional", emoji: "📱", type: "React Native", color: "border-blue-500/40 bg-blue-500/5" },
              { name: "app-mobility", emoji: "📱", type: "React Native", color: "border-amber-500/40 bg-amber-500/5" },
            ].map((pkg) => (
              <Card key={pkg.name} className={`${pkg.color} border`}>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl mb-2">{pkg.emoji}</p>
                  <p className="font-mono text-sm font-semibold">{pkg.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{pkg.type}</p>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <p>📂 playground/</p>
                    <p>👥 synthetic-users/</p>
                    <p>🧩 components/</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Shared Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "mock-factories", desc: "Datos mock compartidos" },
              { name: "handoff", desc: "Contrato y templates" },
              { name: "synthetic-users", desc: "Runner, rúbrica, arnés" },
              { name: "utils", desc: "Utilidades comunes" },
            ].map((s) => (
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
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-4">
          <FolderTree className="inline h-8 w-8 mr-3" />
          Anatomía de una Discovery
        </motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">
          Cada discovery tiene un ciclo documental riguroso. Este es un ejemplo real (anonimizado) de una feature de gestión financiera con <span className="text-foreground font-bold">75 decisiones documentadas</span>.
        </motion.p>

        <motion.div variants={fadeIn} className="max-w-[700px]">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📁</span>
                <code className="text-lg font-bold font-mono">docs/feature-financiero/</code>
              </div>
              <div className="space-y-3">
                {discoveryTree.map((item) => (
                  <div key={item.name} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <code className="font-mono text-sm font-semibold">{item.name}</code>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <GradientDivider className="my-6" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Decisiones documentadas en esta discovery:</span>
                <span className="text-3xl font-bold text-primary">75</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ AI SKILLS PIPELINE (Propuesta 3) ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-4">Skills de IA — Pipeline Real</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">
          Tres skills de Claude Code que automatizan el ciclo completo, desde la investigación inicial hasta la entrega al equipo de desarrollo.
        </motion.p>

        <motion.div className="space-y-6 max-w-[800px]" variants={stagger}>
          {skillPipeline.map((skill, i) => (
            <motion.div key={skill.name} variants={fadeIn}>
              <Card className={`border ${skill.borderColor}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${skill.bgColor} text-sm font-bold ${skill.color}`}>
                      {i + 1}
                    </span>
                    <code className={`font-mono font-bold text-lg ${skill.color}`}>/{skill.name}</code>
                  </div>
                  <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
                    <div>
                      <p className="text-xs uppercase font-semibold text-muted-foreground mb-2 tracking-wider">Input</p>
                      <p className="text-sm text-foreground">{skill.input}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block mt-6" />
                    <div>
                      <p className="text-xs uppercase font-semibold text-muted-foreground mb-2 tracking-wider">Output Automático</p>
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
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ SYNTHETIC USERS IN ACTION (Propuesta 2) ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-4">Usuarios Sintéticos en Acción</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">
          Cada persona sintética tiene un perfil YAML con rol, comportamiento, frustraciones y foco. Recorren los prototipos y reportan fricción de usabilidad automáticamente.
        </motion.p>

        <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-8 items-start">
          {/* YAML Example */}
          <Card className="border-teal-500/30">
            <CardContent className="p-6">
              <p className="text-xs uppercase font-semibold text-teal-400 mb-4 tracking-wider">Ejemplo real (anonimizado)</p>
              <pre className="text-sm font-mono leading-relaxed overflow-x-auto text-foreground">
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
            <img src="/images/synthetic-testing.jpg" alt="Synthetic User Testing" className="w-full rounded-lg border" />
            <Card>
              <CardContent className="p-6 space-y-4">
                <h4 className="font-semibold">¿Cómo funciona?</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</span>
                    Se elige una <strong className="text-foreground">persona</strong> y una <strong className="text-foreground">misión</strong> (o modo exploración libre)
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</span>
                    La IA recorre la discovery como esa persona, respetando su comportamiento
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">3</span>
                    Aplica una <strong className="text-foreground">rúbrica estandarizada</strong> de 10 principios en cada pantalla
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">4</span>
                    Genera un <strong className="text-foreground">reporte de fricción en 3 capas</strong> con severidad calibrada
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ UI MOCKUPS (Propuesta 6) ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-4">Interfaces Prototipadas</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-10 max-w-[700px]">
          Ejemplos representativos de las interfaces diseñadas dentro del Discovery Hub (datos ficticios, diseño anonimizado).
        </motion.p>

        <motion.div className="space-y-8" variants={stagger}>
          <motion.div variants={fadeIn}>
            <p className="text-sm font-semibold text-muted-foreground mb-3">Home del Playground — Grid de Discoveries</p>
            <img src="/images/mockup-playground.jpg" alt="Playground Home" className="w-full rounded-lg border" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeIn}>
              <p className="text-sm font-semibold text-muted-foreground mb-3">Dashboard de Consumo de IA</p>
              <img src="/images/mockup-dashboard.jpg" alt="AI Dashboard" className="w-full rounded-lg border" />
            </motion.div>
            <motion.div variants={fadeIn}>
              <p className="text-sm font-semibold text-muted-foreground mb-3">Bandeja de Alertas con Priorización</p>
              <img src="/images/mockup-alerts.jpg" alt="Alerts Inbox" className="w-full rounded-lg border" />
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ METRICS ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-4">Resultados e Impacto</motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-12 max-w-[700px]">Los números hablan por sí solos.</motion.p>

        <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-6" variants={stagger}>
          {metrics.map((m) => (
            <motion.div key={m.label} variants={fadeIn}>
              <Card className="text-center glow-card border-border/50 hover:border-primary/40 transition-all duration-400">
                <CardContent className="p-6">
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{m.value}</p>
                  <p className="text-sm text-muted-foreground">{m.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ TECH STACK ═══════════════ */}
      <motion.section className="mb-20 max-w-[800px]" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-8">Stack Tecnológico</motion.h2>
        <motion.div variants={fadeIn} className="flex flex-wrap gap-3">
          {techStack.map((t) => (
            <Badge key={t} variant="secondary" className="text-sm py-1.5 px-4">{t}</Badge>
          ))}
        </motion.div>
      </motion.section>

      {/* ═══════════════ LEARNINGS ═══════════════ */}
      <motion.section className="mb-20 max-w-[800px]" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-6">Aprendizajes</motion.h2>
        <motion.div variants={fadeIn} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          {[
            { title: "El prototipo más útil es el que habla el mismo idioma que el equipo.", body: "Prototipar en el stack real elimina el \"juego del teléfono descompuesto\" entre diseño y desarrollo." },
            { title: "La documentación debe derivarse, no inventarse.", body: "El handoff más confiable es el que se genera automáticamente desde el código y las decisiones documentadas." },
            { title: "La IA no reemplaza el criterio de diseño, lo amplifica.", body: "Los usuarios sintéticos detectan el 80% de los problemas de usabilidad antes de invertir tiempo en sesiones presenciales." },
          ].map((l) => (
            <div key={l.title} className="border-l-2 border-primary pl-6">
              <p className="font-medium text-foreground mb-1">{l.title}</p>
              <p className="text-base">{l.body}</p>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* ═══════════════ CTA ═══════════════ */}
      <motion.section className="text-center py-12" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}>
        <p className="text-muted-foreground mb-6">¿Te interesa saber más sobre este proyecto?</p>
        <div className="flex gap-4 justify-center">
          <a href="mailto:juanseruani@gmail.com" className={buttonVariants({ size: "lg" })}>Conversemos</a>
          <Link to="/" className={buttonVariants({ size: "lg", variant: "outline" })}>Ver más proyectos</Link>
        </div>
      </motion.section>
    </div>
  )
}
