const ITEMS = [
  'Athleten Management',
  'Fight Marketing',
  'SavEdge Fight Week',
  'DACH Region',
  'Vienna · Zurich · Berlin · Munich',
  'Kampfsport',
]

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="marquee__item">
            {item}<span className="marquee__sep"> ✕ </span>
          </span>
        ))}
      </div>
    </div>
  )
}
