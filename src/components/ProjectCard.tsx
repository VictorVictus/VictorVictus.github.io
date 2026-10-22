import { useRef, useState, type PointerEvent, type CSSProperties } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PdfThumb } from './PdfThumb'
import { BatteryModel } from './BatteryModel'
import { MqttLog } from './MqttLog'
import { SmartCardLaser } from './SmartCardLaser'
import { useI18n } from '../i18n'
import type { Project, ProjectImage } from '../data/projects'
import { ParliamentSeats } from './ParliamentSeats'

type ProjectCardProps = {
  project: Project
  index: number
  onOpenImage: (images: Project['images'], index: number) => void
}

type SwipeDeckProps = {
  images: ProjectImage[]
  number: string
  style: Project['carouselStyle']
  onOpenImage: (images: ProjectImage[], index: number) => void
}

const SWIPE_THRESHOLD = 0.22

function SwipeDeck({ images, number, style, onOpenImage }: SwipeDeckProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<{ id: number; x: number; y: number } | null>(null)
  const movedRef = useRef(false)
  const entryToken = useRef(0)
  const [order, setOrder] = useState<number[]>(() => images.map((_, index) => index))
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null)
  const [exit, setExit] = useState<{ x: number; y: number } | null>(null)
  const [snapped, setSnapped] = useState(false)
  const [entry, setEntry] = useState<number | null>(null)
  const [ratio, setRatio] = useState<number>()
  const topIndex = order[0]

  const swipeAway = (dirX: number, dirY: number) => {
    if (exit) return
    const width = stageRef.current?.offsetWidth ?? 240
    setDrag(null)
    setSnapped(false)
    setExit({ x: dirX * width * 1.8, y: dirY * width * 1.8 })
  }

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (exit) return
    dragStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
    movedRef.current = false
    setSnapped(false)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const origin = dragStart.current
    if (!origin || event.pointerId !== origin.id) return
    const dx = event.clientX - origin.x
    const dy = event.clientY - origin.y
    if (!movedRef.current && Math.hypot(dx, dy) > 6) movedRef.current = true
    setDrag({ x: dx, y: dy })
  }

  const handlePointerEnd = () => {
    dragStart.current = null
    const offset = drag
    const width = stageRef.current?.offsetWidth ?? 240
    if (offset && Math.hypot(offset.x, offset.y) > width * SWIPE_THRESHOLD) {
      setDrag(null)
      setSnapped(false)
      setExit({ x: offset.x * 2, y: offset.y * 2 })
    } else {
      setDrag(null)
      setSnapped(true)
    }
  }

  const handleCycle = () => {
    const leaving = topIndex
    setOrder((current) => [...current.slice(1), current[0]])
    setExit(null)
    setDrag(null)
    const token = ++entryToken.current
    setEntry(leaving)
    window.setTimeout(() => {
      if (entryToken.current === token) setEntry(null)
    }, 420)
  }

  let topStyle: CSSProperties = {}
  if (snapped) {
    topStyle = { transform: 'translate(0, 0)', transition: 'none' }
  } else if (drag) {
    const tilt = Math.max(-18, Math.min(18, drag.x / 8))
    topStyle = { transform: `translate(${drag.x}px, ${drag.y}px) rotate(${tilt}deg)`, transition: 'none' }
  } else if (exit) {
    const tilt = exit.x >= 0 ? 14 : -14
    topStyle = {
      transform: `translate(${exit.x}px, ${exit.y}px) rotate(${tilt}deg)`,
      opacity: 0,
      transition: 'transform 320ms ease, opacity 320ms ease',
    }
  }

  return (
    <div className={`card-carousel${style === 'strip' ? ' card-carousel--strip' : ' card-carousel--fill'}`}>
      <div className="swipe-deck__stage" ref={stageRef} style={ratio ? { aspectRatio: String(ratio) } : undefined}>
        {order.map((imageIndex, position) => {
          const isTop = position === 0
          const depth = Math.min(position, 4)
          const image = images[imageIndex]
          const classNames = ['swipe-deck__card']
          if (isTop) {
            classNames.push('swipe-deck__card--top')
          } else {
            classNames.push('swipe-deck__card--back', depth === 4 ? 'swipe-deck__card--deep' : `swipe-deck__card--back-${depth}`)
            if (imageIndex === entry) classNames.push('swipe-deck__card--entering')
          }
          return (
            <button
              key={imageIndex}
              type="button"
              className={classNames.join(' ')}
              style={isTop ? topStyle : undefined}
              onPointerDown={isTop ? handlePointerDown : undefined}
              onPointerMove={isTop ? handlePointerMove : undefined}
              onPointerUp={isTop ? handlePointerEnd : undefined}
              onPointerCancel={isTop ? handlePointerEnd : undefined}
              onTransitionEnd={
                isTop
                  ? (event) => {
                      if (event.target !== event.currentTarget || event.propertyName !== 'transform' || !exit) return
                      handleCycle()
                    }
                  : undefined
              }
              onClick={() => {
                if (isTop && !movedRef.current) onOpenImage(images, imageIndex)
              }}
              tabIndex={isTop ? undefined : -1}
              aria-hidden={!isTop}
              aria-label={isTop ? `Open image: ${image.alt}` : undefined}
            >
              <img
                src={image.src}
                alt={isTop ? image.alt : ''}
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                onLoad={(event) => {
                  const loaded = event.currentTarget
                  if (!ratio && loaded.naturalWidth > 0 && loaded.naturalHeight > 0) {
                    setRatio(loaded.naturalWidth / loaded.naturalHeight)
                  }
                }}
              />
            </button>
          )
        })}
        <button
          type="button"
          className="card-carousel__nav card-carousel__nav--prev"
          onClick={() => swipeAway(-1, 0)}
          aria-label="Previous attachment"
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          className="card-carousel__nav card-carousel__nav--next"
          onClick={() => swipeAway(1, 0)}
          aria-label="Next attachment"
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
      <div className="card-carousel__dots" role="tablist" aria-label={`Attachments ${number}`}>
        {images.map((image, dotIndex) => (
          <button
            key={image.src}
            type="button"
            className={`card-carousel__dot${dotIndex === topIndex ? ' is-active' : ''}`}
            onClick={() => {
              if (exit) return
              setOrder((current) => {
                const position = current.indexOf(dotIndex)
                if (position <= 0) return current
                return [...current.slice(position), ...current.slice(0, position)]
              })
            }}
            aria-label={`Go to ${image.alt}`}
            aria-current={dotIndex === topIndex}
          />
        ))}
      </div>
    </div>
  )
}

