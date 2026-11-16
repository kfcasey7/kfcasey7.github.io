import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { profile } from '../lib/content'
import { NetworkBackground } from './NetworkBackground'

function useTyping(words: string[], enabled: boolean) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(enabled ? '' : words[0])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const word = words[index]
    let delay = deleting ? 38 : 70
    if (!deleting && text === word) delay = 1800
    if (deleting && text === '') delay = 300
    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, words, enabled])

  return text
}

export function Hero() {
  const reduce = useReducedMotion()
  const roles = profile.roles.length ? profile.roles : ['Robotics engineer']
  const role = useTyping(roles, !reduce)
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="home" className="relative isolate flex min-h-svh items-center overflow-hidden">
      <NetworkBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(14_21_18/0.55)_55%,var(--color-ink)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-24 text-center sm:px-10">
        <motion.p {...enter(0.1)} className="text-lg text-mist sm:text-xl">
          Hello, I'm
        </motion.p>
        <motion.h1
          {...enter(0.25)}
          className="font-widest mt-3 text-[clamp(2.75rem,10vw,7.5rem)] font-[750] leading-[0.92] tracking-[-0.03em] text-bone"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          {...enter(0.45)}
          className="font-wide mt-6 h-[1.4em] text-[clamp(1.25rem,3.4vw,2rem)] font-medium text-sage"
        >
          <span className="sr-only">{roles.join(', ')}</span>
          <span aria-hidden="true">
            {role}
            {!reduce && <span className="ml-0.5 inline-block w-[0.08em] animate-pulse bg-sage align-[-0.1em]">&nbsp;</span>}
          </span>
        </motion.p>
        <motion.p {...enter(0.6)} className="mx-auto mt-6 max-w-xl text-mist">
          {profile.tagline}
        </motion.p>
        <motion.div {...enter(0.75)} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-sage px-7 py-3 font-medium text-ink transition-colors hover:bg-bone"
          >
            See my projects
          </a>
          {profile.resume ? (
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-sage/60 px-7 py-3 font-medium text-bone transition-colors hover:border-sage hover:bg-sage/10"
            >
              <Download className="size-4" aria-hidden="true" />
              Download resume
            </a>
          ) : (
            <a
              href="#contact"
              className="rounded-full border border-sage/60 px-7 py-3 font-medium text-bone transition-colors hover:border-sage hover:bg-sage/10"
            >
              Get in touch
            </a>
          )}
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-28 right-6 hidden rounded-full border border-line p-2 text-mist transition-colors hover:border-sage hover:text-sage sm:right-10 sm:block"
      >
        <ArrowDown className="size-4" aria-hidden="true" />
      </a>
    </section>
  )
}
