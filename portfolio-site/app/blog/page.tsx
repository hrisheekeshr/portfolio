import { getPublishedBlogPosts, getAllTags } from '@/lib/blog'
import { BlogList } from '@/components/blog/BlogList'

export default function BlogPage() {
  const posts = getPublishedBlogPosts()
  const allTags = getAllTags()

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts on AI, product management, and building at scale
        </p>
      </div>
      
      <BlogList posts={posts} allTags={allTags} />
    </div>
  )
}