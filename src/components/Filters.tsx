import { useMemo } from 'react'
import type { Project } from '../data/projects'

interface FiltersProps {
  allProjects: Project[]
  selectedTag: string | null
  onTagChange: (tag: string | null) => void
  search: string
  onSearchChange: (value: string) => void
}

export default function Filters({ allProjects, selectedTag, onTagChange, search, onSearchChange }: FiltersProps) {
  const tags = useMemo(() => {
    const s = new Set<string>()
    allProjects.forEach((p) => p.tags.forEach((t) => s.add(t)))
    return Array.from(s).sort()
  }, [allProjects])

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        <button
          className={`tag ${selectedTag === null ? 'ring-accent text-white' : ''}`}
          onClick={() => onTagChange(null)}
        >
          All
        </button>
        {tags.map((t) => (
          <button key={t} className={`tag hover:ring-accent hover:text-white ${selectedTag === t ? 'ring-accent text-white' : ''}`} onClick={() => onTagChange(t)}>
            {t}
          </button>
        ))}
      </div>
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by title…"
        className="w-full md:w-72 rounded-lg bg-zinc-900/60 px-3 py-2 text-sm ring-1 ring-zinc-800 placeholder:text-zinc-500 focus:outline-none focus:ring-accent"
      />
    </div>
  )
} 