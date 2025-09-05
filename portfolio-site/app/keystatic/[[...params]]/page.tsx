import { Keystatic } from '@keystatic/next'
import config from '../../../keystatic.config'

export default function KeystaticApp() {
  return <Keystatic config={config} />
}

export const metadata = {
  title: 'Portfolio CMS Admin',
  description: 'Content management system for the portfolio website',
}