import sharp from 'sharp'
import path from 'path'

const W = 1200
const H = 630

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bg" cx="80%" cy="20%" r="80%">
      <stop offset="0%" stop-color="#00d4aa" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bg2" cx="20%" cy="100%" r="70%">
      <stop offset="0%" stop-color="#00b894" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="tealGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00d4aa"/>
      <stop offset="100%" stop-color="#00b894"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="#000000"/>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#bg2)"/>

  <!-- Subtle grid -->
  <g stroke="rgba(255,255,255,0.04)" stroke-width="1">
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${H}"/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${i * 90}" x2="${W}" y2="${i * 90}"/>`).join('')}
  </g>

  <!-- Stars -->
  <g fill="#ffffff" opacity="0.6">
    ${Array.from({ length: 40 }, () => {
      const cx = Math.random() * W
      const cy = Math.random() * H
      const r = Math.random() * 1.5 + 0.3
      return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(2)}"/>`
    }).join('')}
  </g>

  <!-- RM badge -->
  <g transform="translate(80, 80)">
    <circle cx="32" cy="32" r="32" fill="url(#tealGrad)" filter="url(#glow)"/>
    <text x="32" y="42" font-family="Outfit, sans-serif" font-size="24" font-weight="800" fill="#000" text-anchor="middle">RM</text>
  </g>

  <!-- Eyebrow -->
  <g transform="translate(80, 260)">
    <line x1="0" y1="0" x2="60" y2="0" stroke="#00d4aa" stroke-width="2"/>
    <text x="80" y="6" font-family="Sora, sans-serif" font-size="18" font-weight="600" fill="#00d4aa" letter-spacing="6">PORTFOLIO · 2026</text>
  </g>

  <!-- Title -->
  <text x="80" y="360" font-family="Outfit, sans-serif" font-size="84" font-weight="800" fill="#ffffff">Rui Moreira</text>

  <!-- Subtitle -->
  <text x="80" y="430" font-family="Outfit, sans-serif" font-size="36" font-weight="600" fill="url(#tealGrad)">Growth Operations &amp; AI Automation</text>

  <!-- Tagline -->
  <text x="80" y="490" font-family="Sora, sans-serif" font-size="22" font-weight="400" fill="#a3a3a3">Just a guy obsessed with what AI can actually do.</text>

  <!-- Bottom row chips -->
  <g transform="translate(80, 540)" font-family="Sora, sans-serif" font-size="14" font-weight="600" fill="#00d4aa" letter-spacing="2">
    <rect x="0" y="0" width="120" height="36" rx="18" fill="rgba(0,212,170,0.08)" stroke="rgba(0,212,170,0.35)"/>
    <text x="60" y="23" text-anchor="middle">AI · GROWTH</text>

    <rect x="135" y="0" width="180" height="36" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)"/>
    <text x="225" y="23" text-anchor="middle" fill="#ffffff">PARIS · REMOTE · EU</text>

    <rect x="330" y="0" width="200" height="36" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)"/>
    <text x="430" y="23" text-anchor="middle" fill="#ffffff">FOUNDER · IMPORTASEGURO</text>
  </g>

  <!-- Right side: orbit-inspired graphic -->
  <g transform="translate(${W - 280}, ${H / 2})" opacity="0.9">
    <circle cx="0" cy="0" r="200" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <circle cx="0" cy="0" r="140" fill="none" stroke="rgba(0,212,170,0.18)" stroke-width="1"/>
    <circle cx="0" cy="0" r="80" fill="none" stroke="rgba(0,212,170,0.10)" stroke-width="1"/>
    <circle cx="0" cy="0" r="56" fill="url(#tealGrad)" filter="url(#glow)"/>
    <text x="0" y="10" font-family="Outfit, sans-serif" font-size="32" font-weight="800" fill="#000" text-anchor="middle">RM</text>
    <!-- nodes -->
    <circle cx="140" cy="0" r="8" fill="#00d4aa"/>
    <circle cx="-140" cy="0" r="8" fill="#00d4aa"/>
    <circle cx="0" cy="140" r="8" fill="#00d4aa"/>
    <circle cx="0" cy="-140" r="8" fill="#00d4aa"/>
    <circle cx="98" cy="98" r="6" fill="rgba(0,212,170,0.7)"/>
    <circle cx="-98" cy="-98" r="6" fill="rgba(0,212,170,0.7)"/>
    <circle cx="98" cy="-98" r="6" fill="rgba(0,212,170,0.7)"/>
    <circle cx="-98" cy="98" r="6" fill="rgba(0,212,170,0.7)"/>
  </g>
</svg>
`

const out = path.resolve('public/og-image.png')
await sharp(Buffer.from(svg))
  .png({ quality: 92 })
  .toFile(out)

console.log('✓ OG image generated:', out)
