import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
      className
    )}>
      {children}
    </div>
  )
}

interface BentoGridItemProps {
  children: ReactNode
  className?: string
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2
}

export function BentoGridItem({ 
  children, 
  className,
  colSpan = 1,
  rowSpan = 1
}: BentoGridItemProps) {
  return (
    <div className={cn(
      colSpan === 2 && "md:col-span-2",
      colSpan === 3 && "md:col-span-3",
      rowSpan === 2 && "md:row-span-2",
      className
    )}>
      {children}
    </div>
  )
}