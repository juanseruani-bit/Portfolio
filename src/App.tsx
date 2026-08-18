import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { Layout } from "./components/layout"
import { Home } from "./pages/home"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
