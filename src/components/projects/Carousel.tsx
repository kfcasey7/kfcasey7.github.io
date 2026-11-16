import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Trophy } from 'lucide-react'
import type { Project } from '../../data/projects'
import { Cover } from './Cover'

type Props = {
  label: string
  projects: Project[]
  onOpen: (project: Project, focusVideos?: boolean) => void
}

export function Carousel({ label, projects, onOpen }: Props) {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const many = projects.length > 1
  const go = (i: number) => setActive(Math.max(0, Math.min(projects.length - 1, i)))

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(active - 1)
        if (e.key === 'ArrowRight') go(active + 1)
      }}
      className="relative"
    >
      <motion.div
        className="relative h-[32rem] touch-pan-y select-none [perspective:1400px]"
        onPanEnd={(_, info) => {
          if (info.offset.x < -60) go(active + 1)
          if (info.offset.x > 60) go(active - 1)
        }}
      >
        {projects.map((p, i) => {
          const d = i - active
          const abs = Math.abs(d)
          const hidden = abs > 2
          return (
            <motion.div
              key={p.id}
              className="absolute left-1/2 top-0 ml-[calc(min(84vw,360px)/-2)] w-[min(84vw,360px)] [transform-style:preserve-3d]"
              style={{ zIndex: 10 - abs, pointerEvents: hidden ? 'none' : 'auto' }}
              initial={false}
              animate={{
                x: `${d * 72}%`,
                scale: 1 - Math.min(abs, 2) * 0.12,
                rotateY: reduce ? 0 : Math.max(-2, Math.min(2, d)) * -26,
                opacity: hidden ? 0 : 1 - abs * 0.3,
              }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 30 }}
              aria-hidden={d !== 0}
              inert={d !== 0}
            >
              <article className="flex h-[30rem] flex-col overflow-hidden rounded-[22px] border border-line bg-panel shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]">
                <Cover project={p} className="h-48 shrink-0" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm text-sage-dim">
                    {p.course ? `${p.course}, ` : ''}
                    {p.period}
                  </p>
                  <h3 className="font-wide mt-1.5 line-clamp-2 text-lg font-semibold leading-snug text-bone">{p.title}</h3>
                  {p.highlight ? (
                    <p className="mt-2 flex items-start gap-2 text-sm text-sage">
                      <Trophy className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <span className="line-clamp-2">{p.highlight}</span>
                    </p>
                  ) : (
                    <p className="mt-2 line-clamp-2 text-sm text-mist">{p.summary}</p>
                  )}
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => onOpen(p)}
                      className="rounded-full border border-sage/60 px-5 py-2 text-sm font-medium text-bone transition-colors hover:border-sage hover:bg-sage/10"
                    >
                      Details
                    </button>
                    {p.videos?.length ? (
                      <button
                        type="button"
                        onClick={() => onOpen(p, true)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-sage px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-bone"
                      >
                        <Play className="size-3.5 fill-current" aria-hidden="true" />
                        Demo video
                      </button>
                    ) : null}
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-mist" aria-label="Technologies">
                    {p.tags.slice(0, 4).map((t) => (
                      <li key={t}>#{t.replace(/\s+/g, '')}</li>
                    ))}
                  </ul>
                </div>
              </article>
              {d !== 0 && !hidden && (
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => go(i)}
                  className="absolute inset-0 cursor-pointer rounded-[22px]"
                />
              )}
            </motion.div>
          )
        })}
      </motion.div>

      {many && (
        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Previous project"
            className="rounded-full border border-line p-2.5 text-bone transition-colors hover:border-sage disabled:opacity-30"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <div className="flex">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${p.title}`}
                aria-current={i === active ? 'true' : undefined}
                className="group flex h-11 min-w-6 items-center justify-center px-1"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === active ? 'w-7 bg-sage' : 'w-2 bg-line group-hover:bg-sage-dim'
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === projects.length - 1}
            aria-label="Next project"
            className="rounded-full border border-line p-2.5 text-bone transition-colors hover:border-sage disabled:opacity-30"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {projects[active].title}, project {active + 1} of {projects.length}
      </p>
    </div>
  )
}
