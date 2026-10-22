import { useState, type KeyboardEvent } from 'react'
import { useI18n } from '../i18n'

const CX = 160
const CY = 162
const SEAT_RADIUS = 6.5
const ROW_SEATS = [5, 8, 11, 15, 18]
const SEAT_TOTAL = ROW_SEATS.reduce((total, count) => total + count, 0)

type SeatPosition = { x: number; y: number }

const SEATS: SeatPosition[] = ROW_SEATS.flatMap((count, rowIndex) => {
  const radius = 42 + rowIndex * 26
  return Array.from({ length: count }, (_, seatIndex) => {
    const angle = 180 - ((seatIndex + 0.5) * 180) / count
    return {
      x: CX + radius * Math.cos((angle * Math.PI) / 180),
      y: CY - radius * Math.sin((angle * Math.PI) / 180),
    }
  })
})

export function ParliamentSeats() {
  const { t } = useI18n()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const move = (step: number) => {
    setActiveIndex((current) => {
      const base = current === null ? (step > 0 ? -1 : 0) : current
      return (base + step + SEAT_TOTAL) % SEAT_TOTAL
    })
  }

  const handleKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      move(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      move(-1)
    } else if (event.key === 'Escape') {
      setActiveIndex(null)
    }
  }

  return (
    <div className="parliament">
      <svg
        className="parliament__svg"
        viewBox="0 0 320 200"
        role="img"
        aria-label={t('parl_aria')}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onBlur={() => setActiveIndex(null)}
      >
        <image
          href="/img/upc-logo.svg"
          x={143}
          y={160}
          width={34}
          height={34}
          className="parliament__logo"
          aria-hidden="true"
          pointerEvents="none"
        />
        {SEATS.map((seat, index) => (
          <circle
            key={index}
            cx={seat.x}
            cy={seat.y}
            r={SEAT_RADIUS}
            className={`parliament__seat${activeIndex === index ? ' is-active' : ''}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() =>
              setActiveIndex((current) => (current === index ? null : current))
            }
            onClick={() => setActiveIndex((current) => (current === index ? null : index))}
          />
        ))}
      </svg>
    </div>
  )
}
