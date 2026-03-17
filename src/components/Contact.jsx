import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const LINKS = [
  { label: 'Email', value: 'info@savedge.com', href: 'mailto:info@savedge.com' },
  { label: 'Instagram', value: '@savedge_entertainment', href: '#' },
  { label: 'WhatsApp', value: 'Direkt schreiben →', href: '#' },
]

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact__left', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        x: -30,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      })

      gsap.from('.contact__link-item', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.25,
        ease: 'power2.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__left">
            <h2 className="contact__headline">
              LASS UNS<br /><span className="contact__headline-accent">REDEN.</span>
            </h2>
            <p className="contact__sub">
              Wir sind offen für Athleten, Marken und Medienpartnerschaften.
            </p>
          </div>

          <div className="contact__right">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} className="contact__link-item">
                <span className="contact__link-label">{l.label}</span>
                <span className="contact__link-value">{l.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
