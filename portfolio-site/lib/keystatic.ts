import { createReader } from '@keystatic/core/reader'
import config from '../keystatic.config'

// Create a reader instance for accessing content
export const reader = createReader(process.cwd(), config)

export interface KeystaticBlogPost {
  slug: string
  entry: {
    title: string
    description: string
    publishedAt: string | null
    tags: readonly string[]
    featured: boolean
    readingTime: string
    author: string
    status: 'draft' | 'published'
    heroImage?: string | null
    content: () => Promise<any>
  }
}

export async function getAllKeystaticPosts(): Promise<KeystaticBlogPost[]> {
  try {
    const posts = await reader.collections.posts.all()
    return posts.map(post => ({
      slug: post.slug,
      entry: {
        ...post.entry,
        content: post.entry.content,
      }
    }))
  } catch (error) {
    console.error('Error reading Keystatic posts:', error)
    return []
  }
}

export async function getPublishedKeystaticPosts(): Promise<KeystaticBlogPost[]> {
  const allPosts = await getAllKeystaticPosts()
  return allPosts.filter(post => post.entry.status === 'published')
    .sort((a, b) => new Date(b.entry.publishedAt).getTime() - new Date(a.entry.publishedAt).getTime())
}

export async function getKeystaticPost(slug: string): Promise<KeystaticBlogPost | null> {
  try {
    const post = await reader.collections.posts.read(slug)
    if (!post) return null
    
    return {
      slug,
      entry: {
        ...post,
        content: post.content,
      }
    }
  } catch (error) {
    console.error(`Error reading Keystatic post ${slug}:`, error)
    return null
  }
}

// Helper function to get site settings
export async function getSiteSettings() {
  try {
    return await reader.singletons.site.read()
  } catch (error) {
    console.error('Error reading site settings:', error)
    return null
  }
}