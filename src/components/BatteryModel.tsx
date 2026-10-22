import { useState, type KeyboardEvent } from 'react'
import { useI18n } from '../i18n'

type Point = { soc: number; v: number }

const POINTS: Point[] = [
  { soc: 100, v: 4.18 },
  { soc: 95, v: 3.98 },
  { soc: 90, v: 3.87 },
  { soc: 80, v: 3.8 },
  { soc: 70, v: 3.74 },
  { soc: 60, v: 3.7 },
  { soc: 50, v: 3.66 },
  { soc: 40, v: 3.63 },
  { soc: 30, v: 3.6 },
  { soc: 20, v: 3.56 },
  { soc: 10, v: 3.47 },
  { soc: 5, v: 3.25 },
  { soc: 2, v: 3.02 },
  { soc: 0, v: 2.9 },
]

const SEGMENTS = [
  { label: 'OHMIC DROP', from: 100, to: 90 },
  { label: 'PLATEAU', from: 90, to: 20 },
  { label: 'KNEE', from: 20, to: 5 },
  { label: 'CUTOFF 3.0 V', from: 5, to: 0 },
] as const

const PLOT = { x: 46, y: 22, w: 258, h: 166 }
const GRID_V = [4.2, 3.6]
const SOC_TICKS = [100, 75, 50, 25, 0]
const KEY_X = [12, 92, 170, 232]

const xAt = (soc: number) => PLOT.x + ((100 - soc) / 100) * PLOT.w
const yAt = (v: number) => PLOT.y + ((4.3 - v) / (4.3 - 2.6)) * PLOT.h

const toPath = (points: Point[]) =>
  points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${xAt(point.soc).toFixed(1)} ${yAt(point.v).toFixed(1)}`)
    .join(' ')

const segmentPath = (from: number, to: number) => {
  const start = POINTS.findIndex((point) => point.soc === from)
  const end = POINTS.findIndex((point) => point.soc === to)
  if (start < 0 || end < 0 || end < start) return ''
  return toPath(POINTS.slice(start, end + 1))
}

const FLOW_PATH = toPath(POINTS)
const SEGMENT_PATHS = SEGMENTS.map((segment) => segmentPath(segment.from, segment.to))

export function BatteryModel() {
  const { t } = useI18n()
  const [active, setActive] = useState<number | null>(null)

  const move = (step: number) => {
    setActive((current) => ((current ?? (step > 0 ? -1 : 0)) + step + SEGMENTS.length) % SEGMENTS.length)
  }

  const handleKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      move(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      move(-1)
    } else if (event.key === 'Escape') {
      setActive(null)
    }
  }

  const caption =
    active === null ? 'LI-ION DISCHARGE' : `${String(active + 1).padStart(2, '0')} / ${SEGMENTS[active].label}`

  return (
    <div className="battery">
      <svg
        className="battery__svg"
        viewBox="0 0 320 240"
        role="img"
        aria-label={t('battery_aria')}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onBlur={() => setActive(null)}
      >
        {SOC_TICKS.filter((tick) => tick !== 100).map((tick) => (
          <line key={`gx${tick}`} className="battery__grid" x1={xAt(tick)} y1={PLOT.y} x2={xAt(tick)} y2={PLOT.y + PLOT.h} />
        ))}
        {GRID_V.map((tick) => (
          <line key={`gy${tick}`} className="battery__grid" x1={PLOT.x} y1={yAt(tick)} x2={PLOT.x + PLOT.w} y2={yAt(tick)} />
        ))}

        <line className="battery__cutoff" x1={PLOT.x} y1={yAt(3.0)} x2={PLOT.x + PLOT.w} y2={yAt(3.0)} />

        <line className="battery__axis" x1={PLOT.x} y1={PLOT.y} x2={PLOT.x} y2={PLOT.y + PLOT.h} />
        <line className="battery__axis" x1={PLOT.x} y1={PLOT.y + PLOT.h} x2={PLOT.x + PLOT.w} y2={PLOT.y + PLOT.h} />

        <text className="battery__tick" x={PLOT.x - 7} y={yAt(4.2) + 2.5} textAnchor="end">4.2</text>
        <text className="battery__tick" x={PLOT.x - 7} y={yAt(3.6) + 2.5} textAnchor="end">3.6</text>
        <text className="battery__tick" x={PLOT.x - 7} y={yAt(3.0) + 2.5} textAnchor="end">3.0</text>
        {SOC_TICKS.map((tick) => (
          <text key={`sx${tick}`} className="battery__tick" x={xAt(tick)} y={PLOT.y + PLOT.h + 10} textAnchor="middle">
            {tick}
          </text>
        ))}
        <text className="battery__unit" x={10} y={PLOT.y - 6} textAnchor="start">V</text>

        <path className="battery__flow" d={FLOW_PATH} />
        {SEGMENTS.map((segment, index) => (
          <g key={segment.label}>
            <path className={`battery__seg${active === index ? ' is-active' : ''}`} d={SEGMENT_PATHS[index]} />
            <path
              className="battery__hit"
              d={SEGMENT_PATHS[index]}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive((current) => (current === index ? null : current))}
              onClick={() => setActive((current) => (current === index ? null : index))}
            />
          </g>
        ))}

        <text className="battery__caption" x={PLOT.x + PLOT.w} y={14} textAnchor="end">{caption}</text>

        {SEGMENTS.map((segment, index) => (
          <text
            key={segment.label}
            className={`battery__key${active === index ? ' is-active' : ''}`}
            x={KEY_X[index]}
            y={232}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive((current) => (current === index ? null : current))}
            onClick={() => setActive((current) => (current === index ? null : index))}
          >
            {`${String(index + 1).padStart(2, '0')} ${segment.label}`}
          </text>
        ))}
      </svg>
    </div>
  )
}
