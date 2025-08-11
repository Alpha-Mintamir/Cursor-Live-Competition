export function toSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function normalizeGithubUrl(raw: string): string | null {
  if (!raw) return null
  const s = raw.trim()
  if (s.startsWith('git@github.com:')) {
    const path = s.replace('git@github.com:', '').replace(/\.git$/, '')
    return `https://github.com/${path}`
  }
  if (s.startsWith('https://github.com/') || s.startsWith('http://github.com/')) {
    return s.replace('http://', 'https://').replace(/\.git$/, '')
  }
  if (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(s)) {
    return `https://github.com/${s}`
  }
  return null
}

export function repoNameFromGithubUrl(url: string): string {
  try {
    const u = new URL(url)
    const parts = u.pathname.split('/').filter(Boolean)
    return parts[1] || parts[0] || ''
  } catch {
    return ''
  }
}

export function fullNameFromGithubUrl(url: string): string | null {
  try {
    const u = new URL(url)
    const parts = u.pathname.split('/').filter(Boolean)
    if (parts.length >= 2) return `${parts[0]}/${parts[1]}`
    return null
  } catch {
    return null
  }
}

export function titleFromRepoName(repo: string): string {
  if (!repo) return ''
  if (/^[A-Za-z0-9]+$/.test(repo)) return repo
  return repo
    .split(/[-_]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function toEmbedUrl(raw: string): string | null {
  if (!raw) return null
  const s = raw.trim()
  const driveMatch = s.match(/drive\.google\.com\/file\/d\/([^/]+)/)
  if (driveMatch) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`
  }
  const ytMatch = s.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/)
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`
  }
  return s
}

export function thumbnailFromDemo(raw: string): string | null {
  if (!raw) return null
  const s = raw.trim()
  const ytMatch = s.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/)
  if (ytMatch) {
    return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`
  }
  const driveMatch = s.match(/drive\.google\.com\/file\/d\/([^/]+)/)
  if (driveMatch) {
    return `https://drive.google.com/thumbnail?id=${driveMatch[1]}`
  }
  // awesomescreenshot: no public documented thumbnail; fallback to original URL (may still display)
  if (s.includes('awesomescreenshot.com')) {
    return null
  }
  return null
}

export function inferTags(text: string): string[] {
  const t = (text || '').toLowerCase()
  const tags = new Set<string>()
  const add = (x: string) => tags.add(x)
  if (t.includes('react')) add('React')
  if (t.includes('vite')) add('Vite')
  if (t.includes('tailwind')) add('Tailwind')
  if (t.includes('next')) add('Next.js')
  if (t.includes('fastapi')) add('FastAPI')
  if (t.includes('django')) add('Django')
  if (t.includes('firebase')) add('Firebase')
  if (t.includes('python')) add('Python')
  if (t.includes('typescript')) add('TypeScript')
  if (t.includes('javascript')) add('JavaScript')
  if (t.includes('webrtc')) add('WebRTC')
  if (t.includes('chart')) add('Chart.js')
  if (t.includes('gemini')) add('Gemini AI')
  if (t.includes('openai')) add('OpenAI')
  if (t.includes('ai')) add('AI')
  return Array.from(tags)
} 