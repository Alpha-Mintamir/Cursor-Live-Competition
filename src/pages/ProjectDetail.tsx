import { useParams, Link } from 'react-router-dom'
import { useProjects } from '../data/useProjects'
import RepoCommitGraph from '../components/RepoCommitGraph'
import { fullNameFromGithubUrl } from '../utils/projectUtils'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { projects, loading } = useProjects()
  const project = projects.find((p) => p.slug === slug)

  if (loading) {
    return <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">Loading…</div>
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <Link to="/projects" className="button-primary mt-4 inline-flex">Back to Projects</Link>
      </div>
    )
  }

  const repoFullName = fullNameFromGithubUrl(project.githubUrl || '') || ''

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/projects" className="text-zinc-300 hover:text-white">← Back to Projects</Link>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card-surface overflow-hidden">
          <div className="aspect-video w-full bg-zinc-900/60 flex items-center justify-center text-zinc-500">
            {project.demoUrl ? (
              <iframe
                className="h-full w-full"
                src={project.demoUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="p-6">Demo coming soon…</div>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="mt-2 text-zinc-300">{project.longDescription ?? project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <a href={project.githubUrl} target="_blank" className="button-primary">GitHub</a>
            {project.websiteUrl ? (
              <a href={project.websiteUrl} target="_blank" className="inline-flex items-center rounded-lg px-4 py-2 font-medium text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800/40">Live Site</a>
            ) : null}
          </div>
        </div>
      </div>

      {repoFullName ? (
        <div className="mt-8">
          <RepoCommitGraph fullName={repoFullName} />
        </div>
      ) : null}
    </div>
  )
} 