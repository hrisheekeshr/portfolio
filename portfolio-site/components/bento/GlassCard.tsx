'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function GlassCard({ 
  children, 
  className, 
  hover = true,
  onClick 
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={cn(
        "glass glass-dark rounded-2xl p-6",
        "transition-all duration-300",
        hover && "cursor-pointer hover:shadow-xl",
        className
      )}
    >
      {children}
    </motion.div>
  )
}