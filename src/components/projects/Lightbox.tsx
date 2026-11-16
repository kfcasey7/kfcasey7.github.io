import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Media } from '../../data/projects'

type Props = {
  items: Media[]
  index: number | null
  onIndex: (i: number) => void
  onClose: () => void
}

export function Lightbox({ items, index, onIndex, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (index !== null && !d.open) d.showModal()
    if (index === null && d.open) d.close()
  }, [index])

  const item = index !== null ? items[index] : null
  const prev = () => index !== null && onIndex((index - 1 + items.length) % items.length)
  const next = () => index !== null && onIndex((index + 1) % items.length)

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'ArrowRight') next()
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      aria-label="Image viewer"
      className="m-auto h-svh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink/95"
    >
      {item && (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-4 py-16" onClick={(e) => e.target === e.currentTarget && onClose()}>
          {item.type === 'image' ? (
            <img src={item.src} alt={item.alt} className="max-h-[78svh] max-w-full rounded-xl bg-[#eef2ef] object-contain" />
          ) : (
            <video
              key={item.src}
              src={item.src}
              poster={item.poster}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="max-h-[78svh] max-w-full rounded-xl"
            />
          )}
          <p className="max-w-2xl text-center text-bone/90">
            {item.caption}
            <span className="ml-3 text-sm text-mist">
              {index! + 1} / {items.length}
            </span>
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="fixed right-4 top-4 rounded-full border border-line bg-panel p-2.5 text-bone hover:border-sage"
      >
        <X className="size-5" aria-hidden="true" />
      </button>
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="fixed left-3 top-1/2 -translate-y-1/2 rounded-full border border-line bg-panel p-2.5 text-bone hover:border-sage"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="fixed right-3 top-1/2 -translate-y-1/2 rounded-full border border-line bg-panel p-2.5 text-bone hover:border-sage"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </>
      )}
    </dialog>
  )
}
