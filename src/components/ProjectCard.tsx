import { Link } from 'react-router-dom'
import { Github, Play } from 'lucide-react'
import type { Project } from '../data/projects'
import { useState } from 'react'
import ImgWithFallback from './ImgWithFallback'

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  const maxChars = 140
  const shouldClamp = project.description.length > maxChars
  const shown = expanded ? project.description : project.description.slice(0, maxChars)

  // @ts-ignore runtime-only property from loader
  const candidates: string[] | undefined = (project as any).imageCandidates

  return (
    <div className="card-surface overflow-hidden group">
      <Link
        to={`/projects/${project.slug}`}
        className="block overflow-hidden"
        aria-label={`Open ${project.title}`}
      >
        <div className="aspect-video w-full bg-zinc-900/60 flex items-center justify-center">
          {candidates && candidates.length ? (
            <ImgWithFallback srcs={candidates} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
          ) : project.image ? (
            <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" decoding="async" />
          ) : (
            <div className="text-zinc-600">No preview</div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/projects/${project.slug}`} className="text-lg font-semibold hover:text-white text-zinc-200">
            {project.title}
          </Link>
          {project.winnerRank ? (
            <span className="tag">Winner #{project.winnerRank}</span>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-zinc-300">
          {shown}
          {shouldClamp && !expanded ? '… ' : ' '}
          {shouldClamp && (
            <button className="text-accent hover:underline" onClick={() => setExpanded((v) => !v)}>
              {expanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800/40 transition">
            View details
          </Link>
          <Link to={`/projects/${project.slug}`} className="button-primary">
            <Play size={16} />
            Watch Demo
          </Link>
          <a
            href={project.githubUrl}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800/40 transition"
          >
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>
    </div>
  )
} 