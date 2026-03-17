import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const subRef = useRef(null)
  const actionsRef = useRef(null)
  const mediaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })

      tl.from(labelRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
        .from('.hero__word', {
          y: '110%',
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
        }, '-=0.15')
        .from(subRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        }, '-=0.4')
        .from(actionsRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.5')
        .from(mediaRef.current, {
          x: 60,
          opacity: 0,
          duration: 1.3,
          ease: 'power3.out',
        }, 0.3)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hero" id="about">
      {/* Left: Content */}
      <div className="hero__content">
        <p ref={labelRef} className="hero__label">Combat Sports Agency</p>
        <h1 className="hero__headline">
          <span className="hero__line"><span className="hero__word">STRUCTURE</span></span>
          <span className="hero__line"><span className="hero__word">BEHIND</span></span>
          <span className="hero__line"><span className="hero__word">THE FIGHT.</span></span>
        </h1>
        <p ref={subRef} className="hero__sub">
          Wir entwickeln Karrieren, Marken und Formate im Kampfsport.
          Vom lokalen Gym bis zur großen Bühne.
        </p>
        <div ref={actionsRef} className="hero__actions">
          <button
            className="btn btn--accent"
            onClick={() =>
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Unsere Leistungen
          </button>
          <button
            className="btn btn--text"
            onClick={() =>
              document.getElementById('athletes')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Die Athleten →
          </button>
        </div>
      </div>

      {/* Right: Athlete photo */}
      <div ref={mediaRef} className="hero__media">
        <img
          src="/savedge/website/joscha1.png"
          alt="Joscha — MMA Athlete"
          className="hero__img"
        />
        <div className="hero__img-overlay" />
      </div>
    </section>
  )
}
