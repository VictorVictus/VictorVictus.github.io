import { usePdfThumb } from '../hooks/usePdfThumb'

type PdfThumbProps = {
  src: string
  alt: string
}

export function PdfThumb({ src, alt }: PdfThumbProps) {
  const thumb = usePdfThumb(src)
  if (!thumb) return null
  return <img src={thumb} alt={alt} loading="lazy" />
}
