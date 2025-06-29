'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2, WifiOff } from 'lucide-react'
import { Trade } from '@/types'

interface TradesTableProps {
  trades: Trade[]
  maxTrades: number
  onClearTrades: () => void
}

export default function TradesTable({
  trades,
  maxTrades,
  onClearTrades,
}: TradesTableProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const formatQuantity = (size: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(size)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Live Trades Dashboard</CardTitle>
            <CardDescription>
              Showing {trades.length} recent trades (max {maxTrades})
            </CardDescription>
          </div>
          <Button onClick={onClearTrades} variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {trades.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <WifiOff className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No trades received yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Side</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Size</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade, index) => (
                  <TableRow
                    key={`${trade.id}-${index}`}
                    className="hover:bg-muted/50"
                  >
                    <TableCell className="font-mono text-sm">
                      {formatTime(trade.timestamp)}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {trade.symbol}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          trade.side === 'buy' ? 'default' : 'destructive'
                        }
                        className={
                          trade.side === 'buy'
                            ? 'bg-green-500 hover:bg-green-600'
                            : ''
                        }
                      >
                        {trade.side.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatPrice(trade.price)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatQuantity(trade.size)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {formatPrice(trade.price * trade.size)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
