import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Play, Trophy, X } from 'lucide-react'
import type { Media, Project } from '../../data/projects'
import { Lightbox } from './Lightbox'

type Props = {
  project: Project | null
  focusVideos: boolean
  onClose: () => void
}

export function ProjectDialog({ project, focusVideos, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const videosRef = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) {
      dialog.showModal()
      dialog.scrollTop = 0
      if (focusVideos) requestAnimationFrame(() => videosRef.current?.scrollIntoView({ block: 'start' }))
    }
    if (!project && dialog.open) dialog.close()
  }, [project, focusVideos])

  const blocks = project
    ? [
        { label: 'Problem', text: project.problem },
        { label: 'Approach', text: project.approach },
        { label: project.status ? 'Where it stands' : 'Result', text: project.result },
      ]
    : []

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      aria-labelledby="project-title"
      className="m-auto max-h-[92svh] w-[min(94vw,60rem)] overflow-y-auto overscroll-contain rounded-[26px] border border-line bg-panel p-0 text-bone backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="relative px-6 pb-10 pt-8 sm:px-10 sm:pt-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="sticky top-0 float-right -mr-2 -mt-2 rounded-full border border-line bg-panel p-2 text-mist transition-colors hover:border-sage hover:text-bone"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <p className="text-sm text-sage-dim">
            {project.course ? `${project.course}, ` : ''}
            {project.period}
          </p>
          <h2 id="project-title" className="font-widest mt-2 max-w-[22ch] text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.01em]">
            {project.title}
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full border border-line px-3 py-1 text-mist">{project.role}</span>
            {project.status && <span className="rounded-full bg-sage/15 px-3 py-1 text-sage">{project.status}</span>}
          </div>
          {project.highlight && (
            <p className="mt-5 flex items-center gap-2 font-medium text-sage">
              <Trophy className="size-5" aria-hidden="true" />
              {project.highlight}
            </p>
          )}
          <p className="mt-6 max-w-[60ch] text-lg text-bone">{project.summary}</p>

          <dl className="mt-10 space-y-8">
            {blocks.map((b) => (
              <div key={b.label} className="grid gap-2 border-t border-line pt-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="font-wide font-semibold text-sage">{b.label}</dt>
                <dd className="max-w-[64ch] text-bone/85">{b.text}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.map((t) => (
              <li key={t} className="rounded-full border border-line bg-ink/60 px-3 py-1.5 text-sm text-bone/90">
                {t}
              </li>
            ))}
          </ul>

          {project.links?.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-sage px-5 py-2 text-sm font-medium text-ink hover:bg-bone"
                >
                  {l.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : null}

          {project.videos?.length ? (
            <div ref={videosRef} className="mt-12 scroll-mt-6">
              <h3 className="font-wide text-lg font-semibold">Demo videos</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {project.videos.map((v) => (
                  <figure key={v.src}>
                    <video
                      controls
                      playsInline
                      muted
                      preload="none"
                      poster={v.poster}
                      className="aspect-[9/16] w-full rounded-2xl bg-ink object-cover"
                    >
                      <source src={v.src} type="video/mp4" />
                    </video>
                    <figcaption className="mt-2 text-sm text-mist">{v.title}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ) : null}

          {project.gallery.length ? (
            <div className="mt-12">
              <h3 className="font-wide text-lg font-semibold">Gallery</h3>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.gallery.map((m, i) => (
                  <li key={m.src}>
                    <GalleryThumb media={m} onOpen={() => setLightbox(i)} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Lightbox
            items={project.gallery}
            index={lightbox}
            onIndex={setLightbox}
            onClose={() => setLightbox(null)}
          />
        </div>
      )}
    </dialog>
  )
}

function GalleryThumb({ media, onOpen }: { media: Media; onOpen: () => void }) {
  const src = media.type === 'image' ? media.thumb : media.poster
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-[#eef2ef]"
    >
      <img
        src={src}
        alt={media.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      {media.type === 'clip' && (
        <span className="absolute inset-0 flex items-center justify-center bg-ink/30">
          <span className="rounded-full bg-ink/80 p-3 text-sage">
            <Play className="size-5 fill-current" aria-hidden="true" />
          </span>
        </span>
      )}
      <span className="sr-only">Enlarge: {media.caption}</span>
    </button>
  )
}
