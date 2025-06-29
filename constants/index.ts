import { FilterState } from '@/types'

// WebSocket and connection constants
export const MAX_TRADES = 80

// WebSocket close codes
export const WS_CLOSE_NORMAL = 1000
export const WS_CLOSE_USER_DISCONNECT = 'User disconnected'

// Default values
export const DEFAULT_EXCHANGE = 'unknown'

// Connection status enum
export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  ERROR = 'error',
}

export const INITIAL_FILTER: FilterState = {
  symbols: [],
  sides: [],
  timeRange: { minutes: null },
  priceRange: { min: null, max: null },
  quantityRange: { min: null, max: null },
}
