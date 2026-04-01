export function GlowingShadow({ children, className = '' }) {
  return (
    <div className={`glow-container ${className}`.trim()}>
      <span className="glow" />
      <div className="glow-content">{children}</div>
    </div>
  )
}
