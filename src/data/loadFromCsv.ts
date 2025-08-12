import Papa from 'papaparse'
import type { Project } from './projects'
import { toSlug, normalizeGithubUrl, repoNameFromGithubUrl, titleFromRepoName, toEmbedUrl, inferTags, thumbnailFromDemo, fullNameFromGithubUrl } from '../utils/projectUtils'

const CSV_PATH = "/Cursor%20Addis%20Ababa,%20Live%20competition%20(Responses)%20-%20Form%20Responses%201.csv"

// Map of repo name (lowercase) to winner rank
const WINNERS: Record<string, number> = {
  // 1. lockin
  'lockin': 1,
  // 2. Micro Emergency Assistant (MEA)
  'mea': 2,
  // 3. Desktop Roaster (Desk Roaster Pro / deskroaster)
  'deskroaster': 3,
  // 4. FindMeNow
  'findmenow': 4,
  // 5. Meme Generator
  'meme-generator': 5
}

export async function loadProjectsFromCsv(): Promise<Project[]> {
  const res = await fetch(CSV_PATH)
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.status}`)
  const text = await res.text()
  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false
  })

  if (parsed.errors && parsed.errors.length) {
    console.warn('CSV parse errors', parsed.errors)
  }

  const rows = (parsed.data as any[]).filter(Boolean)

  let counter = 1
  const seenKeys = new Set<string>()
  const projects: Project[] = []

  for (const row of rows) {
    const desc = (row['Project description '] || '').trim()
    const githubRaw = (row['Github repo(make sure you have transferred the ownership)'] || '').trim()
    const demoRaw = (row['Demo video from google drive'] || '').trim()

    const githubUrl = normalizeGithubUrl(githubRaw)
    const repoName = githubUrl ? repoNameFromGithubUrl(githubUrl).toLowerCase() : ''
    const title = repoName ? titleFromRepoName(repoName) : (desc && desc.length <= 40 ? desc : 'Project ' + counter)
    const slug = repoName ? toSlug(repoName) : toSlug(`${title}-${counter}`)
    const demoUrl = toEmbedUrl(demoRaw)
    const thumb = thumbnailFromDemo(demoRaw)
    const tags = inferTags(desc)

    const winnerRank = repoName && WINNERS[repoName] ? (WINNERS[repoName] as 1|2|3|4|5) : undefined

    // Build a dedupe key prioritizing GitHub full repo name if available
    const fullName = githubUrl ? fullNameFromGithubUrl(githubUrl)?.toLowerCase() : null
    const key = fullName || slug
    if (seenKeys.has(key)) {
      counter += 1
      continue
    }
    seenKeys.add(key)

    projects.push({
      id: `csv-${counter}`,
      slug,
      title,
      description: desc || title,
      longDescription: desc || undefined,
      tags,
      githubUrl: githubUrl || '#',
      demoUrl: demoUrl || undefined,
      image: thumb || undefined,
      winnerRank
    })

    counter += 1
  }

  return projects
} 