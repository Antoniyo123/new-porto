import { useState } from 'react'
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

      {loaded && (
        <>
          <Navbar />
          <Hero />
          <About />
          <Services />
          <Projects />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App