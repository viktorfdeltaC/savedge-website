import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function FightWeekTeaser() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fight-week__left', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
        x: -30,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      })

      gsap.from('.fight-week__right', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
        x: 30,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="fight-week" id="fight-week">
      <div className="container">
        <div className="fight-week__grid">
          <div className="fight-week__left">
            <span className="fight-week__label">Coming to DACH</span>
            <h2 className="fight-week__headline">
              SAVEDGE<br />FIGHT WEEK
            </h2>
          </div>
          <div className="fight-week__right">
            <div className="fight-week__accent-bar" />
            <div className="fight-week__right-content">
              <p className="fight-week__sub">
                Das Kampfsport-TV-Magazin. Echte Kämpfer. Echte Geschichten. Echter Impact.
              </p>
              <button
                className="btn btn--outline"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Mehr erfahren
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
