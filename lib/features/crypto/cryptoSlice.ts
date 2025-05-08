import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"
import type { Crypto, CryptoState } from "@/lib/types"
import { cryptoData } from "@/lib/data"

const initialState: CryptoState = {
  cryptos: cryptoData,
  filter: "",
  sortBy: "marketCap",
  showFavoritesOnly: false,
  status: "idle",
  error: null,
}

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoPrices: (state, action: PayloadAction<Partial<Crypto>[]>) => {
      action.payload.forEach((update) => {
        const index = state.cryptos.findIndex((crypto) => crypto.id === update.id)
        if (index !== -1) {
          const crypto = state.cryptos[index]

          // Calculate new price based on percentage change
          if (update._priceChangePercent !== undefined) {
            const priceChange = crypto.price * update._priceChangePercent
            update.price = crypto.price + priceChange
          }

          // Calculate new volume based on percentage change
          if (update._volumeChangePercent !== undefined) {
            const volumeChange = crypto.volume24h * update._volumeChangePercent
            update.volume24h = crypto.volume24h + volumeChange
            update.volumeInCrypto = update.volume24h / update.price!
          }

          // Update sparkline by adding the new price point and removing the oldest
          if (update.price !== undefined && crypto.sparkline) {
            // Create a new array with the latest price point
            const newSparkline = [
              ...crypto.sparkline.slice(1),
              // Normalize the new price point to match the scale of the sparkline
              crypto.sparkline[crypto.sparkline.length - 1] * (1 + (update._priceChangePercent || 0)),
            ]
            update.sparkline = newSparkline
          }

          // Remove helper properties before updating state
          delete update._priceChangePercent
          delete update._volumeChangePercent

          // Update the crypto with the new values
          state.cryptos[index] = { ...crypto, ...update }
        }
      })
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload.toLowerCase()
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload
    },
    toggleShowFavoritesOnly: (state) => {
      state.showFavoritesOnly = !state.showFavoritesOnly
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.cryptos.findIndex((crypto) => crypto.id === action.payload)
      if (index !== -1) {
        state.cryptos[index].isFavorite = !state.cryptos[index].isFavorite
      }
    },
  },
})

export const { updateCryptoPrices, setFilter, setSortBy, toggleShowFavoritesOnly, toggleFavorite } = cryptoSlice.actions

// Selectors
export const selectAllCryptos = (state: RootState) => state.crypto.cryptos

export const selectFilteredCryptos = (state: RootState) => {
  const { cryptos, filter, sortBy, showFavoritesOnly } = state.crypto

  let filtered = cryptos

  // Apply text filter
  if (filter) {
    filtered = filtered.filter(
      (crypto) => crypto.name.toLowerCase().includes(filter) || crypto.symbol.toLowerCase().includes(filter),
    )
  }

  // Apply favorites filter
  if (showFavoritesOnly) {
    filtered = filtered.filter((crypto) => crypto.isFavorite)
  }

  // Apply sorting
  let sorted = [...filtered]

  switch (sortBy) {
    case "marketCap":
      sorted = sorted.sort((a, b) => b.marketCap - a.marketCap)
      break
    case "price":
      sorted = sorted.sort((a, b) => b.price - a.price)
      break
    case "priceChange24h":
      sorted = sorted.sort((a, b) => b.priceChange24h - a.priceChange24h)
      break
    case "volume24h":
      sorted = sorted.sort((a, b) => b.volume24h - a.volume24h)
      break
    case "topGainers":
      sorted = sorted.sort((a, b) => b.priceChange24h - a.priceChange24h)
      break
    case "topLosers":
      sorted = sorted.sort((a, b) => a.priceChange24h - b.priceChange24h)
      break
    default:
      break
  }

  return sorted
}

export default cryptoSlice.reducer
