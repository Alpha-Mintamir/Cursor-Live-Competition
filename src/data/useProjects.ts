import { useEffect, useState } from 'react'
import type { Project } from './projects'
import { projects as fallback } from './projects'
import { loadProjectsFromCsv } from './loadFromCsv'

export function useProjects() {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    loadProjectsFromCsv()
      .then((list) => {
        if (!mounted) return
        // If CSV is empty for any reason, use fallback
        setProjects(list.length ? list : fallback)
      })
      .catch((e) => {
        console.warn('Falling back to local dataset due to CSV error', e)
        if (!mounted) return
        setError(String(e))
        setProjects(fallback)
      })
    return () => {
      mounted = false
    }
  }, [])

  return { projects: projects ?? fallback, loading: projects === null, error }
} 