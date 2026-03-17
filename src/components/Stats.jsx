const STATS = [
  { value: '3', label: 'Kampfsportarten' },
  { value: 'DACH', label: 'Unsere Region' },
  { value: '2024', label: 'Gegründet' },
]

export default function Stats() {
  return (
    <section className="stats">
      <div className="stats__grid container">
        {STATS.map((s) => (
          <div key={s.value} className="stat">
            <span className="stat__value">{s.value}</span>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
