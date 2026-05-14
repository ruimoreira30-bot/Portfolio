// Reduce 120 frames → 60 and convert to WebP at quality 78
import sharp from 'sharp'
import { readdir, mkdir, rm } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const FRAMES_DIR = path.resolve('public/frames')
const TMP_DIR = path.resolve('public/frames-webp')

async function run() {
  const files = (await readdir(FRAMES_DIR))
    .filter((f) => /\.(png|jpe?g)$/i.test(f))
    .sort()

  if (files.length === 0) {
    console.error('No frames found in', FRAMES_DIR)
    process.exit(1)
  }

  console.log(`Found ${files.length} source frames.`)

  if (!existsSync(TMP_DIR)) await mkdir(TMP_DIR, { recursive: true })

  // Keep every 2nd frame
  const kept = files.filter((_, i) => i % 2 === 0)
  console.log(`Keeping ${kept.length} frames after halving.`)

  let total = 0
  await Promise.all(
    kept.map(async (src, i) => {
      const idx = i + 1
      const out = path.join(TMP_DIR, `${String(idx).padStart(2, '0')}.webp`)
      const buf = await sharp(path.join(FRAMES_DIR, src))
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toBuffer()
      const fs = await import('fs/promises')
      await fs.writeFile(out, buf)
      total += buf.length
      process.stdout.write(`  → ${path.basename(out)} (${(buf.length / 1024).toFixed(1)} KB)\n`)
    })
  )

  console.log(`\n✓ Done. Total: ${(total / 1024 / 1024).toFixed(2)} MB across ${kept.length} files.`)
  console.log(`\nNext step: replace public/frames/ with the contents of public/frames-webp/`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
