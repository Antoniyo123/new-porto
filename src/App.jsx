import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import './styles/global.css'
import PageLoader  from './components/PageLoader'
import Preloader   from './components/Preloader'
import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import About       from './components/About'
import Services    from './components/Services'
import Projects    from './components/Projects'
import Footer      from './components/Footer'
import WorkPage    from './components/WorkPage'
import AboutPage   from './components/AboutPage'
import ContactPage from './components/ContactPage'

/* ── Page content wrapper — fades in after curtain enters ── */
const SLIDE_IN = 550  // must match PageLoader.jsx SLIDE_IN value

function PageContent({ children }) {
  const location = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Hide instantly on route change
    setVisible(false)

    // Reveal only after the curtain has fully covered the screen
    const t = setTimeout(() => setVisible(true), SLIDE_IN + 20)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <div
      style={{
        opacity:    visible ? 1 : 0,
        transition: visible ? 'opacity 0.35s ease' : 'none',
      }}
    >
      {children}
    </div>
  )
}

/* ── Home layout ── */
function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Footer />
    </>
  )
}

/* ── App ── */
function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <BrowserRouter>
      <div className="App">
        <Preloader onComplete={() => setLoaded(true)} />
        <PageLoader />

        <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
          <Navbar />

          <PageContent>
            <Routes>
              <Route path="/"        element={<Home />}        />
              <Route path="/projects" element={<WorkPage />}   />
              <Route path="/about"   element={<AboutPage />}   />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </PageContent>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App