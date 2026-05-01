export type ShadowSize = 'sm' | 'md' | 'lg' | 'xl' | 'none'

export interface CardProps {
  background?: string
  shadow?: ShadowSize
  clickable?: boolean
}

export const shadowClassMap: Record<ShadowSize, string> = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  none: 'shadow-none',
}

export const hoverMap: Record<ShadowSize, string> = {
  sm: 'hover:shadow-md',
  md: 'hover:shadow-lg',
  lg: 'hover:shadow-xl',
  xl: 'hover:shadow-2xl',
  none: 'hover:shadow-md',
}
