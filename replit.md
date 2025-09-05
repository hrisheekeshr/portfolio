# Portfolio Project - Replit Setup

## Overview
A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Successfully imported and configured for the Replit environment on September 05, 2025.

## Project Architecture
- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme Management**: next-themes
- **Content**: MDX support for blog posts

## Recent Changes
- **2025-09-05**: Initial import and Replit environment setup
  - Installed Node.js 20 runtime environment
  - Configured Next.js for Replit proxy compatibility
  - Set up development workflow on port 5000
  - Configured deployment settings for autoscale
  - Fixed cross-origin issues with allowedDevOrigins

## Development Configuration
- **Dev Server**: Runs on 0.0.0.0:5000 for Replit proxy compatibility
- **Build Tool**: Uses Turbopack for faster development builds
- **Environment**: Configured for Replit with proper CORS and host settings

## Deployment Configuration
- **Target**: Autoscale (stateless website deployment)
- **Build Command**: `cd portfolio-site && npm run build`
- **Start Command**: `cd portfolio-site && npm run start`
- **Port**: 5000 (both dev and production)

## Project Structure
```
portfolio-site/          # Main Next.js application
├── app/                 # App Router pages (home, experience, contact, resume, blog, apps)
├── components/          # React components (UI, layout, sections, bento grid)
├── content/             # Content files and blog posts
├── lib/                 # Utility functions and configurations
├── public/              # Static assets
└── package.json         # Dependencies and scripts
```

## User Preferences
- Prefers clean, modern design with responsive layout
- Uses TypeScript for type safety
- Employs component-based architecture
- Implements dark/light theme switching

## Current State
✅ Project successfully imported and running
✅ Development server configured and operational
✅ Deployment settings configured
✅ All dependencies installed and working
✅ CORS and proxy issues resolved