import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PILLARS = [
  {
    number: '01',
    title: 'Athleten Management',
    text: 'Karrierestrategie, Vertragsverhandlungen und Markenaufbau für Kämpfer, die liefern.',
  },
  {
    number: '02',
    title: 'Fight Marketing',
    text: 'Kampagnenstrategie, Eventpromotion und Reichweitenaufbau im DACH-Raum.',
  },
  {
    number: '03',
    title: 'SavEdge Fight Week',
    text: 'TV-Magazinformat. Echte Kämpfer. Echte Geschichten. Jetzt im Aufbau.',
  },
]

export default function Pillars() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pillar', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="pillars" id="services">
      <div className="pillars__header container">
        <span className="section-label">Leistungen</span>
      </div>
      <div className="pillars__list container">
        {PILLARS.map((p) => (
          <div key={p.number} className="pillar">
            <span className="pillar__number">{p.number}</span>
            <h3 className="pillar__title">{p.title}</h3>
            <p className="pillar__text">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
