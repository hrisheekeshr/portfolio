import React from 'react'
import { Callout } from '@/components/mdx/Callout'
import { CodeBlock } from '@/components/mdx/CodeBlock'
import { ProTip } from '@/components/mdx/ProTip'
import { ImageGallery } from '@/components/mdx/ImageGallery'

export const mdxComponents = {
  // Custom components
  Callout,
  CodeBlock,
  ProTip,
  ImageGallery,
  
  // Override default components
  pre: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
    // Extract code content and language from pre/code structure
    const codeElement = children?.props
    const code = codeElement?.children
    const language = codeElement?.className?.replace('language-', '') || 'text'
    
    if (typeof code === 'string') {
      return React.createElement(CodeBlock, { language, ...props }, code)
    }
    
    // Fallback to default pre
    return React.createElement('pre', props, children)
  },
  
  code: ({ children, className, ...props }: { children?: React.ReactNode; className?: string; [key: string]: unknown }) => {
    // If it's inline code (no language class), render as inline
    if (!className) {
      return React.createElement('code', {
        className: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        ...props
      }, children)
    }
    
    // For block code, this will be handled by the pre component above
    return React.createElement('code', { className, ...props }, children)
  }
}

export type MDXComponents = typeof mdxComponents