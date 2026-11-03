import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { Layout } from "./components/layout"
import { Home } from "./pages/home"
import { LazyMotion, MotionConfig } from "framer-motion"

// Case studies load on demand so the home page doesn't download them.
const CaseStudyPage = lazy(() => import("./pages/case-study").then((mod) => ({ default: mod.CaseStudyPage })))
const ProductCaseStudyPage = lazy(() => import("./pages/product-case-study").then((mod) => ({ default: mod.ProductCaseStudyPage })))
const loadMotionFeatures = () => import("./lib/motion-features").then((mod) => mod.default)

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          <Router>
            <Layout>
              <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/proyectos/discovery-hub" element={<CaseStudyPage />} />
                  <Route path="/proyectos/consumo-ia" element={<ProductCaseStudyPage key="ai_usage" caseKey="ai_usage" />} />
                  <Route path="/proyectos/optimizador-rutas" element={<ProductCaseStudyPage key="routes" caseKey="routes" />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </Layout>
          </Router>
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  )
}

export default App
