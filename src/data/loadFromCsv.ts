import Papa from 'papaparse'
import type { Project } from './projects'
import { toSlug, normalizeGithubUrl, repoNameFromGithubUrl, titleFromRepoName, toEmbedUrl, inferTags, thumbnailFromDemo } from '../utils/projectUtils'

const CSV_PATH = "/Cursor%20Addis%20Ababa,%20Live%20competition%20(Responses)%20-%20Form%20Responses%201.csv"

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
  const projects: Project[] = rows.map((row) => {
    const desc = (row['Project description '] || '').trim()
    const githubRaw = (row['Github repo(make sure you have transferred the ownership)'] || '').trim()
    const demoRaw = (row['Demo video from google drive'] || '').trim()

    const githubUrl = normalizeGithubUrl(githubRaw)
    const repoName = githubUrl ? repoNameFromGithubUrl(githubUrl) : ''
    const title = repoName ? titleFromRepoName(repoName) : (desc && desc.length <= 40 ? desc : 'Project ' + counter)
    const slug = repoName ? toSlug(repoName) : toSlug(`${title}-${counter}`)
    const demoUrl = toEmbedUrl(demoRaw)
    const thumb = thumbnailFromDemo(demoRaw)
    const tags = inferTags(desc)

    const project: Project = {
      id: `csv-${counter}`,
      slug,
      title,
      description: desc || title,
      longDescription: desc || undefined,
      tags,
      githubUrl: githubUrl || '#',
      demoUrl: demoUrl || undefined,
      image: thumb || undefined,
    }
    counter += 1
    return project
  })

  return projects
} 