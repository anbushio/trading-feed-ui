# Mock Trading WebSocket Server

This is a mock WebSocket server that simulates real-time trading data for development and testing purposes.

## Features

- Simulates real-time trading data for multiple cryptocurrencies
- Generates realistic price movements and trade sizes
- Supports multiple exchanges (Binance, Coinbase, Kraken, Bitfinex)
- Sends trade data every second
- Handles WebSocket connections and disconnections gracefully

## Setup

1. Install dependencies:
```bash
cd mock-server
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The server will start on `ws://localhost:8080`

## Usage

In your trading feed application, connect to the mock server using:
```
ws://localhost:8080
```

## Message Format

The server sends trade messages in the following format:

```json
{
  "id": "ba9fef23-91a0-45db-9cf1-e65e1706d232",
  "timestamp": 1718911830000,
  "symbol": "ETH/USD",
  "price": 3568.12,
  "size": 2.5,
  "side": "buy",
  "exchange": "Coinbase"
}
```

## Supported Symbols

- BTC/USD (Bitcoin)
- ETH/USD (Ethereum)
- ADA/USD (Cardano)
- DOT/USD (Polkadot)
- LINK/USD (Chainlink)

## Supported Exchanges

- Binance
- Coinbase
- Kraken
- Bitfinex

## Development

The server generates realistic price data with:
- Price volatility (±1% changes)
- Realistic price ranges for each cryptocurrency
- Random trade sizes (0.1 to 10.1)
- Random buy/sell sides
- Random exchange selection

## Stopping the Server

Press `Ctrl+C` to gracefully shut down the server. 