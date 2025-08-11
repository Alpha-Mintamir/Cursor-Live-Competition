import { judges } from '../data/judges'

export default function Judges() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Judges</h2>
        <p className="text-zinc-400">Industry professionals who helped evaluate the projects</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {judges.map((j) => (
          <a key={j.linkedin} href={j.linkedin} target="_blank" className="card-surface p-4 flex items-center gap-3 hover:border-zinc-700">
            <div className="h-12 w-12 rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center text-zinc-400">
              {j.image ? (
                <img src={j.image} alt={j.name} className="h-full w-full object-cover" />
              ) : (
                <span>{j.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}</span>
              )}
            </div>
            <div>
              <div className="font-semibold text-zinc-200">{j.name}</div>
              <div className="text-sm text-zinc-400">{j.title ?? 'Judge'}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
} 