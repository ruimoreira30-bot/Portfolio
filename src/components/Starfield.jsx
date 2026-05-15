import React, { useEffect, useRef } from 'react'

export default function Starfield({ className = '' }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let stars = []
    let nebula = null

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Star layers (parallax-ready, but here static + twinkle)
      const layers = [
        { count: Math.round((width * height) / 6000), rMin: 0.2, rMax: 0.6, alpha: 0.5, twinkle: 0.4 },
        { count: Math.round((width * height) / 10000), rMin: 0.4, rMax: 1.0, alpha: 0.75, twinkle: 0.6 },
        { count: Math.round((width * height) / 28000), rMin: 0.8, rMax: 1.8, alpha: 1.0, twinkle: 0.8 }
      ]

      stars = []
      layers.forEach((L) => {
        for (let i = 0; i < L.count; i++) {
          const tint = Math.random()
          let color = 'rgba(255,255,255,'
          if (tint < 0.1) color = 'rgba(180,210,255,' // blue-white
          else if (tint < 0.18) color = 'rgba(255,220,180,' // warm
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: L.rMin + Math.random() * (L.rMax - L.rMin),
            baseA: L.alpha * (0.6 + Math.random() * 0.4),
            twinkle: L.twinkle,
            phase: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 1.5,
            color
          })
        }
      })

      // Diffuse "Milky Way" — soft nebula clouds, no harsh diagonal band
      nebula = document.createElement('canvas')
      nebula.width = canvas.width
      nebula.height = canvas.height
      const nctx = nebula.getContext('2d')
      nctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cx = width * 0.5
      const cy = height * 0.5

      // Use additive blending for the cloud layer so colours stack naturally
      nctx.globalCompositeOperation = 'lighter'

      // Cloud palette — teal-leaning with hints of deep blue and violet
      const palette = [
        'rgba(0, 212, 170, 0.085)',   // teal core
        'rgba(0, 160, 220, 0.075)',   // cyan
        'rgba(110, 90, 220, 0.065)',  // soft violet (no magenta band)
        'rgba(40, 70, 180, 0.07)'     // deep galactic blue
      ]

      // ~14 large soft clouds scattered across the canvas, biased toward center
      const cloudCount = 14
      for (let i = 0; i < cloudCount; i++) {
        // Slight bias toward the middle/upper half (galactic core feel)
        const t = i / cloudCount
        const angle = Math.random() * Math.PI * 2
        const dist = Math.random() * Math.max(width, height) * 0.55
        const x = cx + Math.cos(angle) * dist + (Math.random() - 0.5) * width * 0.15
        const y = cy + Math.sin(angle) * dist * 0.75 + (Math.random() - 0.5) * height * 0.15
        const r = Math.max(width, height) * (0.18 + Math.random() * 0.22)
        const color = palette[i % palette.length]
        const grad = nctx.createRadialGradient(x, y, 0, x, y, r)
        grad.addColorStop(0, color)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        nctx.fillStyle = grad
        nctx.beginPath()
        nctx.arc(x, y, r, 0, Math.PI * 2)
        nctx.fill()
      }

      // A handful of brighter star-cluster glints
      const clusterCount = 6
      for (let i = 0; i < clusterCount; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const r = 40 + Math.random() * 80
        const grad = nctx.createRadialGradient(x, y, 0, x, y, r)
        grad.addColorStop(0, 'rgba(180, 220, 255, 0.18)')
        grad.addColorStop(0.4, 'rgba(120, 180, 255, 0.08)')
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        nctx.fillStyle = grad
        nctx.beginPath()
        nctx.arc(x, y, r, 0, Math.PI * 2)
        nctx.fill()
      }

      // Reset blend mode for the vignette pass
      nctx.globalCompositeOperation = 'source-over'

      // Vignette — keeps focus on the centre
      const vg = nctx.createRadialGradient(
        cx,
        cy,
        Math.min(width, height) * 0.3,
        cx,
        cy,
        Math.max(width, height) * 0.85
      )
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(1, 'rgba(0,0,0,0.55)')
      nctx.fillStyle = vg
      nctx.fillRect(0, 0, width, height)
    }

    let start = performance.now()
    const draw = (now) => {
      const t = (now - start) / 1000
      // Solid deep-space backdrop
      ctx.fillStyle = '#04050c'
      ctx.fillRect(0, 0, width, height)

      // Nebula
      if (nebula) {
        ctx.save()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.drawImage(nebula, 0, 0)
        const dpr = canvas.width / width
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.restore()
      }

      // Stars w/ twinkle
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const a = s.baseA * (1 - s.twinkle * 0.5 + s.twinkle * 0.5 * Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.color + a.toFixed(3) + ')'
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    setup()
    rafRef.current = requestAnimationFrame(draw)

    const onResize = () => {
      setup()
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
