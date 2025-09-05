import { NextRequest, NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/blog'
import { requireAuth } from '@/lib/auth'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogDirectory = path.join(process.cwd(), 'content/blog')

export async function GET(request: NextRequest) {
  if (!requireAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const posts = getAllBlogPosts()
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!requireAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const postData = await request.json()
    const { slug, title, description, publishedAt, tags, featured, readingTime, author, status, heroImage, content } = postData

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: slug, title, content' },
        { status: 400 }
      )
    }

    // Create frontmatter
    const frontmatter = {
      title,
      description: description || '',
      publishedAt: publishedAt || new Date().toISOString().split('T')[0],
      tags: tags || [],
      featured: featured || false,
      readingTime: readingTime || '5 min read',
      author: author || 'Hrisheekesh R',
      status: status || 'draft',
      ...(heroImage && { heroImage })
    }

    const fileContent = matter.stringify(content, frontmatter)
    const filePath = path.join(blogDirectory, `${slug}.mdx`)

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 409 }
      )
    }

    // Ensure blog directory exists
    if (!fs.existsSync(blogDirectory)) {
      fs.mkdirSync(blogDirectory, { recursive: true })
    }

    fs.writeFileSync(filePath, fileContent, 'utf8')

    return NextResponse.json(
      { success: true, message: 'Post created successfully', slug },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}