import type { ReactNode } from 'react'

export function Section({
  id,
  title,
  intro,
  children,
  className = '',
}: {
  id: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative scroll-mt-6 py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <h2
          id={`${id}-title`}
          className="font-widest text-[clamp(2rem,5vw,3.25rem)] font-bold leading-none tracking-[-0.02em] text-bone"
        >
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-2xl text-mist">{intro}</p>}
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  )
}
