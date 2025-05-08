"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAllCryptos, selectFilteredCryptos, updateCryptoPrices } from "@/lib/features/crypto/cryptoSlice"
import { CryptoTable } from "@/components/crypto-table"
import { CryptoFilters } from "@/components/crypto-filters"
import type { AppDispatch } from "@/lib/store"
import { simulatePriceUpdates } from "@/lib/websocket-simulator"

export default function CryptoTracker() {
  const dispatch = useDispatch<AppDispatch>()
  const allCryptos = useSelector(selectAllCryptos)
  const filteredCryptos = useSelector(selectFilteredCryptos)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Start the WebSocket simulator once we have data
    if (!isLoading) {
      const unsubscribe = simulatePriceUpdates((updates) => {
        dispatch(updateCryptoPrices(updates))
      })

      return () => unsubscribe()
    }
  }, [dispatch, isLoading])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <CryptoFilters />
      <CryptoTable cryptos={filteredCryptos} />
    </div>
  )
}
