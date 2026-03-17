import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function QuoteStrip() {
  const sectionRef = useRef(null)
  const quoteRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(quoteRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
        x: -30,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="quote-strip">
      <div className="container">
        <div ref={quoteRef} className="quote-strip__inner">
          <div className="quote-strip__line" />
          <p className="quote-strip__text">
            Wir bringen <span className="quote-accent">Struktur</span> in deine Ambition.<br />
            Ohne den <span className="quote-accent">Kern</span> zu verändern.
          </p>
        </div>
      </div>
    </section>
  )
}
