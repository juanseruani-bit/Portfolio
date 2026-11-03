import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const isSpanish = i18n.language.startsWith("es")

  const toggleLanguage = () => {
    i18n.changeLanguage(isSpanish ? "en" : "es")
  }

  // The accessible name starts with the visible "EN / ES" so voice control ("click EN") still finds it.
  const hint = isSpanish ? "Switch to English" : "Cambiar a Español"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="font-medium px-2"
      title={hint}
    >
      <span lang="en" className={isSpanish ? "text-muted-foreground" : "text-foreground"}>EN</span>
      <span className="mx-1 text-muted-foreground">/</span>
      <span lang="es" className={isSpanish ? "text-foreground" : "text-muted-foreground"}>ES</span>
      <span className="sr-only" lang={isSpanish ? "en" : "es"}>, {hint}</span>
    </Button>
  )
}
