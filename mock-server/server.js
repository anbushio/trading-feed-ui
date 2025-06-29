const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

console.log('Mock WebSocket server running on ws://localhost:8080');

// Trading symbols to simulate
const symbols = ['BTC/USD', 'ETH/USD', 'ADA/USD', 'DOT/USD', 'LINK/USD'];
const exchanges = ['Binance', 'Coinbase', 'Kraken', 'Bitfinex'];

// Generate random trade data
function generateTrade() {
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const exchange = exchanges[Math.floor(Math.random() * exchanges.length)];
  const side = Math.random() > 0.5 ? 'buy' : 'sell';
  
  // Generate realistic price ranges based on symbol
  let basePrice;
  switch (symbol) {
    case 'BTC/USD':
      basePrice = 45000 + Math.random() * 10000; // $45k-$55k
      break;
    case 'ETH/USD':
      basePrice = 3000 + Math.random() * 1000; // $3k-$4k
      break;
    case 'ADA/USD':
      basePrice = 0.4 + Math.random() * 0.2; // $0.4-$0.6
      break;
    case 'DOT/USD':
      basePrice = 6 + Math.random() * 2; // $6-$8
      break;
    case 'LINK/USD':
      basePrice = 15 + Math.random() * 5; // $15-$20
      break;
    default:
      basePrice = 100 + Math.random() * 100;
  }
  
  // Add some price volatility
  const priceChange = (Math.random() - 0.5) * 0.02; // ±1% change
  const price = basePrice * (1 + priceChange);
  
  // Generate realistic trade size
  const size = Math.random() * 10 + 0.1; // 0.1 to 10.1
  
  return {
    id: uuidv4(),
    timestamp: Date.now(),
    symbol: symbol,
    price: parseFloat(price.toFixed(2)),
    size: parseFloat(size.toFixed(4)),
    side: side,
    exchange: exchange
  };
}

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send initial connection message
  ws.send(JSON.stringify({
    type: 'connection',
    message: 'Connected to mock trading server',
    timestamp: Date.now()
  }));
  
  // Start sending trade data
  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      const trade = generateTrade();
      ws.send(JSON.stringify(trade));
    }
  }, 1000); // Send a trade every second
  
  // Handle client disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
  
  // Handle client messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received message:', data);
      
      // Echo back with timestamp
      ws.send(JSON.stringify({
        type: 'echo',
        original: data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
  
  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clearInterval(interval);
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down mock server...');
  wss.close(() => {
    console.log('Mock server closed');
    process.exit(0);
  });
}); 