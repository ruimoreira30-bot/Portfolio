import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { useTranslation } from '../i18n/LanguageContext.jsx'

export default function Header() {
  const barRef = useRef(null)
  const itemsRef = useRef([])
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const NAV = [
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.project, href: '#project' },
    { label: t.nav.contact, href: '#contact' }
  ]

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(
      barRef.current,
      { y: -80 },
      { y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'transform' }
    ).fromTo(
      itemsRef.current.filter(Boolean),
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      },
      '-=0.3'
    )
  }, [])

  return (
    <header
      ref={barRef}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="font-display font-bold tracking-tight text-lg shrink-0">
          <span className="text-gradient-teal">RM</span>
          <span className="text-white">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 md:gap-9">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              ref={(el) => (itemsRef.current[i] = el)}
              href={n.href}
              className="text-xs md:text-sm uppercase tracking-[0.2em] text-neutral-400 hover:text-teal transition-colors"
            >
              {n.label}
            </a>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="p-2 rounded-full border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 transition-colors"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-white/5"
          style={{
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)'
          }}
        >
          <nav className="px-6 py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMobileOpen(false)}
                className="text-xs uppercase tracking-[0.25em] text-neutral-300 hover:text-teal transition-colors py-1"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
