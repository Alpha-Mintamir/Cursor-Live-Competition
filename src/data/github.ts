export interface GitHubEvent {
  id: string
  type: string
  repo: { name: string; url: string }
  actor: { login: string; avatar_url: string }
  created_at: string
  payload?: any
}

export const ORG = 'Ethiopian-Cursor-Community'
let cache: { ts: number; data: GitHubEvent[] } | null = null

export async function fetchOrgEvents(): Promise<GitHubEvent[]> {
  const now = Date.now()
  if (cache && now - cache.ts < 5 * 60 * 1000) {
    return cache.data
  }

  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`https://api.github.com/orgs/${ORG}/events`, { headers })
  if (!res.ok) {
    console.warn('GitHub events request failed', res.status)
    return []
  }
  const data = (await res.json()) as GitHubEvent[]
  cache = { ts: Date.now(), data }
  return data
}

export async function fetchRepoEvents(fullName: string): Promise<GitHubEvent[]> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`https://api.github.com/repos/${fullName}/events`, { headers })
  if (!res.ok) {
    console.warn('GitHub repo events failed', res.status, fullName)
    return []
  }
  return (await res.json()) as GitHubEvent[]
}

export interface CommitActivityWeek { week: number; total: number; days: number[] }

async function fetchCommitsFallback(fullName: string): Promise<CommitActivityWeek[]> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`

  const since = new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString() // last ~26 weeks
  const url = `https://api.github.com/repos/${fullName}/commits?since=${encodeURIComponent(since)}&per_page=100`
  const res = await fetch(url, { headers })
  if (!res.ok) {
    console.warn('Commits fallback failed', res.status, fullName)
    return []
  }
  const commits: Array<{ commit: { author?: { date?: string } } }> = await res.json()
  const weekToTotal = new Map<number, number>()
  for (const c of commits) {
    const iso = c?.commit?.author?.date
    if (!iso) continue
    const t = Date.parse(iso)
    if (Number.isNaN(t)) continue
    const weekIdx = Math.floor(t / (7 * 24 * 60 * 60 * 1000)) // coarse week bucket
    weekToTotal.set(weekIdx, (weekToTotal.get(weekIdx) ?? 0) + 1)
  }
  const entries = Array.from(weekToTotal.entries()).sort((a, b) => a[0] - b[0])
  return entries.map(([weekIdx, total]) => ({ week: weekIdx, total, days: [] }))
}

export async function fetchRepoCommitActivity(fullName: string): Promise<CommitActivityWeek[]> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`
  const url = `https://api.github.com/repos/${fullName}/stats/commit_activity`

  // Retry up to 5 times with backoff if stats are being generated (202) or empty
  const attempt = async (): Promise<Response> => fetch(url, { headers })
  let data: CommitActivityWeek[] = []
  for (let i = 0; i < 5; i++) {
    let res = await attempt()
    if (res.status === 202) {
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)))
      continue
    }
    if (!res.ok) break
    const json = await res.json()
    if (Array.isArray(json) && json.length > 0) {
      data = json as CommitActivityWeek[]
      break
    }
    await new Promise((r) => setTimeout(r, 800 * (i + 1)))
  }

  if (data.length > 0) return data

  // Fallback to commit listing
  return await fetchCommitsFallback(fullName)
}

export interface RecentCommit { iso: string }

export async function fetchRepoRecentCommits(fullName: string, hours: number = 36): Promise<RecentCommit[]> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`
  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()
  const url = `https://api.github.com/repos/${fullName}/commits?since=${encodeURIComponent(since)}&per_page=200`
  const res = await fetch(url, { headers })
  if (!res.ok) {
    console.warn('Recent commits failed', res.status, fullName)
    return []
  }
  const commits: Array<{ commit: { author?: { date?: string } } }> = await res.json()
  return commits
    .map((c) => ({ iso: c?.commit?.author?.date || '' }))
    .filter((c) => !!c.iso)
}

export async function fetchRepoCommitsBetween(fullName: string, sinceISO: string, untilISO: string): Promise<RecentCommit[]> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`
  const url = `https://api.github.com/repos/${fullName}/commits?since=${encodeURIComponent(sinceISO)}&until=${encodeURIComponent(untilISO)}&per_page=200`
  const res = await fetch(url, { headers })
  if (!res.ok) {
    console.warn('Commits between failed', res.status, fullName)
    return []
  }
  const commits: Array<{ commit: { author?: { date?: string } } }> = await res.json()
  return commits
    .map((c) => ({ iso: c?.commit?.author?.date || '' }))
    .filter((c) => !!c.iso)
} 