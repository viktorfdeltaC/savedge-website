import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'Über uns', id: 'about' },
  { label: 'Athleten', id: 'athletes' },
  { label: 'Leistungen', id: 'services' },
  { label: 'Fight Week', id: 'fight-week' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const navRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    let isScrolled = false

    const onScroll = () => {
      const scrolled = window.scrollY > 50
      if (scrolled === isScrolled) return
      isScrolled = scrolled
      gsap.to(nav, {
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.94)' : 'rgba(10, 10, 10, 0)',
        backdropFilter: scrolled ? 'blur(14px)' : 'blur(0px)',
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav ref={navRef} className="nav" style={{ backgroundColor: 'rgba(10,10,10,0)' }}>
      <div className="nav__inner container">
        {/* Logo */}
        <div className="nav__logo">
          <img
            src="/savedge/website/sav-logo.png"
            alt="SavEdge Entertainment"
            className="nav__logo-img"
          />
        </div>

        {/* Nav links */}
        <ul className="nav__links">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <button className="nav__link" onClick={() => scrollTo(id)}>
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className="btn btn--accent nav__cta"
          onClick={() => scrollTo('contact')}
        >
          Kontakt
        </button>
      </div>
    </nav>
  )
}
