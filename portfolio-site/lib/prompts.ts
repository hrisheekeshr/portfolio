import fs from 'fs'
import path from 'path'

export interface PromptVariation {
  name: string
  description: string
  prompt: string
}

export interface PromptExample {
  scenario: string
  input: string
  output: string
}

export interface Prompt {
  slug: string
  title: string
  description: string
  category: string
  subcategory: string
  tags: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  timeToUse: string
  skillsImproved: string[]
  useCase: string
  when: string[]
  targetAudience: string[]
  prompt: string
  promptSections: {
    setup: string
    discovery: string
    analysis: string
    output: string
  }
  howToUse: string[]
  variations: PromptVariation[]
  pitfalls: string[]
  relatedPrompts: string[]
  skillMapping: Record<string, number>
  examples: PromptExample[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

const promptsDirectory = path.join(process.cwd(), 'content/apps')

export function getAllPrompts(): Prompt[] {
  if (!fs.existsSync(promptsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(promptsDirectory)
  
  const prompts = filenames
    .filter(name => name.endsWith('.json'))
    .map(name => {
      const slug = name.replace(/\.json$/, '')
      return getPrompt(slug)
    })
    .filter(prompt => prompt !== null) as Prompt[]

  return prompts.sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
}

export function getPrompt(slug: string): Prompt | null {
  try {
    const fullPath = path.join(promptsDirectory, `${slug}.json`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const prompt = JSON.parse(fileContents) as Prompt

    return prompt
  } catch (error) {
    console.error(`Error reading prompt ${slug}:`, error)
    return null
  }
}

export function getPromptsByCategory(category: string): Prompt[] {
  return getAllPrompts().filter(prompt => 
    prompt.category.toLowerCase() === category.toLowerCase()
  )
}

export function getPromptsByTag(tag: string): Prompt[] {
  return getAllPrompts().filter(prompt => 
    prompt.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getFeaturedPrompts(): Prompt[] {
  return getAllPrompts().filter(prompt => prompt.featured)
}

export function getAllCategories(): string[] {
  const prompts = getAllPrompts()
  const categories = new Set<string>()
  
  prompts.forEach(prompt => {
    categories.add(prompt.category)
  })
  
  return Array.from(categories).sort()
}

export function getAllTags(): string[] {
  const prompts = getAllPrompts()
  const tags = new Set<string>()
  
  prompts.forEach(prompt => {
    prompt.tags.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

export function getAllSkills(): string[] {
  const prompts = getAllPrompts()
  const skills = new Set<string>()
  
  prompts.forEach(prompt => {
    prompt.skillsImproved.forEach(skill => skills.add(skill))
    Object.keys(prompt.skillMapping).forEach(skill => skills.add(skill))
  })
  
  return Array.from(skills).sort()
}

export function getPromptStats() {
  const prompts = getAllPrompts()
  
  return {
    total: prompts.length,
    byCategory: getAllCategories().reduce((acc, category) => {
      acc[category] = getPromptsByCategory(category).length
      return acc
    }, {} as Record<string, number>),
    byDifficulty: {
      'Beginner': prompts.filter(p => p.difficulty === 'Beginner').length,
      'Intermediate': prompts.filter(p => p.difficulty === 'Intermediate').length,
      'Advanced': prompts.filter(p => p.difficulty === 'Advanced').length
    },
    featured: getFeaturedPrompts().length
  }
}