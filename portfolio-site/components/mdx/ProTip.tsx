'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Zap } from 'lucide-react'

interface ProTipProps {
  children: ReactNode
  title?: string
  className?: string
}

export function ProTip({ children, title = "Pro Tip", className }: ProTipProps) {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 via-amber-50 to-yellow-50 p-6 my-6',
      'dark:border-amber-800 dark:from-amber-900/20 dark:via-amber-900/10 dark:to-yellow-900/20',
      className
    )}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
            <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
            {title}
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-amber-800 dark:text-amber-200 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}