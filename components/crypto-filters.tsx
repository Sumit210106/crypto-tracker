"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { setFilter, setSortBy, toggleShowFavoritesOnly } from "@/lib/features/crypto/cryptoSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, TrendingUp, TrendingDown } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export function CryptoFilters() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [showFavorites, setShowFavorites] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    dispatch(setFilter(value))
  }

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value))
  }

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites)
    dispatch(toggleShowFavoritesOnly())
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4 sm:p-6 md:h-[200px] h-[250px]">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search cryptocurrencies..."
                className="pl-8 border-crypto-primary/20 focus-visible:ring-crypto-primary/30"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showFavorites ? "default" : "outline"}
                size="sm"
                className={`h-10 ${
                  showFavorites
                    ? "bg-crypto-primary hover:bg-crypto-primary/90"
                    : "hover:border-crypto-primary/50 hover:text-crypto-primary"
                }`}
                onClick={handleToggleFavorites}
              >
                <Star className={`mr-2 h-4 w-4 ${showFavorites ? "fill-white" : "fill-yellow-400 text-yellow-400"}`} />
                Favorites
              </Button>
              <Select onValueChange={handleSortChange} defaultValue="marketCap">
                <SelectTrigger className="w-[180px] border-crypto-primary/20 focus:ring-crypto-primary/30">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketCap">Market Cap</SelectItem>
                  <SelectItem value="priceChange24h">24h % Change</SelectItem>
                  <SelectItem value="volume24h">Volume (24h)</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className=" bg-muted/50 p-1 flex flex-wrap sm:flex-nowrap my-1 ">
              <TabsTrigger
                value="all"
                onClick={() => dispatch(setFilter(""))}
                className="w-full sm:w-auto data-[state=active]:bg-crypto-primary data-[state=active]:text-white mb-1 border md:mx-4"
              >
                All Cryptocurrencies
              </TabsTrigger>
              <TabsTrigger
                value="gainers"
                onClick={() => dispatch(setSortBy("topGainers"))}
                className="w-full sm:w-auto flex items-center data-[state=active]:bg-crypto-positive data-[state=active]:text-white border mb-1 md:mx-4"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Top Gainers
              </TabsTrigger>
              <TabsTrigger
                value="losers"
                onClick={() => dispatch(setSortBy("topLosers"))}
                className="w-full sm:w-auto flex items-center data-[state=active]:bg-crypto-negative data-[state=active]:text-white border md:mx-4"
              >
                <TrendingDown className="mr-2 h-4 w-4" />
                Top Losers
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
