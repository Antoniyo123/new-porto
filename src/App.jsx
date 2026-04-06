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

const SLIDE_IN = 550
const STAGGER  = 120
const BASE     = 80

/* ── RevealItem — fade + slide-up with delay ── */
function RevealItem({ children, delay = 0, loaded }) {
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (!loaded) return
    const t = setTimeout(() => setTriggered(true), delay)
    return () => clearTimeout(t)
  }, [loaded, delay])

  return (
    <div
      style={{
        opacity:    triggered ? 1 : 0,
        transform:  triggered ? 'translateY(0px)' : 'translateY(32px)',
        transition: triggered
          ? 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)'
          : 'none',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

/* ── Page content wrapper — fades in after curtain enters ── */
function PageContent({ children }) {
  const location = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
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
function Home({ loaded }) {
  return (
    <>
      <RevealItem loaded={loaded} delay={BASE + STAGGER * 0}><Hero /></RevealItem>
      <RevealItem loaded={loaded} delay={BASE + STAGGER * 1}><About /></RevealItem>
      <RevealItem loaded={loaded} delay={BASE + STAGGER * 2}><Services /></RevealItem>
      <RevealItem loaded={loaded} delay={BASE + STAGGER * 3}><Projects /></RevealItem>
      <RevealItem loaded={loaded} delay={BASE + STAGGER * 4}><Footer /></RevealItem>
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

        {/* ⚠️ Navbar TIDAK dibungkus RevealItem — fixed/sticky element
            tidak boleh punya parent dengan opacity transform karena
            akan membuat stacking context baru & merusak positioning.
            Cukup pakai visibility dari loaded state. */}
        <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
          <Navbar />
        </div>

        <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
          <PageContent>
            <Routes>
              <Route path="/"         element={<Home loaded={loaded} />} />
              <Route path="/projects" element={<WorkPage />}             />
              <Route path="/about"    element={<AboutPage />}            />
              <Route path="/contact"  element={<ContactPage />}          />
            </Routes>
          </PageContent>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App