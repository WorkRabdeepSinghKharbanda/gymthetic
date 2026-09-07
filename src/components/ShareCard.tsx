import { useEffect, useRef } from 'react'

/** Renders a shareable PNG card (title/value/subtitle) to canvas, downloadable. */
export default function ShareCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const w = 600
    const h = 315
    canvas.width = w
    canvas.height = h

    const gradient = ctx.createLinearGradient(0, 0, w, h)
    gradient.addColorStop(0, '#f97316')
    gradient.addColorStop(1, '#7c2d12')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 22px sans-serif'
    ctx.fillText('Gymthetic', 32, 48)
    ctx.font = '600 26px sans-serif'
    ctx.fillText(title, 32, 130)
    ctx.font = 'bold 64px sans-serif'
    ctx.fillText(value, 32, 210)
    ctx.font = '400 18px sans-serif'
    ctx.fillText(subtitle, 32, 250)
  }, [title, value, subtitle])

  function download() {
    const canvas = canvasRef.current
    if (!canvas) return
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = 'gymthetic-share.png'
    a.click()
  }

  return (
    <div className="mt-3">
      <canvas ref={canvasRef} className="w-full max-w-sm rounded-lg" />
      <button
        onClick={download}
        className="mt-2 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
      >
        Download image
      </button>
    </div>
  )
}
