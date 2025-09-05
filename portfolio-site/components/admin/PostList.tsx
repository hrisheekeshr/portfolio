'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/lib/blog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GlassCard } from '@/components/bento/GlassCard'
import { 
  Calendar, 
  Clock, 
  Edit, 
  Trash2, 
  Star,
  Plus,
  ExternalLink
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface PostListProps {
  initialPosts: BlogPost[]
}

export function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return
    }

    setIsDeleting(slug)
    
    try {
      const response = await fetch(`/api/blog/posts/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPosts(posts.filter(post => post.slug !== slug))
      } else {
        alert('Failed to delete post')
      }
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Failed to delete post')
    } finally {
      setIsDeleting(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  if (posts.length === 0) {
    return (
      <GlassCard className="p-12 text-center">
        <h3 className="text-lg font-semibold mb-2">No posts found</h3>
        <p className="text-muted-foreground mb-6">
          Get started by creating your first blog post
        </p>
        <Button asChild>
          <Link href="/admin/new">
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Link>
        </Button>
      </GlassCard>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">All Posts ({posts.length})</h2>
        <Button asChild>
          <Link href="/admin/new">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <GlassCard key={post.slug} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold truncate">
                    {post.title}
                  </h3>
                  {post.featured && (
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  )}
                </div>

                <p className="text-muted-foreground mb-3 line-clamp-2">
                  {post.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime}</span>
                  </div>
                  <Badge className={getStatusColor(post.status)}>
                    {post.status}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 4}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                {post.status === 'published' && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/edit/${post.slug}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(post.slug)}
                  disabled={isDeleting === post.slug}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}