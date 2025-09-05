import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllKeystaticPosts, getPublishedKeystaticPosts, getKeystaticPost } from './keystatic'

export interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  tags: string[]
  featured: boolean
  readingTime: string
  author: string
  status: 'draft' | 'published'
  heroImage?: string
  content: string
}

const blogDirectory = path.join(process.cwd(), 'content/blog')

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    // Try to get posts from Keystatic first
    const keystaticPosts = await getAllKeystaticPosts()
    if (keystaticPosts.length > 0) {
      return await Promise.all(keystaticPosts.map(async post => ({
        slug: post.slug,
        title: post.entry.title,
        description: post.entry.description,
        publishedAt: post.entry.publishedAt || '',
        tags: [...post.entry.tags],
        featured: post.entry.featured,
        readingTime: post.entry.readingTime,
        author: post.entry.author,
        status: post.entry.status,
        heroImage: post.entry.heroImage,
        content: await post.entry.content()
      })))
    }
  } catch (error) {
    console.log('Keystatic not available, falling back to file system')
  }

  // Fallback to file system
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(blogDirectory)
  
  const posts = filenames
    .filter(name => name.endsWith('.mdx'))
    .map(name => {
      const slug = name.replace(/\.mdx$/, '')
      return getBlogPost(slug)
    })
    .filter(post => post !== null) as BlogPost[]

  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter(post => post.status === 'published')
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Try Keystatic first
    const keystaticPost = await getKeystaticPost(slug)
    if (keystaticPost) {
      return {
        slug: keystaticPost.slug,
        title: keystaticPost.entry.title,
        description: keystaticPost.entry.description,
        publishedAt: keystaticPost.entry.publishedAt || '',
        tags: [...keystaticPost.entry.tags],
        featured: keystaticPost.entry.featured,
        readingTime: keystaticPost.entry.readingTime,
        author: keystaticPost.entry.author,
        status: keystaticPost.entry.status,
        heroImage: keystaticPost.entry.heroImage,
        content: await keystaticPost.entry.content()
      }
    }
  } catch (error) {
    console.log('Keystatic not available, falling back to file system')
  }

  // Fallback to file system
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      publishedAt: data.publishedAt || '',
      tags: data.tags || [],
      featured: data.featured || false,
      readingTime: data.readingTime || '',
      author: data.author || '',
      status: data.status || 'draft',
      heroImage: data.heroImage,
      content
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts()
  return posts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getPublishedBlogPosts()
  const tags = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}