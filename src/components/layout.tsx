import { Link, useLocation, useNavigationType } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { AnimatedBackgroundWithKeyframes } from "./animated-background"
import { NoiseOverlay } from "./decorative-elements"
import { ExternalLink, Menu } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslation } from "react-i18next"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { useEffect, useRef, useState } from "react"
import { buttonVariants } from "./ui/button"
import { CONTACT_EMAIL, LINKEDIN_URL } from "./contact-section"

/**
 * Client-side navigation keeps the old scroll position, drops focus on <body> and ignores #anchors.
 * On each navigation, scroll to the anchor (e.g. /#proyectos) or to the top of the new page, then
 * move focus to that section's heading (or the page <h1>) so keyboard users continue from there
 * and screen readers announce it. Direct visits to a URL with an anchor get the same scroll.
 */
function useRouteFocus() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()
  // Track the last handled navigation (not a first-render flag) so StrictMode's double effect run is a no-op.
  const lastKey = useRef<string | null>(null)
  const lastPathname = useRef(pathname)

  useEffect(() => {
    if (lastKey.current === key) return
    const isFirstLoad = lastKey.current === null
    const samePage = !isFirstLoad && lastPathname.current === pathname
    lastKey.current = key
    lastPathname.current = pathname
    if (isFirstLoad && !hash) return

    if (!hash && navigationType !== "POP") window.scrollTo(0, 0)

    // Case pages load lazily, so wait a few frames for the target to exist.
    let frame = 0
    let tries = 0
    const focusTarget = () => {
      const section = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
      const heading = hash
        ? section?.querySelector<HTMLHeadingElement>("h1, h2")
        : document.querySelector<HTMLHeadingElement>("main h1")
      if (heading) {
        // Smooth scroll only within the same page; arriving from another page should land directly.
        // "auto" follows the CSS scroll-behavior, which is smooth only without prefers-reduced-motion.
        if (section) section.scrollIntoView({ block: "start", behavior: samePage ? "auto" : "instant" })
        heading.tabIndex = -1
        heading.focus({ preventScroll: true })
      } else if (tries++ < 120) {
        frame = requestAnimationFrame(focusTarget)
      }
    }
    frame = requestAnimationFrame(focusTarget)
    return () => cancelAnimationFrame(frame)
  }, [key, pathname, hash, navigationType])
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  useRouteFocus()

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      <AnimatedBackgroundWithKeyframes />
      <NoiseOverlay />

      {/* Skip link: focus <main> directly so the URL keeps no #anchor and the router doesn't react */}
      <a
        href="#contenido"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById("contenido")?.focus()
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md"
      >
        {t('a11y.skip')}
      </a>

      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2 group" aria-label={t('a11y.home')}>
              <img src="/favicon.svg" alt="" className="w-8 h-8 group-hover:opacity-80 transition-opacity" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav aria-label={t('a11y.menu_desc')} className="hidden md:flex items-center space-x-4 md:space-x-6">
            <Link
              to="/#proyectos"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t('layout.nav.projects')}
            </Link>
            <a
              href="https://www.linkedin.com/in/jsruani"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1"
            >
              {t('layout.nav.linkedin')}
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
              <span className="sr-only"> {t('a11y.new_tab')}</span>
            </a>
            <div className="flex items-center space-x-2 border-l pl-4 border-border/50">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label={t('a11y.menu')}>
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] flex flex-col pt-12 px-6" closeLabel={t('a11y.close')}>
                <SheetTitle className="sr-only">{t('a11y.menu')}</SheetTitle>
                <SheetDescription className="sr-only">{t('a11y.menu_desc')}</SheetDescription>
                
                <div className="flex flex-col space-y-6 flex-1 mt-4">
                  <Link
                    to="/#proyectos"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-primary border-b border-border/50 pb-4"
                  >
                    {t('layout.nav.projects')}
                  </Link>
                  <a
                    href="https://www.linkedin.com/in/jsruani"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-2 border-b border-border/50 pb-4"
                  >
                    {t('layout.nav.linkedin')}
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span className="sr-only"> {t('a11y.new_tab')}</span>
                  </a>

                  <div className="flex flex-col space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">{t('a11y.settings')}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('a11y.language')}</span>
                      <LanguageSwitcher />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('a11y.theme')}</span>
                      <ModeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main id="contenido" tabIndex={-1} className="flex-1 flex flex-col scroll-mt-16 focus:outline-none">{children}</main>

      <footer className="border-t border-border/50 py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-8">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t('layout.footer.credit')}
          </p>
          <nav aria-label={t('layout.footer.contact_label')} className="flex items-center gap-5 text-sm">
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors">
              {CONTACT_EMAIL}
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              LinkedIn
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
              <span className="sr-only"> {t('a11y.new_tab')}</span>
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
