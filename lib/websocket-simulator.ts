import type { Crypto } from "@/lib/types"

// Simulates WebSocket updates for crypto prices
export function simulatePriceUpdates(callback: (updates: Partial<Crypto>[]) => void) {
  const interval = setInterval(() => {
    // Generate random updates for all cryptos
    const updates = generateRandomUpdates()
    callback(updates)
  }, 2000) // Update every 2 seconds

  // Return a cleanup function
  return () => clearInterval(interval)
}

function generateRandomUpdates(): Partial<Crypto>[] {
  // In a real app, this would come from a WebSocket
  // Here we're just generating random price changes
  return Array(6)
    .fill(0)
    .map((_, index) => {
      const id = `crypto-${index + 1}`

      // Generate random price change (-2% to +2%)
      const priceChangePercent = (Math.random() * 4 - 2) / 100

      // Generate random volume change (-5% to +5%)
      const volumeChangePercent = (Math.random() * 10 - 5) / 100

      return {
        id,
        priceChange1h: generateRandomChange(0.5),
        priceChange24h: generateRandomChange(1),
        _priceChangePercent: priceChangePercent, // Helper for the reducer
        _volumeChangePercent: volumeChangePercent, // Helper for the reducer
      }
    })
}

function generateRandomChange(maxChange: number): number {
  // Generate a random change between -maxChange and +maxChange
  return Math.random() * maxChange * 2 - maxChange
}
