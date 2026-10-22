import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { ProjectImage } from '../data/projects'
import { useI18n } from '../i18n'
import { PdfThumb } from './PdfThumb'

type LightboxProps = {
  images: ProjectImage[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const { t } = useI18n()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const goTo = (next: number) => {
    onNavigate((next + images.length) % images.length)
  }

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key === 'ArrowRight') goTo(index + 1)
      if (event.key === 'ArrowLeft') goTo(index - 1)
      if (event.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button')
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  const image = images[index]
  if (!image) return null
  const isPdf = image.kind === 'pdf'

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      ref={dialogRef}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="lightbox__bar">
        <span className="lightbox__counter">
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
        <span className="lightbox__caption">{image.alt}</span>
        <button
          ref={closeRef}
          type="button"
          className="lightbox__close"
          onClick={onClose}
          aria-label={t('menu_close')}
        >
          <X aria-hidden="true" />
        </button>
      </div>

      <div className="lightbox__stage">
        {images.length > 1 && (
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => goTo(index - 1)}
            aria-label="Previous image"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
        )}
        {isPdf ? (
          <iframe className="lightbox__pdf" src={image.src} title={image.alt} />
        ) : (
          <img className="lightbox__img" src={image.src} alt={image.alt} />
        )}
        {images.length > 1 && (
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={() => goTo(index + 1)}
            aria-label="Next image"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="lightbox__thumbs">
          {images.map((thumb, thumbIndex) => (
            <button
              key={thumb.src}
              type="button"
              className={`lightbox__thumb${thumbIndex === index ? ' is-active' : ''}`}
              onClick={() => onNavigate(thumbIndex)}
              aria-label={`View ${thumb.kind === 'pdf' ? 'document' : 'image'} ${thumbIndex + 1}`}
              aria-current={thumbIndex === index}
            >
              {thumb.kind === 'pdf' ? (
                <PdfThumb src={thumb.src} alt="" />
              ) : (
                <img src={thumb.src} alt="" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  )
}
