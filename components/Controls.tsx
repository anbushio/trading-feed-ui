'use client'

import { useState, useRef, useCallback } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Wifi, WifiOff } from 'lucide-react'
import { Trade, ConnectionStatus, TradeSide } from '@/types'
import { WS_CLOSE_NORMAL, WS_CLOSE_USER_DISCONNECT } from '@/constants'

interface ControlsProps {
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>
  maxTrades: number
}

export default function Controls({ setTrades, maxTrades }: ControlsProps) {
  const [wsUrl, setWsUrl] = useState('')
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.DISCONNECTED
  )
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  const getStatusIcon = (status: ConnectionStatus) => {
    switch (status) {
      case ConnectionStatus.CONNECTED:
        return <Wifi className="h-4 w-4 ml-2" />
      case ConnectionStatus.CONNECTING:
        return <Wifi className="h-4 w-4 ml-2 animate-pulse" />
      default:
        return <WifiOff className="h-4 w-4 ml-2" />
    }
  }

  const getStatusColor = (status: ConnectionStatus) => {
    switch (status) {
      case ConnectionStatus.CONNECTED:
        return 'bg-green-500'
      case ConnectionStatus.CONNECTING:
        return 'bg-yellow-500'
      case ConnectionStatus.ERROR:
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const parseTradeMessage = (data: any): Trade | null => {
    if (data && data.id) {
      return {
        id: data.id,
        timestamp: data.timestamp,
        symbol: data.symbol,
        price: data.price,
        size: data.size,
        side: data.side as TradeSide,
        exchange: data.exchange,
      }
    }
    return null
  }

  const connect = useCallback(() => {
    if (!wsUrl.trim()) {
      setError('Please enter a WebSocket URL')
      return
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.close()
    }

    setConnectionStatus(ConnectionStatus.CONNECTING)
    setError(null)

    try {
      const ws = new WebSocket(wsUrl.trim())
      wsRef.current = ws

      ws.onopen = () => {
        setConnectionStatus(ConnectionStatus.CONNECTED)
        setError(null)
        console.log('WebSocket connected')
      }

      ws.onmessage = event => {
        try {
          const data = JSON.parse(event.data)
          const trade = parseTradeMessage(data)

          if (trade) {
            setTrades(prev => {
              // const newTrades = [trade, ...prev].slice(0, maxTrades)
              const newTrades = [trade, ...prev]
              return newTrades
            })
          }
        } catch (err) {
          console.error('Error processing message:', err)
        }
      }

      ws.onerror = error => {
        console.error('WebSocket error:', error)
        setConnectionStatus(ConnectionStatus.ERROR)
        setError('WebSocket connection error')
      }

      ws.onclose = event => {
        setConnectionStatus(ConnectionStatus.DISCONNECTED)
        if (event.code !== WS_CLOSE_NORMAL) {
          setError(`Connection closed: ${event.reason || 'Unknown reason'}`)
        }
        console.log('WebSocket disconnected')
      }
    } catch (err) {
      setConnectionStatus(ConnectionStatus.ERROR)
      setError('Invalid WebSocket URL')
    }
  }, [wsUrl, maxTrades, parseTradeMessage, setTrades])

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close(WS_CLOSE_NORMAL, WS_CLOSE_USER_DISCONNECT)
      wsRef.current = null
    }
    setConnectionStatus(ConnectionStatus.DISCONNECTED)
    setError(null)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Connection
          <Badge
            variant="outline"
            className={`ml-auto ${getStatusColor(connectionStatus)} text-white flex items-center`}
          >
            <span className="mr-2">{connectionStatus.toUpperCase()}</span>{' '}
            {getStatusIcon(connectionStatus)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter a URL to connect to a live trading feed"
            value={wsUrl}
            onChange={e => setWsUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && connect()}
            className="flex-1"
          />
          {connectionStatus === ConnectionStatus.CONNECTED ? (
            <Button
              onClick={disconnect}
              className="min-w-32"
              variant="destructive"
            >
              Disconnect
            </Button>
          ) : (
            <Button
              onClick={connect}
              className="min-w-32"
              disabled={connectionStatus === ConnectionStatus.CONNECTING}
            >
              Connect
            </Button>
          )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
