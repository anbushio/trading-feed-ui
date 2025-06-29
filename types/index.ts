export enum TradeSide {
  BUY = 'buy',
  SELL = 'sell',
}

export interface Trade {
  id: string // Unique identifier (e.g. UUID)
  timestamp: number // Unix timestamp in milliseconds
  symbol: string // e.g. 'BTC/USD', 'ETH/USD'
  price: number // Trade price
  size: number // Trade size
  side: TradeSide // Trade direction
  exchange: string // e.g. 'Binance', 'Coinbase'
}

export interface FilterState {
  symbols: string[]
  sides: string[]
  timeRange: { minutes: number | null }
  priceRange: { min: number | null; max: number | null }
  quantityRange: { min: number | null; max: number | null }
}

export type ConnectionStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error'
