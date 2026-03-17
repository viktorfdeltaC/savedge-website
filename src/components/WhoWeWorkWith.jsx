import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PARTNERS = [
  {
    number: '01',
    title: 'Marken & Sponsoren',
    text: 'Erreicht eine loyale, unterversorgte Zielgruppe durch authentische Athleten-Partnerschaften und Medienplatzierungen.',
  },
  {
    number: '02',
    title: 'Athleten & Coaches',
    text: 'Wir bauen das System um deine Leistung. Management, Sichtbarkeit und eine Plattform die du verdienst.',
  },
  {
    number: '03',
    title: 'Medien & TV-Partner',
    text: 'Originale Formate, Fight-Content und distributionsfertige Produktionen für den DACH-Markt.',
  },
]

export default function WhoWeWorkWith() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.who-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="who">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Partner</span>
          <h2 className="section-title">Mit wem wir arbeiten</h2>
        </div>

        <div className="who__grid">
          {PARTNERS.map((p) => (
            <div key={p.number} className="who-card">
              <span className="who-card__number">{p.number}</span>
              <h3 className="who-card__title">{p.title}</h3>
              <p className="who-card__text">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