export function ProjectCard({ project, index, onOpenImage }: ProjectCardProps) {
  const { t } = useI18n()
  const images = project.images
  const hasPdf = images?.some((image) => image.kind === 'pdf') ?? false
  const visibleImages = images?.slice(0, 4) ?? []
  const hiddenCount = (images?.length ?? 0) - visibleImages.length
  const number = String(index + 1).padStart(2, '0')

  return (
    <article className="project">
      <div className="project__rail">
        <span className="project__index">{number}</span>
        <span className="project__badge">{t(project.badgeKey)}</span>
      </div>

      <div className="project__body">
        <h3>{t(project.titleKey)}</h3>
        <p className="project__meta">{project.meta}</p>
        <p className="project__desc">{t(project.descKey)}</p>

        <ul className="project__tags" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag.label}>
              <a className="tag" href={tag.href} target="_blank" rel="noopener noreferrer">
                {tag.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="project__media">
        {images && images.length > 0 ? (
          hasPdf ? (
            <div className="project__gallery">
              {visibleImages.map((image, imageIndex) => (
                <button
                  key={image.src}
                  type="button"
                  className={`gallery-btn${image.kind === 'pdf' ? ' gallery-btn--pdf' : ''}`}
                  onClick={() => images && onOpenImage(images, imageIndex)}
                  aria-label={`Open ${image.kind === 'pdf' ? 'document' : 'image'}: ${image.alt}`}
                >
                  {image.kind === 'pdf' ? (
                    <>
                      <PdfThumb src={image.src} alt={image.alt} />
                      <span className="gallery-btn__pdf-tag">PDF</span>
                    </>
                  ) : (
                    <img src={image.src} alt={image.alt} loading="lazy" />
                  )}
                  {hiddenCount > 0 && imageIndex === visibleImages.length - 1 && (
                    <span className="gallery-btn__more">+{hiddenCount}</span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <SwipeDeck images={images} number={number} style={project.carouselStyle} onOpenImage={onOpenImage} />
          )
        ) : project.id === 'battery' ? (
          <BatteryModel />
        ) : project.id === 'fault-injection' ? (
          <SmartCardLaser />
        ) : project.id === 'smart-meter' ? (
          <MqttLog />
        ) : project.id === 'representative' ? (
          <ParliamentSeats />
        ) : null}
      </div>
    </article>
  )
}
