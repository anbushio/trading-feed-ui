"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Controls from "@/components/Controls"

interface Trade {
  id: string
  timestamp: number
  symbol: string
  price: number
  quantity: number
  side: "buy" | "sell"
  exchange?: string
}

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error"

export default function Dashboard() {
  const [wsUrl, setWsUrl] = useState("")
  const [trades, setTrades] = useState<Trade[]>([])
  const maxTrades = 100

  const parseTradeMessage = (data: any): Trade | null => {
    // Placeholder implementation - will need to be customized based on the data format
    if (data && data.s && data.p && data.q) {
      return {
        id: `${data.s}-${Date.now()}`,
        timestamp: Date.now(),
        symbol: data.s,
        price: parseFloat(data.p),
        quantity: parseFloat(data.q),
        side: data.m ? "sell" : "buy",
        exchange: "unknown"
      }
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header />
        {/* Controls */}
        <Controls 
          wsUrl={wsUrl}
          setWsUrl={setWsUrl}
          setTrades={setTrades}
          maxTrades={maxTrades}
          parseTradeMessage={parseTradeMessage}
        />
      </div>
    </div>
  )
}
