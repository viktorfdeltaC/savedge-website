import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Pillars from './components/Pillars'
import Stats from './components/Stats'
import Athletes from './components/Athletes'
import QuoteStrip from './components/QuoteStrip'
import WhoWeWorkWith from './components/WhoWeWorkWith'
import FightWeekTeaser from './components/FightWeekTeaser'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'

gsap.registerPlugin(ScrollTrigger)

const Divider = () => <div className="section-divider" />

export default function App() {
  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy() }
  }, [])

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)' }}>
        <Hero />
        <Marquee />
        <Divider />
        <Pillars />
        <Stats />
        <Athletes />
        <Divider />
        <QuoteStrip />
        <Divider />
        <WhoWeWorkWith />
        <FightWeekTeaser />
        <Divider />
        <Contact />
      </main>
      <Divider />
      <Footer />
    </>
  )
}
