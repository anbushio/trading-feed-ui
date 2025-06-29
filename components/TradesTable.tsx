'use client'

import { useCallback, useState } from 'react'
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
import { Trash2, WifiOff, Filter, X } from 'lucide-react'
import { FilterState, Trade } from '@/types'
import FilterTable from './FilterTable'
import { Collapsible, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { INITIAL_FILTER } from '@/constants'
import { filterTrades, getActiveFiltersCount } from '@/utils/filter'
import { formatTime, formatPrice, formatQuantity } from '@/utils/format'

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
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [activeFilters, setActiveFilters] =
    useState<FilterState>(INITIAL_FILTER)

  const clearAllFilters = () => {
    setActiveFilters(INITIAL_FILTER)
  }
  const onFilterApply = () => {
    setIsFiltersOpen(false)
  }

  const handleFiltersChange = (filters: FilterState) => {
    console.log('filters', filters)
    setActiveFilters(filters)
  }

  const applyFilters = useCallback(
    (tradesToFilter: Trade[]) => {
      return tradesToFilter.filter(trade => filterTrades(trade, activeFilters))
    },
    [activeFilters]
  )
  const activeFiltersCount = useCallback(() => {
    return getActiveFiltersCount(activeFilters)
  }, [activeFilters])

  const filteredTrades = applyFilters(trades).slice(0, maxTrades)

  return (
    <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Live Trades Dashboard</CardTitle>
              <CardDescription>
                <p className="mt-1">
                  {activeFiltersCount() > 0
                    ? `Showing ${filteredTrades.length} of ${trades.length} (max ${maxTrades})`
                    : `Showing ${trades.length} trades (max ${maxTrades})`}
                </p>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative pr-2">
                {activeFiltersCount() > 0 && (
                  <Badge variant="secondary">
                    {activeFiltersCount()} active
                  </Badge>
                )}
                {activeFiltersCount() > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute -top-1 right-1 h-4 w-4 rounded-3xl bg-primary text-primary-foreground p-0"
                    onClick={e => {
                      e.stopPropagation()
                      clearAllFilters()
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`cursor-pointer ${isFiltersOpen ? 'bg-primary text-white hover:bg-primary/80 hover:text-white' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                  </div>
                </Button>
              </CollapsibleTrigger>
              <Button onClick={onClearTrades} variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <FilterTable
            isOpen={isFiltersOpen}
            activeFilters={activeFilters}
            onFiltersChange={handleFiltersChange}
            getActiveFiltersCount={() => getActiveFiltersCount(activeFilters)}
            clearAllFilters={clearAllFilters}
            onFilterApply={onFilterApply}
          />
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
                  {filteredTrades.map((trade, index) => (
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
    </Collapsible>
  )
}
