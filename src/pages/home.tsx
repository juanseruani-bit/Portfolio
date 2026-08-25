import { motion } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GradientDivider, GlowOrb, GridPattern } from "@/components/decorative-elements"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export function Home() {
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

        <div className="container mx-auto px-4 md:px-8 pt-8 pb-20 md:pt-16 md:pb-32">
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
              Product Designer uniendo{" "}
              <span className="gradient-text">diseño UX</span> y{" "}
              <span className="gradient-text">estrategia de negocio.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-[620px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              Con formación en Administración de Empresas y más de 5 años de experiencia diseñando productos digitales en HMM, Avature y DinoCloud.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <a
                href="mailto:juanseruani@gmail.com"
                className={cn(buttonVariants({ size: "lg" }), "group relative overflow-hidden")}
              >
                  Contactar
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
              <a
                href="https://www.behance.net/juanseruani"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "group")}
              >
                  Ver Behance
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
              className="text-3xl font-bold tracking-tight mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Proyectos Destacados
            </motion.h2>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Una selección de mi trabajo reciente (casos de estudio anonimizados en progreso).
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Proyecto 1 — Discovery Hub */}
            <motion.div variants={item}>
              <Link to="/proyectos/discovery-hub" className="block">
                <Card className="h-full flex flex-col glow-card group cursor-pointer border-border/50 hover:border-primary/40 transition-all duration-400">
                  <div className="h-64 bg-muted rounded-t-xl flex items-center justify-center border-b overflow-hidden">
                    <img
                      src="/images/case-study-hero.jpg"
                      alt="Discovery Hub"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-[var(--accent-violet)] text-white border-0">DesignOps / IA</Badge>
                      <span className="text-sm text-muted-foreground font-mono">2025</span>
                    </div>
                    <CardTitle className="text-2xl">Discovery & Prototyping Hub</CardTitle>
                    <CardDescription className="text-base mt-2">
                      Plataforma de prototipado con IA que unifica diseño y desarrollo. Skills de Claude para automatizar discovery, testing sintético y handoff.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">Claude Code</Badge>
                      <Badge variant="outline">UX Engineering</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" className="w-full group/btn">
                      Ver Caso de Estudio
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>

            {/* Proyecto 2 */}
            <motion.div variants={item}>
              <Link to="/proyectos/b2b-app-buyers" className="block h-full">
                <Card className="h-full flex flex-col glow-card group cursor-pointer border-border/50 hover:border-primary/40 transition-all duration-400">
                  <div className="h-64 bg-muted rounded-t-xl flex items-center justify-center border-b relative overflow-hidden">
                    <img
                      src="/images/b2b-cover-clean.png"
                      alt="B2B App for Buyers"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-green-900/10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-green-600 hover:bg-green-700 text-white border-0">B2B / App</Badge>
                      <span className="text-sm text-muted-foreground font-mono">2020</span>
                    </div>
                    <CardTitle className="text-2xl">B2B App for Buyers</CardTitle>
                    <CardDescription className="text-base mt-2">
                      Digitalización y optimización del proceso de compra de inventario para supermercados, eliminando el uso del papel.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline">UX/UI Design</Badge>
                      <Badge variant="outline">User Research</Badge>
                      <Badge variant="outline">Mobile</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" className="w-full group/btn">
                      Ver Caso de Estudio
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </GridPattern>

      <GradientDivider />

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section className="container mx-auto px-4 md:px-8 py-4 relative">
        <GlowOrb color="violet" size="md" className="-right-32 top-20" />

        <div className="mb-12">
          <motion.h2
            className="text-3xl font-bold tracking-tight mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Acerca de Mí
          </motion.h2>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Mi recorrido profesional combinando negocio y diseño.
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
                <h3 className="text-xl font-semibold">UX/UI Designer</h3>
                <span className="text-muted-foreground text-sm font-mono">Mayo 2025 - Presente</span>
              </div>
              <p className="text-lg font-medium text-primary mb-2">Home Medical Management (HMM)</p>
              <p className="text-muted-foreground leading-relaxed">
                Diseño de experiencias digitales en el sector de la salud, optimizando flujos de usuarios para gestión médica y aportando visión de negocio a las decisiones de UX.
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
                <h3 className="text-xl font-semibold">UX Designer</h3>
                <span className="text-muted-foreground text-sm font-mono">Marzo 2023 - Mayo 2025</span>
              </div>
              <p className="text-lg font-medium text-primary mb-2">Avature</p>
              <p className="text-muted-foreground leading-relaxed">
                Diseño de herramientas SaaS complejas para reclutamiento y gestión de talento (ATS). Mejora de flujos de trabajo B2B y colaboración estrecha con equipos de desarrollo.
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
                <h3 className="text-xl font-semibold">Ssr. UX & UI Solutions Designer</h3>
                <span className="text-muted-foreground text-sm font-mono">Junio 2021 - Marzo 2023</span>
              </div>
              <p className="text-lg font-medium text-primary mb-2">DinoCloud</p>
              <p className="text-muted-foreground leading-relaxed">
                Liderazgo en diseño de soluciones Cloud. Creación de sistemas de diseño y mejora de interfaces orientadas a plataformas de infraestructura y monitoreo.
              </p>
            </div>
          </motion.div>

          {/* Educación */}
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-semibold mb-4">Educación</h3>
              <ul className="space-y-4">
                <li>
                  <p className="font-medium">Licenciatura en Administración de Empresas</p>
                  <p className="text-muted-foreground text-sm">Universidad Nacional de Córdoba (2013 - 2019)</p>
                </li>
                <li>
                  <p className="font-medium">Diplomatura en UX/UI Design</p>
                  <p className="text-muted-foreground text-sm">Acámica (2019)</p>
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
