import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, LoaderCircle, Mail, Send } from 'lucide-react'
import { profile } from '../lib/content'
import { Section } from './Section'

type Status = 'idle' | 'sending' | 'sent' | 'error'

// Messages are delivered by FormSubmit (free, no account). The very first message
// sends an activation email to the address below; confirm it once and later
// messages arrive normally.
const endpoint = `https://formsubmit.co/ajax/${profile.email}`

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: 'New message from your portfolio site', _template: 'table' }),
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const field =
    'mt-2 w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-bone placeholder:text-mist/60 transition-colors focus:border-sage focus:outline-none'

  return (
    <Section id="contact" title="Let's talk" intro="Hiring for a robotics or product-development role, or want to compare notes on a build? Send a message.">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="space-y-4">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-sage"
          >
            <span className="flex items-center gap-4">
              <Mail className="size-5 text-sage" aria-hidden="true" />
              <span>
                <span className="block text-sm text-mist">Email</span>
                <span className="block break-all text-bone">{profile.email}</span>
              </span>
            </span>
            <ArrowUpRight className="size-5 shrink-0 text-mist group-hover:text-sage" aria-hidden="true" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-sage"
          >
            <span>
              <span className="block text-sm text-mist">LinkedIn</span>
              <span className="block text-bone">Keller Casey</span>
            </span>
            <ArrowUpRight className="size-5 shrink-0 text-mist group-hover:text-sage" aria-hidden="true" />
          </a>
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-sage"
            >
              <span>
                <span className="block text-sm text-mist">GitHub</span>
                <span className="block text-bone">{profile.github.replace(/^https?:\/\//, '')}</span>
              </span>
              <ArrowUpRight className="size-5 shrink-0 text-mist group-hover:text-sage" aria-hidden="true" />
            </a>
          )}
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-line bg-panel p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm text-mist">
              Name
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <label className="block text-sm text-mist">
              Email
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>
          </div>
          <label className="mt-5 block text-sm text-mist">
            Message
            <textarea name="message" required rows={5} className={`${field} resize-y`} />
          </label>
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 rounded-full bg-sage px-7 py-3 font-medium text-ink transition-colors hover:bg-bone disabled:opacity-60"
            >
              {status === 'sending' ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="size-4" aria-hidden="true" />
              )}
              {status === 'sending' ? 'Sending' : 'Send message'}
            </button>
            <p role="status" className="text-sm">
              {status === 'sent' && (
                <span className="inline-flex items-center gap-1.5 text-sage">
                  <Check className="size-4" aria-hidden="true" /> Message sent. I'll reply by email.
                </span>
              )}
              {status === 'error' && (
                <span className="text-[#e3a58f]">
                  The message didn't send. Email me directly at {profile.email}.
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </Section>
  )
}
