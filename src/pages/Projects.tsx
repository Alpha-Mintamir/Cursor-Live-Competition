import { useMemo, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import Filters from '../components/Filters'
import { useProjects } from '../data/useProjects'

export default function Projects() {
  const { projects, loading } = useProjects()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const okTag = selectedTag ? p.tags.includes(selectedTag) : true
      const okSearch = p.title.toLowerCase().includes(search.toLowerCase())
      return okTag && okSearch
    })
  }, [projects, selectedTag, search])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Projects Gallery</h1>
        <p className="text-zinc-400">Browse entries from the Virtual Cursor + GPT-5 Build Challenge</p>
      </div>

      <Filters
        allProjects={projects}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        search={search}
        onSearchChange={setSearch}
      />

      {loading ? (
        <div className="mt-8">Loading…</div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  )
} 