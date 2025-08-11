import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { fetchOrgEvents, type GitHubEvent } from '../data/github'
import { GitCommit, GitPullRequest, Star, GitBranch, Users } from 'lucide-react'

dayjs.extend(relativeTime)

function EventIcon({ type }: { type: string }) {
  if (type.includes('PullRequest')) return <GitPullRequest size={16} />
  if (type.includes('Push')) return <GitCommit size={16} />
  if (type.includes('Create')) return <GitBranch size={16} />
  if (type.includes('Watch')) return <Star size={16} />
  return <Users size={16} />
}

export default function GithubActivity() {
  const [events, setEvents] = useState<GitHubEvent[] | null>(null)

  useEffect(() => {
    fetchOrgEvents().then(setEvents).catch(() => setEvents([]))
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Latest GitHub Activity</h2>
        <p className="text-zinc-400">From the Ethiopian Cursor Community org</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {(events ?? new Array(4).fill(null)).slice(0, 8).map((ev, idx) => (
          <div key={ev ? ev.id : idx} className="card-surface p-4 flex gap-3 items-start">
            <div className="mt-1 text-zinc-300">
              <EventIcon type={ev?.type ?? ''} />
            </div>
            <div className="min-w-0">
              <div className="text-sm text-zinc-400">
                {ev ? ev.type : 'Loading…'}
              </div>
              <div className="truncate">
                {ev ? (
                  <a className="text-zinc-200 hover:text-white" href={`https://github.com/${ev.repo.name}`} target="_blank">
                    {ev.repo.name}
                  </a>
                ) : (
                  <span className="text-zinc-500">—</span>
                )}
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                {ev ? dayjs(ev.created_at).fromNow() : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-zinc-400">
        View org on GitHub: {' '}
        <a className="text-accent hover:underline" target="_blank" href="https://github.com/Ethiopian-Cursor-Community/">github.com/Ethiopian-Cursor-Community</a>
      </div>
    </section>
  )
} 