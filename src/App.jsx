import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

gsap.registerPlugin(ScrollTrigger)

const Divider = () => <div className="section-divider" />

export default function App() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)' }}>
        <Hero />
        <Marquee />
        <Divider />
        <Pillars />
        <Divider />
        <Stats />
        <Divider />
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
