import React, { useEffect, useRef, useState } from 'react'
import { Globe } from 'lucide-react'
import { useTranslation } from '../i18n/LanguageContext.jsx'

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, languages } = useTranslation()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-colors"
      >
        <Globe className="w-3.5 h-3.5 text-neutral-300" strokeWidth={1.75} />
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold">
          {languages.map((code, i) => (
            <React.Fragment key={code}>
              {i > 0 && <span className="text-white/20">|</span>}
              <span
                className={`transition-colors ${
                  code === lang
                    ? 'text-teal'
                    : 'text-white/40'
                }`}
                style={
                  code === lang
                    ? { textShadow: '0 0 8px rgba(0,212,170,0.55)' }
                    : undefined
                }
              >
                {code}
              </span>
            </React.Fragment>
          ))}
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 min-w-[140px] rounded-xl overflow-hidden p-1.5 z-50"
          style={{
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow:
              '0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset'
          }}
        >
          {languages.map((code) => {
            const active = code === lang
            return (
              <button
                key={code}
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLang(code)
                  setOpen(false)
                }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  active
                    ? 'bg-teal/10 text-teal'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                style={
                  active ? { textShadow: '0 0 10px rgba(0,212,170,0.5)' } : undefined
                }
              >
                <span className="text-xs uppercase tracking-[0.25em] font-semibold">
                  {code}
                </span>
                <span className="text-[10px] text-white/40">
                  {code === 'EN' ? 'English' : code === 'FR' ? 'Français' : 'Português'}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
