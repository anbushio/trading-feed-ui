'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Controls from '@/components/Controls'
import TradesTable from '@/components/TradesTable'
import { Trade } from '@/types'
import { MAX_TRADES } from '@/constants'

export default function Dashboard() {
  const [trades, setTrades] = useState<Trade[]>([])

  const clearTrades = () => {
    setTrades([])
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header />
        {/* Controls */}
        <Controls setTrades={setTrades} maxTrades={MAX_TRADES} />
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
