import type { BackgroundColor } from '../content'

export const backgroundColor = (backgroundColor: BackgroundColor): string => {
  switch (backgroundColor) {
    case 'beige':
      return 'bg-[#f8f9fa]'
    case 'white':
      return 'bg-[#f8f9fa]'
    case 'grey':
      return 'bg-[#f8f9fa]'
    case 'purple':
      return 'bg-[#1a3d5c]'
    case 'orange':
      return 'bg-[#f5a623]'
    case 'yellow':
      return 'bg-[#f5a623]'
    case 'green':
      return 'bg-[#2e7d6b]'
    case 'pink':
      return 'bg-[#6c757d]'
    case 'blue':
      return 'bg-[#1a3d5c]'
    case 'navy':
      return 'bg-[#1a3d5c]'
    default:
      return 'bg-[#f8f9fa]'
  }
}
