import { GraduationCap } from 'lucide-react'
import { profile } from '../lib/content'
import { Section } from './Section'

export function About() {
  return (
    <Section id="about" title="About me">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <figure className="relative mx-auto w-full max-w-sm self-start lg:max-w-none">
          <div aria-hidden="true" className="absolute -inset-3 rounded-[28px] border border-sage/25" />
          <img
            src={profile.headshot.src}
            alt={profile.headshot.alt}
            width={1086}
            height={1448}
            loading="lazy"
            className="relative aspect-[4/5] w-full rounded-[22px] object-cover object-top grayscale-[15%]"
          />
        </figure>

        <div>
          <div className="grid gap-3 sm:grid-cols-3">
            {profile.stats.map((s) => (
              <div key={s.value} className="rounded-2xl border border-line bg-panel px-5 py-5">
                <p className="font-wide text-xl font-semibold text-sage">{s.value}</p>
                <p className="mt-1 text-sm leading-snug text-mist">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-[62ch] space-y-5 text-[1.075rem] text-bone/90">
            {profile.bio.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-4 border-t border-line pt-8">
            <GraduationCap className="mt-1 size-5 shrink-0 text-sage" aria-hidden="true" />
            <div>
              <p className="font-medium text-bone">{profile.education.school}</p>
              <p className="text-mist">{profile.education.degree}</p>
              <p className="text-sm text-mist">
                {[profile.education.detail, profile.education.period].filter(Boolean).join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
