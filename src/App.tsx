import { About } from './components/About'
import { BottomNav, SideRail, TopBar } from './components/Chrome'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Projects } from './components/projects/Projects'
import { Skills } from './components/Skills'
import { profile } from './data/profile'

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="sr-only z-50 rounded-full bg-sage px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <TopBar />
      <SideRail />
      <main>
        <Hero />
        <div className="paper">
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </main>
      <footer className="border-t border-line pb-32 pt-10">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-6 text-sm text-mist sm:px-10">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>Robotics Engineering, University of Hartford</p>
        </div>
      </footer>
      <BottomNav />
    </>
  )
}
