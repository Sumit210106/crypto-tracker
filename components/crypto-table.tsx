"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { ArrowUpDown, HelpCircle, Star, ChevronUp, ChevronDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toggleFavorite } from "@/lib/features/crypto/cryptoSlice"
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils"
import type { Crypto } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { PriceChart } from "@/components/price-chart"
import { cryptoData } from "@/lib/data"

interface CryptoTableProps {
  cryptos: Crypto[]
}

export function CryptoTable({ cryptos }: CryptoTableProps) {
  const dispatch = useDispatch()
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Crypto | null
    direction: "ascending" | "descending"
  }>({
    key: null,
    direction: "ascending",
  })

  const handleSort = (key: keyof Crypto) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })
  }

  const sortedCryptos = [...cryptos].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="crypto-table-header">
            <TableRow>
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead className="min-w-[180px]">
                <Button variant="ghost" onClick={() => handleSort("name")} className="flex items-center font-semibold">
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("price")}
                  className="flex items-center font-semibold ml-auto"
                >
                  Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("priceChange1h")}
                  className="flex items-center font-semibold ml-auto"
                >
                  1h %
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("priceChange24h")}
                  className="flex items-center font-semibold ml-auto"
                >
                  24h %
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("priceChange7d")}
                  className="flex items-center font-semibold ml-auto"
                >
                  7d %
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <div className="flex items-center justify-end">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("marketCap")}
                    className="flex items-center font-semibold"
                  >
                    Market Cap
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">Market Cap = Current Price x Circulating Supply</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead className="text-right">
                <div className="flex items-center justify-end">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("volume24h")}
                    className="flex items-center font-semibold"
                  >
                    Volume(24h)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">
                          A measure of how much of a cryptocurrency was traded in the last 24 hours.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead className="text-right">
                <div className="flex items-center justify-end">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("circulatingSupply")}
                    className="flex items-center font-semibold"
                  >
                    Circulating Supply
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">
                          The amount of coins that are circulating in the market and are tradeable by the public.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead className="text-center min-w-[120px]">Last 7 Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCryptos.map((crypto) => (
              <TableRow key={crypto.id} className="crypto-table-row">
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => dispatch(toggleFavorite(crypto.id))}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          crypto.isFavorite ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </Button>
                    <span className="ml-1">{crypto.rank}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-8 w-8 mr-3 flex-shrink-0 bg-white dark:bg-gray-700 rounded-full p-1">
                      <img
                        src={crypto.image || "/placeholder.svg"}
                        alt={crypto.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(crypto.price)}</TableCell>
                <TableCell className="text-right">
                  <div
                    className={`flex items-center justify-end ${
                      crypto.priceChange1h >= 0 ? "crypto-positive" : "crypto-negative"
                    }`}
                  >
                    {crypto.priceChange1h >= 0 ? (
                      <ChevronUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-1" />
                    )}
                    {formatPercent(Math.abs(crypto.priceChange1h))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={`flex items-center justify-end ${
                      crypto.priceChange24h >= 0 ? "crypto-positive" : "crypto-negative"
                    }`}
                  >
                    {crypto.priceChange24h >= 0 ? (
                      <ChevronUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-1" />
                    )}
                    {formatPercent(Math.abs(crypto.priceChange24h))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={`flex items-center justify-end ${
                      crypto.priceChange7d >= 0 ? "crypto-positive" : "crypto-negative"
                    }`}
                  >
                    {crypto.priceChange7d >= 0 ? (
                      <ChevronUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-1" />
                    )}
                    {formatPercent(Math.abs(crypto.priceChange7d))}
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(crypto.marketCap)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    {formatCurrency(crypto.volume24h)}
                    <div className="text-xs text-muted-foreground">
                      {formatNumber(crypto.volumeInCrypto)} {crypto.symbol}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div>
                    {formatNumber(crypto.circulatingSupply)} {crypto.symbol}
                    {crypto.maxSupply && (
                      <div className="mt-1 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-crypto-primary rounded-full"
                          style={{
                            width: `${(crypto.circulatingSupply / crypto.maxSupply) * 100}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <PriceChart data={crypto.sparkline} isPositive={crypto.priceChange7d >= 0} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
