import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/lib/mdx-components'
import { getBlogPost, getAllBlogPosts } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface BlogPostPageProps {
  params: { slug: string }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post || post.status !== 'published') {
    notFound()
  }

  return (
    <article className="container mx-auto px-6 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button variant="ghost" className="mb-8" asChild>
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        {/* Article header */}
        <header className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {post.description}
          </p>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
            <span>by {post.author}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Article content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote 
            source={post.content} 
            components={mdxComponents}
          />
        </div>

        {/* Article footer */}
        <footer className="mt-16 pt-8 border-t">
          <div className="flex justify-between items-center">
            <Button variant="ghost" asChild>
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            
            <Button asChild>
              <Link href="/contact">
                Let&apos;s discuss this
              </Link>
            </Button>
          </div>
        </footer>
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts
    .filter(post => post.status === 'published')
    .map(post => ({
      slug: post.slug,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post not found',
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}