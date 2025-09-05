import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { getAllBlogPosts } from '@/lib/blog'
import { PostList } from '@/components/admin/PostList'
import { AdminHeader } from '@/components/admin/AdminHeader'

export default async function AdminPage() {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/admin/login')
  }

  const posts = getAllBlogPosts()
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    draft: posts.filter(p => p.status === 'draft').length,
    featured: posts.filter(p => p.featured).length
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Blog Administration</h1>
          <p className="text-muted-foreground">
            Manage your blog posts and content
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass glass-dark rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Total Posts</h3>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="glass glass-dark rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Published</h3>
            <p className="text-2xl font-bold text-green-600">{stats.published}</p>
          </div>
          <div className="glass glass-dark rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Drafts</h3>
            <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
          </div>
          <div className="glass glass-dark rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Featured</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.featured}</p>
          </div>
        </div>

        {/* Posts List */}
        <PostList initialPosts={posts} />
      </main>
    </div>
  )
}