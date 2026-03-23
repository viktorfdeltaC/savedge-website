import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Über uns', id: 'about' },
  { label: 'Athleten', id: 'athletes' },
  { label: 'Leistungen', id: 'services' },
  { label: 'Fight Week', id: 'fight-week' },
]


function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer__top, .footer__divider, .footer__bottom', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="footer" id="contact">
      <div className="container">
        <div className="footer__top">
          {/* Brand / Logo */}
          <div>
            <div className="footer__logo">
              <img
                src="/savedge/website/sav-logo.png"
                alt="SavEdge Entertainment"
                className="footer__logo-img"
              />
            </div>
            <p className="footer__tagline">Struktur für Kämpfer. DACH-weit.</p>
          </div>

          {/* Nav + Social */}
          <div className="footer__right">
            <nav className="footer__nav">
              {NAV_LINKS.map(({ label, id }) => (
                <button
                  key={id}
                  className="footer__link"
                  onClick={() => scrollTo(id)}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} SavEdge Entertainment. Alle Rechte vorbehalten.
          </p>
          <p className="footer__location">Vienna · Zurich · Berlin</p>
        </div>
      </div>
    </footer>
  )
}
