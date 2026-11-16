import { useState } from 'react'
import { projects, years, type Project } from '../../data/projects'
import { Carousel } from './Carousel'
import { ProjectDialog } from './ProjectDialog'

export function Projects() {
  const [open, setOpen] = useState<{ project: Project; videos: boolean } | null>(null)
  const groups = years
    .map((y) => ({ ...y, items: projects.filter((p) => p.year === y.id) }))
    .filter((g) => g.items.length)

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative scroll-mt-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <h2
          id="projects-title"
          className="font-widest text-[clamp(2rem,5vw,3.25rem)] font-bold leading-none tracking-[-0.02em] text-bone"
        >
          Projects
        </h2>
        <p className="mt-4 max-w-2xl text-mist">
          Four years of coursework and the things I build on my own time. Open any project for the full story, photos and
          videos.
        </p>
        <nav aria-label="Jump to a year" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <li key={g.id}>
                <a
                  href={`#year-${g.id}`}
                  className="block rounded-full border border-line px-4 py-2 text-sm text-mist transition-colors hover:border-sage hover:text-bone"
                >
                  {g.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-6">
        {groups.map((g) => (
          <section
            key={g.id}
            id={`year-${g.id}`}
            aria-labelledby={`year-${g.id}-title`}
            className="scroll-mt-6 overflow-x-clip pt-16"
          >
            <div className="mx-auto mb-8 flex max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-6 sm:px-10">
              <h3 id={`year-${g.id}-title`} className="font-wide text-2xl font-semibold text-sage">
                {g.label}
              </h3>
              <p className="text-mist">{g.blurb}</p>
            </div>
            <Carousel
              label={`${g.label} projects`}
              projects={g.items}
              onOpen={(project, videos) => setOpen({ project, videos: !!videos })}
            />
          </section>
        ))}
      </div>

      <ProjectDialog project={open?.project ?? null} focusVideos={!!open?.videos} onClose={() => setOpen(null)} />
    </section>
  )
}
