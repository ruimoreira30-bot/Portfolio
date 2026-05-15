import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  Bot,
  FileText,
  Globe2,
  Zap,
  Heart,
  Cpu,
  Database,
  Sparkles
} from 'lucide-react'
import { useTranslation } from '../i18n/LanguageContext.jsx'

gsap.registerPlugin(ScrollTrigger)

// Static per-card config (icons, links, animation hints) — copy comes from i18n
const PROJECT_META = [
  {
    id: 'autoimport',
    icon: Database,
    href: 'https://importaseguro.pt',
    disabled: false,
    metricsAnimate: ['time', 'percent'],
    metricsTarget: [null, 100]
  },
  {
    id: 'projetoes',
    icon: Heart,
    href: 'https://projetoes.pt/',
    disabled: false,
    metricsAnimate: ['text', 'text']
  },
  {
    id: 'proposal-engine',
    icon: Sparkles,
    href: '#contact',
    disabled: true,
    metricsAnimate: ['text', 'text']
  }
]


function AnimatedMetric({ metric, play }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!play || !ref.current) return
    const el = ref.current

    if (metric.animate === 'percent') {
      const target = metric.target || 100
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(obj.v) + '%'
        }
      })
    } else if (metric.animate === 'time') {
      // "30min → 10s" — animate the right side (10) counting down from 30
      const obj = { v: 30 }
      gsap.to(obj, {
        v: 10,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          const n = Math.round(obj.v)
          el.textContent = `30min → ${n}s`
        }
      })
    } else {
      gsap.fromTo(
        el,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )
    }
  }, [play, metric])
  return (
    <span ref={ref} className="font-display font-bold text-base md:text-xl text-white">
      {metric.animate === 'percent' ? '0%' : metric.value}
    </span>
  )
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const innerRef = useRef(null)
  const [played, setPlayed] = React.useState(false)

  // Entrance + metrics trigger
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    gsap.fromTo(
      card,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          onEnter: () => setPlayed(true),
          onEnterBack: () => setPlayed(true)
        }
      }
    )
  }, [index])

  // 3D tilt + cursor-follow glow
  const handleMove = (e) => {
    const card = cardRef.current
    const inner = innerRef.current
    const glow = glowRef.current
    if (!card || !inner) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = x / rect.width
    const py = y / rect.height
    const rx = (0.5 - py) * 8
    const ry = (px - 0.5) * 10
    gsap.to(inner, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000
    })
    if (glow) {
      glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(0,212,170,0.18), transparent 70%)`
      glow.style.opacity = 1
    }
  }
  const handleLeave = () => {
    const inner = innerRef.current
    const glow = glowRef.current
    if (inner) gsap.to(inner, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' })
    if (glow) glow.style.opacity = 0
  }

  const Icon = project.icon
  const disabled = project.cta.disabled

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={innerRef}
        className="relative h-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden transition-shadow duration-500 group-hover:border-teal/30 group-hover:shadow-[0_30px_80px_-20px_rgba(0,212,170,0.25)]"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* cursor-follow glow layer */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
        />

        {/* corner glow accents */}
        <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-teal/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-teal/5 blur-3xl pointer-events-none" />

        <div className="relative p-7 md:p-8 flex flex-col h-full gap-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/30 bg-teal/5 backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_8px_#00d4aa]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-teal font-semibold">
                {project.badge}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl border border-teal/30 bg-charcoal/80 flex items-center justify-center shadow-[0_0_24px_#00d4aa33]">
              <Icon className="w-5 h-5 text-teal" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <div>
            <h3 className="font-display font-bold text-2xl md:text-[26px] leading-tight text-white">
              {project.headline}
            </h3>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
              {project.subhead}
            </p>
          </div>

          {/* Highlights chips */}
          <div className="flex flex-wrap gap-2">
            {project.highlights.map((h) => (
              <span
                key={h}
                className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-white/10 text-neutral-300 bg-white/[0.02]"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Bullets */}
          <ul className="space-y-3">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-sm text-neutral-300 leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal shrink-0 shadow-[0_0_8px_#00d4aa]" />
                <span>
                  <span className="text-white font-medium">{b.strong}:</span> {b.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.map((s) => (
              <span
                key={s}
                className="text-[10px] text-neutral-500 font-mono"
              >
                /{s}
              </span>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-2 mt-auto">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-white/10 bg-white/[0.02]"
              >
                <AnimatedMetric metric={m} play={played} />
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA — fill animation */}
          <a
            href={project.cta.href}
            target={disabled ? undefined : '_blank'}
            rel={disabled ? undefined : 'noopener noreferrer'}
            onClick={disabled ? (e) => e.preventDefault() : undefined}
            aria-disabled={disabled}
            className={`relative inline-flex items-center justify-between gap-3 px-5 py-3 rounded-full overflow-hidden border transition-colors ${
              disabled
                ? 'border-white/10 text-neutral-500 cursor-not-allowed'
                : 'border-teal text-white hover:text-black'
            }`}
          >
            <span
              className={`absolute inset-0 bg-teal origin-left transition-transform duration-500 ${
                disabled
                  ? 'scale-x-0'
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}
              style={{ transformOrigin: 'left' }}
            />
            <span className="relative text-xs uppercase tracking-[0.25em] font-semibold">
              {project.cta.label}
            </span>
            <ArrowUpRight
              className={`relative w-4 h-4 transition-transform duration-300 ${
                disabled ? '' : 'group-hover:translate-x-1 group-hover:-translate-y-1'
              }`}
              strokeWidth={2}
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Project() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const { t } = useTranslation()

  // Merge static meta with localized copy
  const PROJECTS = PROJECT_META.map((meta, i) => {
    const copy = t.projects.cards[i]
    return {
      id: meta.id,
      icon: meta.icon,
      badge: copy.badge,
      headline: copy.headline,
      subhead: copy.subhead,
      bullets: copy.bullets,
      stack: copy.stack,
      highlights: copy.highlights,
      metrics: copy.metrics.map((m, mi) => ({
        ...m,
        animate: meta.metricsAnimate[mi],
        target: meta.metricsTarget?.[mi]
      })),
      cta: { label: copy.ctaLabel, href: meta.href, disabled: meta.disabled }
    }
  })

  useEffect(() => {
    const els = [titleRef.current, subtitleRef.current]
    gsap.fromTo(
      els,
      { y: (i) => (i === 0 ? 36 : 24), opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
    const rect = sectionRef.current.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      gsap.set(els, { y: 0, opacity: 1 })
    }
  }, [])

  return (
    <section
      id="project"
      ref={sectionRef}
      className="relative md:snap-start min-h-screen bg-black py-24 md:py-32 px-6 md:px-10 overflow-hidden"
    >
      {/* Backdrop accents */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-teal/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-teal/[0.04] blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-14 md:mb-20 text-center">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] mb-4 text-teal">
            <span className="w-8 h-px bg-teal" />
            {t.projects.eyebrow}
            <span className="w-8 h-px bg-teal" />
          </div>
          <h2
            ref={titleRef}
            className="font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight"
          >
            <span className="text-neutral-500">{t.projects.headingLeft}</span>{' '}
            <span className="text-gradient-teal">{t.projects.headingRight}</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-neutral-400 mt-5 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            {t.projects.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-7">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
