import { Bot, CircuitBoard, CodeXml, Ruler, Waves } from 'lucide-react'
import { skillGroups } from '../lib/content'
import { Section } from './Section'

const icons = { bot: Bot, circuit: CircuitBoard, code: CodeXml, ruler: Ruler, waves: Waves }

export function Skills() {
  return (
    <Section id="skills" title="Skills" intro="What I reach for, grouped by the part of the machine it touches.">
      <div className="grid gap-4 md:grid-cols-6">
        {skillGroups.map((g, i) => {
          const Icon = icons[g.icon] ?? CodeXml
          // First two groups span wider: they are the core of the work
          const span = i < 2 ? 'md:col-span-3' : 'md:col-span-2'
          return (
            <section
              key={g.name}
              aria-labelledby={`skill-${i}`}
              className={`rounded-3xl border border-line bg-panel/80 p-6 sm:p-7 ${span}`}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-sage/10 text-sage">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <h3 id={`skill-${i}`} className="font-wide font-semibold text-bone">
                    {g.name}
                  </h3>
                  <p className="text-sm text-mist">{g.blurb}</p>
                </div>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li key={s} className="rounded-full border border-line bg-ink/60 px-3 py-1.5 text-sm text-bone/90">
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </Section>
  )
}
