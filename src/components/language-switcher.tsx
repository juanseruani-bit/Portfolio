import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith("es") ? "en" : "es"
    i18n.changeLanguage(newLang)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="font-medium px-2"
      title={i18n.language.startsWith("es") ? "Switch to English" : "Cambiar a Español"}
      aria-label={i18n.language.startsWith("es") ? "Switch to English" : "Cambiar a Español"}
    >
      <span className={i18n.language.startsWith("es") ? "text-muted-foreground" : "text-foreground"}>EN</span>
      <span className="mx-1 text-muted-foreground">/</span>
      <span className={i18n.language.startsWith("es") ? "text-foreground" : "text-muted-foreground"}>ES</span>
    </Button>
  )
}
