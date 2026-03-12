import { useState, useEffect } from 'react'

function formatPrice(price) {
  return price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatChange(chp) {
  const sign = chp >= 0 ? '+' : ''
  return `${sign}${chp.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%`
}

export default function PriceTicker() {
  const [gold, setGold] = useState(null)
  const [silver, setSilver] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [goldRes, silverRes] = await Promise.all([
          fetch('/api/metals?metal=XAU'),
          fetch('/api/metals?metal=XAG'),
        ])
        if (!goldRes.ok || !silverRes.ok) throw new Error('API error')
        const [goldData, silverData] = await Promise.all([goldRes.json(), silverRes.json()])
        setGold(goldData)
        setSilver(silverData)
      } catch {
        setError(true)
      }
    }
    fetchPrices()
  }, [])

  return (
    <div className="fixed z-40 left-0 right-0 top-14 md:top-16 bg-[#111111] border-b border-[#C9A84C] h-8 flex items-center justify-center">
      {error ? (
        <span className="text-xs text-gray-500 tracking-wide">Kurse momentan nicht verfügbar</span>
      ) : !gold || !silver ? (
        <span className="text-xs text-gray-600 tracking-wide animate-pulse">Kurse werden geladen …</span>
      ) : (
        <div className="flex items-center gap-6 sm:gap-10 text-xs">
          <PriceItem emoji="🥇" label="Gold" price={gold.price} chp={gold.chp} />
          <span className="w-px h-3 bg-[#C9A84C]/20" />
          <PriceItem emoji="🥈" label="Silber" price={silver.price} chp={silver.chp} />
        </div>
      )}
    </div>
  )
}

function PriceItem({ emoji, label, price, chp }) {
  const positive = chp >= 0
  return (
    <span className="flex items-center gap-1.5">
      <span>{emoji}</span>
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{formatPrice(price)} €/oz</span>
      <span className={positive ? 'text-green-400' : 'text-red-400'}>
        {positive ? '▲' : '▼'} {formatChange(Math.abs(chp))}
      </span>
    </span>
  )
}
