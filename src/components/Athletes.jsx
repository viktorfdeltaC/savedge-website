import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ATHLETES = [
  {
    name: 'Joscha Plum',
    discipline: 'MMA / BJJ',
    bio: 'Kämpfer mit Substanz. Präsenz die man spürt.',
    stats: [
      { label: 'Gewichtsklasse', value: 'Welterweight' },
      { label: 'Status', value: 'Aktiv' },
    ],
    img: '/savedge/website/joscha2.png',
  },
  {
    name: 'Philipp Spak',
    discipline: 'Kickboxing K1 / MMA',
    bio: 'Titelträger. Technisch. Unbeirrbar.',
    stats: [
      { label: 'Gewichtsklasse', value: 'Mittelgewicht' },
      { label: 'Status', value: 'Champion / Aktiv' },
    ],
    img: '/savedge/website/phil1.png',
  },
  {
    name: 'Timur Tsiupka',
    discipline: 'MMA / Nachwuchstalent',
    bio: 'Hungriger Kämpfer. Zukunft im Entstehen.',
    stats: [
      { label: 'Gewichtsklasse', value: 'Welterweight' },
      { label: 'Status', value: 'Aktiv' },
    ],
    img: '/savedge/website/Timur1.png',
  },
  {
    name: 'David Hahmann',
    discipline: 'MMA & Combat Coach',
    bio: 'Seine Athleten stehen bei BKFC und K.O.T.S. Wer bei ihm trainiert, ist bereit.',
    stats: [
      { label: 'Rolle', value: 'Coach' },
      { label: 'Status', value: 'Aktiv' },
    ],
    img: '/savedge/website/David1.png',
  },
]

export default function Athletes() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current = trackRef.current.scrollLeft
    trackRef.current.style.cursor = 'grabbing'
    trackRef.current.style.userSelect = 'none'
  }

  const onMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }

  const stopDrag = () => {
    isDragging.current = false
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab'
      trackRef.current.style.userSelect = ''
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.athletes__header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      })
      gsap.from('.athletes__track', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 30,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="athletes" id="athletes">
      <div className="container">
        <div className="athletes__header">
          <span className="athletes__label">Unsere Athleten</span>
          <span className="athletes__hint">← wischen →</span>
        </div>
      </div>

      <div
        ref={trackRef}
        className="athletes__track"
        data-lenis-prevent
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {ATHLETES.map((a) => (
          <div key={a.name} className="athlete-card">
            <img src={a.img} alt={a.name} className="athlete-card__img" />

            <div className="athlete-card__strip">
              <span className="athlete-card__strip-name">{a.name}</span>
              <span className="athlete-card__strip-discipline">{a.discipline}</span>
            </div>

            <div className="athlete-card__panel">
              <span className="athlete-card__panel-name">{a.name}</span>
              <span className="athlete-card__panel-discipline">{a.discipline}</span>
              <div className="athlete-card__panel-line" />
              <p className="athlete-card__panel-bio">{a.bio}</p>
              <div className="athlete-card__panel-stats">
                {a.stats.map((s) => (
                  <div key={s.label} className="athlete-card__stat">
                    <span className="athlete-card__stat-label">{s.label}</span>
                    <span className="athlete-card__stat-value">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
