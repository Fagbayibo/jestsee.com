import { z } from 'astro:content'

import { GithubOutline as Github } from '@/components/icons/GithubOutline'
import { Globe as Web } from '@/components/icons/Globe'
import { Telegram } from '@/components/icons/Telegram'

export const PROJECT_ICONS = { Github, Web, Telegram }

// this is workaround since we can't pass ICONS directly to z.enum
const keys = Object.keys(PROJECT_ICONS)
export const iconSchema = z.enum([keys[0], ...keys.slice(1)])

export type ProjectIcon = keyof typeof PROJECT_ICONS