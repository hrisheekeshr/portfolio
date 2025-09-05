'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { BlogPost } from '@/lib/blog'
import { GlassCard } from '@/components/bento/GlassCard'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Star } from 'lucide-react'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <GlassCard className={`h-full ${featured ? 'md:col-span-2' : ''}`}>
        <div className="flex flex-col h-full">
          {post.featured && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 text-accent fill-accent" />
              <span className="text-sm font-medium text-accent">Featured</span>
            </div>
          )}
          
          <h3 className={`font-semibold mb-2 ${featured ? 'text-xl' : 'text-lg'} line-clamp-2`}>
            {post.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">
            {post.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  )
}