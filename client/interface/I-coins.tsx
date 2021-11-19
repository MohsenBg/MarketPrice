export interface BasicCoinsInfo {
  coinName: string;
  symbol: string;
  image: string;
}

export interface PriceFormat {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}
export interface CoinsInfo {
  coinName: string;
  symbol: string;
  image: string;
  price: Array<PriceFormat>;
}
