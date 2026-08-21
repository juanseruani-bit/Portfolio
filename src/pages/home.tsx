import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"

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
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
      {/* Hero Section */}
      <motion.section 
        className="max-w-[800px] mb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Badge variant="secondary" className="mb-6">
          Disponible para nuevas oportunidades
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Product Designer uniendo <span className="text-muted-foreground">diseño UX</span> y <span className="text-muted-foreground">estrategia de negocio.</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-[600px]">
          Con formación en Administración de Empresas y más de 5 años de experiencia diseñando productos digitales en HMM, Avature y DinoCloud.
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <a href="mailto:juanseruani@gmail.com">Contactar</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="https://www.behance.net/juanseruani" target="_blank" rel="noreferrer">
              Ver Behance
            </a>
          </Button>
        </div>
      </motion.section>

      <Separator className="my-16" />

      {/* Projects Section (Placeholders) */}
      <section>
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Proyectos Destacados</h2>
          <p className="text-muted-foreground">Una selección de mi trabajo reciente (casos de estudio anonimizados en progreso).</p>
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
              <Card className="h-full flex flex-col hover:border-foreground/50 transition-colors group cursor-pointer">
                <div className="h-64 bg-muted rounded-t-lg flex items-center justify-center border-b overflow-hidden">
                  <img src="/images/case-study-hero.jpg" alt="Discovery Hub" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge>DesignOps / IA</Badge>
                    <span className="text-sm text-muted-foreground">2025</span>
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
                  <Button variant="secondary" className="w-full">
                    Ver Caso de Estudio
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>

          {/* Proyecto 2 */}
          <motion.div variants={item}>
            <Card className="h-full flex flex-col hover:border-foreground/50 transition-colors">
              <div className="h-64 bg-muted rounded-t-lg flex items-center justify-center border-b">
                <span className="text-muted-foreground font-mono">[Placeholder Imagen Cloud]</span>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge>Cloud / SaaS</Badge>
                  <span className="text-sm text-muted-foreground">2021 - 2023</span>
                </div>
                <CardTitle className="text-2xl">Dashboard de Monitoreo Cloud</CardTitle>
                <CardDescription className="text-base mt-2">
                  Creación de un sistema de diseño desde cero y UX para herramientas de monitoreo en la nube.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline">Arquitectura de Información</Badge>
                  <Badge variant="outline">Figma</Badge>
                  <Badge variant="outline">Prototyping</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full" disabled>
                  Caso de Estudio en Progreso
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      <Separator className="my-16" />

      {/* About Section */}
      <section>
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Acerca de Mí</h2>
          <p className="text-muted-foreground">Mi recorrido profesional combinando negocio y diseño.</p>
        </div>

        <div className="space-y-8 max-w-[800px]">
          {/* HMM */}
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
              <h3 className="text-xl font-semibold">UX/UI Designer</h3>
              <span className="text-muted-foreground text-sm font-mono">Mayo 2025 - Presente</span>
            </div>
            <p className="text-lg font-medium text-primary mb-2">Home Medical Management (HMM)</p>
            <p className="text-muted-foreground leading-relaxed">
              Diseño de experiencias digitales en el sector de la salud, optimizando flujos de usuarios para gestión médica y aportando visión de negocio a las decisiones de UX.
            </p>
          </motion.div>

          <Separator />

          {/* Avature */}
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
              <h3 className="text-xl font-semibold">UX Designer</h3>
              <span className="text-muted-foreground text-sm font-mono">Marzo 2023 - Mayo 2025</span>
            </div>
            <p className="text-lg font-medium text-primary mb-2">Avature</p>
            <p className="text-muted-foreground leading-relaxed">
              Diseño de herramientas SaaS complejas para reclutamiento y gestión de talento (ATS). Mejora de flujos de trabajo B2B y colaboración estrecha con equipos de desarrollo.
            </p>
          </motion.div>

          <Separator />

          {/* DinoCloud */}
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
              <h3 className="text-xl font-semibold">Ssr. UX & UI Solutions Designer</h3>
              <span className="text-muted-foreground text-sm font-mono">Junio 2021 - Marzo 2023</span>
            </div>
            <p className="text-lg font-medium text-primary mb-2">DinoCloud</p>
            <p className="text-muted-foreground leading-relaxed">
              Liderazgo en diseño de soluciones Cloud. Creación de sistemas de diseño y mejora de interfaces orientadas a plataformas de infraestructura y monitoreo.
            </p>
          </motion.div>

          <Separator />

          {/* Educación */}
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
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
          </motion.div>
        </div>
      </section>
    </div>
  )
}
