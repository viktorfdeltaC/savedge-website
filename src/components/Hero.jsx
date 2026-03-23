import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const topbarRef = useRef(null)
  const ruleRef = useRef(null)
  const subRef = useRef(null)
  const actionsRef = useRef(null)
  const mediaRef = useRef(null)

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 55, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 55, damping: 18 })
  const imgX = useTransform(springX, [-1, 1], [14, -14])
  const imgY = useTransform(springY, [-1, 1], [8, -8])

  const handleMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = sectionRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1)
    mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.from(topbarRef.current, {
        y: -16,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
        .from('.hero__word', {
          y: '110%',
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
        }, '-=0.2')
        .from(ruleRef.current, {
          scaleX: 0,
          duration: 0.7,
          ease: 'power3.out',
          transformOrigin: 'left center',
        }, '-=0.3')
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

      // Scroll parallax on inner media div
      gsap.to(mediaRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero"
      id="about"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Editorial topbar */}
      <div ref={topbarRef} className="hero__topbar">
        <span className="hero__label">◆ Combat Sports Agency</span>
        <span className="hero__est">Vienna · Zurich · Berlin · Munich</span>
      </div>

      {/* Main body: type left, image right */}
      <div className="hero__body">
        <div className="hero__content container">
          <h1 className="hero__headline">
            <span className="hero__line"><span className="hero__word">STRUCTURE</span></span>
            <span className="hero__line"><span className="hero__word">BEHIND</span></span>
            <span className="hero__line"><span className="hero__word">THE FIGHT.</span></span>
          </h1>
          <div ref={ruleRef} className="hero__accent-rule" />
        </div>

        {/* Mouse parallax wrapper — Framer Motion handles x/y offset */}
        <motion.div
          className="hero__media-parallax"
          style={{ x: imgX, y: imgY }}
        >
          <div ref={mediaRef} className="hero__media">
            <img
              src="/savedge/website/joscha1.png"
              alt="Joscha — MMA Athlete"
              className="hero__img"
            />
            <div className="hero__img-overlay" />
          </div>
        </motion.div>
      </div>

      {/* Bottom info bar */}
      <div className="hero__footer">
        <div className="hero__footer-inner container">
          <p ref={subRef} className="hero__sub">
            Kämpfer brauchen mehr als Talent.<br />
            Wir bauen das System dahinter — Karriere, Marke und Plattform.
          </p>
          <div ref={actionsRef} className="hero__actions">
            <button
              className="btn btn--accent"
              onClick={() =>
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Wie wir arbeiten
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
      </div>
    </section>
  )
}
