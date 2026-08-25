import { Link } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { AnimatedBackgroundWithKeyframes } from "./animated-background"
import { NoiseOverlay } from "./decorative-elements"
import { ExternalLink, Menu } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslation } from "react-i18next"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { useState } from "react"
import { Button } from "./ui/button"

export function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      <AnimatedBackgroundWithKeyframes />
      <NoiseOverlay />

      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2 group" aria-label="Inicio / Home">
              <img src="/favicon.svg" alt="Juan Ruani Logo" className="w-8 h-8 group-hover:opacity-80 transition-opacity" />
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4 md:space-x-6">
            <a
              href="/#proyectos"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t('layout.nav.projects')}
            </a>
            <a
              href="https://www.linkedin.com/in/jsruani"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1"
            >
              {t('layout.nav.linkedin')}
              <ExternalLink className="w-3 h-3" />
            </a>
            <div className="flex items-center space-x-2 border-l pl-4 border-border/50">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] flex flex-col pt-12 px-6">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Navegación principal del sitio</SheetDescription>
                
                <div className="flex flex-col space-y-6 flex-1 mt-4">
                  <a
                    href="/#proyectos"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-primary border-b border-border/50 pb-4"
                  >
                    {t('layout.nav.projects')}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jsruani"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-2 border-b border-border/50 pb-4"
                  >
                    {t('layout.nav.linkedin')}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  
                  <div className="flex flex-col space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Configuración</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Idioma</span>
                      <LanguageSwitcher />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tema</span>
                      <ModeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="border-t border-border/50 py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-8">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t('layout.footer.credit')}
          </p>
        </div>
      </footer>
    </div>
  )
}
