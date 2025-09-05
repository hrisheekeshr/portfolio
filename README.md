# Portfolio Project

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a clean design with bento grid layout, theme switching, and comprehensive navigation for showcasing professional experience, projects, and contact information.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme Management**: next-themes
- **Development**: Turbopack (for faster builds)

## Project Structure

```
portfolio/
├── portfolio-site/          # Main Next.js application
│   ├── app/                 # App Router pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── experience/      # Experience page
│   │   ├── contact/         # Contact page
│   │   ├── resume/          # Resume page
│   │   ├── blog/            # Blog page
│   │   └── apps/            # Apps showcase page
│   ├── components/          # React components
│   │   ├── ui/              # Base UI components
│   │   ├── layout/          # Layout components (header, footer, theme toggle)
│   │   ├── sections/        # Page sections (hero, about, bento)
│   │   ├── bento/           # Bento grid components
│   │   └── providers/       # React providers (theme)
│   ├── content/             # Content files
│   ├── lib/                 # Utility functions
│   ├── public/              # Static assets
│   └── package.json         # Dependencies and scripts
├── .gitignore               # Git ignore rules (excludes plan.md)
└── README.md               # This file
```

## Features

- **Responsive Design**: Mobile-first approach with modern UI components
- **Dark/Light Mode**: Theme switching with system preference detection
- **Bento Grid Layout**: Modern card-based layout for showcasing content
- **Navigation Pages**: Dedicated sections for experience, contact, resume, blog, and apps
- **TypeScript**: Full type safety throughout the application
- **Modern Animations**: Smooth interactions with Framer Motion
- **Optimized Performance**: Built with Next.js 14 and Turbopack

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. Navigate to the portfolio site directory:
   ```bash
   cd portfolio-site
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio site.

The site will automatically reload when you make changes to the code.

### Available Scripts

In the `portfolio-site/` directory, you can run:

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Development Commands

### Building for Production

```bash
cd portfolio-site
npm run build
```

### Running Production Build

```bash
cd portfolio-site
npm run build
npm run start
```

## Customization

### Adding New Pages

1. Create a new directory under `portfolio-site/app/`
2. Add a `page.tsx` file with your page component
3. Update navigation in the header component if needed

### Modifying Components

- UI components are located in `portfolio-site/components/ui/`
- Layout components (header, footer) are in `portfolio-site/components/layout/`
- Page sections are in `portfolio-site/components/sections/`

### Styling

The project uses Tailwind CSS v4. Modify styles by:
- Editing Tailwind classes in components
- Customizing the Tailwind config if needed
- Using CSS variables for theme colors

### Content Management

- Update content in the `portfolio-site/content/` directory
- Modify page content directly in the respective page components

## Deployment

The portfolio can be deployed on various platforms:

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set the root directory to `portfolio-site`
3. Deploy automatically on push to main

### Other Platforms

1. Build the project: `npm run build`
2. Deploy the `portfolio-site/.next` output
3. Ensure Node.js environment is available

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes in the `portfolio-site/` directory
4. Test locally with `npm run dev`
5. Submit a pull request

## License

This project structure excludes the LICENSE file as it has been removed from the repository.

## Project Status

This portfolio project contains:
- ✅ Complete Next.js 14 setup with TypeScript
- ✅ Responsive design with Tailwind CSS
- ✅ Theme switching functionality
- ✅ Navigation pages (experience, contact, resume, blog, apps)
- ✅ Modern UI components with bento grid layout
- ✅ Optimized development workflow with Turbopack