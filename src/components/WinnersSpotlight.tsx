import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import ImgWithFallback from './ImgWithFallback'

interface WinnersSpotlightProps {
  items: Project[]
}

export default function WinnersSpotlight({ items }: WinnersSpotlightProps) {
  if (!items.length) return null

  // Sort by winnerRank ascending, then title
  const sorted = [...items].sort((a, b) => (a.winnerRank ?? 99) - (b.winnerRank ?? 99) || a.title.localeCompare(b.title))

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Winners Spotlight</h2>
        <p className="text-zinc-400">Top projects from the Virtual Cursor + GPT-5 Build Challenge</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => {
          // @ts-ignore runtime-only property from loader
          const candidates: string[] | undefined = (p as any).imageCandidates
          return (
            <article key={p.slug} className="relative card-surface overflow-hidden">
              <div className="absolute right-3 top-3 z-10 rounded-full bg-black/50 px-3 py-1 text-xs ring-1 ring-white/10">
                {p.winnerRank ? `#${p.winnerRank}` : 'Winner'}
              </div>
              <Link to={`/projects/${p.slug}`} className="block">
                <div className="aspect-video w-full bg-zinc-900/60">
                  {candidates && candidates.length ? (
                    <ImgWithFallback srcs={candidates} alt={p.title} className="h-full w-full object-cover" />
                  ) : p.image ? (
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-600">No preview</div>
                  )}
                </div>
              </Link>
              <div className="p-5">
                <h3 className="text-lg font-semibold">
                  <Link to={`/projects/${p.slug}`} className="hover:underline">{p.title}</Link>
                </h3>
                <p className="mt-1 line-clamp-2 text-zinc-300">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className="mt-4 flex gap-3">
                  <Link to={`/projects/${p.slug}`} className="button-primary">View</Link>
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" className="inline-flex items-center rounded-lg px-4 py-2 font-medium text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800/40">GitHub</a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
} 