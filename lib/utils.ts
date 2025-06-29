import { FilterState } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString()
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

export const formatQuantity = (size: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(size)
}

export const getActiveFiltersCount = (activeFilters: FilterState) => {
  let count = 0
  if (activeFilters.symbols.length > 0) count++
  if (activeFilters.sides.length > 0) count++
  if (activeFilters.timeRange.minutes !== null) count++
  if (
    activeFilters.priceRange.min !== null ||
    activeFilters.priceRange.max !== null
  )
    count++
  if (
    activeFilters.quantityRange.min !== null ||
    activeFilters.quantityRange.max !== null
  )
    count++
  return count
}
