import React, { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '../i18n/LanguageContext.jsx'

gsap.registerPlugin(ScrollTrigger)
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.__ST = ScrollTrigger
  window.__gsap = gsap
}

export default function Hero({ frames }) {
  const { t } = useTranslation()
  const BLOCKS = t.hero.blocks

  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const blockRefs = useRef([])

  // Refs that avoid React re-renders during scroll
  const ctxRef = useRef(null)
  const rectRef = useRef({ dx: 0, dy: 0, dw: 0, dh: 0, cw: 0, ch: 0 })
  const currentFrameRef = useRef(0)
  const rafPendingRef = useRef(false)

  // Recompute the destination rectangle for the current canvas + first frame size
  const recomputeRect = () => {
    const canvas = canvasRef.current
    if (!canvas || !frames.length) return
    const img = frames[0]
    const cw = canvas.width
    const ch = canvas.height
    const ir = img.width / img.height
    const cr = cw / ch
    let dw, dh, dx, dy
    if (ir > cr) {
      dh = ch
      dw = dh * ir
      dx = (cw - dw) / 2
      dy = 0
    } else {
      dw = cw
      dh = dw / ir
      dx = 0
      dy = (ch - dh) / 2
    }
    rectRef.current = { dx, dy, dw, dh, cw, ch }
  }

  // Direct canvas draw — bypasses React render entirely
  const drawFrame = (idx) => {
    const ctx = ctxRef.current
    const { dx, dy, dw, dh, cw, ch } = rectRef.current
    if (!ctx || cw === 0 || ch === 0) return
    const img = frames[Math.min(idx, frames.length - 1)]
    if (!img) return
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)
    ctx.fillStyle = 'rgba(0,0,0,0.55)'
    ctx.fillRect(0, 0, cw, ch)
  }

  // Schedule one draw per animation frame, even if onUpdate fires more often
  const scheduleDraw = (idx) => {
    currentFrameRef.current = idx
    if (rafPendingRef.current) return
    rafPendingRef.current = true
    requestAnimationFrame(() => {
      rafPendingRef.current = false
      drawFrame(currentFrameRef.current)
    })
  }

  // Size + cache context before first paint
  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    ctxRef.current = canvas.getContext('2d', { alpha: false })

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      recomputeRect()
      drawFrame(currentFrameRef.current)
    }
    sizeCanvas()

    const onResize = () => {
      sizeCanvas()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames])

  // Initial draw once frames are available
  useEffect(() => {
    if (frames.length) {
      recomputeRect()
      drawFrame(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames])

  // Frame scrub + block crossfade timeline
  useEffect(() => {
    if (!frames.length) return
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    const frameST = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: isMobile ? 0.4 : 0.8,
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (frames.length - 1))
        scheduleDraw(idx)
      }
    })

    const blocks = blockRefs.current
    gsap.set(blocks, { opacity: 0, y: -100 })
    gsap.set(blocks[0], { opacity: 1, y: 0 })

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: isMobile ? 0.4 : 0.8
      }
    })
    tl.to({}, { duration: 1 }, 0)

    const TRANSITIONS = [0.25, 0.5, 0.75]
    const DURATION = 0.08

    TRANSITIONS.forEach((t, i) => {
      tl.to(
        blocks[i],
        { opacity: 0, y: 100, duration: DURATION },
        t - DURATION / 2
      )
      tl.fromTo(
        blocks[i + 1],
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, duration: DURATION },
        t - DURATION / 2
      )
    })

    ScrollTrigger.refresh()

    return () => {
      frameST.kill()
      tl.scrollTrigger && tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [frames])

  return (
    <section
      id="top"
      ref={wrapperRef}
      className="relative md:snap-start"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen w-full bg-black overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:pl-20 md:pr-10 grid grid-cols-12 items-center">
          <div className="col-span-12 md:col-span-6 lg:col-span-5 relative text-center md:text-left">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-teal mb-8 justify-center md:justify-start">
              <span className="w-8 h-px bg-teal" />
              {t.hero.eyebrow}
            </div>

            <div className="relative min-h-[340px] md:min-h-[380px]">
              {BLOCKS.map((b, i) => (
                <div
                  key={i}
                  ref={(el) => (blockRefs.current[i] = el)}
                  className="absolute inset-0 flex flex-col gap-4"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <h1
                    className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-white"
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {b.title}
                  </h1>
                  <p className="font-sans text-lg md:text-xl text-gradient-teal font-medium leading-relaxed">
                    {b.subtitle}
                  </p>
                  <p
                    className="font-sans text-sm md:text-base text-neutral-300 max-w-md leading-relaxed mx-auto md:mx-0"
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {b.description}
                  </p>
                  {b.flags && (
                    <div className="flex gap-3 mt-3 justify-center md:justify-start">
                      {b.flags.map((f) => (
                        <div
                          key={f.code}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur"
                        >
                          <img
                            src={`https://flagcdn.com/w40/${f.code}.png`}
                            alt={f.label}
                            className="w-5 h-auto rounded-sm shadow-sm"
                            loading="lazy"
                          />
                          <span className="text-[10px] uppercase tracking-[0.2em] font-display font-semibold text-white">
                            {f.label}
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.15em] text-teal">
                            {f.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-8 justify-center md:justify-start">
              <a
                href="#project"
                className="px-5 py-3 bg-teal text-black text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-teal-dark transition-colors"
              >
                {t.hero.seeWork}
              </a>
              <a
                href="#contact"
                className="px-5 py-3 border-2 border-white/40 text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:border-teal hover:text-teal hover:bg-white/[0.04] transition-all backdrop-blur-sm bg-black/20"
              >
                {t.hero.contact}
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center">
          <div className="flex items-center gap-2">
            {BLOCKS.map((_, i) => (
              <div
                key={i}
                className="w-8 h-px bg-white/20 overflow-hidden relative"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
