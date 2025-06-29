"use client"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Wifi, WifiOff } from "lucide-react"
import { Trade, ConnectionStatus } from "@/types"
import { WS_CLOSE_NORMAL, WS_CLOSE_USER_DISCONNECT } from "@/constants"

interface ControlsProps {
  wsUrl: string
  setWsUrl: (url: string) => void
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>
  maxTrades: number
  parseTradeMessage: (data: any) => Trade | null
}

export default function Controls({
  wsUrl,
  setWsUrl,
  setTrades,
  maxTrades,
  parseTradeMessage
}: ControlsProps) {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected")
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  const getStatusIcon = (status: ConnectionStatus) => {
    switch (status) {
      case "connected":
        return <Wifi className="h-4 w-4 ml-2" />
      case "connecting":
        return <Wifi className="h-4 w-4 ml-2 animate-pulse" />
      default:
        return <WifiOff className="h-4 w-4 ml-2" />
    }
  }

  const getStatusColor = (status: ConnectionStatus) => {
    switch (status) {
      case "connected":
        return "bg-green-500"
      case "connecting":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const connect = useCallback(() => {
    if (!wsUrl.trim()) {
      setError("Please enter a WebSocket URL")
      return
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.close()
    }

    setConnectionStatus("connecting")
    setError(null)

    try {
      const ws = new WebSocket(wsUrl.trim())
      wsRef.current = ws

      ws.onopen = () => {
        setConnectionStatus("connected")
        setError(null)
        console.log("WebSocket connected")
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          const trade = parseTradeMessage(data)

          if (trade) {
            setTrades((prev) => {
              const newTrades = [trade, ...prev].slice(0, maxTrades)
              return newTrades
            })
          }
        } catch (err) {
          console.error("Error processing message:", err)
        }
      }

      ws.onerror = (error) => {
        console.error("WebSocket error:", error)
        setConnectionStatus("error")
        setError("WebSocket connection error")
      }

      ws.onclose = (event) => {
        setConnectionStatus("disconnected")
        if (event.code !== WS_CLOSE_NORMAL) {
          setError(`Connection closed: ${event.reason || "Unknown reason"}`)
        }
        console.log("WebSocket disconnected")
      }
    } catch (err) {
      setConnectionStatus("error")
      setError("Invalid WebSocket URL")
    }
  }, [wsUrl, maxTrades, parseTradeMessage, setTrades])

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close(WS_CLOSE_NORMAL, WS_CLOSE_USER_DISCONNECT)
      wsRef.current = null
    }
    setConnectionStatus("disconnected")
    setError(null)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Connection
          <Badge variant="outline" className={`ml-auto ${getStatusColor(connectionStatus)} text-white flex items-center`}>
            <span className="mr-2">{connectionStatus.toUpperCase()}</span> {getStatusIcon(connectionStatus)}
          </Badge>
        </CardTitle>
        {/* <CardDescription>Enter a URL to connect to a live trading feed</CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter a URL to connect to a live trading feed"
            value={wsUrl}
            onChange={(e) => setWsUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && connect()}
            className="flex-1"
          />
          {connectionStatus === "connected" ? (
            <Button onClick={disconnect} className="min-w-32" variant="destructive">
              Disconnect
            </Button>
          ) : (
            <Button onClick={connect} className="min-w-32" disabled={connectionStatus === "connecting"}>
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
