import { NavLink, Link } from 'react-router-dom'
import { Github } from 'lucide-react'

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg transition-colors ${isActive ? 'text-white bg-zinc-800/60' : 'text-zinc-300 hover:text-white hover:bg-zinc-800/40'}`

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg">
          <span className="gradient-text">Virtual Cursor</span> + GPT-5
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/projects" className={linkClass}>
            Projects
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </nav>
        <a
          href="https://github.com/Ethiopian-Cursor-Community/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-zinc-300 hover:text-white"
        >
          <Github size={18} />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </header>
  )
} 