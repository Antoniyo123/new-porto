import { useState } from 'react'
import './App.css'
import './styles/global.css'
import Preloader from './components/Preloader'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import About     from './components/About'
import Services  from './components/Services'
import Projects  from './components/Projects'
import Footer    from './components/Footer'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="App">
      <Preloader onComplete={() => setLoaded(true)} />

      {/* ✅ Selalu render, bukan conditional */}
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Footer />
      </div>
    </div>
  )
}

export default App