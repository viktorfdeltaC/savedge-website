import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const [menuOpen, setMenuOpen] = useState(false)

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

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleNavLink(id) {
    setMenuOpen(false)
    setTimeout(() => scrollTo(id), 300)
  }

  return (
    <>
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

        {/* Nav links (desktop) */}
        <ul className="nav__links">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <button className="nav__link" onClick={() => scrollTo(id)}>
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA (desktop) */}
        <button
          className="btn btn--accent nav__cta"
          onClick={() => scrollTo('contact')}
        >
          Kontakt
        </button>

        {/* Hamburger (mobile) */}
        <button
          className={`nav__hamburger${menuOpen ? ' nav__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu öffnen"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

    </nav>

    {/* Mobile Menu Overlay — rendered via portal at body level to escape nav stacking context */}
    {createPortal(
      <div className={`nav__mobile-menu${menuOpen ? ' nav__mobile-menu--open' : ''}`}>
        <ul className="nav__mobile-links">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <button className="nav__mobile-link" onClick={() => handleNavLink(id)}>
                {label}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="btn btn--accent nav__mobile-cta"
          onClick={() => handleNavLink('contact')}
        >
          Kontakt
        </button>
      </div>,
      document.body
    )}
    </>
  )
}
