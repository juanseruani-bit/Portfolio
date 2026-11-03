import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { Layout } from "./components/layout"
import { Home } from "./pages/home"
import { CaseStudyPage } from "./pages/case-study"
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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      </MotionConfig>
    </ThemeProvider>
  )
}

export default App
