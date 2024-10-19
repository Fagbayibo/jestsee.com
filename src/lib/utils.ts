import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const fetcher = (url: string) => fetch(url).then((r) => r.json())

// Append 'th', 'st', 'nd', or 'rd' for the day of the month
export const getDateSuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th' // Special case for 11th-13th
  return ['th', 'st', 'nd', 'rd'][day % 10] || 'th'
}

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const formattedDate = date.toLocaleDateString('en-US', options)

  const day = date.getDate()

  return formattedDate.replace(/\d+,/, day + getDateSuffix(day))
}
