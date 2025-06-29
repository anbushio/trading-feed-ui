import { FilterState, Trade } from '@/types'

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

export const filterTrades = (trade: Trade, filter: FilterState) => {
  // Symbol filter
  if (filter.symbols.length > 0 && !filter.symbols.includes(trade.symbol)) {
    return false
  }

  // Side filter
  if (filter.sides.length > 0 && !filter.sides.includes(trade.side)) {
    return false
  }

  // Price range filter
  if (filter.priceRange.min !== null && trade.price < filter.priceRange.min) {
    return false
  }
  if (filter.priceRange.max !== null && trade.price > filter.priceRange.max) {
    return false
  }

  // Quantity range filter
  if (
    filter.quantityRange.min !== null &&
    trade.size < filter.quantityRange.min
  ) {
    return false
  }
  if (
    filter.quantityRange.max !== null &&
    trade.size > filter.quantityRange.max
  ) {
    return false
  }

  // Time range filter
  if (filter.timeRange.minutes !== null) {
    const minutesAgo = Date.now() - filter.timeRange.minutes * 60 * 1000
    if (trade.timestamp < minutesAgo) {
      return false
    }
  }

  return true
}
