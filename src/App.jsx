import React, { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import SkillsOrbit from './components/SkillsOrbit.jsx'
import Project from './components/Project.jsx'
import Contact from './components/Contact.jsx'

const TOTAL_FRAMES = 60
const framePath = (i) => `/frames/${String(i).padStart(2, '0')}.webp`

export default function App() {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [frames, setFrames] = useState([])

  useEffect(() => {
    let loaded = 0
    const imgs = []
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = framePath(i)
      img.onload = img.onerror = () => {
        loaded++
        setProgress(loaded / TOTAL_FRAMES)
        if (loaded === TOTAL_FRAMES) {
          setFrames(imgs)
          setReady(true)
        }
      }
      imgs.push(img)
    }
  }, [])

  if (!ready) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">
        <div className="w-64 h-1 load-bar-track rounded-full overflow-hidden">
          <div
            className="h-full load-bar-fill transition-all duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-neutral-500">
          {Math.round(progress * 100)}%
        </p>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="md:snap-y md:snap-mandatory">
        <Hero frames={frames} />
        <Experience />
        <SkillsOrbit />
        <Project />
        <Contact />
      </main>
    </>
  )
}
