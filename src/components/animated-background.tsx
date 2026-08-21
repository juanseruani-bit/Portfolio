import { useEffect, useRef } from "react"

/**
 * Animated mesh gradient background with dot grid overlay.
 * Designed to sit behind the hero section and fade out below.
 */
export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Mesh gradient blobs */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Primary indigo blob — top-right */}
        <div
          className="absolute -top-1/4 -right-1/4 h-[800px] w-[800px] rounded-full opacity-30 dark:opacity-20 blur-[120px]"
          style={{
            background: "radial-gradient(circle, var(--accent-indigo) 0%, transparent 70%)",
            animation: "float-slow 20s ease-in-out infinite",
          }}
        />
        {/* Violet blob — top-left */}
        <div
          className="absolute -top-1/3 -left-1/4 h-[600px] w-[600px] rounded-full opacity-20 dark:opacity-15 blur-[100px]"
          style={{
            background: "radial-gradient(circle, var(--accent-violet) 0%, transparent 70%)",
            animation: "float-slow 25s ease-in-out infinite reverse",
          }}
        />
        {/* Teal blob — bottom-center */}
        <div
          className="absolute top-1/2 left-1/3 h-[500px] w-[500px] rounded-full opacity-15 dark:opacity-10 blur-[100px]"
          style={{
            background: "radial-gradient(circle, var(--accent-teal) 0%, transparent 70%)",
            animation: "float-slow 22s ease-in-out infinite 5s",
          }}
        />
      </div>

      {/* Dot grid pattern */}
      <DotGrid />

      {/* Fade-out at the bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background: "linear-gradient(to top, var(--background), transparent)",
        }}
      />
    </div>
  )
}

/**
 * Subtle dot grid drawn with canvas for performance.
 */
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const gap = 32
    const dotSize = 0.8

    function draw() {
      if (!canvas || !ctx) return
      const w = window.innerWidth
      const h = window.innerHeight

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)

      ctx.clearRect(0, 0, w, h)

      // Use a subtle color that adapts to theme via computed styles
      const isDark = document.documentElement.classList.contains("dark")
      ctx.fillStyle = isDark
        ? "rgba(255, 255, 255, 0.04)"
        : "rgba(0, 0, 0, 0.05)"

      for (let x = gap; x < w; x += gap) {
        for (let y = gap; y < h; y += gap) {
          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    draw()
    window.addEventListener("resize", draw)

    // Re-draw when theme changes
    const observer = new MutationObserver(draw)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => {
      window.removeEventListener("resize", draw)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-100"
      aria-hidden="true"
    />
  )
}

/* Keyframes injected via a style tag for the floating animation */
const FloatKeyframes = () => (
  <style>{`
    @keyframes float-slow {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -20px) scale(1.05); }
      66% { transform: translate(-20px, 15px) scale(0.95); }
    }
  `}</style>
)

export function AnimatedBackgroundWithKeyframes() {
  return (
    <>
      <FloatKeyframes />
      <AnimatedBackground />
    </>
  )
}
