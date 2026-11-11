import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { Pause, Play } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

type CaseVideoProps = {
  src: string
  poster: string
  /** What the clip shows; read by screen readers (the visible caption lives in the parent figure). */
  label: string
  width: number
  height: number
  className?: string
}

/**
 * A muted, looping screen recording of a prototype.
 * - Plays only while a good part of it is on screen, and loads nothing until then.
 * - With reduced motion it never autoplays: the poster shows and the button starts it.
 * - The pause button is always there (WCAG 2.2.2), and a manual pause sticks while scrolling.
 */
export function CaseVideo({ src, poster, label, width, height, className }: CaseVideoProps) {
  const { t } = useTranslation()
  const ref = useRef<HTMLVideoElement>(null)
  const pausedByUser = useRef(false)
  const reducedMotion = useReducedMotion()
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video || reducedMotion) return
    // A tall clip on a short screen may never be half visible, so a third is enough to start it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.33 && !pausedByUser.current) video.play().catch(() => {})
        else if (!entry.isIntersecting) video.pause()
      },
      { threshold: [0, 0.33] },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [reducedMotion])

  const toggle = () => {
    const video = ref.current
    if (!video) return
    if (video.paused) {
      pausedByUser.current = false
      video.play().catch(() => {})
    } else {
      pausedByUser.current = true
      video.pause()
    }
  }

  return (
    <div className={cn("relative", className)}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        width={width}
        height={height}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block w-full h-auto rounded-lg border bg-white"
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? t("a11y.pause_video") : t("a11y.play_video")}
        className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/75 text-white shadow-lg backdrop-blur transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4 translate-x-px" aria-hidden="true" />}
      </button>
    </div>
  )
}
