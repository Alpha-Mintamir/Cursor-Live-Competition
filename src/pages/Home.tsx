import Hero from '../components/Hero'
import Carousel from '../components/Carousel'
import { useProjects } from '../data/useProjects'
import Judges from '../components/Judges'

export default function Home() {
  const { projects, loading } = useProjects()
  const winners = projects.slice(0, 3)
  return (
    <div>
      <Hero />

      {/* Event announcement */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="card-surface p-4 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm text-zinc-400">Ethiopian Cursor Community</div>
              <h2 className="text-xl font-semibold">Cursor Live Building Competition</h2>
              <p className="mt-1 text-zinc-300">
                We hosted a Cursor Live Building Competition using Cursor and GPT-5.
              </p>
              <p className="text-zinc-300">
                Time: 5:00 PM – 9:00 PM (11:00 – 3:00 LT). Prizes were awarded to the top performers.
              </p>
              <p className="text-zinc-400 text-sm mt-1">
                From 100+ registrations, 30 participants were selected based on first‑come‑first‑served order and GitHub profile review, with priority for those who missed the previous in‑person hackathon.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
          <h2 className="text-2xl font-semibold">Top Winners</h2>
          <p className="text-zinc-400">Featured highlights from the challenge</p>
        </div>
        {loading ? (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">Loading…</div>
        ) : (
          <Carousel items={winners} />
        )}
      </div>

      <Judges />
    </div>
  )
} 