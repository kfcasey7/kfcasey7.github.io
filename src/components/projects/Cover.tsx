import { BookOpenText, Truck } from 'lucide-react'
import type { Project } from '../../data/projects'

// Image cover, or a drawn cover for projects without shareable photos.
export function Cover({ project, className = '' }: { project: Project; className?: string }) {
  if (project.cover) {
    const contain = project.cover.fit === 'contain'
    return (
      <div className={`overflow-hidden ${contain ? 'bg-[#eef2ef] p-3' : 'bg-panel-2'} ${className}`}>
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`h-full w-full ${contain ? 'object-contain' : 'object-cover'}`}
        />
      </div>
    )
  }
  const Icon = project.coverIcon === 'truck' ? Truck : BookOpenText
  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_55%,#2a3f33_0%,#18241e_55%,#141d19_100%)] ${className}`}
    >
      {[220, 160, 100].map((s) => (
        <span
          key={s}
          className="absolute rounded-full border border-sage/15"
          style={{ width: s, height: s }}
        />
      ))}
      <span className="relative flex size-16 items-center justify-center rounded-2xl border border-sage/40 bg-ink/60 text-sage">
        <Icon className="size-8" strokeWidth={1.5} />
      </span>
    </div>
  )
}
