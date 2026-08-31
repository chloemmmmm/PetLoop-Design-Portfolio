import { copyFile, mkdir } from 'node:fs/promises'

const dist = new URL('../dist/', import.meta.url)
const indexFile = new URL('index.html', dist)
const demoDir = new URL('demo/', dist)
const demoIndex = new URL('demo/index.html', dist)
const fallback = new URL('404.html', dist)

await mkdir(demoDir, { recursive: true })
await copyFile(indexFile, demoIndex)
await copyFile(indexFile, fallback)

console.log('Prepared GitHub Pages entries: /demo/ and /404.html')
