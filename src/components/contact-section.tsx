import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { m } from "framer-motion"
import { Check, Copy, ExternalLink, Mail } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const CONTACT_EMAIL = "juanseruani@gmail.com"
export const LINKEDIN_URL = "https://www.linkedin.com/in/jsruani"

export function ContactSection() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const emailRef = useRef<HTMLParagraphElement>(null)

  const copyEmail = async () => {
    let ok = false
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      ok = true
    } catch {
      // Clipboard API can be blocked (permissions, embedded previews): fall back to copying a selection.
      const selection = window.getSelection()
      if (emailRef.current && selection) {
        const range = document.createRange()
        range.selectNodeContents(emailRef.current)
        selection.removeAllRanges()
        selection.addRange(range)
        ok = document.execCommand("copy")
        // If even that fails, the address stays selected so it can be copied by hand.
        if (ok) selection.removeAllRanges()
      }
    }
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="contacto" className="container mx-auto px-4 md:px-8 scroll-mt-20">
      <m.div
        className="rounded-2xl border border-border/60 bg-[var(--surface)] px-6 py-12 md:px-12 md:py-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">{t('home.contact.title')}</h2>
        <p className="text-muted-foreground mb-8 max-w-[520px] mx-auto">{t('home.contact.desc')}</p>

        <p ref={emailRef} className="font-mono text-base md:text-lg mb-8 break-all">{CONTACT_EMAIL}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={`mailto:${CONTACT_EMAIL}`} className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
            <Mail className="h-4 w-4" aria-hidden="true" />
            {t('home.contact.email_button')}
          </a>
          <button type="button" onClick={copyEmail} className={cn(buttonVariants({ size: "lg", variant: "outline" }), "gap-2")}>
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            <span aria-live="polite">{copied ? t('home.contact.copied') : t('home.contact.copy_button')}</span>
          </button>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "gap-2")}>
            LinkedIn
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> {t('a11y.new_tab')}</span>
          </a>
        </div>
      </m.div>
    </section>
  )
}
