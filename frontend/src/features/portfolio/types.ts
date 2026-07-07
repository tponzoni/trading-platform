export interface Portfolio {
  id: string;
  name: string;
  symbols: string[];
}

export interface Trade {
  id: string;
  symbol: string;
  side: "BUY" | "SELL";
  quantity: number;
  price: number;
  timestamp: string;
}

export interface Position {
  symbol: string;
  quantity: number;
  averagePrice: number;
}