'use client'

import { useState, useEffect } from 'react'
import { Filter, X, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Collapsible, CollapsibleContent } from '@radix-ui/react-collapsible'
import { INITIAL_FILTER } from '@/constants'
import { FilterState } from '@/types'

interface FilterTableProps {
  isOpen: boolean
  activeFilters: FilterState
  onFiltersChange?: (filters: FilterState) => void
  getActiveFiltersCount: () => number
  clearAllFilters: () => void
  onFilterApply: () => void
}

export default function FilterTable({
  isOpen,
  activeFilters,
  onFiltersChange,
  getActiveFiltersCount,
  clearAllFilters,
  onFilterApply,
}: FilterTableProps) {
  const [pendingFilters, setPendingFilters] =
    useState<FilterState>(INITIAL_FILTER)

  useEffect(() => {
    setPendingFilters(activeFilters)
  }, [activeFilters])

  const hasPendingChanges = () => {
    return JSON.stringify(pendingFilters) !== JSON.stringify(activeFilters)
  }

  const submitFilters = () => {
    onFiltersChange?.(pendingFilters)
    onFilterApply()
  }

  const handleClearAll = () => {
    setPendingFilters(INITIAL_FILTER)
    clearAllFilters()
  }

  return (
    <Collapsible open={isOpen}>
      <CollapsibleContent>
        <div className="p-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Symbol Filter */}
            <div className="space-y-2">
              <Label>Trading Pairs</Label>
              <Select
                value={
                  pendingFilters.symbols.length === 1
                    ? pendingFilters.symbols[0]
                    : ''
                }
                onValueChange={(value: string) => {
                  if (value === 'all') {
                    setPendingFilters(prev => ({ ...prev, symbols: [] }))
                  } else {
                    setPendingFilters(prev => ({ ...prev, symbols: [value] }))
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      pendingFilters.symbols.length === 0
                        ? 'All symbols'
                        : pendingFilters.symbols.length === 1
                          ? pendingFilters.symbols[0]
                          : `${pendingFilters.symbols.length} selected`
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Symbols</SelectItem>
                  <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
                  <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Side Filter */}
            <div className="space-y-2">
              <Label>Trade Side</Label>
              <Select
                value={
                  pendingFilters.sides.length === 0
                    ? 'all'
                    : pendingFilters.sides.length === 1
                      ? pendingFilters.sides[0]
                      : 'mixed'
                }
                onValueChange={(value: string) => {
                  if (value === 'all') {
                    setPendingFilters(prev => ({ ...prev, sides: [] }))
                  } else if (value === 'buy' || value === 'sell') {
                    setPendingFilters(prev => ({ ...prev, sides: [value] }))
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sides</SelectItem>
                  <SelectItem value="buy">Buy Only</SelectItem>
                  <SelectItem value="sell">Sell Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Range Filter */}
            <div className="space-y-2">
              <Label>Time Range</Label>
              <Select
                value={pendingFilters.timeRange.minutes?.toString() || 'all'}
                onValueChange={(value: string) => {
                  if (value === 'all') {
                    setPendingFilters(prev => ({
                      ...prev,
                      timeRange: { minutes: null },
                    }))
                  } else {
                    setPendingFilters(prev => ({
                      ...prev,
                      timeRange: { minutes: Number.parseInt(value) },
                    }))
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="1">Last Minute</SelectItem>
                  <SelectItem value="5">Last 5 Minutes</SelectItem>
                  <SelectItem value="10">Last 10 Minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2">
              <Label>Price Range</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={pendingFilters.priceRange.min || ''}
                  onChange={e => {
                    const value = e.target.value
                      ? Number.parseFloat(e.target.value)
                      : null
                    setPendingFilters(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, min: value },
                    }))
                  }}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={pendingFilters.priceRange.max || ''}
                  onChange={e => {
                    const value = e.target.value
                      ? Number.parseFloat(e.target.value)
                      : null
                    setPendingFilters(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, max: value },
                    }))
                  }}
                />
              </div>
            </div>

            {/* Quantity Range Filter */}
            <div className="space-y-2">
              <Label>Quantity Range</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={pendingFilters.quantityRange.min || ''}
                  onChange={e => {
                    const value = e.target.value
                      ? Number.parseFloat(e.target.value)
                      : null
                    setPendingFilters(prev => ({
                      ...prev,
                      quantityRange: { ...prev.quantityRange, min: value },
                    }))
                  }}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={pendingFilters.quantityRange.max || ''}
                  onChange={e => {
                    const value = e.target.value
                      ? Number.parseFloat(e.target.value)
                      : null
                    setPendingFilters(prev => ({
                      ...prev,
                      quantityRange: { ...prev.quantityRange, max: value },
                    }))
                  }}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleClearAll}
              disabled={getActiveFiltersCount() === 0 && !hasPendingChanges()}
            >
              Clear All
            </Button>
            <Button
              onClick={submitFilters}
              disabled={!hasPendingChanges()}
              className={hasPendingChanges() ? 'bg-primary' : ''}
            >
              Apply
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
