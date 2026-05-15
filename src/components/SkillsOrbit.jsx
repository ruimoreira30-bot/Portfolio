import React, { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Starfield from './Starfield.jsx'
import { useTranslation } from '../i18n/LanguageContext.jsx'
import {
  siN8n,
  siClaude,
  siPerplexity,
  siElevenlabs,
  siSuno,
  siGoogle,
  siFigma,
  siMeta,
  siGoogleads,
  siOpenai
} from 'simple-icons'
import {
  Handshake,
  Globe2,
  Workflow,
  TrendingUp,
  Camera,
  Film,
  Database,
  Sheet,
  PenTool
} from 'lucide-react'

// Brand SVG renderer (simple-icons) — always teal, with soft drop-shadow glow
function BrandSvg({ icon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 md:w-7 md:h-7 transition-all duration-300"
      fill="#00d4aa"
      style={{ filter: 'drop-shadow(0 0 6px rgba(0,212,170,0.55))' }}
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  )
}

// Letter badge for brands without simple-icons SVG — teal monochrome
function LetterBadge({ letters }) {
  return (
    <div
      className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center font-display font-bold text-[10px] md:text-xs border border-teal/40 bg-teal/10 text-teal transition-all duration-300"
      style={{ textShadow: '0 0 6px rgba(0,212,170,0.6)' }}
    >
      {letters}
    </div>
  )
}

const AIIcon = {
  n8n: () => <BrandSvg icon={siN8n} color="#EA4B71" />,
  cursor: () => <LetterBadge letters="C" color="#000" bg="#ffffff" />,
  claudeCode: () => <BrandSvg icon={siClaude} color="#D97757" />,
  nanoBanana: () => <LetterBadge letters="NB" color="#000" bg="#FFD93D" />,
  googleFlow: () => <BrandSvg icon={siGoogle} color="#4285F4" />,
  suno: () => <BrandSvg icon={siSuno} color="#ffffff" />,
  elevenLabs: () => <BrandSvg icon={siElevenlabs} color="#ffffff" />,
  deepSeek: () => <LetterBadge letters="DS" color="#fff" bg="#4D6BFE" />,
  perplexity: () => <BrandSvg icon={siPerplexity} color="#20B8CD" />,
  higgsField: () => <LetterBadge letters="H" color="#fff" bg="#A855F7" />,
  manus: () => <LetterBadge letters="M" color="#fff" bg="#1A1A1A" />,
  openai: () => <BrandSvg icon={siOpenai} color="#ffffff" />
}

const TechIcon = {
  playwright: () => <Camera className="w-5 h-5 text-teal" strokeWidth={1.5} />,
  remotion: () => <Film className="w-5 h-5 text-teal" strokeWidth={1.5} />,
  altair: () => <Database className="w-5 h-5 text-teal" strokeWidth={1.5} />,
  figma: () => <BrandSvg icon={siFigma} color="#F24E1E" />,
  excel: () => <LetterBadge letters="XL" color="#fff" bg="#107C41" />,
  metaAds: () => <BrandSvg icon={siMeta} color="#0866FF" />,
  googleAds: () => <BrandSvg icon={siGoogleads} color="#4285F4" />,
  contentCreation: () => <PenTool className="w-5 h-5 text-teal" strokeWidth={1.5} />
}

gsap.registerPlugin(ScrollTrigger)

// Ring 1 — Strategy (icons + labels only; descriptions come from i18n)
const INNER = [
  { Icon: Handshake, label: 'B2B Development' },
  { Icon: Globe2, label: 'International Partnerships' },
  { Icon: Workflow, label: 'Process Automation' },
  { Icon: TrendingUp, label: 'Growth Ops' }
]
// Ring 2 — Technical
const MIDDLE = [
  { render: TechIcon.playwright, label: 'Playwright' },
  { render: TechIcon.remotion, label: 'Remotion' },
  { render: TechIcon.altair, label: 'ALTAIR' },
  { render: TechIcon.figma, label: 'Figma' },
  { render: TechIcon.excel, label: 'Excel' },
  { render: TechIcon.metaAds, label: 'Meta Ads' },
  { render: TechIcon.googleAds, label: 'Google Ads' },
  { render: TechIcon.contentCreation, label: 'Content Creation' }
]
// Ring 3 — AI
const OUTER = [
  { render: AIIcon.n8n, label: 'n8n' },
  { render: AIIcon.cursor, label: 'Cursor' },
  { render: AIIcon.claudeCode, label: 'Claude Code' },
  { render: AIIcon.nanoBanana, label: 'Nano Banana' },
  { render: AIIcon.googleFlow, label: 'Google Flow' },
  { render: AIIcon.suno, label: 'Suno.AI' },
  { render: AIIcon.elevenLabs, label: 'ElevenLabs' },
  { render: AIIcon.deepSeek, label: 'DeepSeek' },
  { render: AIIcon.perplexity, label: 'Perplexity' },
  { render: AIIcon.higgsField, label: 'HiggsField' },
  { render: AIIcon.manus, label: 'Manus.ai' },
  { render: AIIcon.openai, label: 'OpenAI' }
]

function Ring({ items, radius, ringClass, counterClass, onItemHover, onItemLeave }) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 pointer-events-none ${ringClass}`}
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius
      }}
    >
      <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
      {items.map((it, i) => {
        const angle = (i / items.length) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 pointer-events-auto"
            style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
          >
            <div
              className={`group relative ${counterClass} ${onItemHover ? 'cursor-pointer' : ''}`}
              onMouseEnter={() => onItemHover && onItemHover(it)}
              onMouseLeave={() => onItemLeave && onItemLeave()}
              onTouchStart={() => onItemHover && onItemHover(it)}
            >
              <div
                className="relative w-11 h-11 md:w-16 md:h-16 rounded-xl bg-charcoal border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-teal group-hover:scale-110 group-hover:shadow-[0_0_28px_#00d4aa88] transition-all duration-300"
              >
                {/* Subtle radial teal glow behind icon */}
                <span
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(0,212,170,0.30) 0%, rgba(0,212,170,0.10) 45%, transparent 75%)',
                    opacity: 0.65
                  }}
                />
                <span className="relative z-10">
                  {it.render ? (
                    it.render()
                  ) : (
                    <it.Icon
                      className="w-5 h-5 text-teal"
                      strokeWidth={1.5}
                      style={{ filter: 'drop-shadow(0 0 6px rgba(0,212,170,0.55))' }}
                    />
                  )}
                </span>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-teal whitespace-nowrap pointer-events-none font-display font-semibold">
                {it.label}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function SkillsOrbit() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const centerIconRef = useRef(null)
  const centerLabelRef = useRef(null)
  const [activeSkill, setActiveSkill] = useState(null)
  const leaveTimer = useRef(null)
  const { t } = useTranslation()

  // Merge static icon definitions with localized descriptions — memoized per language
  const innerLocalized = useMemo(
    () => INNER.map((it, i) => ({ ...it, description: t.skills.inner[i] })),
    [t]
  )
  const middleLocalized = useMemo(
    () => MIDDLE.map((it, i) => ({ ...it, description: t.skills.middle[i] })),
    [t]
  )
  const outerLocalized = useMemo(
    () => OUTER.map((it, i) => ({ ...it, description: t.skills.outer[i] })),
    [t]
  )

  const onItemHover = (item) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current)
      leaveTimer.current = null
    }
    setActiveSkill(item)
  }
  const onItemLeave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => setActiveSkill(null), 350)
  }

  // GSAP fade-in + scale-up whenever activeSkill changes
  useEffect(() => {
    if (!activeSkill) return
    if (centerIconRef.current) {
      gsap.fromTo(
        centerIconRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.8)' }
      )
    }
    if (centerLabelRef.current) {
      gsap.fromTo(
        centerLabelRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.05 }
      )
    }
  }, [activeSkill])

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
      id="skills"
      ref={sectionRef}
      className="relative md:snap-start min-h-screen py-20 md:py-28 px-6 md:px-10 flex flex-col items-center justify-start overflow-hidden"
      style={{ background: '#04050c' }}
    >
      <Starfield />
      <div className="relative z-10 text-center mb-10 md:mb-12 max-w-3xl">
        <h2
          ref={titleRef}
          className="font-display font-bold text-4xl md:text-6xl tracking-tight"
        >
          <span className="text-neutral-500">{t.skills.headingLeft}</span>{' '}
          <span className="text-gradient-teal">{t.skills.headingRight}</span>
        </h2>
        <p
          ref={subtitleRef}
          className="text-neutral-400 mt-4 text-sm md:text-base max-w-xl mx-auto"
        >
          {/* CSS swaps Hover/Tap copy automatically depending on input device */}
          <span className="hover-copy">{t.skills.subtitle}</span>
          <span className="tap-copy">{t.skills.subtitleTouch || t.skills.subtitle.replace(/Hover/i, 'Tap').replace(/Passa o rato em/i, 'Toca em').replace(/Survolez/i, 'Touchez')}</span>
        </p>
      </div>

      <div
        className={`relative z-10 md:w-[640px] md:h-[640px] ${activeSkill ? 'orbit-paused' : ''}`}
        style={{
          width: 'min(92vw, 360px)',
          height: 'min(92vw, 360px)'
        }}
      >
        {/* Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="relative w-20 h-20 md:w-28 md:h-28">
            {/* RM badge — fades out when something is hovered */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center shadow-[0_0_60px_#00d4aa55] transition-all duration-300 ${
                activeSkill ? 'opacity-0 scale-75 rotate-45' : 'opacity-100 scale-100 rotate-0'
              }`}
            >
              <span className="font-display font-bold text-black text-xl md:text-2xl">
                RM
              </span>
            </div>

            {/* Active skill icon — GSAP-animated on change */}
            {activeSkill && (
              <div
                ref={centerIconRef}
                key={activeSkill.label}
                className="absolute inset-0 rounded-full bg-charcoal border-2 border-teal flex items-center justify-center"
                style={{ boxShadow: '0 0 80px #00d4aaaa, inset 0 0 30px #00d4aa33' }}
              >
                <div className="scale-[1.6] md:scale-[2]">
                  {(() => {
                    if (activeSkill.render) return activeSkill.render()
                    const SkillIcon = activeSkill.Icon
                    return SkillIcon ? (
                      <SkillIcon className="w-5 h-5 text-teal" strokeWidth={1.5} />
                    ) : null
                  })()}
                </div>
              </div>
            )}

            {/* Description label below the center */}
            {activeSkill && (
              <div
                ref={centerLabelRef}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-5 whitespace-nowrap text-center"
              >
                <div
                  className="font-display font-bold text-base md:text-xl"
                  style={{
                    color: '#00d4aa',
                    textShadow:
                      '0 0 12px rgba(0,212,170,0.7), 0 0 24px rgba(0,212,170,0.4)'
                  }}
                >
                  {activeSkill.description || activeSkill.label}
                </div>
              </div>
            )}

            {/* Idle subtitle "Skills" under RM */}
            {!activeSkill && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-5 whitespace-nowrap text-center">
                <div
                  className="font-display font-bold text-xs md:text-sm uppercase tracking-[0.4em]"
                  style={{ color: '#00d4aa' }}
                >
                  {t.skills.centerIdle}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile uses smaller radii */}
        <div className="md:hidden absolute inset-0">
          <Ring items={innerLocalized} radius={60} ringClass="orbit-ring-slow" counterClass="orbit-icon-counter-slow" onItemHover={onItemHover} onItemLeave={onItemLeave} />
          <Ring items={middleLocalized} radius={100} ringClass="orbit-ring" counterClass="orbit-icon-counter" onItemHover={onItemHover} onItemLeave={onItemLeave} />
          <Ring items={outerLocalized} radius={145} ringClass="orbit-ring-fast" counterClass="orbit-icon-counter-fast" onItemHover={onItemHover} onItemLeave={onItemLeave} />
        </div>
        <div className="hidden md:block absolute inset-0">
          <Ring items={innerLocalized} radius={120} ringClass="orbit-ring-slow" counterClass="orbit-icon-counter-slow" onItemHover={onItemHover} onItemLeave={onItemLeave} />
          <Ring items={middleLocalized} radius={205} ringClass="orbit-ring" counterClass="orbit-icon-counter" onItemHover={onItemHover} onItemLeave={onItemLeave} />
          <Ring items={outerLocalized} radius={290} ringClass="orbit-ring-fast" counterClass="orbit-icon-counter-fast" onItemHover={onItemHover} onItemLeave={onItemLeave} />
        </div>
      </div>
    </section>
  )
}
