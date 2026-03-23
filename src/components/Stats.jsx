import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function scrambleText(element, finalText, duration = 0.85) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.textContent = finalText
    return
  }
  const totalFrames = Math.round(duration * 60)
  let frame = 0
  const tick = () => {
    const revealedCount = Math.floor((frame / totalFrames) * finalText.length)
    element.textContent = finalText
      .split('')
      .map((char, i) => {
        if (i < revealedCount) return char
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      .join('')
    frame++
    if (frame <= totalFrames) {
      requestAnimationFrame(tick)
    } else {
      element.textContent = finalText
    }
  }
  requestAnimationFrame(tick)
}

const STATS = [
  { value: 'MANAGEMENT', label: 'Karriere & Verträge' },
  { value: 'MARKETING', label: 'Events & Reichweite' },
  { value: 'MEDIA', label: 'SavEdge Fight Week' },
]

export default function Stats() {
  const sectionRef = useRef(null)
  const valueRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          STATS.forEach((s, i) => {
            const el = valueRefs.current[i]
            if (!el) return
            setTimeout(() => scrambleText(el, s.value), i * 160)
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="stats">
      <div className="stats__grid container">
        {STATS.map((s, i) => (
          <div key={s.value} className="stat">
            <span
              className="stat__value"
              ref={(el) => (valueRefs.current[i] = el)}
            >
              {s.value}
            </span>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
