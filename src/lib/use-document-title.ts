import { useEffect } from "react"

const SITE_NAME = "Juan Sebastián Ruani"

/** Sets the tab title for a page; pass the page name, or nothing for the home page. */
export function useDocumentTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} — ${SITE_NAME}` : `${SITE_NAME} — Product Designer`
  }, [page])
}
