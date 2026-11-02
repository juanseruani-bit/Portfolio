import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { Layout } from "./components/layout"
import { Home } from "./pages/home"
import { CaseStudyPage } from "./pages/case-study"
import { B2BCaseStudyPage } from "./pages/b2b-case-study"
import { ProductCaseStudyPage } from "./pages/product-case-study"
import { MotionConfig } from "framer-motion"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <MotionConfig reducedMotion="user">
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/proyectos/discovery-hub" element={<CaseStudyPage />} />
              <Route path="/proyectos/consumo-ia" element={<ProductCaseStudyPage key="ai_usage" caseKey="ai_usage" />} />
              <Route path="/proyectos/optimizador-rutas" element={<ProductCaseStudyPage key="routes" caseKey="routes" />} />
              <Route path="/proyectos/b2b-app-buyers" element={<B2BCaseStudyPage />} />
            </Routes>
          </Layout>
        </Router>
      </MotionConfig>
    </ThemeProvider>
  )
}

export default App
