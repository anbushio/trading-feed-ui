"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Controls from "@/components/Controls"
import TradesTable from "@/components/TradesTable"
import { Trade, TradeSide } from "@/types"
import { MAX_TRADES, DEFAULT_EXCHANGE } from "@/constants"

export default function Dashboard() {
  const [trades, setTrades] = useState<Trade[]>([])

  const parseTradeMessage = (data: any): Trade | null => {
    // Handle mock server message format
    if (data && data.id && data.symbol && data.price && data.size && data.side && data.exchange) {
      return {
        id: data.id,
        timestamp: data.timestamp,
        symbol: data.symbol,
        price: data.price,
        size: data.size,
        side: data.side as TradeSide,
        exchange: data.exchange
      }
    }
    return null
  }

  const clearTrades = () => {
    setTrades([])
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header />
        {/* Controls */}
        <Controls
          setTrades={setTrades}
          maxTrades={MAX_TRADES}
          parseTradeMessage={parseTradeMessage}
        />
        {/* Trades feed */}
        <TradesTable 
          trades={trades}
          maxTrades={MAX_TRADES}
          onClearTrades={clearTrades}
        />
      </div>
    </div>
  )
}
