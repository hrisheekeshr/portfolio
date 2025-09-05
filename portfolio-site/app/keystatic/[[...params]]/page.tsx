import { makePage } from '@keystatic/next/ui/app'
import config from '../../../keystatic.config'

export default makePage(config)

export const metadata = {
  title: 'Portfolio CMS Admin',
  description: 'Content management system for the portfolio website',
}