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

export type ConnectionStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error'
