import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.1 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.1 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      const el = document.elementFromPoint(e.clientX, e.clientY)
      setHovered(!!el?.closest('a, button'))
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: '#9AE040',
          opacity: 0.9,
          willChange: 'transform',
        }}
      />
      {/* Ring — follows with spring lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: '1px solid #9AE040',
          opacity: 0.4,
          willChange: 'transform',
        }}
        animate={{ scale: hovered ? 1.5 : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  )
}
