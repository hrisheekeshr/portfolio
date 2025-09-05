import { redirect, notFound } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { getBlogPost } from '@/lib/blog'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { PostEditor } from '@/components/admin/PostEditor'

interface EditPostPageProps {
  params: { slug: string }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/admin/login')
  }

  const post = getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Post</h1>
          <p className="text-muted-foreground">
            Update &ldquo;{post.title}&rdquo;
          </p>
        </div>

        <PostEditor initialPost={post} />
      </main>
    </div>
  )
}