import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { useI18n } from '../i18n'

// viewBox is 320x220; the card follows the ISO ID-1 ratio (85.6 x 53.98 mm).
const LENS = { x: 293, y: 22 }
const DIE = { x: 143, y: 115, w: 34, h: 34 }
const CENTER = { x: DIE.x + DIE.w / 2, y: DIE.y + DIE.h / 2 }
const PAD = 4

const MIN = { x: DIE.x + PAD, y: DIE.y + PAD }
const MAX = { x: DIE.x + DIE.w - PAD, y: DIE.y + DIE.h - PAD }

const clampAim = (x: number, y: number) => ({
  x: Math.min(MAX.x, Math.max(MIN.x, x)),
  y: Math.min(MAX.y, Math.max(MIN.y, y)),
})

export function SmartCardLaser() {
  const { t } = useI18n()
  const svgRef = useRef<SVGSVGElement>(null)
  const [aim, setAim] = useState(CENTER)

  const svgCoords = (event: PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0 || rect.height === 0) return CENTER
    const x = ((event.clientX - rect.left) / rect.width) * 320
    const y = ((event.clientY - rect.top) / rect.height) * 220
    return clampAim(x, y)
  }

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (event.pointerType === 'mouse' && event.buttons === 0) {
      setAim(svgCoords(event))
      return
    }
    if (event.buttons > 0) setAim(svgCoords(event))
  }

  const handlePointerDown = (event: PointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture?.(event.pointerId)
    setAim(svgCoords(event))
  }

  const handleKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    const step = 3
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setAim((a) => clampAim(a.x - step, a.y))
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      setAim((a) => clampAim(a.x + step, a.y))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setAim((a) => clampAim(a.x, a.y - step))
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setAim((a) => clampAim(a.x, a.y + step))
    } else if (event.key === 'Escape') {
      setAim(CENTER)
    }
  }

  return (
    <div className="cardlaser">
      <svg
        ref={svgRef}
        className="cardlaser__svg"
        viewBox="0 0 320 220"
        role="img"
        aria-label={t('card7_aria')}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onKeyDown={handleKeyDown}
        onBlur={() => setAim(CENTER)}
      >
        {/* card body */}
        <rect className="cardlaser__card" x={30} y={50} width={260} height={164} rx={14} />
        <rect className="cardlaser__inner" x={38} y={58} width={244} height={148} rx={10} />

        {/* chip module (epoxy exposed) */}
        <rect className="cardlaser__module" x={126} y={101} width={68} height={62} rx={6} />

        {/* bond wires from the die to the module */}
        <line className="cardlaser__wire" x1={DIE.x} y1={DIE.y} x2={136} y2={110} />
        <line className="cardlaser__wire" x1={DIE.x + DIE.w} y1={DIE.y} x2={184} y2={110} />
        <line className="cardlaser__wire" x1={DIE.x} y1={DIE.y + DIE.h} x2={136} y2={154} />
        <line className="cardlaser__wire" x1={DIE.x + DIE.w} y1={DIE.y + DIE.h} x2={184} y2={154} />

        {/* the IC die */}
        <rect className="cardlaser__die" x={DIE.x} y={DIE.y} width={DIE.w} height={DIE.h} />
        <line className="cardlaser__die-grid" x1={DIE.x + DIE.w / 2} y1={DIE.y} x2={DIE.x + DIE.w / 2} y2={DIE.y + DIE.h} />
        <line className="cardlaser__die-grid" x1={DIE.x} y1={DIE.y + DIE.h / 2} x2={DIE.x + DIE.w} y2={DIE.y + DIE.h / 2} />

        {/* laser lens + beam */}
        <circle className="cardlaser__lens" cx={LENS.x} cy={LENS.y} r={8} />
        <circle className="cardlaser__lens-core" cx={LENS.x} cy={LENS.y} r={3} />
        <line className="cardlaser__beam" x1={LENS.x} y1={LENS.y} x2={aim.x} y2={aim.y} />

        {/* impact point */}
        <circle className="cardlaser__flash" cx={aim.x} cy={aim.y} r={11} />
        <circle className="cardlaser__dot" cx={aim.x} cy={aim.y} r={3} />
      </svg>
    </div>
  )
}
