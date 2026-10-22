import { useEffect, useState } from 'react'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

const THUMB_WIDTH = 640

type PdfjsModule = typeof import('pdfjs-dist')

let pdfjsPromise: Promise<PdfjsModule> | undefined

function loadPdfjs(): Promise<PdfjsModule> {
  pdfjsPromise ??= import('pdfjs-dist').then((pdfjs) => {
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl
    return pdfjs
  })
  return pdfjsPromise
}

const cache = new Map<string, Promise<string>>()

async function renderFirstPage(src: string): Promise<string> {
  const pdfjs = await loadPdfjs()
  const task = pdfjs.getDocument({ url: src })
  try {
    const doc = await task.promise
    const page = await doc.getPage(1)
    const base = page.getViewport({ scale: 1 })
    const viewport = page.getViewport({ scale: THUMB_WIDTH / base.width })
    const canvas = document.createElement('canvas')
    canvas.width = viewport.width
    canvas.height = viewport.height
    const context = canvas.getContext('2d')
    if (!context) throw new Error('2D canvas context unavailable')
    await page.render({ canvas, canvasContext: context, viewport }).promise
    return canvas.toDataURL('image/jpeg', 0.85)
  } catch (error) {
    cache.delete(src)
    throw error
  } finally {
    task.destroy()
  }
}

export function usePdfThumb(src: string | undefined): string | undefined {
  const [thumb, setThumb] = useState<string | undefined>()

  useEffect(() => {
    if (!src) return
    let alive = true
    setThumb(undefined)
    renderFirstPage(src)
      .then((url) => {
        if (alive) setThumb(url)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [src])

  return thumb
}
