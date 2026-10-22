import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages serves 404.html for unknown paths. Reusing the built index
// keeps client-side routes working on a hard refresh.
const dist = resolve(process.cwd(), 'dist')
copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
console.log('Created dist/404.html')
