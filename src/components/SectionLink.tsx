import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, type MouseEvent, type ReactNode } from 'react'

type SectionLinkProps = {
  id: string
  children: ReactNode
  className?: string
  onNavigate?: () => void
}

function scrollToSection(id: string) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReduced ? 'auto' : 'smooth',
    block: 'start',
  })
}

export function SectionLink({ id, children, className, onNavigate }: SectionLinkProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onNavigate?.()
    if (location.pathname === '/') {
      scrollToSection(id)
    } else {
      navigate(`/#${id}`)
    }
  }

  return (
    <a href={`/#${id}`} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}

export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const frame = requestAnimationFrame(() => scrollToSection(id))
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
