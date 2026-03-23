import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PILLARS = [
  {
    number: '01',
    title: 'Athleten Management',
    text: 'Verträge, Karrierestrategie, Markenaufbau. Alles was zwischen dir und der nächsten Stufe steht.',
  },
  {
    number: '02',
    title: 'Fight Marketing',
    text: 'Dein nächster Kampf soll gesehen werden. Wir bauen die Sichtbarkeit, die er verdient.',
  },
  {
    number: '03',
    title: 'SavEdge Fight Week',
    text: 'Unser eigenes TV-Magazin. Wir gehen dahin, wo Kameras sonst nicht hinkommen — Camp, Halle, Käfig. In Produktion.',
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
