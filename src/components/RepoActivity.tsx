import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { fetchRepoEvents, type GitHubEvent } from '../data/github'
import { GitCommit, GitPullRequest, Star, GitBranch, Users } from 'lucide-react'

dayjs.extend(relativeTime)

function EventIcon({ type }: { type: string }) {
  if (type.includes('PullRequest')) return <GitPullRequest size={16} />
  if (type.includes('Push')) return <GitCommit size={16} />
  if (type.includes('Create')) return <GitBranch size={16} />
  if (type.includes('Watch')) return <Star size={16} />
  return <Users size={16} />
}

export default function RepoActivity({ fullName }: { fullName: string }) {
  const [events, setEvents] = useState<GitHubEvent[] | null>(null)

  useEffect(() => {
    setEvents(null)
    fetchRepoEvents(fullName).then(setEvents).catch(() => setEvents([]))
  }, [fullName])

  if (!fullName) return null

  return (
    <div className="card-surface p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">Repository Activity</h3>
        <a className="text-sm text-accent hover:underline" target="_blank" href={`https://github.com/${fullName}`}>View on GitHub</a>
      </div>
      <div className="grid gap-3">
        {(events ?? new Array(4).fill(null)).slice(0, 10).map((ev, idx) => (
          <div key={ev ? ev.id : idx} className="flex gap-3 items-start">
            <div className="mt-1 text-zinc-300">
              <EventIcon type={ev?.type ?? ''} />
            </div>
            <div className="min-w-0">
              <div className="text-sm text-zinc-200">
                {ev ? ev.type : 'Loading…'}
              </div>
              <div className="text-xs text-zinc-500">
                {ev ? dayjs(ev.created_at).fromNow() : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 