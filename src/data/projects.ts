export interface Project {
  id: string
  slug: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  category?: string
  image?: string
  demoUrl?: string
  githubUrl: string
  websiteUrl?: string
  featured?: boolean
  winnerRank?: 1 | 2 | 3
}

export const projects: Project[] = [
  {
    id: 'p1',
    slug: 'neon-navigator',
    title: 'Neon Navigator',
    description: 'AI-assisted code search with conversational interface.',
    longDescription: 'Neon Navigator blends semantic search with agentic workflows to help developers navigate large codebases quickly.',
    tags: ['TypeScript', 'Vite', 'GPT-5'],
    githubUrl: 'https://github.com/example/neon-navigator',
    winnerRank: 1,
    demoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'p2',
    slug: 'cursor-canvas',
    title: 'Cursor Canvas',
    description: 'Realtime collaborative whiteboard with AI scene generation.',
    tags: ['React', 'WebRTC', 'Tailwind'],
    githubUrl: 'https://github.com/example/cursor-canvas',
    winnerRank: 2,
    demoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'p3',
    slug: 'prompt-pilot',
    title: 'Prompt Pilot',
    description: 'Optimize prompts with automatic evaluation and A/B testing.',
    tags: ['Node', 'Express', 'OpenAI'],
    githubUrl: 'https://github.com/example/prompt-pilot',
    winnerRank: 3,
    demoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'p4',
    slug: 'vector-vault',
    title: 'Vector Vault',
    description: 'Local-first vector database with WebGPU acceleration.',
    tags: ['Rust', 'WebGPU', 'WASM'],
    githubUrl: 'https://github.com/example/vector-vault'
  },
  {
    id: 'p5',
    slug: 'agent-arena',
    title: 'Agent Arena',
    description: 'Benchmark agent frameworks head-to-head with tasks.',
    tags: ['Python', 'FastAPI', 'LLM'],
    githubUrl: 'https://github.com/example/agent-arena'
  }
] 