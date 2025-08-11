import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-zinc-300">The page you are looking for does not exist.</p>
      <Link to="/" className="button-primary mt-6 inline-flex">Go Home</Link>
    </div>
  )
} 