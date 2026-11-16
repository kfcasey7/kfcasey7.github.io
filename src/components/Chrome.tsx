import { useEffect, useState } from 'react'
import { BriefcaseBusiness, Cpu, House, Mail, MessageSquare, Bot, UserRound } from 'lucide-react'
import { profile } from '../data/profile'

const items = [
  { id: 'home', label: 'Home', Icon: House },
  { id: 'about', label: 'About', Icon: UserRound },
  { id: 'experience', label: 'Experience', Icon: BriefcaseBusiness },
  { id: 'skills', label: 'Skills', Icon: Cpu },
  { id: 'projects', label: 'Projects', Icon: Bot },
  { id: 'contact', label: 'Contact', Icon: MessageSquare },
]

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return active
}

export function BottomNav() {
  const active = useActiveSection()
  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6"
    >
      <ul className="flex items-center gap-1 rounded-full border border-line/80 bg-ink/75 p-1.5 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-md">
        {items.map(({ id, label, Icon }) => {
          const isActive = active === id
          return (
            <li key={id} className="group relative">
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? 'true' : undefined}
                className={`flex size-11 items-center justify-center rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-sage text-ink' : 'text-mist hover:bg-panel-2 hover:text-bone'
                }`}
              >
                <Icon className="size-[18px]" aria-hidden="true" />
              </a>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-panel-2 px-2 py-1 text-xs text-bone opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {label}
              </span>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function SideRail() {
  const links = [
    { label: 'LinkedIn', href: profile.linkedin },
    profile.github ? { label: 'GitHub', href: profile.github } : null,
    { label: 'Email', href: `mailto:${profile.email}` },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <aside
      aria-label="Profiles"
      className="fixed bottom-0 left-6 z-30 hidden flex-col items-center gap-6 lg:flex"
    >
      <ul className="flex flex-col items-center gap-6">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="block py-1 text-sm tracking-wide text-mist transition-colors [writing-mode:vertical-rl] hover:text-sage"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <span aria-hidden="true" className="h-24 w-px bg-line" />
    </aside>
  )
}

export function TopBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <a href="#home" aria-label="Keller Casey, home" className="font-widest text-lg font-bold tracking-tight text-bone">
          KC
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-mist transition-colors hover:border-sage hover:text-bone"
        >
          <Mail className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">{profile.email}</span>
          <span className="sm:hidden">Email</span>
        </a>
      </div>
    </header>
  )
}
