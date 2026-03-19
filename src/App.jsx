import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './styles/global.css'
import Preloader from './components/Preloader'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import About     from './components/About'
import Services  from './components/Services'
import Projects  from './components/Projects'
import Footer    from './components/Footer'
import WorkPage  from './components/WorkPage'
import AboutPage from './components/AboutPage'

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

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <BrowserRouter>
      <div className="App">
        <Preloader onComplete={() => setLoaded(true)} />

        {/* Navbar di luar Routes → muncul di semua halaman */}
        <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
          <Navbar />

          <Routes>
            <Route path="/"     element={<Home />} />
            <Route path="/projects" element={<WorkPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App