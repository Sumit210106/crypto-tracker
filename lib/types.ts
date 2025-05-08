export interface Crypto {
  id: string
  rank: number
  name: string
  symbol: string
  image: string
  price: number
  priceChange1h: number
  priceChange24h: number
  priceChange7d: number
  marketCap: number
  volume24h: number
  volumeInCrypto: number
  circulatingSupply: number
  maxSupply: number | null
  sparkline: number[]
  isFavorite: boolean
}

export interface CryptoState {
  cryptos: Crypto[]
  filter: string
  sortBy: string
  showFavoritesOnly: boolean
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}
