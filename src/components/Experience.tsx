import { motion, useReducedMotion } from 'framer-motion'
import { Bot, Tent, Truck, Users } from 'lucide-react'
import { experience } from '../data/experience'
import { Section } from './Section'

const icons = { truck: Truck, users: Users, bot: Bot, tent: Tent }

export function Experience() {
  const reduce = useReducedMotion()
  return (
    <Section id="experience" title="Experience" intro="Work, leadership and the teams that taught me how to build with other people.">
      <ol className="relative">
        <span aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px bg-line md:left-1/2" />
        {experience.map((item, i) => {
          const Icon = icons[item.icon]
          const left = i % 2 === 0
          return (
            <li key={item.title} className="relative grid pb-14 last:pb-0 md:grid-cols-2 md:gap-16">
              <span
                aria-hidden="true"
                className="absolute left-5 top-1 z-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border border-sage/50 bg-ink text-sage md:left-1/2"
              >
                <Icon className="size-[18px]" />
              </span>

              <p
                className={`pl-14 text-sm font-medium text-sage md:pl-0 md:pt-3 ${
                  left ? 'md:order-2 md:text-left' : 'md:order-1 md:text-right'
                }`}
              >
                {item.period}
              </p>

              <motion.article
                initial={reduce ? false : { opacity: 0, x: left ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`ml-14 mt-3 rounded-2xl border border-line bg-panel p-6 md:ml-0 md:mt-0 ${
                  left ? 'md:order-1' : 'md:order-2'
                }`}
              >
                <h3 className="font-wide text-lg font-semibold leading-snug text-bone">{item.title}</h3>
                <p className="mt-1 text-bone/80">{item.org}</p>
                <p className="text-sm text-sage-dim">{item.place}</p>
                <ul className="mt-4 space-y-2 text-[0.975rem] text-mist">
                  {item.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] size-1 shrink-0 rounded-full bg-sage/70" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
