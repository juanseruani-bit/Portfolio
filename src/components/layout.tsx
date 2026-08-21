import { Link } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { AnimatedBackgroundWithKeyframes } from "./animated-background"
import { NoiseOverlay } from "./decorative-elements"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      <AnimatedBackgroundWithKeyframes />
      <NoiseOverlay />

      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="font-bold text-lg sm:inline-block gradient-text-subtle group-hover:opacity-80 transition-opacity">JS.</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Proyectos
            </Link>
            <a
              href="https://www.linkedin.com/in/jsruani"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              LinkedIn
            </a>
            <ModeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="border-t border-border/50 py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-8">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Diseñado y desarrollado por Juan Sebastián Ruani.
          </p>
        </div>
      </footer>
    </div>
  )
}
