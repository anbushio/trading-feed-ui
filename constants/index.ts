import { FilterState } from '@/types'

// WebSocket and connection constants
export const MAX_TRADES = 10

// WebSocket close codes
export const WS_CLOSE_NORMAL = 1000
export const WS_CLOSE_USER_DISCONNECT = 'User disconnected'

// Default values
export const DEFAULT_EXCHANGE = 'unknown'
export const INITIAL_FILTER: FilterState = {
  symbols: [],
  sides: [],
  timeRange: { minutes: null },
  priceRange: { min: null, max: null },
  quantityRange: { min: null, max: null },
}
