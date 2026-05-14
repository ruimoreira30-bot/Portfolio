import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Linkedin, MapPin, ArrowUpRight } from 'lucide-react'
import { useTranslation } from '../i18n/LanguageContext.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)

  useEffect(() => {
    const els = [titleRef.current, subtitleRef.current, descRef.current]
    const ys = [36, 24, 16]
    gsap.fromTo(
      els,
      { y: (i) => ys[i], opacity: 0 },
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
      id="contact"
      ref={sectionRef}
      className="md:snap-start min-h-screen bg-black py-24 md:py-32 px-6 md:px-10 flex flex-col"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex items-center">
        <div className="w-full">
          <div
            className="relative overflow-hidden rounded-3xl p-10 md:p-20 border border-white/10"
            style={{
              background:
                'radial-gradient(circle at 80% 20%, rgba(0,212,170,0.18), transparent 60%), linear-gradient(135deg, #0a0a0a, #000)'
            }}
          >
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7">
                <p
                  ref={subtitleRef}
                  className="text-xs uppercase tracking-[0.3em] text-teal mb-4"
                >
                  {t.contact.eyebrow}
                </p>
                <h2
                  ref={titleRef}
                  className="font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]"
                >
                  {t.contact.headingTop} <br />
                  <span className="text-gradient-teal">{t.contact.headingBottom}</span>
                </h2>
                <p
                  ref={descRef}
                  className="text-neutral-400 mt-6 text-base md:text-lg max-w-lg leading-relaxed"
                >
                  {t.contact.description}
                </p>
              </div>

              <div className="md:col-span-5 flex flex-col gap-4">
                <a
                  href="mailto:ruimoreira_30@outlook.pt"
                  className="group flex items-center justify-between gap-4 p-5 rounded-2xl bg-teal text-black font-semibold transition-transform hover:scale-[1.02]"
                >
                  <span className="flex items-center gap-3">
                    <Mail className="w-5 h-5" strokeWidth={2} />
                    {t.contact.cta}
                  </span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                <a
                  href="mailto:ruimoreira_30@outlook.pt"
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/10 text-neutral-300 hover:border-teal hover:text-teal transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" strokeWidth={1.5} />
                  ruimoreira_30@outlook.pt
                </a>

                <a
                  href="https://www.linkedin.com/in/rui-mad-moreira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 p-4 rounded-xl border border-white/10 text-neutral-300 hover:border-teal hover:text-teal transition-colors text-sm"
                >
                  <span className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4" strokeWidth={1.5} />
                    rui-mad-moreira
                  </span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </a>

                <div className="flex items-start gap-3 p-4 rounded-xl border border-white/5 text-neutral-400 text-sm leading-relaxed">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <span>
                    <span className="text-white">{t.contact.locationCity}</span>
                    <br />
                    <span className="text-neutral-500 text-xs">
                      {t.contact.locationSub}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-teal/10 blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>

      <footer className="max-w-7xl mx-auto w-full mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500 uppercase tracking-[0.2em]">
        <div>{t.footer.left}</div>
        <div>{t.footer.right}</div>
      </footer>
    </section>
  )
}
