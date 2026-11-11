import fs from "node:fs"
import path from "path"
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const SITE_URL = "https://portfolio-plum-delta-el2gvdcqib.vercel.app"
const SITE_NAME = "Juan Sebastián Ruani"

// Case pages that get their own HTML file with link-preview tags, so a shared
// case link shows that case's title and cover (public/og/<slug>.png).
// Keep in sync with the routes in src/App.tsx and the rewrites in vercel.json.
const CASE_PAGES = [
  { slug: "discovery-hub", copy: "case_study" },
  { slug: "consumo-ia", copy: "product_cases.ai_usage" },
  { slug: "optimizador-rutas", copy: "product_cases.routes" },
  { slug: "design-system", copy: "product_cases.design_system" },
]

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

/** Replaces the value captured between the two groups of `pattern`; fails the build if the tag is missing. */
function setTag(html: string, pattern: RegExp, value: string) {
  if (!pattern.test(html)) throw new Error(`case-meta-pages: ${pattern} not found in index.html`)
  return html.replace(pattern, (_match, start: string, end: string) => `${start}${escapeHtml(value)}${end}`)
}

const meta = (attr: "name" | "property", key: string) => new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`)

/** Writes dist/proyectos/<slug>.html: the built index.html with the case's title, description, URL and cover. */
function caseMetaPages(): Plugin {
  let outDir = "dist"
  return {
    name: "case-meta-pages",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    writeBundle() {
      const copy = JSON.parse(fs.readFileSync(path.resolve(__dirname, "src/i18n/locales/en/translation.json"), "utf8"))
      const index = fs.readFileSync(path.join(outDir, "index.html"), "utf8")
      fs.mkdirSync(path.join(outDir, "proyectos"), { recursive: true })

      for (const { slug, copy: key } of CASE_PAGES) {
        const page = key.split(".").reduce((node, part) => node?.[part], copy)
        if (!page?.title || !page?.subtitle) throw new Error(`case-meta-pages: missing title/subtitle for ${key}`)

        const title = `${page.title} — ${SITE_NAME}`
        const url = `${SITE_URL}/proyectos/${slug}`
        const image = `${SITE_URL}/og/${slug}.png`
        if (!fs.existsSync(path.join(outDir, "og", `${slug}.png`))) throw new Error(`case-meta-pages: missing public/og/${slug}.png`)

        let html = index
        html = setTag(html, /(<title>)[^<]*(<\/title>)/, title)
        html = setTag(html, meta("name", "description"), page.subtitle)
        html = setTag(html, /(<link rel="canonical" href=")[^"]*(")/, url)
        html = setTag(html, meta("property", "og:type"), "article")
        html = setTag(html, meta("property", "og:title"), title)
        html = setTag(html, meta("property", "og:description"), page.subtitle)
        html = setTag(html, meta("property", "og:url"), url)
        html = setTag(html, meta("property", "og:image"), image)
        html = setTag(html, meta("property", "og:image:alt"), page.title)
        html = setTag(html, meta("name", "twitter:title"), title)
        html = setTag(html, meta("name", "twitter:description"), page.subtitle)
        html = setTag(html, meta("name", "twitter:image"), image)

        fs.writeFileSync(path.join(outDir, "proyectos", `${slug}.html`), html)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), caseMetaPages()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
