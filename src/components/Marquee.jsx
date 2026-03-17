const ITEMS = [
  'Athlete Management',
  'Fight Marketing',
  'Savedge Fight Week',
  'DACH Region',
  'Real Fighters',
  'Real Stories',
]

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="marquee__item">
            {item}<span className="marquee__sep"> · </span>
          </span>
        ))}
      </div>
    </div>
  )
}
