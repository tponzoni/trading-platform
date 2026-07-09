export interface Deposit {
  timestampUtc: string;
  amount: number;
  description: string;
}

export interface Portfolio {
  id: string;
  name: string;
  currency: string;
  selectedSymbol: string;
  symbols: string[];
  deposits: Deposit[];
  riskPercent: number;
  stopLossPercent: number;
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