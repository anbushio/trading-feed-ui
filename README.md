# 🚀 Trading Feed UI

A modern, real-time trading dashboard built with Next.js, TypeScript, and Tailwind CSS. Monitor live cryptocurrency trades with advanced filtering capabilities and a beautiful, responsive interface.

![Trading Feed UI](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌐 Live Demo

**🚀 [View Live Demo](https://trading-feed-tau.vercel.app/)**

## ✨ Features

- **Real-time Trading Data**: Connect to any WebSocket trading feed for live market data
- **Advanced Filtering**: Filter trades by symbol, side, time range, price, and quantity
- **Responsive Design**: Beautiful UI that works on desktop and mobile devices
- **Live Connection Status**: Real-time WebSocket connection monitoring
- **Trade History**: View and manage historical trade data
- **Mock Server**: Built-in mock trading server for development and testing
- **TypeScript**: Fully typed for better development experience
- **Modern UI**: Built with Radix UI components and Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **WebSocket**: Native WebSocket API
- **Development**: Turbopack for fast development builds
- **Deployment**: [Vercel](https://vercel.com) for seamless hosting

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd trading-feed-ui
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📡 Using the Mock Server

For development and testing, a mock WebSocket server is included:

### Start the Mock Server

```bash
cd mock-server
pnpm install
pnpm start
```

The mock server will run on `ws://localhost:8080` and generate realistic trading data.

### Connect to Mock Server

In the Trading Feed UI, enter `ws://localhost:8080` in the connection field and click "Connect".

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Custom WebSocket URL for production
NEXT_PUBLIC_DEFAULT_WS_URL=wss://your-trading-feed.com
```

### Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting
```

## 📊 Features in Detail

### Real-time Trading Dashboard

- Live trade updates with timestamps
- Price and quantity formatting
- Buy/Sell indicators with color coding
- Trade total calculations

### Advanced Filtering System

- **Symbol Filter**: Filter by specific trading pairs
- **Side Filter**: Show only buy or sell trades
- **Time Range**: Filter trades from the last 1, 5, or 10 minutes
- **Price Range**: Set minimum and maximum price filters
- **Quantity Range**: Filter by trade size

## 🎨 UI Components

The application uses a custom UI component library built with:

- **Radix UI**: Accessible, unstyled components
- **Tailwind CSS**: Utility-first styling
- **Class Variance Authority**: Component variant management
- **Lucide React**: Beautiful, customizable icons

## 🔌 WebSocket Integration

The application supports any WebSocket trading feed that sends JSON messages in this format:

```json
{
  "id": "unique-trade-id",
  "timestamp": 1718911830000,
  "symbol": "BTC/USD",
  "price": 45000.5,
  "size": 1.25,
  "side": "buy",
  "exchange": "Binance"
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push
