'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { 
  AlertCircle, 
  CheckCircle, 
  Info, 
  AlertTriangle,
  Lightbulb 
} from 'lucide-react'

interface CalloutProps {
  children: ReactNode
  type?: 'info' | 'warning' | 'error' | 'success' | 'tip'
  title?: string
  className?: string
}

const calloutConfig = {
  info: {
    icon: Info,
    className: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-100',
    iconClassName: 'text-blue-600 dark:text-blue-400'
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-100',
    iconClassName: 'text-amber-600 dark:text-amber-400'
  },
  error: {
    icon: AlertCircle,
    className: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-900/20 dark:text-red-100',
    iconClassName: 'text-red-600 dark:text-red-400'
  },
  success: {
    icon: CheckCircle,
    className: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-100',
    iconClassName: 'text-green-600 dark:text-green-400'
  },
  tip: {
    icon: Lightbulb,
    className: 'border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-100',
    iconClassName: 'text-purple-600 dark:text-purple-400'
  }
}

export function Callout({ 
  children, 
  type = 'info', 
  title, 
  className 
}: CalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon

  return (
    <div className={cn(
      'border-l-4 rounded-r-lg p-4 my-6',
      config.className,
      className
    )}>
      <div className="flex items-start gap-3">
        <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', config.iconClassName)} />
        <div className="flex-1">
          {title && (
            <div className="font-semibold mb-2">
              {title}
            </div>
          )}
          <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}