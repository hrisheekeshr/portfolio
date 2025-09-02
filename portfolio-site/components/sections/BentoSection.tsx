'use client'

import { GlassCard } from '@/components/bento/GlassCard'
import { BentoGrid, BentoGridItem } from '@/components/bento/BentoGrid'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Brain, Sparkles, Briefcase, PenTool, FileText, Mail } from 'lucide-react'
import siteContent from '@/content/site.json'
import { cn } from '@/lib/utils'

const iconMap = {
  Brain,
  Sparkles,
  Briefcase,
  PenTool,
  FileText,
  Mail
}

export function BentoSection() {
  const { bento_cards } = siteContent

  const getGridClass = (index: number, size: string) => {
    // Custom grid layout for visual interest
    if (size === 'large') return 'md:col-span-2'
    if (index === 0) return 'md:row-span-2'
    return ''
  }

  return (
    <section className="px-6 md:px-10 lg:px-16 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore My Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive into different aspects of my product leadership journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {bento_cards.map((card, index) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap]
            const gridClass = getGridClass(index, card.size)

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(gridClass)}
              >
                <Link href={card.link} className="block h-full">
                  <GlassCard className="h-full group relative overflow-hidden">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">
                        {card.title}
                      </h3>
                      
                      <p className="text-muted-foreground flex-grow">
                        {card.description}
                      </p>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}