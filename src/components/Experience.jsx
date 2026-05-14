import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '../i18n/LanguageContext.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const { t } = useTranslation()
  const ITEMS = t.experience.items
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

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
      id="experience"
      ref={sectionRef}
      className="md:snap-start min-h-[90vh] bg-black py-24 md:py-32 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2
            ref={titleRef}
            className="font-display font-bold text-4xl md:text-6xl tracking-tight"
          >
            <span className="text-neutral-500">{t.experience.headingLeft}</span>{' '}
            <span className="text-gradient-teal">{t.experience.headingRight}</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-neutral-400 mt-4 text-sm md:text-base max-w-2xl mx-auto"
          >
            {t.experience.subtitle}
          </p>
        </div>

        {/* Mobile pills */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-6 -mx-6 px-6">
          {ITEMS.map((it, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] border transition-colors ${
                activeIndex === i
                  ? 'bg-teal text-black border-teal'
                  : 'border-white/15 text-neutral-400'
              }`}
            >
              {it.company}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Nav list */}
          <div className="hidden md:block md:col-span-5 relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
            <div
              className="absolute left-[-3px] w-[7px] h-[7px] rounded-full bg-teal shadow-[0_0_12px_#00d4aa] transition-all duration-500"
              style={{ top: `${activeIndex * 130 + 20}px` }}
            />
            <ul className="flex flex-col gap-4">
              {ITEMS.map((it, i) => (
                <li
                  key={i}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`pl-8 py-4 cursor-pointer transition-all ${
                    activeIndex === i ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                  }`}
                  style={{ minHeight: '110px' }}
                >
                  <div className="text-xs text-teal uppercase tracking-[0.25em] mb-1">
                    {it.period}
                  </div>
                  <div className="font-display font-semibold text-2xl text-white flex items-center gap-2 flex-wrap">
                    {it.company}
                    {it.tag && (
                      <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border border-teal/30 bg-teal/5 text-teal font-display font-semibold">
                        {it.tag}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-neutral-400">{it.role}</div>
                  {it.program && (
                    <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 mt-1">
                      {it.program}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Detail */}
          <div className="md:col-span-7">
            <div className="relative p-6 md:p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden">
              <div
                key={activeIndex}
                className="animate-[fadeIn_0.5s_ease]"
              >
                <div className="text-xs text-teal uppercase tracking-[0.25em] mb-2">
                  {ITEMS[activeIndex].period}
                </div>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-1 flex items-center gap-3 flex-wrap">
                  {ITEMS[activeIndex].company}
                  {ITEMS[activeIndex].tag && (
                    <span className="text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-teal/40 bg-teal/10 text-teal font-display font-semibold">
                      {ITEMS[activeIndex].tag}
                    </span>
                  )}
                </h3>
                <div className="text-base md:text-lg text-neutral-300">
                  {ITEMS[activeIndex].role}
                </div>
                {ITEMS[activeIndex].program && (
                  <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mt-1">
                    {ITEMS[activeIndex].program}
                  </div>
                )}
                {ITEMS[activeIndex].url && (
                  <a
                    href={`https://${ITEMS[activeIndex].url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-teal hover:text-white transition-colors mt-2"
                  >
                    {ITEMS[activeIndex].url} →
                  </a>
                )}
                {ITEMS[activeIndex].intro && (
                  <p className="text-sm md:text-base text-neutral-300 leading-relaxed mt-5 mb-6 max-w-2xl">
                    {ITEMS[activeIndex].intro}
                  </p>
                )}
                <ul className="space-y-4 mt-6">
                  {ITEMS[activeIndex].bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm md:text-base text-neutral-300 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-teal/10 blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
