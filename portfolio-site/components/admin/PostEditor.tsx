'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/lib/blog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { GlassCard } from '@/components/bento/GlassCard'
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  X, 
  Plus,
  Star,
  Calendar,
  Clock,
  User
} from 'lucide-react'
import Link from 'next/link'

interface PostEditorProps {
  initialPost?: BlogPost
}

export function PostEditor({ initialPost }: PostEditorProps) {
  const router = useRouter()
  const isEditing = !!initialPost

  const [formData, setFormData] = useState({
    slug: initialPost?.slug || '',
    title: initialPost?.title || '',
    description: initialPost?.description || '',
    content: initialPost?.content || '',
    publishedAt: initialPost?.publishedAt || new Date().toISOString().split('T')[0],
    tags: initialPost?.tags || [],
    featured: initialPost?.featured || false,
    readingTime: initialPost?.readingTime || '5 min read',
    author: initialPost?.author || 'Hrisheekesh R',
    status: initialPost?.status || 'draft',
    heroImage: initialPost?.heroImage || ''
  })

  const [newTag, setNewTag] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (title: string) => {
    handleInputChange('title', title)
    if (!isEditing) {
      handleInputChange('slug', generateSlug(title))
    }
  }

  const handleSave = async (shouldPublish = false) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required')
      return
    }

    if (!isEditing && !formData.slug.trim()) {
      setError('Slug is required')
      return
    }

    setIsLoading(true)
    setError('')

    const postData = {
      ...formData,
      status: shouldPublish ? 'published' : formData.status
    }

    try {
      const url = isEditing 
        ? `/api/blog/posts/${initialPost.slug}`
        : '/api/blog/posts'
      
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error || 'Failed to save post')
      }
    } catch (error) {
      setError('An error occurred while saving')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Link>
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          
          <Button
            onClick={() => handleSave(true)}
            disabled={isLoading}
          >
            {isLoading ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title"
                  className="text-lg"
                />
              </div>

              {!isEditing && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Slug *
                  </label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="post-url-slug"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    URL: /blog/{formData.slug}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of the post"
                  className="w-full min-h-[80px] px-3 py-2 border border-input bg-background rounded-md text-sm resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Content * (Markdown/MDX)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Write your post content in Markdown..."
                  className="w-full min-h-[500px] px-3 py-2 border border-input bg-background rounded-md text-sm font-mono resize-none"
                />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Post Settings */}
          <GlassCard className="p-6">
            <h3 className="font-semibold mb-4">Post Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Publish Date
                </label>
                <Input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => handleInputChange('publishedAt', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Reading Time
                </label>
                <Input
                  value={formData.readingTime}
                  onChange={(e) => handleInputChange('readingTime', e.target.value)}
                  placeholder="5 min read"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Author
                </label>
                <Input
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Hero Image URL
                </label>
                <Input
                  value={formData.heroImage}
                  onChange={(e) => handleInputChange('heroImage', e.target.value)}
                  placeholder="/blog/hero-image.jpg"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="featured" className="text-sm font-medium flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Featured Post
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </GlassCard>

          {/* Tags */}
          <GlassCard className="p-6">
            <h3 className="font-semibold mb-4">Tags</h3>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTag}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}