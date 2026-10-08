// Inlines the JS and CSS of `vite build --mode single` into one HTML file
// that works offline (double-click to open) or can be shared as-is.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = 'dist-single'
const read = (p) => readFileSync(join(dir, p), 'utf8')
let html = read('index.html')

html = html.replace(/<script type="module" crossorigin src="\.\/(assets\/[^"]+\.js)"><\/script>/g, (_, file) => {
  const js = read(file).replace(/<\/script/gi, '<\\/script')
  return `<script type="module">${js}</script>`
})
html = html.replace(/<link rel="stylesheet" crossorigin href="\.\/(assets\/[^"]+\.css)">/g, (_, file) => `<style>${read(file)}</style>`)

if (/src="\.\/assets|href="\.\/assets/.test(html)) {
  console.error('inline-build: some assets were not inlined')
  process.exit(1)
}
const out = join(dir, 'the-english-teacher.html')
writeFileSync(out, html)
console.log(`inline-build: wrote ${out} (${(html.length / 1024).toFixed(0)} KB)`)
