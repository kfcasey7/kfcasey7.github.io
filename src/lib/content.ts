// Loads the JSON files in src/content (edited through the /admin dashboard) and
// turns them into the shapes the components use. Empty optional fields from the
// dashboard arrive as "" or null, so everything optional is normalised here.

import profileJson from '../content/profile.json'
import experienceJson from '../content/experience.json'
import skillsJson from '../content/skills.json'
import sectionsJson from '../content/sections.json'

// ── helpers ─────────────────────────────────────────────────
const text = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')
const opt = (v: unknown): string | undefined => text(v) || undefined
const list = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : [])
const strings = (v: unknown): string[] => list<unknown>(v).map(text).filter(Boolean)

/** Turns "/media/x.webp" or "media/x.webp" into a URL that works under any base path. */
export function asset(path: unknown): string {
  const p = text(path)
  if (!p) return ''
  if (/^(https?:)?\/\//.test(p) || p.startsWith('data:')) return p
  return import.meta.env.BASE_URL + p.replace(/^\.?\//, '')
}

const isVideo = (p: string) => /\.(mp4|webm|mov|m4v)$/i.test(p)

// ── profile ─────────────────────────────────────────────────
type RawProfile = typeof profileJson
const rp = profileJson as Partial<RawProfile> & Record<string, unknown>

export const profile = {
  name: text(rp.name),
  roles: strings(rp.roles),
  tagline: text(rp.tagline),
  email: text(rp.email),
  linkedin: text(rp.linkedin),
  github: text(rp.github),
  resume: asset(rp.resume),
  headshot: { src: asset(rp.headshot?.image), alt: text(rp.headshot?.alt) },
  bio: strings(rp.bio),
  stats: list<{ value?: string; label?: string }>(rp.stats)
    .map((s) => ({ value: text(s.value), label: text(s.label) }))
    .filter((s) => s.value),
  education: {
    school: text(rp.education?.school),
    degree: text(rp.education?.degree),
    detail: text(rp.education?.detail),
    period: text(rp.education?.period),
  },
}

// ── experience ──────────────────────────────────────────────
export type ExperienceIcon = 'truck' | 'users' | 'bot' | 'tent' | 'briefcase' | 'award'
export type ExperienceItem = {
  title: string
  org: string
  place: string
  period: string
  icon: ExperienceIcon
  points: string[]
}

export const experience: ExperienceItem[] = list<Record<string, unknown>>(experienceJson.items).map((e) => ({
  title: text(e.title),
  org: text(e.org),
  place: text(e.place),
  period: text(e.period),
  icon: (text(e.icon) || 'briefcase') as ExperienceIcon,
  points: strings(e.points),
}))

// ── skills ──────────────────────────────────────────────────
export type SkillIcon = 'bot' | 'circuit' | 'code' | 'ruler' | 'waves'
export type SkillGroup = { name: string; blurb: string; icon: SkillIcon; skills: string[] }

export const skillGroups: SkillGroup[] = list<Record<string, unknown>>(skillsJson.groups).map((g) => ({
  name: text(g.name),
  blurb: text(g.blurb),
  icon: (text(g.icon) || 'code') as SkillIcon,
  skills: strings(g.skills),
}))

// ── projects ────────────────────────────────────────────────
export type YearId = 'freshman' | 'sophomore' | 'junior' | 'senior' | 'personal'

export const years: { id: YearId; label: string; blurb: string }[] = list<Record<string, unknown>>(
  sectionsJson.years,
).map((y) => ({ id: text(y.id) as YearId, label: text(y.label), blurb: text(y.blurb) }))

export type Media =
  | { type: 'image'; src: string; thumb: string; alt: string; caption: string }
  | { type: 'clip'; src: string; poster: string; alt: string; caption: string }

export type Project = {
  id: string
  year: YearId
  order: number
  title: string
  course?: string
  period: string
  role: string
  highlight?: string
  status?: string
  summary: string
  problem: string
  approach: string
  result: string
  tags: string[]
  cover?: { src: string; alt: string; fit?: 'cover' | 'contain' }
  coverIcon?: 'book' | 'truck'
  gallery: Media[]
  videos?: { src: string; poster: string; title: string }[]
  links?: { label: string; href: string }[]
}

const files = import.meta.glob('../content/projects/*.json', { eager: true, import: 'default' })

export const projects: Project[] = Object.entries(files)
  .map(([path, raw]) => {
    const p = raw as Record<string, unknown>
    const cover = p.cover as Record<string, unknown> | undefined
    const coverSrc = asset(cover?.image)
    const icon = text(p.coverIcon)
    return {
      id: path.split('/').pop()!.replace(/\.json$/, ''),
      year: text(p.year) as YearId,
      order: Number(p.order) || 99,
      title: text(p.title),
      course: opt(p.course),
      period: text(p.period),
      role: text(p.role),
      highlight: opt(p.highlight),
      status: opt(p.status),
      summary: text(p.summary),
      problem: text(p.problem),
      approach: text(p.approach),
      result: text(p.result),
      tags: strings(p.tags),
      cover: coverSrc
        ? { src: coverSrc, alt: text(cover?.alt), fit: text(cover?.fit) === 'contain' ? 'contain' : 'cover' }
        : undefined,
      coverIcon: icon === 'book' || icon === 'truck' ? icon : undefined,
      gallery: list<Record<string, unknown>>(p.gallery)
        .filter((m) => text(m.file))
        .map((m): Media => {
          const src = asset(m.file)
          const alt = text(m.alt) || text(m.caption)
          const caption = text(m.caption) || alt
          return isVideo(src)
            ? { type: 'clip', src, poster: asset(m.poster), alt, caption }
            : { type: 'image', src, thumb: asset(m.thumb) || src, alt, caption }
        }),
      videos: list<Record<string, unknown>>(p.videos)
        .filter((v) => text(v.file))
        .map((v) => ({ src: asset(v.file), poster: asset(v.poster), title: text(v.title) })),
      links: list<Record<string, unknown>>(p.links)
        .filter((l) => text(l.url))
        .map((l) => ({ label: text(l.label) || 'Open link', href: text(l.url) })),
    } satisfies Project
  })
  .filter((p) => p.title && p.year)
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
