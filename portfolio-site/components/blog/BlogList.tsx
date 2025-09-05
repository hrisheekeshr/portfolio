'use client'

import { useState, useMemo } from 'react'
import { BlogPost } from '@/lib/blog'
import { BlogCard } from './BlogCard'
import { BlogSearch } from './BlogSearch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Fuse from 'fuse.js'

interface BlogListProps {
  posts: BlogPost[]
  allTags: string[]
}

export function BlogList({ posts, allTags }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [showFeatured, setShowFeatured] = useState(false)

  // Fuse.js configuration for fuzzy search
  const fuse = useMemo(() => {
    const fuseOptions = {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'tags', weight: 0.2 },
        { name: 'content', weight: 0.1 }
      ],
      threshold: 0.3,
      includeScore: true,
      ignoreLocation: true
    }
    return new Fuse(posts, fuseOptions)
  }, [posts])

  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Filter by search query using Fuse.js
    if (searchQuery) {
      const searchResults = fuse.search(searchQuery)
      filtered = searchResults.map(result => result.item)
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.tags.includes(selectedTag)
      )
    }

    // Filter by featured
    if (showFeatured) {
      filtered = filtered.filter(post => post.featured)
    }

    return filtered
  }, [posts, searchQuery, selectedTag, showFeatured, fuse])

  const featuredPosts = posts.filter(post => post.featured)

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="space-y-4">
        <BlogSearch 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search blog posts..."
        />
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={showFeatured ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFeatured(!showFeatured)}
          >
            Featured
          </Button>
          
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Active filters display */}
        {(selectedTag || showFeatured || searchQuery) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery('')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedTag && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Tag: {selectedTag}
                <button onClick={() => setSelectedTag(null)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {showFeatured && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Featured
                <button onClick={() => setShowFeatured(false)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Featured Posts Section */}
      {!searchQuery && !selectedTag && !showFeatured && featuredPosts.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Featured Posts</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} featured />
            ))}
          </div>
        </div>
      )}

      {/* All Posts */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          {searchQuery || selectedTag || showFeatured ? 'Results' : 'All Posts'} 
          <span className="text-muted-foreground ml-2">({filteredPosts.length})</span>
        </h2>
        
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No posts found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('')
                setSelectedTag(null)
                setShowFeatured(false)
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}