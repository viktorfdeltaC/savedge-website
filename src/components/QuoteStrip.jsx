import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function QuoteStrip() {
  const sectionRef = useRef(null)
  const quoteRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(quoteRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          duration: 1.2,
          ease: 'power3.out',
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="quote-strip">
      <div className="container">
        <div ref={quoteRef} className="quote-strip__inner">
          <p className="quote-strip__text">
            Wir bringen Struktur<br />
            in deine Ambition.
          </p>
        </div>
      </div>
    </section>
  )
}
