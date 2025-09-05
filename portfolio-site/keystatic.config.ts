import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: process.env.GITHUB_REPO_OWNER || '',
      name: process.env.GITHUB_REPO_NAME || '',
    },
  },
  ui: {
    brand: { name: 'Portfolio CMS' },
    navigation: {
      'Content': ['posts', 'pages'],
      'Settings': ['site'],
    },
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: { label: 'URL Slug' },
        }),
        description: fields.text({
          label: 'Description',
          description: 'A brief description of the post for SEO and previews',
        }),
        publishedAt: fields.date({
          label: 'Published Date',
          defaultValue: { kind: 'today' },
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
        }),
        featured: fields.checkbox({
          label: 'Featured Post',
          description: 'Show this post on the homepage',
          defaultValue: false,
        }),
        author: fields.text({
          label: 'Author',
          defaultValue: 'Your Name',
        }),
        readingTime: fields.text({
          label: 'Reading Time',
          description: 'e.g., "5 min read"',
          defaultValue: '5 min read',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: props => props.value,
          }
        ),
        heroImage: fields.image({
          label: 'Hero Image',
          description: 'Optional hero image for the post',
          directory: 'public/blog',
          publicPath: '/blog/',
        }),
        content: fields.mdx({
          label: 'Content',
          options: {
            image: {
              directory: 'public/blog',
              publicPath: '/blog/',
            },
          },
        }),
      },
    }),
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'content/pages/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: { label: 'URL Slug' },
        }),
        description: fields.text({
          label: 'Description',
        }),
        content: fields.mdx({
          label: 'Content',
          options: {
            image: {
              directory: 'public/pages',
              publicPath: '/pages/',
            },
          },
        }),
      },
    }),
  },
  singletons: {
    site: {
      label: 'Site Settings',
      path: 'content/site',
      format: { data: 'json' },
      schema: {
        title: fields.text({
          label: 'Site Title',
          defaultValue: 'My Portfolio',
        }),
        description: fields.text({
          label: 'Site Description',
          defaultValue: 'A modern portfolio website',
        }),
        author: fields.text({
          label: 'Default Author',
          defaultValue: 'Your Name',
        }),
        social: fields.object({
          twitter: fields.url({ label: 'Twitter URL' }),
          github: fields.url({ label: 'GitHub URL' }),
          linkedin: fields.url({ label: 'LinkedIn URL' }),
          email: fields.text({ label: 'Email' }),
        }),
      },
    },
  },
});