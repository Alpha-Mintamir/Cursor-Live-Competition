import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'

interface CarouselProps {
  items: Project[]
}

export default function Carousel({ items }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const current = items[index]

  function next() {
    setIndex((i) => (i + 1) % items.length)
  }
  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length)
  }

  if (!items.length) return null

  const maxChars = 160
  const isLong = current.description.length > maxChars
  const shortDesc = isLong ? current.description.slice(0, maxChars) + '…' : current.description

  return (
    <div id="winners" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="relative card-surface overflow-hidden">
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
          <button aria-label="Previous" onClick={prev} className="h-10 w-10 rounded-full bg-black/30 ring-1 ring-white/10 hover:bg-black/50">‹</button>
          <button aria-label="Next" onClick={next} className="h-10 w-10 rounded-full bg-black/30 ring-1 ring-white/10 hover:bg-black/50">›</button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-video w-full bg-zinc-900/60 flex items-center justify-center">
            {current.image ? (
              <img src={current.image} alt={current.title} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="text-zinc-600">No preview</div>
            )}
          </div>
          <div className="p-6">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-sm text-zinc-400">
                  {current.winnerRank ? `Winner #${current.winnerRank}` : 'Featured'}
                </div>
                <h3 className="mt-2 text-2xl font-semibold">{current.title}</h3>
                <p className="mt-2 text-zinc-300">{shortDesc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {current.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Link to={`/projects/${current.slug}`} className="button-primary">View Project</Link>
                  <a href={current.githubUrl} target="_blank" className="inline-flex items-center rounded-lg px-4 py-2 font-medium text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800/40">GitHub</a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
} 