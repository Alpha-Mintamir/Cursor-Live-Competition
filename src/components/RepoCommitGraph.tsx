import { useEffect, useState } from 'react'
import { fetchRepoCommitsBetween } from '../data/github'
import { EVENT_DAY_ISO, EVENT_TZ_OFFSET } from '../data/config'

export default function RepoCommitGraph({ fullName }: { fullName: string }) {
  const [hourBins, setHourBins] = useState<number[] | null>(null)

  useEffect(() => {
    let cancelled = false
    setHourBins(null)

    const startISO = `${EVENT_DAY_ISO}T00:00:00${EVENT_TZ_OFFSET}`
    const endISO = `${EVENT_DAY_ISO}T23:59:59${EVENT_TZ_OFFSET}`

    fetchRepoCommitsBetween(fullName, startISO, endISO)
      .then((recent) => {
        if (cancelled) return
        const bins = new Array(24).fill(0)
        const startUtc = Date.parse(startISO)
        for (const r of recent) {
          const t = Date.parse(r.iso)
          if (Number.isNaN(t)) continue
          const h = Math.floor((t - startUtc) / (60 * 60 * 1000))
          if (h >= 0 && h < 24) bins[h] += 1
        }
        setHourBins(bins)
      })
      .catch(() => {
        if (!cancelled) setHourBins(new Array(24).fill(0))
      })

    return () => { cancelled = true }
  }, [fullName])

  const data = Array.isArray(hourBins) ? hourBins : new Array(24).fill(0)
  const max = Math.max(1, ...data)
  const width = 24 * 14
  const height = 80

  return (
    <div className="card-surface p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">Commit History (event day)</h3>
        <a className="text-sm text-accent hover:underline" target="_blank" href={`https://github.com/${fullName}`}>Repo</a>
      </div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="max-w-full">
        {data.map((v, i) => {
          const barHeight = Math.round((v / max) * (height - 20))
          const x = i * 14 + 4
          const y = height - barHeight - 10
          return (
            <g key={i}>
              <rect x={x} y={y} width={10} height={barHeight} rx={2} className="fill-[var(--accent)]/80" />
            </g>
          )
        })}
      </svg>
      <div className="mt-2 text-xs text-zinc-500">Hours 0–23 for {EVENT_DAY_ISO} (UTC{EVENT_TZ_OFFSET})</div>
    </div>
  )
} 