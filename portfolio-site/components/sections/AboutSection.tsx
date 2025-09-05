'use client'

import { GlassCard } from '@/components/bento/GlassCard'
import { motion } from 'framer-motion'
import { Cpu, ChartBar, Code, Users } from 'lucide-react'
import siteContent from '@/content/site.json'

const philosophyIcons = {
  Cpu,
  ChartBar,
  Code,
  Users
}

export function AboutSection() {
  const { about } = siteContent

  return (
    <section id="about" className="px-6 md:px-10 lg:px-16 py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How I Approach Product
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My operating philosophy and core strengths as an AI-native product leader
          </p>
        </motion.div>

        {/* Operating Philosophy */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold mb-8 text-center"
          >
            Operating Philosophy
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.philosophy.map((principle, index) => {
              const Icon = philosophyIcons[principle.icon as keyof typeof philosophyIcons]
              
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard hover={false} className="h-full">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h4 className="font-semibold mb-2">{principle.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {principle.description}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Core Strengths */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold mb-8 text-center"
          >
            Core Strengths
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {about.strengths.map((strength, index) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard hover={false}>
                  <h4 className="text-lg font-semibold mb-2">{strength.title}</h4>
                  <p className="text-muted-foreground mb-4">
                    {strength.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {strength.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools & Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">
            Tools & Technologies
          </h3>
          
          <GlassCard hover={false} className="mx-auto max-w-4xl">
            <div className="flex flex-wrap justify-center gap-3">
              {about.tools.map((tool, index) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="px-4 py-2 rounded-full border border-border bg-background/50 hover:bg-primary/10 hover:border-primary transition-colors"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}