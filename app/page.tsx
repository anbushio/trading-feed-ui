"use client"

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

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Live Trades Dashboard</h1>
        </div>
      </div>
    </div>
  )
}
