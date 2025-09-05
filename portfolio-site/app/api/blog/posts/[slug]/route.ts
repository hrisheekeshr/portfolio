import { NextRequest, NextResponse } from 'next/server'
import { getBlogPost } from '@/lib/blog'
import { requireAuth } from '@/lib/auth'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogDirectory = path.join(process.cwd(), 'content/blog')

interface RouteParams {
  params: { slug: string }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  if (!requireAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const post = await getBlogPost(params.slug)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!requireAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const postData = await request.json()
    const { title, description, publishedAt, tags, featured, readingTime, author, status, heroImage, content } = postData

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content' },
        { status: 400 }
      )
    }

    const filePath = path.join(blogDirectory, `${params.slug}.mdx`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
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
    fs.writeFileSync(filePath, fileContent, 'utf8')

    return NextResponse.json(
      { success: true, message: 'Post updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  if (!requireAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const filePath = path.join(blogDirectory, `${params.slug}.mdx`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    fs.unlinkSync(filePath)

    return NextResponse.json(
      { success: true, message: 'Post deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}