import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function FightWeekTeaser() {
  const sectionRef = useRef(null)
  const ruleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fight-week__top', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      })

      gsap.from(ruleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        scaleX: 0,
        duration: 1.0,
        delay: 0.35,
        ease: 'power3.out',
        transformOrigin: 'left center',
      })

      gsap.from('.fight-week__bottom', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 24,
        opacity: 0,
        duration: 0.9,
        delay: 0.55,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="fight-week" id="fight-week">
      <div className="container">
        <div className="fight-week__inner">
          <div className="fight-week__top">
            <span className="fight-week__label">Bald. DACH-weit.</span>
            <h2 className="fight-week__headline">
              SAVEDGE<br />
              <span className="fight-week__headline-accent">FIGHT WEEK</span>
            </h2>
          </div>

          <div ref={ruleRef} className="fight-week__rule" />

          <div className="fight-week__bottom">
            <span className="fight-week__index">03 / Eigene Produktion</span>
            <p className="fight-week__sub">
              Das TV-Magazin, das dahin geht wo Kameras sonst nicht hinkommen.
              Kampfsport von innen — aus dem Camp, der Halle, dem Käfig.
            </p>
            <div className="fight-week__status">
              <span className="fight-week__status-dot" />
              <span className="fight-week__status-text">In Produktion</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
