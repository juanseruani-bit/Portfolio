import { Link } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold sm:inline-block">JS.</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
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
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-8">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Diseñado y desarrollado por Juan Sebastián Ruani.
          </p>
        </div>
      </footer>
    </div>
  )
}
