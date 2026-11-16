import { useEffect, useRef } from 'react'

// A slow-drifting node network drawn on canvas. Nodes near the pointer link up
// more strongly. With reduced motion it draws a single still frame.
export function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    const pointer = { x: -9999, y: -9999 }
    type Node = { x: number; y: number; vx: number; vy: number; r: number }
    let nodes: Node[] = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(90, Math.max(28, (w * h) / 16000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.8,
      }))
    }

    const link = 150
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < -20) n.x = w + 20
          if (n.x > w + 20) n.x = -20
          if (n.y < -20) n.y = h + 20
          if (n.y > h + 20) n.y = -20
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < link) {
            const mx = (a.x + b.x) / 2 - pointer.x
            const my = (a.y + b.y) / 2 - pointer.y
            const near = Math.max(0, 1 - Math.hypot(mx, my) / 220)
            const alpha = (1 - d / link) * (0.16 + near * 0.5)
            ctx.strokeStyle = `rgba(163,191,168,${alpha.toFixed(3)})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(163,191,168,0.55)'
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      if (reduce) draw()
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    // Pause the loop while the hero is off screen
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      if (entry.isIntersecting && !reduce) raf = requestAnimationFrame(draw)
    })

    resize()
    draw()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
